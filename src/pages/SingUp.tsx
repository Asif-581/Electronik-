import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Divider, Typography } from "@material-ui/core";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { supabase } from '../Config/supabase'
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { signUpAsync } from "../features/product/authSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Enter your name"),
  email: Yup.string().email("Invalid email").required("Enter your email"),
  password: Yup.string()
    .required("please enter your password")
    .min(6, "Password must be at least 6 characters"),
});

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((store) => store.theme);
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = (values: any) => {
    // Handle form submission logic here
    const { email, password,name } = values
    // userSingup(email, password);
    dispatch(signUpAsync({ email, password ,name}));
    navigate('/login');
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: `${darkMode ? "black" : "lightgray"}`,
        color: `${darkMode ? "white" : "black"}`,
      }}
    >
      <div style={{ width: "200px" }}>
        <img src={logo} alt="logo" width="100%" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "400px",
          padding: "20px",
          backgroundColor: "white",
         
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", 
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                type="text"
                id="name"
                name="name"
                label="Name"
                placeholder="Enter your name"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <ErrorMessage name="name" component="div" />

              <Field
                as={TextField}
                type="email"
                id="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <ErrorMessage name="email" component="div" />

              <Field
                as={TextField}
                type="password"
                id="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <ErrorMessage name="password" component="div" />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                style={{ width: "100%", marginTop: "20px" }}
                disableRipple
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="body1">
          Existing user ?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default SignUp;
