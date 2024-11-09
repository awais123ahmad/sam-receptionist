import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import companyService from "../../Services/AccountServices/companyService";

const initialState = {
  loading: false,
  error: false,
  data: [],
  getById: [],
  noData: false,
  // add company
  addLoading: false,
  addError: false,
  // fetch company
  updateLoading: false,
  updateError: false,
};

export const fetchAllCompany = createAsyncThunk("fetchAllCompany", async () => {
  try {
    return companyService.getAllCompany();
  } catch (error) {
    throw error;
  }
});

export const fetchCompanyAccountById = createAsyncThunk(
  "fetchCompanyAccountById",
  async () => {
    try {
      return companyService.getAllCompany();
    } catch (error) {
      throw error;
    }
  }
);

export const addCompanyAccount = createAsyncThunk(
  "addCompanyAccount",
  async (data) => {
    try {
      return companyService.addCompanyAccount(data);
    } catch (error) {
      throw error;
    }
  }
);
export const updateCompanyAccount = createAsyncThunk(
  "updateCompanyAccount",
  async (data) => {
    try {
      return companyService.updateCompanyAccount(data);
    } catch (error) {
      throw error;
    }
  }
);

const company = createSlice({
  name: "company",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchAllCompany.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchAllCompany.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action?.payload?.data;
      if (state.data?.length === 0) {
        state.noData = true;
      } else {
        state.noData = false;
      }
      console.log("fetched successfuly", action);
    });

    builder.addCase(fetchAllCompany.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.log("error ", action);
    });
    // add company
    builder.addCase(addCompanyAccount.pending, (state) => {
      state.addLoading = true;
      state.addError = false;
    });

    builder.addCase(addCompanyAccount.fulfilled, (state, action) => {
      state.addLoading = false;
      state.data = [...state.data, action.payload];

      console.log("fetched successfuly", action);
    });

    builder.addCase(addCompanyAccount.rejected, (state, action) => {
      state.addError = true;
      console.log("error ", action);
    });
    // fetch by id company
    builder.addCase(updateCompanyAccount.pending, (state) => {
      state.updateLoading = true;
      state.updateError = false;
    });

    builder.addCase(updateCompanyAccount.fulfilled, (state, action) => {
      state.updateLoading = false;
      // state.fet = [...state.data, action.payload];
      // state.fetchData = action?.payload;

      console.log("fetched successfuly", action);
    });

    builder.addCase(updateCompanyAccount.rejected, (state, action) => {
      state.updateError = true;
      console.log("error ", action);
    });
  },
});
export default company.reducer;
