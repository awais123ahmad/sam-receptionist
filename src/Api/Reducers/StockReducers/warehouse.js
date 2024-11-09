import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import warehouseService from "../../Services/StockServices/warehouseService";

const initialState = {
  loading: false,
  error: false,
  warehouses: [],
  noData: false,
  //add
  addLoading: false,
  addError: false,
  //update
  updateLoading: false,
  updateError: false,
};

export const fetchWarehouses = createAsyncThunk("fetchWarehouse", async () => {
  try {
    return warehouseService.getWarehouses();
  } catch (error) {
    throw error;
  }
});

export const createWarehouse = createAsyncThunk("createWarehouse", async (data) => {
  try {
    return warehouseService.addWarehouse(data);
  } catch (error) {
    throw error;
  }
});

export const updateWarehouse = createAsyncThunk("updateWarehouse", async (data) => {
  try {
    return warehouseService.updateWarehouse(data);
  } catch (error) {
    throw error;
  }
});


const warehouse = createSlice({
  name: "warehouse",
  initialState,

  extraReducers: (builder) => {
        // <-----------------------------Fetch Warehouses Extra Reducer--------------------------------------->

        builder.addCase(fetchWarehouses.pending, (state) => {
          state.loading = true;
          state.error = false;
        });
        builder.addCase(fetchWarehouses.fulfilled, (state, action) => {
          state.loading = false;
          state.warehouses = action.payload.warehouses;
          if (state.warehouses.length === 0) {
            state.noData = true;
          } else {
            state.noData = false;
          }
        });
        builder.addCase(fetchWarehouses.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
        });
    
        // <-----------------------------Create Warehouse Extra Reducer--------------------------------------->
    
        builder.addCase(createWarehouse.pending, (state,action) => {
          state.addLoading = true;
          state.addError = false;
        });
        builder.addCase(createWarehouse.fulfilled, (state, action) => {
          state.loading = false;
          state.warehouses = [action.payload.warehouse, ...state.warehouses];      
        });
        builder.addCase(createWarehouse.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
        });
    
        // <-----------------------------Update Warehouse Extra Reducer--------------------------------------->
    
        builder.addCase(updateWarehouse.pending, (state,action) => {
          state.updateLoading = true;
          state.updateError = false;
        });
        builder.addCase(updateWarehouse.fulfilled, (state, action) => {
          state.updateLoading = false;
          const indexToUpdate = state.warehouses.findIndex(item => item._id === action.payload.warehouse._id);
          if (indexToUpdate !== -1) {
            state.warehouses[indexToUpdate] = action.payload.warehouse;
          }
        });
        builder.addCase(updateWarehouse.rejected, (state, action) => {
          state.updateLoading = false;
          state.updateError = true;
        });
  },
});
export default warehouse.reducer;
