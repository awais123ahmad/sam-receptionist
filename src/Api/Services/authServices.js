import axiosInstance from "./axiosInstance";

const authService = {
  userLogin: async (data) => {
    try {
      const response = await axiosInstance.post("/users/signin", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default authService;
