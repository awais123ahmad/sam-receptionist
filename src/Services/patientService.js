import axiosInstance from "./axiosInstance";

const patientService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/patients/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },   
    createpr: async (payload) => {
        try {
            const response = await axiosInstance.post('/patients/createpr', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }, 
    fetchAllPatients: async () => {
        try {
            const response = await axiosInstance.get('/patients/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchTotal: async () => {
        try {
            const response = await axiosInstance.get('/patients/total');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchPatientById: async (id) => {
        try {
            const response = await axiosInstance.get('/patients/get/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    updatePatient: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`/patients/edit/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default patientService;
