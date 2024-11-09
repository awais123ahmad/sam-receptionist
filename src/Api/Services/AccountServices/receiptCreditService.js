import axiosInstance from "../axiosInstance";

const creditService = {



  getAllCredit: async () => {
    try {
      const response = await axiosInstance.get("/receiptCredits");
      console.log(response, 'res')
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addCreditAccount: async (data) => {
    try {
      const response = await axiosInstance.post("/receiptCredits", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateCreditAccount: async (payload) => {
    try {
      const response = await axiosInstance.patch(`/receiptCredits/:${payload._id}` , payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default creditService;
