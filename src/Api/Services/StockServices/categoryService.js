import axiosInstance from "../axiosInstance";

const categoryService = {
  getCategories: async () => {
    try {
      const response = await axiosInstance.get('/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addCategory: async (payload) => {
    try {
      const response = await axiosInstance.post("/categories", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCategory: async (payload) => {
    try {
      const response = await axiosInstance.put(`/categories/${payload._id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default categoryService;
