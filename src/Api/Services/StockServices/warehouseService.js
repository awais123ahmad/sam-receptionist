import axiosInstance from "../axiosInstance";

const warehouseService = {

  getWarehouses: async () => {
    try {
      const response = await axiosInstance.get('/warehouses');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addWarehouse: async (payload) => {
    try {
      const response = await axiosInstance.post('/warehouses', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateWarehouse: async (payload) => {
    try {
      const response = await axiosInstance.patch(`/warehouses/${payload._id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default warehouseService;
