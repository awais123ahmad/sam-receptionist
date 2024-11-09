import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import expenseService from "../../Services/AccountServices/expenseService";

const initialState = {
  loading: false,
  error: false,
  data: [],
  noData: false,
  // add income
  addLoading: false,
  addError: false,
};

export const fetchAllExpense = createAsyncThunk("fetchAllExpense", async () => {
  try {
    return expenseService.getAllExpense();
  } catch (error) {
    throw error;
  }
});
export const addExpenseAPI = createAsyncThunk("addExpenseAPI", async (data) => {
  try {
    return expenseService.addExpenseAccount(data);
  } catch (error) {
    throw error;
  }
});

const expense = createSlice({
  name: "expense",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchAllExpense.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchAllExpense.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action?.payload.data;
      if (state.data?.length === 0) {
        state.noData = true;
      } else {
        state.noData = false;
      }

      console.log("fetched successfuly", action);
    });

    builder.addCase(fetchAllExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.log("error ", action);
    });

    // add expense
    builder.addCase(addExpenseAPI.pending, (state) => {
      state.addLoading = true;
      state.addError = false;
    });

    builder.addCase(addExpenseAPI.fulfilled, (state, action) => {
      state.addLoading = false;
      // state.data = [...state.data, action.payload];

      console.log("fetched successfuly", action);
    });

    builder.addCase(addExpenseAPI.rejected, (state, action) => {
      state.addError = true;
      console.log("error ", action);
    });
  },
});
export default expense.reducer;
