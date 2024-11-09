import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeService from "../Services/employeeService";

const initialState = {
  loading: false,
  error: false,
  data: [],
  getById: [],
};

export const fetchEmployee = createAsyncThunk("fetchEmployee", async () => {
  try {
    return employeeService.getEmployee();
  } catch (error) {
    throw error;
  }
});

export const fetchEmployeeById = createAsyncThunk("fetchEmployeeById", async (id) => {
  try {
    return employeeService.getEmployeeById(id);
  } catch (error) {
    throw error;
  }
});

export const addEmployee = createAsyncThunk("addEmployee", async (data) => {
  try {
    return employeeService.addEmployee(data);
  } catch (error) {
    throw error;
  }
});

export const updateEmployee = createAsyncThunk("updateEmployee", async (data) => {
  try {
    return employeeService.updateEmployee(data);
  } catch (error) {
    throw error;
  }
});

export const deleteEmployee = createAsyncThunk("deleteEmployee", async (id) => {
  try {
    return employeeService.deleteEmployee(id);
  } catch (error) {
    throw error;
  }
});

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchEmployee.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action?.payload;

      console.log("fetched successfuly", action);
    });

    builder.addCase(fetchEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.log("error ", action);
    });

    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.loading = false;
       console.log("fetched successfuly", action);
    });
    builder.addCase(addEmployee.rejected, (state, action) => {
      console.log("error ", action);
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
       state.data = state.data.filter(
        (state) => state._id !== action.payload._id
      );
      console.log("fetched successfuly", action);
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      console.log("error ", action);
    });

    builder.addCase(fetchEmployeeById.fulfilled, (state, action) => {
      console.log("fetched successfuly", action);
      state.getById = action.payload
    });
    builder.addCase(fetchEmployeeById.rejected, (state, action) => {
      console.log("error ", action);
    });

    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      console.log("fetched successfuly", action);
      state.getById = action.payload
    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
      console.log("error ", action);
    });
  },
});
export default employeeSlice.reducer;
