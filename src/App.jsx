import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, createTheme } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Hompage';
import ToolPage from './pages/ToolPage';
import AnalyticsPage from './pages/AnalyticsPage';



function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
          
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Homepage onNavigate={handleNavigate} />} />
              <Route path="/tool" element={<ToolPage onNavigate={handleNavigate} />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </Box>
          
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;