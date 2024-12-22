// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { pdf } from "@react-pdf/renderer"; // Import `pdf` for generating PDFs
// import patientService from "../../../Services/patientService";
// import doctorService from  "../../../Services/doctorService";
// import PatientReport from "../PatientReport";
// import logo from "../../../assets/logo.png";
// import saleService from "../../../Services/saleService";
// import toast from "react-hot-toast";
// import { useLocation } from "react-router-dom";

// const PatientDetails = () => {
//   const [doctor, setDoctor] = useState(null);
//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const { id } = location.state || {};


//   useEffect(() => {
//     const getPatientsDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await saleService.fetchSale(id);
//         console.log("Fetched Data:", response); // Log full response
//         if (response && response.sale) {
//           setPatient(response.sale[0]); // Access the first patient record
//         } else {
//           toast.error("No sale data found.");
//         }
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         toast.error("Error fetching Patients");
//         console.error("Fetch Error:", error);
//       }
//     };
//     getPatientsDetails();
//   }, [id]);
  

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("en-US", options);
//   };

//   const handlePrint = async () => {
//     const doc = <PatientReport patient={patient} doctor={doctor} />;
//     const blob = await pdf(doc).toBlob();
//     const url = URL.createObjectURL(blob);
//     const newWindow = window.open(url, "_blank");
//     if (newWindow) newWindow.print(); // Automatically open the print dialog
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!patient) {
//     return <div>Patient data not available.</div>;
//   }

//   const calculateAge = (dateOfBirth) => {
//     if (!dateOfBirth) return "N/A";
//     const birthDate = new Date(dateOfBirth);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-4 bg-gray-100">
//       <div className="flex justify-between items-center border-b-2 pb-4 mb-3">
//         <div className="flex items-center space-x-4">
//           <img src={logo} alt="Logo" className="w-16 h-15" />
//         </div>
//         <div className="flex flex-col items-center space-x-4">
//           <h1 className="text-2xl font-bold">Said Ahmed Memorial Hospital</h1>
//           <p className="text-sm">XYZ GT Road, Lahore</p>
//         </div>
//         <div className="text-right">
//           <p className="text-sm">{formatDate(patient?.checkup_date)}</p>
//           <p className="text-sm">{patient.doctor_name}</p>
//           <p className="text-sm">{patient.specialization}</p>
//           <p className="text-sm">{doctor?.name}</p>
//           <p className="text-sm">{doctor?.qualification || "N/A"}</p>

//           <p className="text-lg font-semibold">
//             Patient No: {patient.patient_id}
//           </p>
//         </div>
//       </div>

//       <div className="mb-2">
//         <h2 className="text-xl font-semibold">
//           Patient: {patient.full_name || "John Doe"}
//         </h2>
//       </div>

//       <div className="mb-2">
//         <table className="table-auto w-full border-collapse border border-gray-200 items-center box-border">
//           <tbody>
//             <tr>
//               <td className="border border-gray-300 p-2 ">Age</td>
//               <td className="border border-gray-300 p-2 ">
//               {patient.age || calculateAge(patient.date_of_birth)}
//               </td>
//               <td className="border border-gray-300 p-2 ">Gender</td>
//               <td className="border border-gray-300 p-2 ">
//                 {patient.gender || "Male"}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="font-semibold mt-3 mb-3">
//         <div>Temp:</div>
//         <div>Blood Pressure:</div>
//         <div>Pulse Rate</div>
//       </div>

//       <hr className="border-gray-300 mt-3" />

//       <div className="flex">
//         <div className="w-1/5 border-r-2 pr-4">
//           <div className="mb-6">
//             <h3 className="text-lg font-bold">History</h3>
//             <p className="mt-2 text-sm">
//             {patient.history || (
//                 <>
//                   <br />
//                   <br />
//                   <br />
//                 </>
//               )}
//             </p>
//           </div>
//           <div className="mb-6">
//             <h3 className="text-lg font-bold">Diagnose:</h3>
//             <p className="mt-2 text-sm">
//               {patient.diagnosis || (
//                 <>
//                   <br />
//                   <br />
//                   <br />
//                 </>
//               )}
//             </p>
//           </div>
//           <div className="mb-6">
//             <h3 className="text-lg font-bold">Recommendation:</h3>
//             <p className="mt-2 text-sm">
//             {patient.recommendation || (
//                 <>
//                   <br />
//                   <br />
//                   <br />
//                 </>
//               )} </p>
//           </div>
//         </div>
//         <div className="w-4/5 pl-4">
//           <div className="mb-6">
//             {/* <h3 className="text-lg font-bold">Treatment Recommendation:</h3> */}
//             <p className="mt-2 text-sm">
//             {patient.treatment_recommendation || (
//                 <>
//                   <br />
//                   <br />
//                   <br />
//                 </>
//               )}   </p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-10 flex justify-center">
//       <button
//           onClick={handlePrint}
//           className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
//         >
//           Print PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PatientDetails;




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pdf } from "@react-pdf/renderer"; // Import pdf for generating PDFs
import patientService from "../../../Services/patientService";
import doctorService from  "../../../Services/doctorService";
import PatientReport from "../PatientReport";
import logo from "../../../assets/logo.png";
import saleService from "../../../Services/saleService";
import toast from "react-hot-toast";

const PatientDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getPatientsDetails = async () => {
      try {
        setLoading(true);
        console.log("ID Passed:", id); // Debug ID passed
  
        // Pass the patient ID to the fetchSale function
        const response = await saleService.fetchSale(id);
  
        console.log("API Response:", response); // Debug full response
        console.log("Sale Data:", response.sale); // Debug sale data
  
        if (response && response.sale) {
          const patientData = response.sale.find(
            (sale) => String(sale.patient_id).trim() === String(id).trim()
          );
          console.log("Matched Patient Data:", patientData); // Debug matched data
  
          if (patientData) {
            setPatient(patientData);
          } else {
            toast.error(`No patient data found for ID ${id}.`);
          }
        } else {
          toast.error("No sale data found.");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error fetching patient data.");
        console.error("Fetch Error:", error);
      }
    };
  
    getPatientsDetails();
  }, [id]); // Include id as a dependency if it can change
  
  
  

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handlePrint = async () => {
    const doc = <PatientReport patient={patient} doctor={doctor} />;
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, "_blank");
    if (newWindow) newWindow.print(); // Automatically open the print dialog
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>Patient data not available.</div>;
  }

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-gray-100">
      <div className="flex justify-between items-center border-b-2 pb-4 mb-3">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-16 h-15" />
        </div>
        <div className="flex flex-col items-center space-x-4">
          <h1 className="text-2xl font-bold">Said Ahmed Medical Centre</h1>
          <p className="text-sm">China Road, China Scheme, Lahore</p>
        </div>
        <div className="text-right">
          <p className="text-sm">{formatDate(patient?.checkup_date)}</p>
          <p className="text-sm">{patient.doctor_name}</p>
          <p className="text-sm">{patient.specialization}</p>
          <p className="text-sm">{patient.qualification}</p>

          <p className="text-lg font-semibold">
            Patient No: {patient.patient_id}
          </p>
        </div>
      </div>

      <div className="mb-2">
        <h2 className="text-xl font-semibold">
          Patient: {patient.full_name || "John Doe"}
        </h2>
      </div>

      <div className="mb-2">
        <table className="table-auto w-full border-collapse border border-gray-200 items-center box-border">
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 ">Age</td>
              <td className="border border-gray-300 p-2 ">
              {patient.age || calculateAge(patient.date_of_birth)}
              </td>
              <td className="border border-gray-300 p-2 ">Gender</td>
              <td className="border border-gray-300 p-2 ">
                {patient.gender || "Male"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="font-semibold mt-3 mb-3">
        <div>Temp:</div>
        <div>Blood Pressure:</div>
        <div>Pulse Rate</div>
      </div>

      <hr className="border-gray-300 mt-3" />

      <div className="flex">
        <div className="w-1/5 border-r-2 pr-4">
          <div className="mb-6">
            <h3 className="text-lg font-bold">History</h3>
            <p className="mt-2 text-sm">
            {patient.history || (
                <>
                  <br />
                  <br />
                  <br />
                </>
              )}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold">Diagnose:</h3>
            <p className="mt-2 text-sm">
              {patient.diagnosis || (
                <>
                  <br />
                  <br />
                  <br />
                </>
              )}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold">Recommendation:</h3>
            <p className="mt-2 text-sm">
            {patient.recommendation || (
                <>
                  <br />
                  <br />
                  <br />
                </>
              )} </p>
          </div>
        </div>
        <div className="w-4/5 pl-4">
          <div className="mb-6">
            {/* <h3 className="text-lg font-bold">Treatment Recommendation:</h3> */}
            <p className="mt-2 text-sm">
            {patient.treatment_recommendation || (
                <>
                  <br />
                  <br />
                  <br />
                </>
              )}   </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
      <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Print PDF
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;