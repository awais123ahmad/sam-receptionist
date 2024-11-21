import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./index.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import PortalLayout from "./Components/PortalLayout";
import Patients from "./Pages/Patient/Patients/Patients";
import AddEditPatient from "./Pages/Patient/Patients/AddEditPatient";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import MedicalStore from "./Pages/Dispensaries/Dispensary/MedicalStore";
import PatientDetails from "./Pages/Patient/Patients/PatientDetails";
import AddEditMedicalStore from "./Pages/Dispensaries/Dispensary/AddEditMedicalStore";
import SaleMedicine from "./Pages/Dispensaries/Dispensary/SaleMedicine";
import Income from "./Pages/Account/Income/Income";
import AdminPatients from "./Pages/Admin/Patients/AdminPatients";
import Doctors from "./Pages/Admin/Doctors/Doctors";
import Medicines from "./Pages/Admin/Medicines/Medicines";
import LoginPage from "./Pages/Login/LoginPage";
import AddEditDoctors from "./Pages/Admin/Doctors/AddEditDoctors";

function App() {
  const [count, setCount] = useState(0);
 

  return (
    <BrowserRouter>
      <PortalLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginpage" element={<LoginPage />} />

          {/* // Patient ================================================================= */}
          <Route path="/patient/patients" element={<Patients />} />
          <Route path="/patient/patients/:id" element={<PatientDetails />} />
          <Route path="/patient/patients/AddEdit" element={<AddEditPatient />} />

           {/* // Medical Records ======================================================== */}
           <Route path="/dispensaries/dispensary" element={<MedicalStore />} />
           <Route path="/dispensaries/dispensary/AddEditMedical" element={<AddEditMedicalStore />} />
           <Route path="/dispensaries/dispensary/SaleMedicine" element={<SaleMedicine />} />

            {/* // Admin Records ======================================================== */}
            <Route path="admin/doctor" element={<Doctors />} />
           <Route path="admin/doctor/AddEditDoctor" element={<AddEditDoctors />} />

           <Route path="/admin/patients" element={<AdminPatients />} />
           <Route path="/admin/patients/AddEditpatients" element={<AddEditPatient />} />

           <Route path="/admin/medicines" element={<Medicines />} />
           <Route path="/admin/patients/AddEditpatients" element={<AddEditPatient />} />

           
           {/* // Account Records ======================================================== */}
           <Route path="account/income" element={<Income />} />
           <Route path="account/income/AddEditIncome" element={<AddEditPatient />} />

           <Route path="account/expense" element={< Patients/>} />
           <Route path="account/income/AddEditIncome" element={<AddEditPatient />} />



        </Routes>
      </PortalLayout>
    </BrowserRouter>
  );
}

export default App;

