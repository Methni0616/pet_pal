import React from "react";
import { useParams } from "react-router-dom";

export default function Shelter() {
  const { id } = useParams();
  return (
    <div>
      <h1>Shelter Info - ID: {id}</h1>
      <p>Details about the shelter or organization managing this pet.</p>
    </div>
  );
}
