import React from 'react';
import {
  Box,
  Typography,
  Container,
  Link,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 2,
              }}
            >
              AI Legal Insight
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Empowering legal professionals with AI-powered document analysis
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} AI Legal Insight. All rights reserved.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Terms of Service
              </Link>
              <Link
                href="mailto:contact@ailegalinsight.com"
                color="text.secondary"
                underline="hover"
                sx={{
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Contact
              </Link>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;