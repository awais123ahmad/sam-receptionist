import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsetService from "../../Services/StockServices/productsetService";

const initialState = {
  loading: false,
  error: false,
  data: [],
  getById: [],
};

export const fetchAllProductset = createAsyncThunk("fetchAllProductset", async () => {
  try {
    return productsetService.getAllProductset();
  } catch (error) {
    throw error;
  }
});


const productset = createSlice({
  name: "productset",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchAllProductset.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchAllProductset.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action?.payload;

      console.log("fetched successfuly", action);
    });

    builder.addCase(fetchAllProductset.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.log("error ", action);
    });
  },
});
export default productset.reducer;