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
  AutoAwesome as ProcessIcon,
  Download as DownloadIcon,
  PictureAsPdf as PdfIcon,
  Analytics as AnalyticsIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';
import FileUploader from '../components/FileUploader';

const ToolPage = ({ onNavigate }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pastedText, setPastedText] = useState('');
  const [summaryTotals, setSummaryTotals] = useState(null);

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
  
    try {
      const formData = new FormData();
      
      if (uploadedFile) {
        formData.append('file', uploadedFile);
      }
      
      if (pastedText.trim()) {
        formData.append('text', pastedText.trim());
      }
  
      // Get API URL from environment variable or default to localhost
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/summarize`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to process document');
      }
  
      const data = await response.json();
      console.log('API Response:', data);
      setResult(data.content);
      const totals = data.summary_totals || null;
      setSummaryTotals(totals);
      console.log('Summary totals set:', totals);
    } catch (err) {
      setError(err.message || 'An error occurred while processing your request');
      console.error('Processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };


  const resetForm = () => {
    setUploadedFile(null);
    setPastedText('');
    setResult('');
    setError('');
    setSummaryTotals(null);
  };

  const handleViewAnalytics = () => {
    console.log('View Analytics clicked', { summaryTotals, result });
    if (summaryTotals) {
      // Store summary totals in localStorage so it persists in new tab
      localStorage.setItem('summaryTotals', JSON.stringify(summaryTotals));
      // Open analytics in a new tab
      const analyticsUrl = window.location.origin + '/analytics';
      window.open(analyticsUrl, '_blank');
    } else {
      // If summaryTotals is not available, show an alert or try to navigate anyway
      // This can happen if the API didn't return summary_totals
      alert('Analytics data is not available. Please regenerate the summary.');
      console.error('summaryTotals is null or undefined');
    }
  };

  const handleDownloadText = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `legal-summary-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    
    // Convert markdown to plain text for PDF
    let plainText = result
      // Remove markdown headers
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold markers
      .replace(/\*\*(.+?)\*\*/g, '$1')
      // Remove italic markers
      .replace(/\*(.+?)\*/g, '$1')
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      // Remove inline code
      .replace(/`(.+?)`/g, '$1')
      // Remove links
      .replace(/\[(.+?)\]\(.+?\)/g, '$1');
    
    // Split text into lines that fit the page width
    const lines = doc.splitTextToSize(plainText, maxWidth);
    let y = margin;
    const lineHeight = 7;
    const fontSize = 11;
    
    doc.setFontSize(fontSize);
    
    lines.forEach((line) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });
    
    doc.save(`legal-summary-${new Date().getTime()}.pdf`);
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
              Legal Document Summarizer
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Upload your legal documents or paste text to generate AI-powered summaries
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
            {/* Input Section - 30% */}
            <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 30%' }, maxWidth: { xs: '100%', lg: '30%' } }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <SummarizeIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                      <Typography variant="h5" fontWeight={600}>
                        Document Summarizer
                      </Typography>
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                      Upload a legal document or paste text to generate a concise summary highlighting the key points and important rulings.
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

                    <Box sx={{ mt: 4, display: 'flex', gap: 2, flexDirection: 'column' }}>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleSummarize}
                        disabled={isProcessing || (!uploadedFile && !pastedText.trim())}
                        startIcon={isProcessing ? <CircularProgress size={20} /> : <ProcessIcon />}
                        fullWidth
                        sx={{
                          background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)',
                          },
                        }}
                      >
                        {isProcessing ? 'Processing...' : 'Summarize Now'}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={resetForm}
                        disabled={isProcessing}
                        fullWidth
                      >
                        Clear
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>

            {/* Output Section - 70% */}
            <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 70%' }, maxWidth: { xs: '100%', lg: '70%' } }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card sx={{ height: '100%', minHeight: 400 }}>
                  <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                      <Typography variant="h5" fontWeight={600}>
                        Summary
                      </Typography>
                      {result && (
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<AnalyticsIcon />}
                            endIcon={summaryTotals ? <OpenInNewIcon sx={{ fontSize: 16 }} /> : null}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleViewAnalytics();
                            }}
                            disabled={!summaryTotals}
                            title={summaryTotals ? 'Opens analytics in a new tab' : 'Analytics data not available'}
                            sx={{ 
                              textTransform: 'none',
                              background: summaryTotals 
                                ? 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)'
                                : 'grey.400',
                              '&:hover': {
                                background: summaryTotals
                                  ? 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)'
                                  : 'grey.400',
                              },
                              '&.Mui-disabled': {
                                background: 'grey.400',
                                color: 'white',
                              },
                            }}
                          >
                            View Analytics
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={handleDownloadText}
                            sx={{ textTransform: 'none' }}
                          >
                            Download
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<PdfIcon />}
                            onClick={handleDownloadPDF}
                            sx={{ textTransform: 'none' }}
                          >
                            PDF
                          </Button>
                        </Box>
                      )}
                    </Box>

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
                          Generating summary...
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
                          overflow: 'auto',
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: '0.875rem',
                            lineHeight: 1.7,
                            '& h1, & h2, & h3, & h4, & h5, & h6': {
                              marginTop: 1.5,
                              marginBottom: 1,
                              fontWeight: 600,
                              color: 'primary.main',
                            },
                            '& h1': { fontSize: '1.5rem' },
                            '& h2': { fontSize: '1.3rem' },
                            '& h3': { fontSize: '1.1rem' },
                            '& p': {
                              marginBottom: 1,
                              fontSize: '0.875rem',
                            },
                            '& ul, & ol': {
                              marginLeft: 2,
                              marginBottom: 1,
                            },
                            '& li': {
                              marginBottom: 0.5,
                              fontSize: '0.875rem',
                            },
                            '& strong': {
                              fontWeight: 600,
                            },
                            '& code': {
                              backgroundColor: 'rgba(106, 17, 203, 0.1)',
                              padding: '2px 4px',
                              borderRadius: '3px',
                              fontSize: '0.8rem',
                            },
                          }}
                        >
                          <ReactMarkdown>{result}</ReactMarkdown>
                        </Box>
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
                            📄
                          </Box>
                          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                            Summary will appear here
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Upload a document or paste text to see the summary result
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ToolPage;