import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthData } from "../../types/auth";

interface AuthState {
  user: AuthData["user"] | null;
  accessToken: string | null;
}

const storedAuth = localStorage.getItem("auth");

const initialState: AuthState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      user: null,
      accessToken: null,
    };

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials(state, action: PayloadAction<AuthData>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: state.user,
          accessToken: state.accessToken,
        }),
      );
    },

    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: state.user,
          accessToken: state.accessToken,
        }),
      );
    },

    logout(state) {
      state.user = null;
      state.accessToken = null;

      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials,setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;
