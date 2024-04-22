import React from "react";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";
// @ts-ignore
import Electronik from "../assets/Electronik.png";
const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "lightgray", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <img
                src={Electronik}
                alt="Logo"
                style={{
                  height: "40px",
                  marginRight: "10px",
                  mixBlendMode: "multiply",
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Join our community of tech enthusiasts and stay up-to-date with
              the latest gadgets and deals.
            </Typography>
            <Box>
              <IconButton aria-label="Facebook" color="primary" href="#">
                <Facebook />
              </IconButton>
              <IconButton aria-label="Twitter" color="primary" href="#">
                <Twitter />
              </IconButton>
              <IconButton aria-label="Instagram" color="primary" href="#">
                <Instagram />
              </IconButton>
              <IconButton aria-label="YouTube" color="primary" href="#">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Quick Links
            </Typography>
            <Box component="nav" aria-label="Quick Links">
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <a
                  href="#"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </a>
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <a
                  href="#"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Shop
                </a>
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <a
                  href="#"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  About
                </a>
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <a
                  href="#"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Contact
                </a>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              123 Main Street
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Anytown, USA 12345
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        <Box mt={4} borderTop={1} borderColor="divider" pt={2}>
          <Typography variant="body2" color="text.secondary" align="center">
            &copy; {new Date().getFullYear()} ElectronicsStore. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
