import axiosInstance from "./axiosInstance";

const medicineService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/medicine-stocks/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/medicine-stocks/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchTotal: async () => {
        try {
            const response = await axiosInstance.get('/medicine-stocks/total');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchById: async (id) => {
        try {
            const response = await axiosInstance.get('/medicine-stocks/get/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    update: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`/medicine-stocks/edit/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default medicineService;
