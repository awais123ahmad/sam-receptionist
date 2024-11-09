import axiosInstance from "../axiosInstance";

const transationService = {
  getAllTransation: async () => {
    try {
      const response = await axiosInstance.get("/transactions");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default transationService;
