// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./../../Store/store";
import { supabase } from "../../Config/supabase"; // Initialize your Supabase client
import { useNavigate } from "react-router-dom";
import { Session, User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null; // Update with your user type from Supabase
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: localStorage.getItem("authenticated") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: User | null;
        session: Session | null;
      }>
    ) => {
      const { user } = action.payload;
      console.log(user);
      state.user = JSON.parse(localStorage.getItem("user")!) as User;
      state.isAuthenticated = !!user;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const signInAsync =
  ({ email, password }: { email: string; password: string }): AppThunk =>
  async (dispatch) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error);
        throw new Error(error.message);
      } else {
        dispatch(setUser(data));
        // Store session token in localStorage
        localStorage.setItem("session_token", data.session.access_token);
        localStorage.setItem("userName", data.user.user_metadata.first_name);
        localStorage.setItem("authenticated", data.user ? "true" : "false");
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (error: any) {
      console.error(error.message); // Log the error message
      throw error;
    }
  };

export const signUpAsync =
  ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): AppThunk =>
  async (dispatch) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: name,
          },
        },
      });

    } catch (error: any) {
      console.error(error.message);
    }
  };

export const signOutAsync = (): AppThunk => async (dispatch) => {
  try {
    await supabase.auth.signOut();
    dispatch(clearUser());
    localStorage.removeItem("session_token");
  } catch (error: any) {
    console.error(error.message);
  }
};

export default authSlice.reducer;
