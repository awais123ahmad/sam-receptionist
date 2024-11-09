import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../../Services/StockServices/productService";

const initialState = {
  loading: false,
  error: false,
  data: [],
  getById: [],
};

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  try {
    return productService.getProducts();
  } catch (error) {
    throw error;
  }
});


const product = createSlice({
  name: "product",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action?.payload;

      console.log("fetched successfuly", action);
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.log("error ", action);
    });
  },
});
export default product.reducer;
