import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../../Services/patientService";
import Loading from "../../../Components/Loading"; // Assuming this is your loading component

const PatientDetails = () => {
  const { id } = useParams();  // Extract the patient id from the URL parameters
  const [patient, setPatient] = useState(null);  // Initialize state to store patient data
  const [loading, setLoading] = useState(true);  // Loading state to control loading indicator

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        // Fetch patient details using the service
        const response = await patientService.fetchPatientById(id);

        // Check if response is valid and contains patient data
        if (response && response.patient) {
          setPatient(response.patient);  // Set patient data if available
        } else {
          alert("Patient details not found.");
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
        alert("Failed to load patient details.");
      } finally {
        setLoading(false);  // Set loading to false once data is fetched or error occurred
      }
    };

    fetchPatientDetails();  // Call the fetch function on component mount
  }, [id]);

  const handlePrint = () => {
    window.print();  // Function to print the page
  };

  useEffect(() => {

    console.log(patient);
    
  })

  return (
    <div className="p-4">
      {loading ? (
        <Loading />  // Show loading component while data is being fetched
      ) : (
        patient ? (
          <div className="bg-white shadow-lg p-6 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-4">Patient Details</h2>
            <p><strong>Name:</strong> {patient[0].full_name}</p>
            <p><strong>Email:</strong> {patient[0].email}</p>
            <p><strong>Contact:</strong> {patient[0].contact_number}</p>
            <p><strong>Gender:</strong> {patient[0].gender}</p>
            <p><strong>Address:</strong> {patient[0].address}</p>

            <button onClick={handlePrint} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              Print PDF
            </button>
          </div>
        ) : (
          <p>No patient data available for this ID.</p>  // In case patient data is not found
        )
      )}
    </div>
  );
};

export default PatientDetails;
