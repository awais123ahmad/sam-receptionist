import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import patientService from "../../../Services/patientService";
import PatientReport from "../PatientReport";
import logo from "../../../assets/logo.png";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>Patient data not available.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 bg-gray-100">
      <div className="flex justify-between items-center border-b-2 pb-4 mb-3">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-12 h-12" />
        </div>
        <div className="flex flex-col items-center space-x-4">
          <h1 className="text-2xl font-bold">Said Ahmed Memorial Hospital</h1>
          <p className="text-sm">XYZ GT Road, Lahore</p>
        </div>
        <div className="text-right">
          <p className="text-sm">11/16/2024</p>
          <p className="text-sm">Dr. Mukesh</p>
          <p className="text-sm">MBBS, FCPS (Obstetrician &Gynecology) </p>

          <p className="text-lg font-semibold">Fee: $200</p>
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
                {patient.age || "35"}
              </td>
              <td className="border border-gray-300 p-2 ">Gender</td>
              <td className="border border-gray-300 p-2 ">
                {patient.gender || "Male"}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Blood Type</td>
              <td className="border border-gray-300 p-2">
                {patient.blood_type || "O+"}
              </td>
              <td className="border border-gray-300 p-2">Address</td>
              <td className="border border-gray-300 p-2">
                {patient.address || "123 Main St, Cambridge, MA"}
              </td>
            </tr>
            {/* <tr>
        <td className="border border-gray-300 p-2">Phone</td>
        <td className="border border-gray-300 p-2">{patient.phone || "(555) 123-4567"}</td>
        <td className="border border-gray-300 p-2">Email</td>
        <td className="border border-gray-300 p-2">{patient.email || "john.doe@email.com"}</td>
      </tr> */}
          </tbody>
        </table>
      </div>

      <div className="font-semibold mt-3 mb-3">
        <div>Temp:</div>
        <div>Blood Pressure:</div>
      </div>

      <hr className="border-gray-300 mt-3" />

      <div className="flex">
        <div className="w-1/5 border-r-2 pr-4">
          <div className="mb-6">
            <h3 className="text-lg font-bold">History</h3>
            <p className="mt-2 text-sm">
              {patient.history ||
                "Patient has a history of chronic migraines and hypertension."}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold">Diagnose</h3>
            <p className="mt-2 text-sm">
              {patient.diagnosis ||
                "Recent tests indicate signs of mild anemia and elevated blood pressure levels."}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold">Recommendation</h3>
            <p className="mt-2 text-sm">
              {patient.recommendation ||
                "- Begin a low-sodium diet.\n- Continue current blood pressure medication.\n- Schedule follow-up in two weeks.\n- Consider iron supplements as advised."}
            </p>
          </div>
        </div>
        <div className="w-4/5 pl-4">
          <div className="mb-6">
            <h3 className="text-lg font-bold">Treatment Recommendation</h3>
            <p className="mt-2 text-sm">
              {patient.treatment_recommendation ||
                "- Begin a low-sodium diet.\n- Continue current blood pressure medication.\n- Schedule follow-up in two weeks.\n- Consider iron supplements as advised."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <PDFDownloadLink
          document={<PatientReport patient={patient} />}
          fileName={`patient_${id}.pdf`}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PatientDetails;
