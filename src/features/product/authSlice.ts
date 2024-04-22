// authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./../../Store/store";
import api from "../../../AxiosInterceptor";
import { toast } from "react-toastify";
export const fetchUserDetails = createAsyncThunk<User, void>(
  "auth/fetchUserDetails",
  async () => {
    try {
      
      const response = await api.get("/api/user_details");
      const user: User = {
        user_id: response.data.data.id,
        name: response.data.data.name,
        email: response.data.data.email,
        role: response.data.data.role,
      };
      return user;
    } catch (error) {
      throw error;
    }
  }
);

type User = {
  user_id?: string | undefined;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "IDLE";
      })
      .addCase(fetchUserDetails.rejected, (state) => {
        state.status = "ERROR";
      });
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export const signInAsync =
  ({ email, password }: { email: string; password: string }): AppThunk =>
  async (dispatch) => {
    try {
      const response = await api.post("/api/signin", {
        email,
        password,
      });

       const token = response.data.data.token;
       sessionStorage.setItem("token", token);
      dispatch(fetchUserDetails());
      return response.data as any;
    } catch (error: any) {
      console.error(error.message);
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
      const { data } = await api.post(`/api/signup`, {
        name,
        email,
        password,
      });

      if (data.success && data.token) {
        sessionStorage.setItem("token", data.token);
      }

      if (data.error) {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

export const signOutAsync = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get(`/api/logout`);
        sessionStorage.removeItem("token");
    return response.data as any;
  } catch (error: any) {
    console.error(error.message);
  }
};

export default authSlice.reducer;
