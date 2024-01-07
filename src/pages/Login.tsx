import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./../Store/hooks";
import { signInAsync } from "../features/product/authSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be at least 6 characters"),
});

const Login: React.FC = () => {
  const { isAuthenticated } = useAppSelector((store) => store.auth);
  const [authError, setAuthError] = useState<string>("");
  const { darkMode } = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    }
  }, [isAuthenticated]);

  const onSubmit = async (values: any) => {
    const { email, password } = values;
    try {
      await dispatch(signInAsync({ email, password }));
    } catch (error) {
      console.log(error.message);
      setAuthError(error.message);
    }
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
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
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
              {authError && <div style={{ color: "red" }}>{authError}</div>}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isAuthenticated}
                disableRipple
                style={{
                  position: "relative",
                  marginTop: "30px",
                  width: "100%",
                }}
              >
                {isAuthenticated ? (
                  <CircularProgress size={24} color="primary" />
                ) : (
                  "Login"
                )}
              </Button>
            </Form>
          )}
        </Formik>
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="body1">
          New to ComfySloth ?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Create an Account
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
