import axiosInstance from "./axiosInstance";

const expenseService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/expenses/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/expenses/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchTotal: async () => {
        try {
            const response = await axiosInstance.get('/expenses/total');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchById: async (id) => {
        try {
            const response = await axiosInstance.get('/expenses/get/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    update: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`/expenses/edit/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default expenseService;
