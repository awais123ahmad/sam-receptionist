import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import patientService from "../../../Services/patientService";
import logo from "../../../assets/logo.png";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const componentRef = useRef();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await patientService.fetchPatientById(id);
        if (response && response.patient) {
          setPatient(response.patient);
        } else {
          setPatient(null);
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setPatient(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPatientDetails();
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page { size: A4; margin: 20mm; }
      body { font-family: Arial, sans-serif; padding: 20px; }
    `,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>Patient data not available.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 bg-gray-100">
      <div className="flex justify-between items-center border-b-2 pb-4 mb-6">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <h1 className="text-2xl font-bold">MIT Medical Health Screening</h1>
        </div>
        <div className="text-right">
          <p className="text-sm">11/16/2024</p>
          <p className="text-lg font-semibold">Fee: $200</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Patient: {patient.full_name || "John Doe"}</h2>
      </div>

      <div className="mb-6">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 w-1/2">Age</td>
              <td className="border border-gray-300 p-2 w-1/2">{patient.age || "35"}</td>
              <td className="border border-gray-300 p-2 w-1/2">Gender</td>
              <td className="border border-gray-300 p-2 w-1/2">{patient.gender || "Male"}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Blood Type</td>
              <td className="border border-gray-300 p-2">{patient.blood_type || "O+"}</td>
              <td className="border border-gray-300 p-2">Address</td>
              <td className="border border-gray-300 p-2">{patient.address || "123 Main St, Cambridge, MA"}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Phone</td>
              <td className="border border-gray-300 p-2">{patient.phone || "(555) 123-4567"}</td>
              <td className="border border-gray-300 p-2">Email</td>
              <td className="border border-gray-300 p-2">{patient.email || "john.doe@email.com"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex">
        <div className="w-1/5 border-r-2 pr-4">
          <div className="mb-6">
            <h3 className="text-lg font-bold">History</h3>
            <p className="mt-2 text-sm">
              {patient.history || "Patient has a history of chronic migraines and hypertension. Previous treatments included lifestyle changes and prescribed medications."}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">Diagnose</h3>
            <p className="mt-2 text-sm">
              {patient.diagnosis || "Recent tests indicate signs of mild anemia and elevated blood pressure levels. Further diagnostic imaging recommended."}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold">Recommendation</h3>
            <p className="mt-2 text-sm">
              {patient.recommendation || (
                <>
                  - Begin a low-sodium diet.<br />
                  - Continue current blood pressure medication.<br />
                  - Schedule follow-up in two weeks.<br />
                  - Consider iron supplements as advised.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="w-4/5 pl-4">
          <div className="mb-6">
            <h3 className="text-lg font-bold">Treatment Recommendation</h3>
            <p className="mt-2 text-sm">
              {patient.treatment_recommendation || (
                <>
                  - Begin a low-sodium diet.<br />
                  - Continue current blood pressure medication.<br />
                  - Schedule follow-up in two weeks.<br />
                  - Consider iron supplements as advised.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
