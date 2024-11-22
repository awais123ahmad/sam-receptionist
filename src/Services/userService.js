import axiosInstance from "./axiosInstance";

const userService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/users/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/users/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchTotal: async () => {
        try {
            const response = await axiosInstance.get('/users/total');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchById: async (id) => {
        try {
            const response = await axiosInstance.get('/users/id/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    update: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`/users/edit/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default userService;
