import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminAdoptions() {
  const navigate = useNavigate();

  const [adoptions, setAdoptions] = useState([]);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    loadAdoptions();
  }, []);

  const loadAdoptions = () => {
    axios
      .get("http://localhost:5000/api/adoptions")
      .then((res) => {
        setAdoptions(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/adoptions/${id}`,
        { status }
      );

      loadAdoptions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Adoption Requests</h1>

      {adoptions.map((adoption) => (
        <div
          key={adoption._id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>{adoption.petName}</h3>

          <p>
            Applicant:{" "}
            {adoption.userName ||
              adoption.applicantName}
          </p>

          <p>
            Email:{" "}
            {adoption.userEmail ||
              adoption.email}
          </p>

          <p>Status: {adoption.status}</p>

          <button
            onClick={() =>
              updateStatus(
                adoption._id,
                "Approved"
              )
            }
          >
            Approve
          </button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() =>
              updateStatus(
                adoption._id,
                "Completed"
              )
            }
          >
            Complete
          </button>
        </div>
      ))}
    </div>
  );
}