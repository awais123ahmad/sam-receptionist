import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./index.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import PortalLayout from "./Components/PortalLayout";
import Patients from "./Pages/Patient/Patients/Patients";
import AddEditPatient from "./Pages/Patient/Patients/AddEditPatient";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login";
import MedicalStore from "./Pages/Dispensaries/Dispensary/MedicalStore";
import PatientDetails from "./Pages/Patient/Patients/PatientDetails";

function App() {
  const [count, setCount] = useState(0);
 

  return (
    <BrowserRouter>
      <PortalLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />

          {/* // Patient ================================================================= */}
          <Route path="/patient/patients" element={<Patients />} />
          <Route path="/patient/patients/:id" element={<PatientDetails />} />
          <Route path="/patient/patients/AddEdit" element={<AddEditPatient />} />

           {/* // Medical Records ======================================================== */}
           <Route path="/dispensaries/dispensary" element={<MedicalStore />} />
           <Route path="/dispensaries/dispensary/AddEdit" element={<AddEditPatient />} />



        </Routes>
      </PortalLayout>
    </BrowserRouter>
  );
}

export default App;
