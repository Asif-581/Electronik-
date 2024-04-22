
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const heroImages = [
    "Assests/b1.jpg",
    "Assests/b4.jpg",
    "Assests/b3.jpg",
    "Assests/b2.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${heroImages[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: isSmallScreen ? "60vh" : "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        transition: "background-image 0.5s ease-in-out",
        marginTop:'20px'
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: theme.spacing(4),
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.common.white,
          textAlign: "center",
          maxWidth: isSmallScreen ? "90%" : "50%",
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Unleash Your Tech Potential
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Discover the latest electronics and cutting-edge technology at our
          e-commerce store.
        </Typography>
        <Link to='/products'>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            href="/shop"
          >
            Shop Now
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Hero;
