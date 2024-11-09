import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import transationService from "../../Services/AccountServices/transactionService";

const initialState = {
  loading: false,
  error: false,
  data: [],
  noData: false,
};

export const fetchAllTransaction = createAsyncThunk("fetchAllTransaction", async () => {
  try {
    return transationService.getAllTransation();
  } catch (error) {
    throw error;
  }
});


const transaction = createSlice({
  name: "transaction",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchAllTransaction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchAllTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action?.payload?.data;
      if (state.data?.length === 0) {
        state.noData = true;
      } else {
        state.noData = false;
      }

      console.log("fetched successfuly", action);
    });

    builder.addCase(fetchAllTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.log("error ", action);
    });
  },
});
export default transaction.reducer;
