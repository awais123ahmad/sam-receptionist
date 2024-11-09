import axiosInstance from "../axiosInstance";

const sizeService = {

  getSizes: async () => {
    try {
      const response = await axiosInstance.get('/sizes');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addSize: async (payload) => {
    try {
      const response = await axiosInstance.post('/sizes', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateSize: async (payload) => {
    try {
      const response = await axiosInstance.put(`/sizes/${payload._id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default sizeService;
