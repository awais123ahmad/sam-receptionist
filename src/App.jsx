import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./index.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import PortalLayout from "./Components/PortalLayout";
import Patients from "./Pages/Patient/Patients/Patients";
import AddEditPatient from "./Pages/Patient/Patients/AddEditPatient";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PatientDashboard from "./Pages/Patient/Patient_Dashboard/PatientDashboard"
import MedicalStore from "./Pages/Dispensaries/Dispensary/MedicalStore";
import PatientDetails from "./Pages/Patient/Patients/PatientDetails";
//import AddEditMedicalStore from "./Pages/Dispensaries/Dispensary/AddEditMedicalStore";
import AddEditMedicalStore from "./Pages/Account/PurchaseMedicine/AddEditMedicalStore";
import SaleMedicine from "./Pages/Dispensaries/Dispensary/SaleMedicine";
import Income from "./Pages/Account/Income/Income";
import AdminPatients from "./Pages/Admin/Patients/AdminPatients";
import Doctors from "./Pages/Admin/Doctors/Doctors";
import Medicines from "./Pages/Admin/Medicines/Medicines";
import AddEditDoctors from "./Pages/Admin/Doctors/AddEditDoctors";
import RegisterUsers from "./Pages/Admin/RegisteredUsers/RegisterUsers";
import AddEditUsers from "./Pages/Admin/RegisteredUsers/AddEditUsers";
import LoginPage from "./Pages/Login/Login"
import AddEditIncome from "./Pages/Account/Income/AddEditIncome";
import Staff from "./Pages/Admin/Staff/Staff";
import AddEditStaff from "./Pages/Admin/Staff/AddEditStaff";
import AdminDashboard from "./Pages/Admin/Admin_Dashboard/AdminDashboard";

function App() {
  const [count, setCount] = useState(0);
 

  return (
    <BrowserRouter>
      <PortalLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage/>} />
          {/* <Route path="/loginpage" element={<LoginPage />} /> */}

          {/* // Patient ================================================================= */}
          <Route path="/patient/patients" element={<Patients />} />
          <Route path="/patient/patients/:id" element={<PatientDetails />} />
          <Route path="/patient/patients/AddEdit" element={<AddEditPatient />} />


          <Route path="/patient/patientdashboard" element={<PatientDashboard />} />

           {/* // Medical Records ======================================================== */}
           <Route path="/dispensaries/dispensary" element={<MedicalStore />} />
           <Route path="/dispensaries/dispensary/AddEditMedical" element={<AddEditMedicalStore />} />
           <Route path="/dispensaries/dispensary/SaleMedicine" element={<SaleMedicine />} />

            {/* // Admin Records ======================================================== */}

            <Route path="admin/staff" element={<Staff />} />
            <Route path="/admin/admindasboard" element={<AdminDashboard />} />

           <Route path="admin/staff/AddEditStaff" element={<AddEditStaff />} />

           <Route path="admin/register" element={<RegisterUsers />} />
           <Route path="admin/register/AddEditUser" element={<AddEditUsers />} />
           
            <Route path="admin/doctor" element={<Doctors />} />
           <Route path="admin/doctor/AddEditDoctor" element={<AddEditDoctors />} />

           <Route path="/admin/patients" element={<AdminPatients />} />
           <Route path="/admin/patients/AddEditpatients" element={<AddEditPatient />} />

           <Route path="/admin/medicines" element={<Medicines />} />
           <Route path="/admin/patients/AddEditpatients" element={<AddEditPatient />} />
               
           {/* // Account Records ======================================================== */}
           <Route path="account/purchasemedicine" element={<AddEditMedicalStore />} />

           <Route path="account/income" element={<Income />} />
           <Route path="account/income/AddEditIncome" element={<AddEditIncome />} />

           <Route path="account/expense" element={< Patients/>} />
           <Route path="account/income/AddEditIncome" element={<AddEditPatient />} />



        </Routes>
      </PortalLayout>
    </BrowserRouter>
  );
}

export default App;



// import { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import PortalLayout from "./Components/PortalLayout";
// import Dashboard from "./Pages/Dashboard/Dashboard";
// import MedicalStore from "./Pages/Dispensaries/Dispensary/MedicalStore";
// import PatientDetails from "./Pages/Patient/Patients/PatientDetails";
// import AddEditPatient from "./Pages/Patient/Patients/AddEditPatient";
// import Income from "./Pages/Account/Income/Income";
// import AdminPatients from "./Pages/Admin/Patients/AdminPatients";
// import Doctors from "./Pages/Admin/Doctors/Doctors";
// import RegisterUsers from "./Pages/Admin/RegisteredUsers/RegisterUsers";
// import AddEditUsers from "./Pages/Admin/RegisteredUsers/AddEditUsers";
// import LoginPage from "./Pages/Login/Login";
// import AddEditDoctors from "./Pages/Admin/Doctors/AddEditDoctors";

// function App() {
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     // Fetch user data from localStorage
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       setUserRole(user.role); // Set user role from localStorage
//     } else {
//       setUserRole(null); // No user logged in
//     }
//   }, []);

//   if (userRole === null) {
//     return <LoginPage />; // If no role is set, show login page
//   }

//   return (
//     <BrowserRouter>
//       <PortalLayout>
//         <Routes>
//           {/* Common Routes */}
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/login" element={<LoginPage />} />
          
//           {/* Patient Routes */}
//           <Route path="/patient/patients" element={<PatientDetails />} />
//           <Route path="/patient/patients/:id" element={<PatientDetails />} />
//           <Route path="/patient/patients/AddEdit" element={<AddEditPatient />} />

//           {/* Medical Store Routes */}
//           <Route path="/dispensaries/dispensary" element={<MedicalStore />} />
          
//           {/* Admin Routes - Only visible to admins */}
//           {userRole === "admin" && (
//             <>
//               <Route path="/admin/register" element={<RegisterUsers />} />
//               <Route path="/admin/register/AddEditUser" element={<AddEditUsers />} />
//               <Route path="/admin/doctor" element={<Doctors />} />
//               <Route path="/admin/doctor/AddEditDoctor" element={<AddEditDoctors />} />
//               <Route path="/admin/patients" element={<AdminPatients />} />
//             </>
//           )}

//           {/* Account Routes - Visible to all users except admin */}
//           {userRole !== "admin" && (
//             <Route path="/account/income" element={<Income />} />
//           )}
//         </Routes>
//       </PortalLayout>
//     </BrowserRouter>
//   );
// }

// export default App;
