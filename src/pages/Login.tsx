import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./../Store/hooks";
import { fetchUserDetails, signInAsync } from "../features/product/authSlice";
import { toast } from "react-toastify";
// @ts-ignore
import Electronik from "../assets/Electronik.png";
type SignInResponse = {
  message: string;
  data: string;
  success: boolean;
  error: boolean;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be at least 6 characters"),
});

const Login: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((store) => store.auth);
  const [authError, setAuthError] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const {fetchUserDetails} = useContext(Context)
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: any) => {
    const { email, password } = values;
    const data: any = await dispatch(signInAsync({ email, password }));
    if (data.success) {
      toast.success(data.message);

          if (data.token) {
            sessionStorage.setItem("token", data.token); // Store token in sessionStorage
            dispatch(fetchUserDetails());
          }


      navigate("/");
     
      
    }

    if (data.error) {
      toast.error(data.message);
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
      }}
    >
      <div style={{ width: "200px", marginBottom: "20px" }}>
        <img
          src={Electronik}
          alt="logo"
          width="100%"
          style={{
            mixBlendMode: "multiply",
          }}
        />
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
                disableRipple
                style={{
                  position: "relative",
                  marginTop: "30px",
                  width: "100%",
                }}
              >
                Login
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
