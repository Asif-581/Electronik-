import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import React from "react";
import { Box } from "@mui/material";


const Home = () => {
  return (
    <>
      <Box>
        <Hero />
        <FeaturedProducts />
      </Box>
    </>
  );
};

export default Home;
