import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import incomeService from "../../Services/AccountServices/incomeService";

const initialState = {
  loading: false,
  error: false,
  data: [],
  noData: false,
  // add income
  addLoading: false,
  addError: false,
};

export const fetchAllIncome = createAsyncThunk("fetchAllIncome", async () => {
  try {
    return incomeService.getAllIncome();
  } catch (error) {
    throw error;
  }
});
export const addIncome = createAsyncThunk("addIncome", async () => {
  try {
    return incomeService.addIncomeAccount();
  } catch (error) {
    throw error;
  }
});

const income = createSlice({
  name: "income",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchAllIncome.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchAllIncome.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action?.payload?.data;
      if (state.data?.length === 0) {
        state.noData = true;
      } else {
        state.noData = false;
      }

      console.log("fetched successfuly", action);
    });

    builder.addCase(fetchAllIncome.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.log("error ", action);
    });

    // add income
    builder.addCase(addIncome.pending, (state) => {
      state.addLoading = true;
      state.addError = false;
    });

    builder.addCase(addIncome.fulfilled, (state, action) => {
      state.addLoading = false;
      // state.data = [...state.data, action.payload];

      console.log("fetched successfuly", action);
    });

    builder.addCase(addIncome.rejected, (state, action) => {
      state.addError = true;
      console.log("error ", action);
    });
  },
});
export default income.reducer;
