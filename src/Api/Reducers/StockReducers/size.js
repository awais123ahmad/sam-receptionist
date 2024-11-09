import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sizeService from "../../Services/StockServices/sizeService";

const initialState = {
  loading: false,
  error: false,
  sizes: [],
  noData: false,
  //add
  addLoading: false,
  addError: false,
  //update
  updateLoading: false,
  updateError: false,
};

export const fetchSizes = createAsyncThunk("fetchSizes", async () => {
  try {
    return sizeService.getSizes();
  } catch (error) {
    throw error;
  }
});

export const createSize = createAsyncThunk("createSize", async (data) => {
  try {
    return sizeService.addSize(data);
  } catch (error) {
    throw error;
  }
});

export const updateSize = createAsyncThunk("updateSize", async (data) => {
  try {
    return sizeService.updateSize(data);
  } catch (error) {
    throw error;
  }
});

const size = createSlice({
  name: "size",
  initialState,

  extraReducers: (builder) => {
    // <-----------------------------Fetch Sizes Extra Reducer--------------------------------------->

    builder.addCase(fetchSizes.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchSizes.fulfilled, (state, action) => {
      state.loading = false;
      state.sizes = action.payload.sizes;
      if (state.sizes.length === 0) {
        state.noData = true;
      } else {
        state.noData = false;
      }
    });
    builder.addCase(fetchSizes.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    // <-----------------------------Create Size Extra Reducer--------------------------------------->

    builder.addCase(createSize.pending, (state,action) => {
      state.addLoading = true;
      state.addError = false;
    });
    builder.addCase(createSize.fulfilled, (state, action) => {
      state.loading = false;
      state.sizes = [action.payload.size, ...state.sizes];      
    });
    builder.addCase(createSize.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    // <-----------------------------Update Size Extra Reducer--------------------------------------->

    builder.addCase(updateSize.pending, (state,action) => {
      state.updateLoading = true;
      state.updateError = false;
    });
    builder.addCase(updateSize.fulfilled, (state, action) => {
      state.updateLoading = false;
      const indexToUpdate = state.sizes.findIndex(item => item._id === action.payload.size._id);
      if (indexToUpdate !== -1) {
        state.sizes[indexToUpdate] = action.payload.size;
      }
    });
    builder.addCase(updateSize.rejected, (state, action) => {
      state.updateLoading = false;
      state.updateError = true;
    });
  },
});
export default size.reducer;
