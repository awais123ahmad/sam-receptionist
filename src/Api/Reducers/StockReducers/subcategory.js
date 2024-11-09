import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sizeService from "../../Services/StockServices/sizeService";
import subcategoryService from "../../Services/StockServices/subcategoryService";

const initialState = {
  loading: false,
  error: false,
  subcategories: [],
  noData: false,
  //add
  addLoading: false,
  addError: false,
  //update
  updateLoading: false,
  updateError: false,
};

export const fetchSubcategories = createAsyncThunk("fetchSubcategories", async () => {
  try {
    return subcategoryService.getSubcategories();
  } catch (error) {
    throw error;
  }
});

export const createSubcategory = createAsyncThunk("createSubcategory", async (data) => {
  try {
    return subcategoryService.addSubcategory(data);
  } catch (error) {
    throw error;
  }
});

export const updateSubcategory = createAsyncThunk("updateSubcategory", async (data) => {
  try {
    return subcategoryService.updateSubcategory(data);
  } catch (error) {
    throw error;
  }
});


const subcategory = createSlice({
  name: "subcategory",
  initialState,

  extraReducers: (builder) => {
    // <-----------------------------Fetch Subcategories Extra Reducer--------------------------------------->

    builder.addCase(fetchSubcategories.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchSubcategories.fulfilled, (state, action) => {
      state.loading = false;
      state.subcategories = action.payload.subcategories;
      console.log(action);
      if (state.subcategories.length === 0) {
        state.noData = true;
      } else {
        state.noData = false;
      }
    });
    builder.addCase(fetchSubcategories.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    // <-----------------------------Create Subcategory Extra Reducer--------------------------------------->

    builder.addCase(createSubcategory.pending, (state,action) => {
      state.addLoading = true;
      state.addError = false;
    });
    builder.addCase(createSubcategory.fulfilled, (state, action) => {
      state.loading = false;
      state.subcategories = [action.payload.subcategory, ...state.subcategories];      
    });
    builder.addCase(createSubcategory.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });


    // <-----------------------------Update Category Extra Reducer--------------------------------------->

    builder.addCase(updateSubcategory.pending, (state,action) => {
      state.updateLoading = true;
      state.updateError = false;
    });
    builder.addCase(updateSubcategory.fulfilled, (state, action) => {
      state.updateLoading = false;
      const indexToUpdate = state.subcategories.findIndex(item => item._id === action.payload.category._id);
      if (indexToUpdate !== -1) {
        state.subcategories[indexToUpdate] = action.payload.subcategory;
      }
    });
    builder.addCase(updateSubcategory.rejected, (state, action) => {
      state.updateLoading = false;
      state.updateError = true;
    });
  },
});
export default subcategory.reducer;
