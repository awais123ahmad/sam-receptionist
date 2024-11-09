import axiosInstance from "../axiosInstance";

const subcategoryService = {

  getSubcategories: async () => {
    try {
      const response = await axiosInstance.get('/subcategories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addSubcategory: async (payload) => {
    try {
      const response = await axiosInstance.post('/subcategories', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateSubcategory: async (payload) => {
    try {
      const response = await axiosInstance.patch(`/subcategories/${payload._id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


};
export default subcategoryService;
