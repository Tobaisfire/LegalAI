import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  useTheme,
  Button,
} from '@mui/material';
import {
  Analytics as AnalyticsIcon,
  Description as DescriptionIcon,
  TextFields as TextFieldsIcon,
  FormatSize as FormatSizeIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const AnalyticsPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Try to get summaryTotals from location.state first (for same-tab navigation)
  // Then fall back to localStorage (for new tab navigation)
  const [summaryTotals, setSummaryTotals] = React.useState(() => {
    const stateData = location.state?.summaryTotals;
    if (stateData) return stateData;
    
    // Try to get from localStorage
    try {
      const stored = localStorage.getItem('summaryTotals');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
    return null;
  });

  // If no summary totals, show a message
  if (!summaryTotals) {
    return (
      <Box sx={{ minHeight: '100vh', py: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="md">
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No analytics data available
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Please generate a summary first to view analytics.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/tool')}
              sx={{
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)',
                },
              }}
            >
              Go to Tool Page
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  // Prepare data for charts
  const barChartData = [
    {
      name: 'Words',
      value: summaryTotals.total_words,
    },
    {
      name: 'Sentences',
      value: Math.round(summaryTotals.total_sentences),
    },
    {
      name: 'Pages',
      value: Math.round(summaryTotals.summary_pages * 10) / 10, // Round to 1 decimal
    },
    {
      name: 'Characters (K)',
      value: Math.round(summaryTotals.chars_with_spaces / 1000 * 10) / 10, // Round to 1 decimal
    },
  ];

  const pieChartData = [
    { name: 'Words', value: summaryTotals.total_words },
    { name: 'Sentences', value: Math.round(summaryTotals.total_sentences) },
    { name: 'Pages', value: Math.round(summaryTotals.summary_pages * 10) },
  ];

  const statsData = [
    {
      name: 'Summary Pages',
      value: summaryTotals.summary_pages.toFixed(2),
      unit: 'pages',
      icon: <DescriptionIcon sx={{ fontSize: 48 }} />,
      color: '#6a11cb',
      description: 'Estimated pages',
    },
    {
      name: 'Total Words',
      value: summaryTotals.total_words.toLocaleString(),
      unit: 'words',
      icon: <TextFieldsIcon sx={{ fontSize: 48 }} />,
      color: '#2575fc',
      description: 'Word count',
    },
    {
      name: 'Total Sentences',
      value: Math.round(summaryTotals.total_sentences).toLocaleString(),
      unit: 'sentences',
      icon: <FormatSizeIcon sx={{ fontSize: 48 }} />,
      color: '#11cb6a',
      description: 'Sentence count',
    },
    {
      name: 'Characters',
      value: summaryTotals.chars_with_spaces.toLocaleString(),
      unit: 'chars',
      icon: <AssessmentIcon sx={{ fontSize: 48 }} />,
      color: '#fc5725',
      description: 'With spaces',
    },
  ];

  const COLORS = ['#6a11cb', '#2575fc', '#11cb6a', '#fc5725', '#cb6a11'];

  // Line chart data showing relationship between different metrics
  const lineChartData = [
    { metric: 'Pages', value: summaryTotals.summary_pages, normalized: summaryTotals.summary_pages * 100 },
    { metric: 'Words', value: summaryTotals.total_words, normalized: summaryTotals.total_words / 10 },
    { metric: 'Sentences', value: Math.round(summaryTotals.total_sentences), normalized: Math.round(summaryTotals.total_sentences) },
    { metric: 'Chars (K)', value: summaryTotals.chars_with_spaces / 1000, normalized: summaryTotals.chars_with_spaces / 1000 },
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 6, background: 'linear-gradient(135deg, #f8f9ff 0%, #fff 100%)' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
              <AnalyticsIcon sx={{ fontSize: 48, color: 'primary.main' }} />
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Summary Analytics
              </Typography>
            </Box>
            <Typography variant="h6" color="text.secondary">
              Detailed statistics and visualizations of your document summary
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 5 }}>
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                      border: `2px solid ${stat.color}40`,
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      boxShadow: `0 4px 20px ${stat.color}20`,
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 8px 30px ${stat.color}30`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box sx={{ color: stat.color, mb: 2, display: 'flex', justifyContent: 'center' }}>
                        {stat.icon}
                      </Box>
                      <Typography 
                        variant="h3" 
                        fontWeight={700} 
                        sx={{ 
                          mb: 0.5, 
                          color: stat.color,
                          fontSize: { xs: '2rem', sm: '2.5rem' }
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.75rem' }}>
                        {stat.unit}
                      </Typography>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5, color: 'text.primary' }}>
                        {stat.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        {stat.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Charts */}
          <Grid container spacing={4}>
            {/* Bar Chart */}
            <Grid item xs={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: 'text.primary' }}>
                      Summary Statistics Overview
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                      Breakdown of key metrics from your document summary
                    </Typography>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fill: '#666', fontSize: 12 }}
                          axisLine={{ stroke: '#ccc' }}
                        />
                        <YAxis 
                          tick={{ fill: '#666', fontSize: 12 }}
                          axisLine={{ stroke: '#ccc' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                          }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {barChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Pie Chart */}
            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: 'text.primary' }}>
                      Content Distribution
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                      Proportional breakdown
                    </Typography>
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(1)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Line Chart */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: 'text.primary' }}>
                      Metrics Comparison
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                      Visual comparison of all summary metrics (normalized scale)
                    </Typography>
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis 
                          dataKey="metric" 
                          tick={{ fill: '#666', fontSize: 12 }}
                          axisLine={{ stroke: '#ccc' }}
                        />
                        <YAxis 
                          tick={{ fill: '#666', fontSize: 12 }}
                          axisLine={{ stroke: '#ccc' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="normalized"
                          stroke="#6a11cb"
                          strokeWidth={4}
                          dot={{ fill: '#6a11cb', r: 8, strokeWidth: 2, stroke: '#fff' }}
                          activeDot={{ r: 10 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
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

export default AnalyticsPage;

