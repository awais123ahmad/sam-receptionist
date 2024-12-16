  import { useEffect, useState } from "react";
  import reactLogo from "./assets/react.svg";
  import "./index.css";
  import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
  import PortalLayout from "./Components/PortalLayout";
  import Patients from "./Pages/Patient/Patients/Patients";
  import AddEditPatient from "./Pages/Patient/Patients/AddEditPatient";
  import PatientDetails from "./Pages/Patient/Patients/PatientDetails";
  import Login from "./Pages/Login/Login"
  import Cookies from 'js-cookie';
  import { Toaster } from "react-hot-toast"; 

  function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login')
      }
    }, [isAuthenticated])

    useEffect(() => {
      const token = Cookies.get("XIOQUNVU1RPTUVSLUFVVEhFTlRJQ0FUSU9OIMSLQ1JFVC1LRVk=");
      if (token) {
        setIsAuthenticated(true);  // User is authenticated
      } else {
        setIsAuthenticated(false); // No token found, set to false
      }
    }, [location.pathname]);  // Check authentication on path change
    

    return (
          <Routes>
          <Route path="/" element={<Navigate to="/receptionist" replace />} />
          <Route path="/receptionist" element={isAuthenticated ? <PortalLayout> <Patients /> </PortalLayout> : <Navigate to="/login" />} />

          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/receptionist" />} />
          <Route path="/receptionist/:id" element={isAuthenticated ? <PortalLayout> <PatientDetails /> </PortalLayout> : <Navigate to="/login" />} />
          <Route path="/receptionist/AddEdit" element={isAuthenticated ? <PortalLayout>  <AddEditPatient /> </PortalLayout> : <Navigate to="/login" />} />
          </Routes>
          
    );
  }

  export default App;