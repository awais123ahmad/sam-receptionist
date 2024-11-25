import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import patientService from "../../../Services/patientService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import doctorService from "../../../Services/doctorService";
import incomeService from "../../../Services/incomeService";

const AddEditIncome = () => {
  const [patientData, setPatientData] = useState({
    title: "",
    source: "",
    amount: "",
    revenue_date: "",
    description: "",
  });

  const [doctorData, setDoctorData] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch patient data for editing
      const fetchPatientData = async () => {
        try {
          const response = await patientService.fetchPatientById(id); // Use the fetchPatientById service method
          setPatientData(response.patient); // Assuming response has a 'patient' object
        } catch (error) {
          toast.error("Error fetching patient data.");
        }
      };

      fetchPatientData();
    }
  }, [id]);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await doctorService.fetchAllDoctors();
        console.log(response); // Log the response to confirm the structure
        setDoctorData(response.doctors); // Access the patients array within response
      } catch (error) {
        toast.error("Error fetching Doctors");
      }
    };
    getDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await incomeService.update(id, patientData);
        toast.success("Income updated successfully!");
      } else {
        await incomeService.create(patientData);
        toast.success("Income added successfully!");
      }
      navigate("/account/income");
    } catch (error) {
      toast.error("Error saving patient.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] m-auto">
      <h1 className="m-[30px] text-center font-[700] text-[20px]">
        {id ? "Edit Icome" : "Add Icome"}
      </h1>
      <Divider />
      <div>
        <div className="mt-[20px] flex">
          <div style={{ width: "50%" }}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              value={patientData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginLeft: 20, width: "50%" }}>
            <TextField
              label="Source"
              variant="outlined"
              fullWidth
              name="source"
              value={patientData.source}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mt-[20px] flex">
          <div style={{ width: "50%" }}>
            <TextField
              label="Amount"
              variant="outlined"
              fullWidth
              name="amount"
              value={patientData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginLeft: 20, width: "50%" }}>
            <TextField
              label="Income Date"
              variant="outlined"
              fullWidth
              type="date"
              name="revenue_date"
              value={patientData.revenue_date}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />revenue_date
          </div>

        </div>

        <div className="mt-[20px] flex">
          <div style={{ width: "50%" }}>
            <TextField
              label="Description Note"
              variant="outlined"
              fullWidth
              name="description"
              value={patientData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginLeft: 20, width: "50%" }}>
            <TextField
              label="Qualification"
              variant="outlined"
              fullWidth
              name="qualification"
              value={patientData.qualification}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mt-[20px] flex">
        <div style={{  width: "25%" }}>
            <TextField
              label="Pay"
              variant="outlined"
              fullWidth
              type="number"
              name="pay"
              value={patientData.pay}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginLeft: 20, width: "25%" }}>
            <TextField
              label="Experience"
              variant="outlined"
              fullWidth
              type="number"
              name="experience"
              value={patientData.experience}
              onChange={handleChange}
              required
            />
          </div>

          </div>
       

        <Grid container style={{ justifyContent: "center", marginTop: "30px" }}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            className="!bg-[#007fff] !text-white"
            style={{ borderRadius: "10px" }}
          >
            Save and Continue
          </Button>
        </Grid>
      </div>
    </form>
  );
};

export default AddEditIncome;
