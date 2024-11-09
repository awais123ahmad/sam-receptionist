import axiosInstance from "../axiosInstance";

const incomeService = {

  getAllIncome: async () => {
    try {
      const response = await axiosInstance.get("/incomes");
      console.log(response, 'res')
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addIncomeAccount: async (data) => {
    try {
      const response = await axiosInstance.post("/incomes", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateIncomeAccount: async (payload) => {
    try {
      const response = await axiosInstance.patch(`/incomes/:${payload._id}` , payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default incomeService;
