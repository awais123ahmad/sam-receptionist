// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Divider,
//   Grid,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import patientService from "../../../Services/patientService";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import doctorService from "../../../Services/doctorService";
// import saleService from "../../../Services/saleService";

// const AddEditCheckup = () => {
//   const [checkupData, setCheckupData] = useState({
//     patient_id: "",
//     doc_id: "",
//     fee: "",
//     date: "",
//   });

//   const [patientData, setPatientData] = useState([]);
//   const [doctorData, setDoctorData] = useState([]);

//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       // Fetch patient data for editing
//       const fetchPatientData = async () => {
//         try {
//           const response = await patientService.fetchPatientById(id); // Use the fetchPatientById service method
//           setCheckupData(response.patient); // Assuming response has a 'patient' object
//         } catch (error) {
//           toast.error("Error fetching patient data.");
//         }
//       };

//       fetchPatientData();
//     }
//   }, [id]);

//   useEffect(() => {
//     const getPatients = async () => {
//       try {
//         const response = await patientService.fetchAllPatients();
//         console.log(response); // Log the response to confirm the structure
//         setPatientData(response.patients); // Access the patients array within response
//       } catch (error) {
//         toast.error("Error fetching Patients");
//       }
//     };
//     getPatients();
//   }, []);

//   useEffect(() => {
//     const getDoctors = async () => {
//       try {
//         const response = await doctorService.fetchAllDoctors();
//         console.log(response); // Log the response to confirm the structure
//         setDoctorData(response.doctors); // Access the patients array within response
//       } catch (error) {
//         toast.error("Error fetching Doctors");
//       }
//     };
//     getDoctors();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCheckupData({ ...checkupData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await saleService.update(id, checkupData);
//         toast.success("Checkup Fee updated successfully!"); // Success message
//       } else {
//         await saleService.create(checkupData);
//         toast.success("Checkup Fee added successfully!"); // Success message
//       }
//       navigate("/checkup"); // Redirect after submission
//     } catch (error) {
//       toast.error("Error saving Details."); // Error message
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-[90%] m-auto">
//       <h1 className="m-[30px] text-center font-[700] text-[20px]">
//         {id ? "Edit Checkup" : "Add Checkup Doctor"}
//       </h1>
//       <Divider />
//       <div>
//         <div className="grid grid-cols-3 my-[20px] gap-10">
//           <div>
//             <FormControl fullWidth>
//               <InputLabel>Fetch Patients</InputLabel>
//               <Select
//                 label="Fetch Patients"
//                 name="patient_id"
//                 value={checkupData.patient_id} // Set the selected doctor's ID
//                 onChange={handleChange}
//                 required
//               >
//                 {patientData.map((patients) => (
//                   <MenuItem
//                     key={patients.patient_id}
//                     value={patients.patient_id}
//                   >
//                     {patients.full_name} - {patients.patient_id}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>

//           <div>
//             <FormControl fullWidth>
//               <InputLabel>Fetch Doctors</InputLabel>
//               <Select
//                 label="Fetch Doctors"
//                 name="doc_id"
//                 value={checkupData.doc_id} // Set the selected doctor's ID
//                 onChange={handleChange}
//                 required
//               >
//                 {doctorData.map((doctors) => (
//                   <MenuItem key={doctors.id} value={doctors.id}>
//                     {doctors.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>

//           <div>
//             <TextField
//               label="CheckUp Date"
//               variant="outlined"
//               fullWidth
//               type="date"
//               name="date"
//               value={checkupData.date}
//               onChange={handleChange}
//               required
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </div>
//         </div>

//         <div className="mt-[20px] flex">
//           <div style={{ width: "33%" }}>
//             <TextField
//               label="Checkup Fee"
//               variant="outlined"
//               fullWidth
//               type="nummber"
//               name="fee"
//               value={checkupData.fee}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <Grid container style={{ justifyContent: "center", marginTop: "30px" }}>
//           <Button
//             variant="contained"
//             type="submit"
//             color="primary"
//             size="large"
//             className="!bg-gray-700 !text-white"
//             style={{ borderRadius: "10px" }}
//           >
//             Save and Continue
//           </Button>
//         </Grid>
//       </div>
//     </form>
//   );
// };

// export default AddEditCheckup;


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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setCheckupData({ ...checkupData, [name]: value });

  //   // Update selected names
  //   if (name === "patient_id") {
  //     const selectedPatient = patientData.find(
  //       (patient) => patient.patient_id === value
  //     );
  //     setSelectedPatientName(selectedPatient?.full_name || "");
  //   }

  //   if (name === "doc_id") {
  //     const selectedDoctor = doctorData.find((doctor) => doctor.id === value);
  //     setSelectedDoctorName(selectedDoctor?.name || "");
  //   }
  // };

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
    setIsDialogOpen(true); // Open the confirmation dialog
  };

  const handleDialogClose = (confirm) => {
    setIsDialogOpen(false);
    if (confirm) {
      handleFormSubmit();
    }
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
              <InputLabel>Fetch Patients</InputLabel>
              <Select
                label="Fetch Patients"
                name="patient_id"
                value={checkupData.patient_id}
                onChange={handleChange}
                required
              >
                {patientData.map((patients) => (
                  <MenuItem
                    key={patients.patient_id}
                    value={patients.patient_id}
                  >
                    {patients.full_name} - {patients.patient_id}
                  </MenuItem>
                ))}
              </Select>
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
