import axiosInstance from "../axiosInstance";

const measurementService = {

  getUnits: async () => {
    try {
      const response = await axiosInstance.get('/units');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addUnit: async (payload) => {
    try {
      const response = await axiosInstance.post('/units', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUnit: async (payload) => {
    try {
      const response = await axiosInstance.put(`/units/${payload._id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default measurementService;
