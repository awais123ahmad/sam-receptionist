import axiosInstance from "../axiosInstance";

const productService = {

  getProducts: async () => {
    try {
      const response = await axiosInstance.get('/products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default productService;
