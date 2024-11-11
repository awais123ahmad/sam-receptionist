import axiosInstance from "./axiosInstance";

const patientService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/patients/create', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAllPatients: async () => {
        try {
            const response = await axiosInstance.get('/patients/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchTotal: async () => {
        try {
            const response = await axiosInstance.get('/patients/total');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/patients/delete/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default patientService