import axiosInstance from "../axiosInstance";

const expenseService = {


  
  getAllExpense: async () => {
    try {
      const response = await axiosInstance.get("/expenses");
      console.log(response, 'res')
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addExpenseAccount: async (data) => {
    try {
      const response = await axiosInstance.post("/expenses", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateExpenseAccount: async (payload) => {
    try {
      const response = await axiosInstance.patch(`/expenses/:${payload._id}` , payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default expenseService;
