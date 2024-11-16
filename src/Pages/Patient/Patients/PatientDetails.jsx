import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import patientService from "../../../Services/patientService";
import Loading from "../../../Components/Loading";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const componentRef = useRef();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        // Fetch patient details using the service
        const response = await patientService.fetchPatientById(id);

        // Check if response is valid and contains patient data
        if (response && response.patient) {
          setPatient(response.patient); // Set patient data if available
        } else {
          alert("Patient details not found.");
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
        alert("Failed to load patient details.");
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurred
      }
    };

    fetchPatientDetails(); // Call the fetch function on component mount
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page { size: A4; margin: 20mm; }
      body { font-family: Arial, sans-serif; padding: 20px; }
    `,
  });

  //   return (
  //     <div className="flex flex-col items-center py-10 bg-gray-100">
  //       <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
  //         <div className="flex items-center mb-6">
  //           <div className="bg-blue-500 rounded-full p-4 mr-4">
  //             <svg
  //               className="w-8 h-8 text-white"
  //               fill="currentColor"
  //               viewBox="0 0 20 20"
  //             >
  //               <path
  //                 fillRule="evenodd"
  //                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-8V5a1 1 0 10-2 0v5H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4z"
  //                 clipRule="evenodd"
  //               />
  //             </svg>
  //           </div>
  //           <div>
  //             <h2 className="text-lg font-semibold">
  //               Said Ahmed Memorial Hospital
  //             </h2>
  //             <p className="text-sm text-gray-600">
  //               This Form is for Patient treatment Process
  //             </p>
  //           </div>
  //         </div>

  //         {loading ? (
  //           <Loading /> // Show loading component while data is being fetched
  //         ) : patient ? (
  //           <div>
  //             <h3 className="text-xl font-semibold text-gray-700 mb-4">
  //               Patient Information
  //             </h3>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700">
  //                 Patient Full Name
  //               </label>
  //               <div className="mt-1 block w-full border rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-1">
  //                 {patient[0].full_name}
  //               </div>
  //             </div>

  //             <div className="grid grid-cols-2 gap-4">
  //               <div>
  //                 <label className="block text-sm font-medium text-gray-700">
  //                   Date of Birth
  //                 </label>
  //                 <div className="mt-1 block w-full border rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-1">
  //                   {patient[0].date_of_birth}
  //                 </div>
  //               </div>
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700">
  //                 Address
  //               </label>
  //               <div className="mt-1 block w-full border rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-1">
  //                 {patient[0].address}
  //               </div>
  //             </div>

  //             <div className="grid grid-cols-2 gap-4">
  //               <div>
  //                 <label className="block text-sm font-medium text-gray-700">
  //                   Gender
  //                 </label>
  //                 <div className="mt-1 block w-full border rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-1">
  //                   {patient[0].gender}
  //                 </div>
  //               </div>

  //               <div>
  //                 <label className="block text-sm font-medium text-gray-700">
  //                   Contact Number
  //                 </label>
  //                 <div className="mt-1 block w-full border rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-1">
  //                   {patient[0].contact_number}
  //                 </div>
  //               </div>
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Is the Camp up-to-date on all immunizations?
  //               </label>
  //               <div className="flex space-x-4">
  //                 <label className="flex items-center">
  //                   <input
  //                     type="radio"
  //                     name="immunizations"
  //                     className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
  //                   />
  //                   <span className="ml-2 text-gray-700">Yes</span>
  //                 </label>
  //                 <label className="flex items-center">
  //                   <input
  //                     type="radio"
  //                     name="immunizations"
  //                     className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
  //                   />
  //                   <span className="ml-2 text-gray-700">No</span>
  //                 </label>
  //               </div>
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700">
  //                 Attach immunization record or waiver
  //               </label>
  //               <input
  //                 type="file"
  //                 className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md cursor-pointer"
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Allergies? Check all that apply
  //               </label>
  //               <div className="flex flex-col space-y-2">
  //                 <label className="flex items-center">
  //                   <input
  //                     type="checkbox"
  //                     className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
  //                   />
  //                   <span className="ml-2 text-gray-700">Food</span>
  //                 </label>
  //                 <label className="flex items-center">
  //                   <input
  //                     type="checkbox"
  //                     className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
  //                   />
  //                   <span className="ml-2 text-gray-700">Medical</span>
  //                 </label>
  //                 <label className="flex items-center">
  //                   <input
  //                     type="checkbox"
  //                     className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
  //                   />
  //                   <span className="ml-2 text-gray-700">Environmental</span>
  //                 </label>
  //               </div>
  //             </div>

  //             {/* Allergy Explanation */}
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700">
  //                 Follow up & Instructions
  //               </label>
  //               <textarea
  //                 rows="10"
  //                 className="mt-1 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //               ></textarea>
  //             </div>

  //             {/* Submit Button */}
  //             <div className="pt-4 text-center">
  //               <button
  //                 onClick={handlePrint}
  //                 className="w-28 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
  //               >
  //                 PDF Print
  //               </button>
  //             </div>
  //           </div>
  //         ) : (
  //           <p>No patient data available for this ID.</p> // In case patient data is not found
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  // export default PatientDetails;
  return (
    <div className="max-w-5xl mx-auto p-4 bg-gray-100">
      {/* Header */}
      <div className="flex-row">
        <div className=" border-b-2 pb-4 mb-6">
          <h1 className="text-2xl font-bold">
            Student Medical Report Form 2017–2018
          </h1>
          <div className="mt-2">
            <h2 className="font-medium">MIT Medical Health Screening</h2>
            <p>77 Massachusetts Ave., Cambridge, MA 02139-4307</p>
            <p>Fax: 617-253-4121</p>
          </div>
        </div>
        <div>
        <h1 className="text-2xl font-bold">
            Student Medical Report Form 2017–2018
          </h1>
          <div className="mt-2">
            <h2 className="font-medium">MIT Medical Health Screening</h2>
            <p>77 Massachusetts Ave., Cambridge, MA 02139-4307</p>
            <p>Fax: 617-253-4121</p>
          </div>
        </div>
      </div>

      {/* Deadlines and Contacts */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm mb-6">
        <div>
          <h3 className="font-semibold">Term</h3>
          <p>Summer: May 12, 2017</p>
          <p>Fall: July 28, 2017</p>
          <p>Spring: January 26, 2018</p>
        </div>
        <div>
          <h3 className="font-semibold">Questions?</h3>
          <p>medical.mit.edu/reportfaq</p>
          <p>Call: 617-253-1777</p>
          <p>Email: medrpt@med.mit.edu</p>
        </div>
      </div>

      {/* Student Demographics */}
      <div className="border rounded-md p-4 mb-6 bg-white">
        <h3 className="font-bold mb-2">Student demographics (check one)</h3>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input type="radio" name="demographics" className="w-4 h-4" />
            <span>Undergraduate</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="demographics" className="w-4 h-4" />
            <span>Graduate</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="demographics" className="w-4 h-4" />
            <span>HST</span>
          </label>
        </div>
      </div>

      {/* Student Information */}
      <div className="border rounded-md p-4 mb-6 bg-white">
        <h3 className="font-bold mb-4">Complete the following information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Last Name</label>
            <input type="text" className="w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">First Name</label>
            <input type="text" className="w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Date of Birth</label>
            <input type="date" className="w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Gender</label>
            <select className="w-full border rounded-md p-2">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Family Health History */}
      <div className="border rounded-md p-4 mb-6 bg-white">
        <h3 className="font-bold mb-4">Family Health History</h3>
        <div className="grid grid-cols-4 gap-2 font-semibold text-sm">
          <p>Family Member</p>
          <p>Age</p>
          <p>In good health?</p>
          <p>Known health problems?</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <input
            type="text"
            className="border rounded-md p-2"
            placeholder="Parent 1"
          />
          <input type="number" className="border rounded-md p-2" />
          <select className="border rounded-md p-2">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <input type="text" className="border rounded-md p-2" />
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
