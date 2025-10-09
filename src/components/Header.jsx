import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

function HideOnScroll({ children }) {
  const [triggered, setTriggered] = React.useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      setTriggered(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: triggered ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

const Header = ({ onNavigate, currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Update currentPage based on current route
    if (location.pathname === '/') {
      onNavigate('home');
    } else if (location.pathname === '/tool') {
      onNavigate('tool');
    }
  }, [location.pathname, onNavigate]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (page, path) => {
    onNavigate(page);
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            color: 'text.primary',
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
          }}
        >
          <Toolbar>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AI Legal Insight
              </Typography>
            </motion.div>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Button
                  color="inherit"
                  onClick={() => handleNavigation('home', '/')}
                  sx={{
                    fontWeight: currentPage === 'home' ? 700 : 500,
                    color: currentPage === 'home' ? 'primary.main' : 'text.primary',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                      opacity: currentPage === 'home' ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    },
                  }}
                >
                  Home
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  color="inherit"
                  onClick={() => handleNavigation('tool', '/tool')}
                  sx={{
                    fontWeight: currentPage === 'tool' ? 700 : 500,
                    color: currentPage === 'tool' ? 'primary.main' : 'text.primary',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                      opacity: currentPage === 'tool' ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    },
                  }}
                >
                  Tool
                </Button>
              </motion.div>
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuToggle}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              fullWidth
              color="inherit"
              onClick={() => handleNavigation('home', '/')}
              sx={{
                justifyContent: 'flex-start',
                fontWeight: currentPage === 'home' ? 700 : 500,
                color: currentPage === 'home' ? 'primary.main' : 'text.primary',
              }}
            >
              Home
            </Button>
            <Button
              fullWidth
              color="inherit"
              onClick={() => handleNavigation('tool', '/tool')}
              sx={{
                justifyContent: 'flex-start',
                fontWeight: currentPage === 'tool' ? 700 : 500,
                color: currentPage === 'tool' ? 'primary.main' : 'text.primary',
              }}
            >
              Tool
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Header;