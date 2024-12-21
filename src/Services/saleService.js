import axiosInstance from "./axiosInstance";

const saleService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/sale/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchAllSale: async () => {
        try {
            const response = await axiosInstance.get('/sale/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchTotal: async () => {
        try {
            const response = await axiosInstance.get('/sale/total');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchSaleById: async (id) => {
        try {
            const response = await axiosInstance.get('/sale/id/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    update: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`/sale/edit/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

};

export default saleService;
