import axiosInstance from "./axiosInstance";

const incomeService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/revenues/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/revenues/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchTotal: async () => {
        try {
            const response = await axiosInstance.get('/revenues/total');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchPatientById: async (id) => {
        try {
            const response = await axiosInstance.get('/revenues/get/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    updatePatient: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`/revenues/edit/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default incomeService;
