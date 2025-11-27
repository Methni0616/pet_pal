import React, { useState } from "react";

export default function HealthRecords() {
  const [medicalDetails, setMedicalDetails] = useState("");
  const [vaccinationDate, setVaccinationDate] = useState("");
  const [treatment, setTreatment] = useState("");

  return (
    <div className="health-records-container">
      <h1 className="health-title">🩺 Health Records</h1>
      <p className="health-subtitle">
        Add and manage your pet’s medical, vaccination, and treatment history.
      </p>

      <div className="health-form">

        {/* Medical Details */}
        <div className="health-section">
          <h2>Medical Details</h2>
          <textarea
            className="health-input"
            placeholder="Enter medical notes (allergies, conditions, past issues)"
            value={medicalDetails}
            onChange={(e) => setMedicalDetails(e.target.value)}
          ></textarea>
        </div>

        {/* Vaccination Dates */}
        <div className="health-section">
          <h2>Vaccination Records</h2>
          <input
            type="date"
            className="health-input"
            value={vaccinationDate}
            onChange={(e) => setVaccinationDate(e.target.value)}
          />
        </div>

        {/* Treatment Details */}
        <div className="health-section">
          <h2>Treatments</h2>
          <textarea
            className="health-input"
            placeholder="Add treatments, medications, or vet-prescribed details"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          ></textarea>
        </div>

        <button className="health-save-btn">Save Records</button>
      </div>
    </div>
  );
}

