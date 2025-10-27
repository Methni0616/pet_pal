import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Pet Details - ID: {id}</h1>
      <p>Here will be the full profile of the pet including photo, breed, vaccinations, and shelter info.</p>
      <button onClick={() => navigate(`/adoption-form/${id}`)}>Apply for Adoption</button>
    </div>
  );
}
