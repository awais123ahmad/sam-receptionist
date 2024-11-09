import axiosInstance from "../axiosInstance";

const typeService = {

  getTypes: async () => {
    try {
      const response = await axiosInstance.get('/types');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addType: async (payload) => {
    console.log(payload)
    try {
      const response = await axiosInstance.post('/types', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateType: async (payload) => {
    console.log(payload)
    try {
      const response = await axiosInstance.patch(`/types/${payload._id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default typeService;
