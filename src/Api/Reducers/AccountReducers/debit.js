import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import debitService from "../../Services/AccountServices/paymentDebitService";
 
const initialState = {
  loading: false,
  error: false,
  data: [],
  getById: [],
  noData: false,
};

export const fetchAllDebit = createAsyncThunk("fetchAllDebit", async () => {
  try {
    return debitService.getAllDebit();
  } catch (error) {
    throw error;
  }
});


const debit = createSlice({
  name: "debit",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchAllDebit.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchAllDebit.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action?.payload.data;
      if (state.data?.length === 0) {
        state.noData = true;
      } else {
        state.noData = false;
      }

      console.log("fetched successfuly", action);
    });

    builder.addCase(fetchAllDebit.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.log("error ", action);
    });
  },
});
export default debit.reducer;
