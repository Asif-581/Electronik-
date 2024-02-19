import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "./../Store/hooks";
import heroImage from './../assets/hero-bcg.jpeg'

const Hero = () => {
  const { darkMode } = useAppSelector((store) => store.theme);
  
 
  return (
    <Box
      sx={{
        paddingY: { xs: "50px", sm: "50px" },
        paddingX: { xs: "20px", sm: "100px", lg: "100px" },
        bgcolor: `${darkMode ? "#040D12" : "white"}`,
        color: `${darkMode ? "white" : "black"}`,
      }}
      display="flex"
      justifyContent="space-evenly"
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "50%" },
          gap: { xs: "30px", sm: "50px" },
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", fontSize: { xs: "40px", sm: "50px" } }}
        >
          Design your
          <br /> Comfort Zone
        </Typography>
        <Typography fontSize="1.25rem">
          Welcome to our online furniture store! We offer a wide range of
          high-quality furniture pieces that are designed to elevate your living
          space. Our collection includes everything from sofas, chairs, and
          tables to beds, dressers, and cabinets.
        </Typography>
        <Box>
          <Link to='/products'>
          <Button variant="contained" color="success" size="large">
            Shop Now
          </Button>
          </Link>
          
        </Box>
      </Box>

      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <img
          src={heroImage}
          alt="img"
          height="550px"
          width="100%"
          style={{ borderRadius: "5px" }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
