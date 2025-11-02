import React, { useCallback, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Description as FileIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const FileUploader = ({ 
  onFileSelect, 
  onTextPaste, 
  acceptedTypes = ['.pdf', '.txt', '.doc', '.docx'],
  maxSize = 10 * 1024 * 1024, // 10MB
  placeholder = 'Upload PDF or paste text'
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedText, setPastedText] = useState('');
  const [showTextArea, setShowTextArea] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    []
  );

  const handleFile = (file) => {
    if (file.size > maxSize) {
      alert('File size exceeds the maximum limit (10MB)');
      return;
    }

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      alert('Invalid file type. Please upload PDF, TXT, DOC, or DOCX files.');
      return;
    }

    setSelectedFile(file);
    setPastedText('');
    setShowTextArea(false);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        onFileSelect(file);
      }
    }, 100);
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleTextSubmit = () => {
    if (pastedText.trim()) {
      onTextPaste(pastedText);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPastedText('');
    setShowTextArea(false);
    setUploadProgress(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AnimatePresence mode="wait">
        {!selectedFile && !showTextArea && (
          <motion.div
            key="upload-area"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              sx={{
                p: 4,
                border: '2px dashed',
                borderColor: isDragOver ? 'primary.main' : 'grey.300',
                backgroundColor: isDragOver ? 'primary.50' : 'background.paper',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center',
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept={acceptedTypes.join(',')}
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />

              <motion.div
                animate={{
                  y: isDragOver ? 0 : 5,
                }}
                transition={{
                  repeat: isDragOver ? Infinity : 0,
                  repeatType: 'reverse',
                  duration: 1,
                }}
              >
                <CloudUploadIcon
                  sx={{
                    fontSize: 64,
                    color: isDragOver ? 'primary.main' : 'grey.400',
                    mb: 2,
                  }}
                />
              </motion.div>

              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                {isDragOver ? 'Drop your file here' : placeholder}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                or click to browse files
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTextArea(true);
                  }}
                >
                  Paste Text
                </Button>
                <Typography variant="caption" color="text.secondary">
                  Max size: {maxSize / (1024 * 1024)}MB
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        )}

        {showTextArea && (
          <motion.div
            key="text-area"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Paste Your Text
                </Typography>
                <IconButton onClick={clearSelection} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>

              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste your legal document text here..."
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
              />

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleTextSubmit}
                  disabled={!pastedText.trim()}
                  sx={{ flex: 1 }}
                >
                  Process Text
                </Button>
                <Button variant="outlined" onClick={clearSelection}>
                  Cancel
                </Button>
              </Box>
            </Paper>
          </motion.div>
        )}

        {selectedFile && (
          <motion.div
            key="file-selected"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <FileIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography 
                    variant="h6" 
                    fontWeight={600}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontSize: '1rem'
                    }}
                    title={selectedFile.name}
                  >
                    {selectedFile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </Typography>
                </Box>
                <IconButton onClick={clearSelection} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <Box sx={{ mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                      },
                    }}
                  />
                </Box>
              )}

              {uploadProgress === 100 && (
                <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
                  File uploaded successfully!
                </Typography>
              )}
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default FileUploader;