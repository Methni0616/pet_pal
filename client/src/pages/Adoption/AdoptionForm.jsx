import React from "react";
import { useParams } from "react-router-dom";

export default function AdoptionForm() {
  const { id } = useParams();
  return (
    <div>
      <h1>Adoption Form for Pet ID: {id}</h1>
      <form>
        <input type="text" placeholder="Your Name" /><br />
        <input type="email" placeholder="Email" /><br />
        <textarea placeholder="Why do you want to adopt?"></textarea><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
