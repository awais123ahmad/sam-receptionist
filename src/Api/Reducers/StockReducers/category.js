import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "../../Services/StockServices/categoryService";

const initialState = {
  loading: false,
  error: false,
  categories: [],
  noData: false,
  //add
  addLoading: false,
  addError: false,
  //update
  updateLoading: false,
  updateError: false,
};

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  try {
    return categoryService.getCategories();
  } catch (error) {
    throw error;
  }
});

export const createCategory = createAsyncThunk("createCategory", async (data) => {
  try {
    return categoryService.addCategory(data);
  } catch (error) {
    throw error;
  }
});

export const updateCategory = createAsyncThunk("updateCategory", async (data) => {
  try {
    return categoryService.updateCategory(data);
  } catch (error) {
    throw error;
  }
});


const category = createSlice({
  name: "category",
  initialState,
  
  extraReducers: (builder) => {

    // <-----------------------------Fetch Categories Extra Reducer--------------------------------------->

    builder.addCase(fetchCategories.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
      if (state.categories.length === 0) {
        state.noData = true;
      } else {
        state.noData = false;
      }
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.log("error ", action);
    });


    // <-----------------------------Create Category Extra Reducer--------------------------------------->

    builder.addCase(createCategory.pending, (state,action) => {
      state.addLoading = true;
      state.addError = false;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = [action.payload.category, ...state.categories];      
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });


    // <-----------------------------Update Category Extra Reducer--------------------------------------->

    builder.addCase(updateCategory.pending, (state,action) => {
      state.updateLoading = true;
      state.updateError = false;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.updateLoading = false;
      const indexToUpdate = state.categories.findIndex(item => item._id === action.payload.category._id);
      if (indexToUpdate !== -1) {
        state.categories[indexToUpdate] = action.payload.category;
      }
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.updateLoading = false;
      state.updateError = true;
    });

  },
});
export default category.reducer;
