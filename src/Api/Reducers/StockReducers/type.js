import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import typeService from "../../Services/StockServices/typeService";

const initialState = {
  loading: false,
  error: false,
  types: [],
  noData: false,
  //add
  addLoading: false,
  addError: false,
  //update
  updateLoading: false,
  updateError: false,
};

export const fetchTypes = createAsyncThunk("fetchTypes", async () => {
  try {
    return typeService.getTypes();
  } catch (error) {
    throw error;
  }
});

export const createType = createAsyncThunk("createType", async (data) => {

  try {
    return typeService.addType(data);
  } catch (error) {
    throw error;
  }
});

export const updateType = createAsyncThunk("updateType", async (data) => {
  try {
    return typeService.updateType(data);
  } catch (error) {
    throw error;
  }
});

const type = createSlice({
  name: "type",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchTypes.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.types = action.payload.types;
      if (state.types.length === 0) {
        state.noData = true;
      } else {
        state.noData = false;
      }
    });

    builder.addCase(fetchTypes.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.log("error ", action);
    });

    builder.addCase(createType.pending, (state) => {
      state.addLoading = true;
      state.addError = false;
    });
    builder.addCase(createType.fulfilled, (state, action) => {
      state.loading = false;
      state.types = [action.payload.type, ...state.types];      
    });

    builder.addCase(createType.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(updateType.pending, (state) => {
      state.addLoading = true;
      state.addError = false;
    });
    builder.addCase(updateType.fulfilled, (state, action) => {
      state.updateLoading = false;
      const indexToUpdate = state.types.findIndex(item => item._id === action.payload.type._id);
      if (indexToUpdate !== -1) {
        state.types[indexToUpdate] = action.payload.type;
      }
    });

    builder.addCase(updateType.rejected, (state, action) => {
      state.updateLoading = false;
      state.updateError = true;
    });
  },
});
export default type.reducer;
