import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
// import EmptyBoxImage from "./path/to/empty-box-image.svg"; // Replace with your actual image path

const NoDataFound = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={isMobile ? "column" : "row"}
      py={6}
    >
      <Box mr={isMobile ? 0 : 4}>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-L-O7yzMAqClYyHTIZYIVCmjuXnFoS8tN4RocvTKLw&s'
          alt="No Data Found"
          style={{
            maxWidth: isMobile ? "200px" : "300px",
            width: "100%",
            height: "auto",
          }}
        />
      </Box>
      <Box textAlign={isMobile ? "center" : "left"}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          gutterBottom
          sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
        >
          No Data Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)" }}
        >
          It looks like there's no data to display at the moment. Please check
          back later or try a different search.
        </Typography>
      </Box>
    </Box>
  );
};

export default NoDataFound;
