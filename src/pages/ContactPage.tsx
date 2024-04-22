import React from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

const ContactPage = () => {
  return (
    <Box sx={{ padding: "50px" }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        marginBottom="40px"
      >
        Contact Us
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ width: "100%" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3745.024444705424!2d85.63866397536482!3d20.17470768126945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19ac87284f2c89%3A0x538bfd4ca5585292!2sHi-Tech%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1712890791884!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: "0" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location"
            ></iframe>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" fontWeight="bold" marginBottom="20px">
              Get in Touch
            </Typography>
            <form>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
              />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ marginTop: "20px" }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactPage;
