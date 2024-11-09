import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import creditService from "../../Services/AccountServices/receiptCreditService";

const initialState = {
  loading: false,
  error: false,
  data: [],
  noData: false,
  // add credit
  addLoading: false,
  addError: false,
};

export const fetchAllCredit = createAsyncThunk("fetchAllCredit", async () => {
  try {
    return creditService.getAllCredit();
  } catch (error) {
    throw error;
  }
});

export const addCreditApi = createAsyncThunk("addCreditApi", async (data) => {
  try {
    return creditService.addCreditAccount(data);
  } catch (error) {
    throw error;
  }
});

const credit = createSlice({
  name: "credit",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchAllCredit.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchAllCredit.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action?.payload.data;
      if (state.data?.length === 0) {
        state.noData = true;
      } else {
        state.noData = false;
      }

      console.log("fetched successfuly", action);
    });

    builder.addCase(fetchAllCredit.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.log("error ", action);
    });

    // add credit
    builder.addCase(addCreditApi.pending, (state) => {
      state.addLoading = true;
      state.addError = false;
    });

    builder.addCase(addCreditApi.fulfilled, (state, action) => {
      state.addLoading = false;
    
      // state.data = [...state.data, action.payload];

      console.log("fetched successfuly", action);
    });

    builder.addCase(addCreditApi.rejected, (state, action) => {
      state.addError = true;
      console.log("error ", action);
    });
  },
});
export default credit.reducer;
