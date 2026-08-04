import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthData } from "../../types/auth";

interface AuthState {
  user: AuthData["user"] | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials(
      state,
      action: PayloadAction<AuthData>
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },

    logout(state) {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;