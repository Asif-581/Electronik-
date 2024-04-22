import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import React from "react";
import { Box } from "@mui/material";
import Categories from "../components/Categories";
import Trending from "../components/Trending";
import Team from "../components/Team";




const Home = () => {
  return (
    <>
      <Box>
        <Categories />
        <Hero />
        <FeaturedProducts />
        <Trending />
        <Team/>
      
      </Box>
    </>
  );
};

export default Home;
