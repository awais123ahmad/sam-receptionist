import axiosInstance from "../axiosInstance";

const companyService = {
  getAllCompany: async () => {
    try {
      const response = await axiosInstance.get("/accounts");
      console.log(response, 'res')
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addCompanyAccount: async (data) => {
    try {
      const response = await axiosInstance.post("/accounts", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateCompanyAccount: async (payload) => {
    try {
      const response = await axiosInstance.patch(`/accounts/:${payload._id}` , payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


};
export default companyService;
