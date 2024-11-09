import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import measurementService from "../../Services/StockServices/measurementService";

const initialState = {
  loading: false,
  error: false,
  units: [],
  noData: false,
  //add
  addLoading: false,
  addError: false,
  //update
  updateLoading: false,
  updateError: false,
};

export const fetchUnits = createAsyncThunk("fetchUnits", async () => {
  try {
    return measurementService.getUnits();
  } catch (error) {
    throw error;
  }
});

export const createUnit = createAsyncThunk("createUnit", async (data) => {
  try {
    return measurementService.addUnit(data);
  } catch (error) {
    throw error;
  }
});

export const updateUnit = createAsyncThunk("updateUnit", async (data) => {
  try {
    return measurementService.updateUnit(data);
  } catch (error) {
    throw error;
  }
});

const measurement = createSlice({
  name: "measurement",
  initialState,

  extraReducers: (builder) => {

        // <-----------------------------Fetch Units Extra Reducer--------------------------------------->

    builder.addCase(fetchUnits.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchUnits.fulfilled, (state, action) => {
      state.loading = false;
      state.units = action.payload.units;
      if (state.units.length === 0) {
        state.noData = true;
      } else {
        state.noData = false;
      }
    });
    builder.addCase(fetchUnits.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    // <-----------------------------Create Unit Extra Reducer--------------------------------------->

    builder.addCase(createUnit.pending, (state,action) => {
      state.addLoading = true;
      state.addError = false;
    });
    builder.addCase(createUnit.fulfilled, (state, action) => {
      state.loading = false;
      state.units = [action.payload.unit, ...state.units];      
    });
    builder.addCase(createUnit.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    // <-----------------------------Update Unit Extra Reducer--------------------------------------->

    builder.addCase(updateUnit.pending, (state,action) => {
      state.updateLoading = true;
      state.updateError = false;
    });
    builder.addCase(updateUnit.fulfilled, (state, action) => {
      state.updateLoading = false;
      const indexToUpdate = state.units.findIndex(item => item._id === action.payload.unit._id);
      if (indexToUpdate !== -1) {
        state.units[indexToUpdate] = action.payload.unit;
      }
    });
    builder.addCase(updateUnit.rejected, (state, action) => {
      state.updateLoading = false;
      state.updateError = true;
    });
  },
});
export default measurement.reducer;
