import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Summarize as SummarizeIcon,
  Category as CategoryIcon,
  AutoAwesome as ProcessIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FileUploader from '../components/FileUploader';

const ToolPage = ({ onNavigate }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('summarizer');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pastedText, setPastedText] = useState('');

  const handleFileSelect = (file) => {
    setUploadedFile(file);
    setPastedText('');
    setError('');
  };

  const handleTextPaste = (text) => {
    setPastedText(text);
    setUploadedFile(null);
    setError('');
  };

  const handleSummarize = async () => {
    if (!uploadedFile && !pastedText.trim()) {
      setError('Please upload a file or paste text to summarize');
      return;
    }

    setIsProcessing(true);
    setError('');
    setResult('');

    // Simulate API call
    setTimeout(() => {
      setResult('This is a demo summary. The AI would analyze your legal document and provide a comprehensive summary highlighting key points, legal precedents, and important rulings. The actual implementation would use advanced NLP models to extract and condense the most relevant information from your court documents.');
      setIsProcessing(false);
    }, 2000);
  };

  const handleClassify = async () => {
    if (!uploadedFile && !pastedText.trim()) {
      setError('Please upload a file or paste text to classify');
      return;
    }

    setIsProcessing(true);
    setError('');
    setResult('');

    // Simulate API call
    setTimeout(() => {
      setResult('Predicted category: Civil Case\n\nConfidence: 92%\n\nSub-category: Contract Dispute\n\nKey indicators detected:\n- Breach of contract language\n- Financial compensation claims\n- Commercial transaction references\n\nThe AI classifier has analyzed your document and identified it as a civil case with high confidence. This classification helps in organizing and routing legal documents efficiently.');
      setIsProcessing(false);
    }, 2000);
  };

  const resetForm = () => {
    setUploadedFile(null);
    setPastedText('');
    setResult('');
    setError('');
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 10}}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Legal Document Analysis Tool
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Upload your legal documents or paste text to get AI-powered insights
            </Typography>
          </Box>

          {/* Tab Selection */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <Paper
              sx={{
                display: 'inline-flex',
                p: 1,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Button
                variant={activeTab === 'summarizer' ? 'contained' : 'text'}
                onClick={() => {
                  setActiveTab('summarizer');
                  resetForm();
                }}
                startIcon={<SummarizeIcon />}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                Summarizer
              </Button>
              <Button
                variant={activeTab === 'classifier' ? 'contained' : 'text'}
                onClick={() => {
                  setActiveTab('classifier');
                  resetForm();
                }}
                startIcon={<CategoryIcon />}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                Classifier
              </Button>
            </Paper>
          </Box>

          <Grid container spacing={4}>
            {/* Input Section */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      {activeTab === 'summarizer' ? (
                        <SummarizeIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                      ) : (
                        <CategoryIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                      )}
                      <Typography variant="h5" fontWeight={600}>
                        {activeTab === 'summarizer' ? 'Document Summarizer' : 'Document Classifier'}
                      </Typography>
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                      {activeTab === 'summarizer'
                        ? 'Upload a legal document or paste text to generate a concise summary highlighting the key points and important rulings.'
                        : 'Upload a legal document or paste text to classify it by case type, category, and legal domain.'}
                    </Typography>

                    <FileUploader
                      onFileSelect={handleFileSelect}
                      onTextPaste={handleTextPaste}
                      placeholder="Upload legal document or paste text"
                    />

                    {error && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                      </Alert>
                    )}

                    <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={activeTab === 'summarizer' ? handleSummarize : handleClassify}
                        disabled={isProcessing || (!uploadedFile && !pastedText.trim())}
                        startIcon={isProcessing ? <CircularProgress size={20} /> : <ProcessIcon />}
                        sx={{ flex: 1 }}
                      >
                        {isProcessing
                          ? 'Processing...'
                          : activeTab === 'summarizer'
                          ? 'Summarize Now'
                          : 'Classify Document'}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={resetForm}
                        disabled={isProcessing}
                      >
                        Clear
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Output Section */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card sx={{ height: '100%', minHeight: 400 }}>
                  <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                      {activeTab === 'summarizer' ? 'Summary' : 'Classification Result'}
                    </Typography>

                    {isProcessing ? (
                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 2,
                        }}
                      >
                        <CircularProgress size={60} thickness={4} />
                        <Typography variant="h6" color="text.secondary">
                          {activeTab === 'summarizer' ? 'Generating summary...' : 'Classifying document...'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Our AI is analyzing your document
                        </Typography>
                      </Box>
                    ) : result ? (
                      <Paper
                        sx={{
                          flex: 1,
                          p: 3,
                          background: 'linear-gradient(135deg, #f8f9ff 0%, #fff 100%)',
                          border: '1px solid rgba(106, 17, 203, 0.1)',
                          whiteSpace: 'pre-wrap',
                          overflow: 'auto',
                        }}
                      >
                        <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                          {result}
                        </Typography>
                      </Paper>
                    ) : (
                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          p: 4,
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              fontSize: 48,
                              mb: 2,
                              opacity: 0.3,
                            }}
                          >
                            {activeTab === 'summarizer' ? '📄' : '🏷️'}
                          </Box>
                          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                            {activeTab === 'summarizer'
                              ? 'Summary will appear here'
                              : 'Predicted category: Civil Case'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Upload a document or paste text to see the {activeTab === 'summarizer' ? 'summary' : 'classification'} result
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ToolPage;