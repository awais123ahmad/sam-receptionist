import axiosInstance from "../axiosInstance";

const productsetService = {

  getAllProduct: async () => {
    try {
      const response = await axiosInstance.get('/getProductset');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default productsetService;
