import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../Services/authServices";
import {
  SESSION_IS_AUTHENTICATED,
  SESSION_STATUS,
  SESSION_USERINFO,
} from "../../Utills/Constants";

const initialState = {
  loading: false,
  error: false,

  isAuthenticated: sessionStorage.getItem(SESSION_IS_AUTHENTICATED)
    ? sessionStorage.getItem(SESSION_IS_AUTHENTICATED)
    : false,
  status: sessionStorage.getItem(SESSION_STATUS)
    ? sessionStorage.getItem(SESSION_STATUS)
    : null,
  data: sessionStorage.getItem(SESSION_USERINFO)
    ? sessionStorage.getItem(SESSION_USERINFO)
    : null,
};

export const UserLogin = createAsyncThunk("UserLogin", async (data) => {
  try {
    return authService.userLogin(data);
  } catch (error) {
    throw error;
  }
});

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      sessionStorage.setItem(SESSION_IS_AUTHENTICATED, false);
      state.data = null;
      sessionStorage.setItem(SESSION_USERINFO, null);
      state.status = "ERROR";
      sessionStorage.setItem(SESSION_STATUS, "ERROR");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(UserLogin.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(UserLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action?.payload;
      if (action?.payload?.result) {
        sessionStorage.setItem(SESSION_IS_AUTHENTICATED, true);
        sessionStorage.setItem(SESSION_STATUS, "OK");
        sessionStorage.setItem(SESSION_USERINFO, action.payload);
        state.isAuthenticated = true;
        state.status = "OK";
      } else {
        sessionStorage.setItem(SESSION_STATUS, "ERROR");
        sessionStorage.setItem(SESSION_IS_AUTHENTICATED, false);
        sessionStorage.setItem(SESSION_USERINFO, null);
        state.isAuthenticated = false;
        state.data = null;
        state.status = "ERROR";
      }

      console.log("fetched successfuly", action);
    });

    builder.addCase(UserLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.log("error ", action);
      sessionStorage.setItem(SESSION_STATUS, "ERROR");
      state.status = "ERROR";
    });
  },
});
export const { logout } = auth.actions;
export default auth.reducer;
