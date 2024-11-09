import axiosInstance from "./axiosInstance";

const employeeService = {


  getEmployee: async () => {
    try {
      const response = await axiosInstance.get('/getEmployees');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getEmployeeById: async (id) => {
    try {
      const response = await axiosInstance.get(`getEmployee/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addEmployee: async (payload) => {
    try {
      const response = await axiosInstance.post("addEmployee" , payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateEmployee: async (payload) => {
    try {
console.log('payload of update employee' , payload);

      const response = await axiosInstance.put(`updateEmployee/${payload._id}`, payload );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteEmployee: async (id) => {
    try {
      const response = await axiosInstance.delete(`deleteEmployee/${id}` );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default employeeService;
