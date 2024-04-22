import React from "react";
import { Box, Typography, Avatar, Stack } from "@mui/material";

const teamMembers = [
  {
    id: 1,
    image: "./../../src/assets/frontend.jpg", // Replace with the actual image URL
    name: "Suraj Kumar Dalei",
    position: "Frontend Developer",
    phone: "Phone: +919348533954",
    email: "Email: surajdalei258@gmail.com",
  },
  {
    id: 2,
    image: "./../../src/assets/backend.jpg", // Replace with the actual image URL
    name: "Asif Saba",
    position: "Full-stack Developer",
    phone: "Phone: +917461989850",
    email: "Email: asifsaba7461@gmail.com",
  },
  {
    id: 3,
    image: "./../../src/assets/marketing.jpg", // Replace with the actual image URL
    name: "Tarun Nayak",
    position: "Marketing Manager",
    phone: "Phone: +916370926857",
    email: "Email: tarunnayak5454@gmail.com",
  },
];

const Team = () => {
  return (
    <Box sx={{ padding: "50px" }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        marginBottom="10px"
      >
        Meet our Team
      </Typography>
      <Box
        marginX="auto"
        marginBottom="40px"
        bgcolor="#e53935"
        height="0.25rem"
        width="6rem"
        borderRadius="10px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {teamMembers.map((member) => (
          <Stack key={member.id} alignItems="center" spacing={1}>
            <Avatar
              alt={member.name}
              src={member.image}
              sx={{ width: 150, height: 150, borderRadius: "50%" }}
            />
            <Typography variant="h6" fontWeight="bold">
              {member.name}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontWeight: "bold",
              }}
            >
              {member.position}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {member.phone}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {member.email}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default Team;
