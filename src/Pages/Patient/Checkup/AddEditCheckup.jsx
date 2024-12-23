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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import patientService from "../../../Services/patientService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import doctorService from "../../../Services/doctorService";
import saleService from "../../../Services/saleService";

const AddEditCheckup = () => {
  const [checkupData, setCheckupData] = useState({
    patient_id: "",
    doc_id: "",
    fee: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [patientData, setPatientData] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const [selectedPatientName, setSelectedPatientName] = useState("");
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
const [searchData, setSearchData] = useState("");


  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchPatientData = async () => {
        try {
          const response = await patientService.fetchPatientById(id);
          setCheckupData(response.patient);
        } catch (error) {
          toast.error("Error fetching patient data.");
        }
      };

      fetchPatientData();
    }
  }, [id]);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await patientService.fetchAllPatients();
        setPatientData(response.patients);
      } catch (error) {
        toast.error("Error fetching Patients");
      }
    };
    getPatients();
  }, []);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await doctorService.fetchAllDoctors();
        setDoctorData(response.doctors);
      } catch (error) {
        toast.error("Error fetching Doctors");
      }
    };
    getDoctors();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckupData((prev) => ({ ...prev, [name]: value }));
  
    if (name === "patient_id") {
      const selectedPatient = patientData.find(
        (patient) => patient.patient_id === value
      );
      setSelectedPatientName(selectedPatient?.full_name || "");
    }
  
    if (name === "doc_id") {
      const selectedDoctor = doctorData.find((doctor) => doctor.id === value);
      setSelectedDoctorName(selectedDoctor?.name || "");
      
      // Automatically set the fee based on the selected doctor
      setCheckupData((prev) => ({
        ...prev,
        fee: selectedDoctor?.fee || "",
      }));
    }
  };
  

  const handleFormSubmit = async () => {
    try {
      if (id) {
        await saleService.update(id, checkupData);
        toast.success("Checkup Fee updated successfully!");
      } else {
        await saleService.create(checkupData);
        toast.success("Checkup Fee added successfully!");
      }
      navigate("/receptionist");
    } catch (error) {
      toast.error("Error saving Details.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set the selected patient's name in the state
    if (selectedPatient) {
      setSelectedPatientName(selectedPatient.full_name);
    }
    setIsDialogOpen(true); // Open the confirmation dialog
  };

  const handleDialogClose = (confirm) => {
    setIsDialogOpen(false);
    if (confirm) {
      handleFormSubmit();
    }
  };

  // const handlePatientSelect = (patient) => {
  //   setSelectedPatient(patient); // Save the selected patient
  //   setSearchData(""); // Clear search input
  //   setCheckupData((prevData) => ({
  //     ...prevData,
  //     patient_id: patient.patient_id // Store patient_id in checkupData
  //   }));
  // };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient); // Save the selected patient
    setSearchData(""); // Clear search input
    setCheckupData((prevData) => ({
      ...prevData,
      patient_id: patient.patient_id, // Store patient_id in checkupData
    }));
  
    // Ensure patient name is set correctly for the dialog confirmation
    setSelectedPatientName(patient.full_name || "");
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] m-auto">
      <h1 className="m-[30px] text-center font-[700] text-[20px]">
        {id ? "Edit Checkup" : "Add Checkup Details"}
      </h1>
      <Divider />
      <div>
        <div className="grid grid-cols-3 my-[20px] gap-10">
          <div>
          <FormControl fullWidth>
        <TextField
          label="Search Patients"
          placeholder="Type to search patients..."
          value={searchData || selectedPatient?.full_name || ""}
          onChange={(e) => {
            setSearchData(e.target.value); // Update search input
            if (selectedPatient) setSelectedPatient(null); // Clear selected patient when typing
          }}
          variant="outlined"
          fullWidth
        />
        {searchData && (
          <div className="relative">
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto mt-2">
              <li className="px-4 py-2 font-bold bg-gray-100">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-sm font-bold">Patient No.</th>
                      <th className="text-sm font-bold">Name</th>
                      <th className="text-sm font-bold">Phone No.</th>
                    </tr>
                  </thead>
                </table>
              </li>

              {/* Render Patient Data */}
              {patientData
                .filter(
                  (patient) =>
                    patient.full_name
                      ?.toLowerCase()
                      .includes(searchData.toLowerCase()) ||
                    patient.patient_id
                      ?.toString()
                      .toLowerCase()
                      .includes(searchData.toLowerCase())
                )
                .slice(0, 10)
                .map((patient) => (
                  <li
                    key={patient.patient_id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handlePatientSelect(patient)}
                  >
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="text-sm">{patient.patient_id}</td>
                          <td className="text-sm text-gray-600 px-10">
                            {patient.full_name}
                          </td>
                          <td className="text-sm text-gray-600">
                            {patient.contact_number}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </FormControl>
          </div>

          <div>
            <FormControl fullWidth>
              <InputLabel>Fetch Doctors</InputLabel>
              <Select
                label="Fetch Doctors"
                name="doc_id"
                value={checkupData.doc_id}
                onChange={handleChange}
                required
              >
                {doctorData.map((doctors) => (
                  <MenuItem key={doctors.id} value={doctors.id}>
                    {doctors.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <TextField
              label="CheckUp Date"
              variant="outlined"
              fullWidth
              type="date"
              name="date"
              value={checkupData.date}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        <div className="mt-[20px] flex">
          <div style={{ width: "33%" }}>
            <TextField
              label="Checkup Fee"
              variant="outlined"
              fullWidth
              type="number"
              name="fee"
              value={checkupData.fee}
              onChange={handleChange}
              required
              InputProps={{
                readOnly: true, // Makes the field read-only
              }}
            />
          </div>
        </div>

        <Grid container style={{ justifyContent: "center", marginTop: "30px" }}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            className="!bg-gray-700 !text-white"
            style={{ borderRadius: "10px" }}
          >
            Save and Continue
          </Button>
        </Grid>
      </div>

      <Dialog open={isDialogOpen} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit the following details?
          </DialogContentText>
          <ul>
            <li>Patient: {selectedPatientName}</li>
            <li>Doctor: {selectedDoctorName}</li>
            <li>Fee: {checkupData.fee}</li>
            <li>Date: {checkupData.date}</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)}>Cancel</Button>
          <Button onClick={() => handleDialogClose(true)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default AddEditCheckup;