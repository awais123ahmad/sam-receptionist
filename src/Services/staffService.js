import { Login } from "@mui/icons-material";
import axiosInstance from "./axiosInstance";

const staffService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/staff/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/staff/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchTotal: async () => {
        try {
            const response = await axiosInstance.get('/staff/total');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchById: async (id) => {
        try {
            const response = await axiosInstance.get('/staff/id/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    update: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`/staff/edit/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

};

export default staffService;
