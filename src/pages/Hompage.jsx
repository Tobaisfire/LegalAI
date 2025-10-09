import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  Avatar,
  Chip,
  Paper,
  Stack,
} from '@mui/material';
import {
  ArrowDownward as ArrowDownIcon,
  Description as DocumentIcon,
  Gavel as GavelIcon,
  Psychology as PsychologyIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  CloudUpload as CloudIcon,
  CheckCircle as CheckIcon,
  Star as StarIcon,
  AutoAwesome as ProcessIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Homepage = ({ onNavigate }) => {
  const theme = useTheme();
  const { scrollY } = useScroll();
  const [counters, setCounters] = useState({ documents: 0, hours: 0, accuracy: 0, users: 0 });
  const navigate = useNavigate();
  
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const arrowY = useTransform(scrollY, [0, 100], [0, 20]);

  // Counter animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        documents: Math.min(prev.documents + 1234, 50000),
        hours: Math.min(prev.hours + 23, 1000),
        accuracy: Math.min(prev.accuracy + 1, 99),
        users: Math.min(prev.users + 17, 5000),
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: <DocumentIcon sx={{ fontSize: 48 }} />,
      title: '📄 Smart Document Summarization',
      description: 'Transform complex legal documents into concise, easy-to-understand summaries with advanced AI technology.',
      benefits: ['Save hours of reading time', 'Extract key insights instantly', 'Maintain legal accuracy'],
      color: '#6a11cb',
    },
    {
      icon: <GavelIcon sx={{ fontSize: 48 }} />,
      title: '⚖️ Intelligent Classification',
      description: 'Automatically categorize legal judgments and case files for better organization and quick reference.',
      benefits: ['99% accuracy rate', 'Multiple legal categories', 'Custom classification rules'],
      color: '#2575fc',
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 48 }} />,
      title: '🧠 Advanced NLP Processing',
      description: 'Leverage cutting-edge natural language processing for accurate legal document analysis.',
      benefits: ['State-of-the-art models', 'Continuous learning', 'Domain-specific training'],
      color: '#ff9966',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 48 }} />,
      title: '⚡ Lightning Fast Processing',
      description: 'Process hundreds of pages in seconds with our optimized AI infrastructure.',
      benefits: ['Sub-second response', 'Batch processing', 'Real-time analysis'],
      color: '#ff5e62',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48 }} />,
      title: '🔒 Enterprise Security',
      description: 'Bank-level encryption and security protocols to protect your sensitive legal documents.',
      benefits: ['256-bit encryption', 'GDPR compliant', 'Secure data centers'],
      color: '#6a11cb',
    },
    {
      icon: <CloudIcon sx={{ fontSize: 48 }} />,
      title: '☁️ Cloud Integration',
      description: 'Seamlessly integrate with your existing cloud storage and document management systems.',
      benefits: ['Multi-cloud support', 'API access', 'Automated workflows'],
      color: '#2575fc',
    },
  ];

  // const testimonials = [
  //   {
  //     name: 'Sarah Johnson',
  //     role: 'Senior Partner at Johnson & Associates',
  //     content: 'AI Legal Insight has transformed our practice. We now process cases 10x faster and never miss important details.',
  //     avatar: 'SJ',
  //     rating: 5,
  //   },
  //   {
  //     name: 'Michael Chen',
  //     role: 'Legal Tech Director at Global Corp',
  //     content: 'The accuracy and speed are remarkable. Our team can now focus on strategy instead of document review.',
  //     avatar: 'MC',
  //     rating: 5,
  //   },
  //   {
  //     name: 'Emily Rodriguez',
  //     role: 'Independent Legal Consultant',
  //     content: 'As a solo practitioner, this tool gives me the competitive edge of a large firm. Absolutely essential.',
  //     avatar: 'ER',
  //     rating: 5,
  //   },
  // ];


  

  const howItWorks = [
    {
      step: 1,
      title: 'Upload Your Document',
      description: 'Simply drag and drop your legal document or paste text directly into our secure interface.',
      icon: <CloudIcon />,
    },
    {
      step: 2,
      title: 'AI Processing',
      description: 'Our advanced AI analyzes the document, identifying key legal concepts, precedents, and important rulings.',
      icon: <ProcessIcon />,
    },
    {
      step: 3,
      title: 'Get Instant Results',
      description: 'Receive comprehensive summaries and accurate classifications in seconds, not hours.',
      icon: <AnalyticsIcon />,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Enhanced Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Enhanced Animated Background Elements */}
        <motion.div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            top: '5%',
            left: '5%',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.06)',
            bottom: '10%',
            right: '10%',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <Container maxWidth="lg">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', color: 'white', py: 8 }}>
              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
                  <Chip 
                    label="✨ Trusted by 5000+ Legal Professionals" 
                    sx={{ 
                      background: 'rgba(255, 255, 255, 0.2)', 
                      color: 'white',
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)',
                    }} 
                  />
                  <Chip 
                    label="🏆 #1 Legal AI Platform" 
                    sx={{ 
                      background: 'rgba(255, 255, 255, 0.2)', 
                      color: 'white',
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)',
                    }} 
                  />
                </Stack>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                    fontWeight: 700,
                    mb: 3,
                    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    lineHeight: 1.1,
                  }}
                >
                  Transform Legal Document
                  <br />
                  Analysis with AI
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '1.2rem', md: '1.5rem', lg: '1.7rem' },
                    mb: 4,
                    opacity: 0.95,
                    maxWidth: '900px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  Save 100+ hours per month. Achieve 99% accuracy. 
                  <br />
                  The AI-powered platform that 5,000+ legal professionals trust for document analysis.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mb: 6 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      onNavigate('tool');
                      navigate('/tool');
                    }}
                    sx={{
                      fontSize: '1.2rem',
                      padding: '18px 40px',
                      background: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)',
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: 50,
                      textTransform: 'none',
                      boxShadow: '0 8px 30px rgba(255, 99, 71, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #e67a33 0%, #e74e52 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(255, 99, 71, 0.4)',
                      },
                    }}
                  >
                    🚀 Start Free Trial
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => scrollToSection('demo')}
                    sx={{
                      fontSize: '1.2rem',
                      padding: '18px 40px',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: 50,
                      textTransform: 'none',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    📺 Watch Demo
                  </Button>
                </Stack>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                  ⭐⭐⭐⭐⭐ 4.9/5 from 2,000+ reviews
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ color: '#FFD700', fontSize: 20 }} />
                  ))}
                </Stack>
              </motion.div>
            </Box>
          </motion.div>
        </Container>

        {/* Enhanced Scroll Arrow */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            y: arrowY,
            cursor: 'pointer',
          }}
          onClick={() => scrollToSection('stats')}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDownIcon
            sx={{
              fontSize: 40,
              color: 'white',
              opacity: 0.8,
            }}
          />
        </motion.div>
      </Box>

      {/* Statistics Section */}
      <Box id="stats" sx={{ py: { xs: 6, md: 10 }, background: 'linear-gradient(135deg, #f8f9ff 0%, #fff 100%)' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {counters.documents.toLocaleString()}+
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                    Documents Processed
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {counters.hours}K+
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                    Hours Saved
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {counters.accuracy}%
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                    Accuracy Rate
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {counters.users.toLocaleString()}+
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                    Happy Users
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Enhanced Features Section */}
      <Box id="features" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Powerful Features for Modern Legal Teams
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: '700px', mx: 'auto', lineHeight: 1.6 }}
              >
                Our comprehensive suite of AI-powered tools is designed to streamline every aspect of legal document analysis, 
                from initial review to final classification.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      p: 3,
                      textAlign: 'left',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Box
                        sx={{
                          mb: 3,
                          color: feature.color,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{ fontWeight: 600, mb: 2, lineHeight: 1.3 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6, mb: 3 }}
                      >
                        {feature.description}
                      </Typography>
                      <Box sx={{ mt: 'auto' }}>
                        {feature.benefits.map((benefit, idx) => (
                          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <CheckIcon sx={{ color: feature.color, fontSize: 16, mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              {benefit}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      {/* <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Trusted by Legal Professionals Worldwide
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card sx={{ height: '100%', p: 3 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', mb: 2 }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon key={i} sx={{ color: '#FFD700', fontSize: 20 }} />
                        ))}
                      </Box>
                      <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, fontStyle: 'italic' }}>
                        "{testimonial.content}"
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box> */}

      {/* How It Works Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: 'linear-gradient(135deg, #f8f9ff 0%, #fff 100%)' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                How AI Legal Insight Works
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: '600px', mx: 'auto' }}
              >
                Get AI-powered insights in three simple steps
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4} alignItems="center">
            {howItWorks.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        color: 'white',
                        fontSize: 32,
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                      Step {step.step}: {step.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {step.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" fontWeight={700} sx={{ mb: 3 }}>
              Ready to Transform Your Legal Document Analysis?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
              Join thousands of legal professionals who are saving time and improving accuracy with AI Legal Insight.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  onNavigate('tool');
                  navigate('/tool');
                }}
                sx={{
                  fontSize: '1.2rem',
                  padding: '18px 40px',
                  background: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: 50,
                  textTransform: 'none',
                  boxShadow: '0 8px 30px rgba(255, 99, 71, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #e67a33 0%, #e74e52 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(255, 99, 71, 0.4)',
                  },
                }}
              >
                🚀 Start Your Free Trial
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Homepage;