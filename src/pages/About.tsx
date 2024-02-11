import React from "react";
import Navigation from "../components/Navigation";
import { Box, Typography } from "@mui/material";
import aboutImg from "./../assets/hero-bcg.jpeg";
import { useAppSelector } from "../Store/hooks";
const About = () => {
    const { darkMode } = useAppSelector((store) => store.theme);
  return (
    <>
      <Navigation title="about" />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          bgcolor: `${darkMode ? "#040D12" : "white"} `,
          color: `${darkMode ? "white" : "black"}`,
        }}
      >
        <Box
          sx={{
            marginX: { xs: "20px", sm: "100px", md: "175px" },
            marginY: "80px",
            display: { xs: "column", sm: "flex" },
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            width: { xs: "350px", sm: "100%", md: "100%" },
            gap: "4rem",
          }}
        >
          <Box sx={{ width: { xs: "350px", sm: "520px" } }}>
            <img src={aboutImg} alt="aboutImage" width="100%" height="500px" />
          </Box>

          <Box sx={{ width: { xs: "350px", sm: "620px" }, marginY : "40px" }}>
            <Typography variant="h3" fontWeight="bold">
              Our Story
            </Typography>
            <Typography component="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              facere earum deleniti atque perspiciatis fugiat, cumque alias
              minima assumenda, quibusdam provident quidem. Assumenda natus
              magnam fugit vitae saepe iure doloribus itaque consequuntur
              accusantium, laboriosam provident temporibus. Excepturi autem unde
              inventore debitis, magnam repellat tempore laudantium molestias
              quaerat corrupti veniam placeat, similique, distinctio repellendus
              nihil quidem laboriosam asperiores. Sit molestiae sed ipsum iusto
              fugiat, aperiam fugit optio consectetur assumenda aliquid vitae,
              illum perspiciatis nobis hic officia distinctio numquam adipisci
              necessitatibus.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default About;
