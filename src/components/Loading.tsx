import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "../Store/hooks";

const Loading = () => {

  return (
    <Box
      component="div" // Provide the component prop with the appropriate value ("div" in this case)
      sx={{
        color: "grey.500",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginY: "50px",
        
      }}
    >
      <CircularProgress color="success" size="10rem" thickness={2} />
    </Box>
  );
};

export default Loading;
