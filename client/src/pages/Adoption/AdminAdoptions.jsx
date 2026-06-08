import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AdminAdoptions.module.css";

export default function AdminAdoptions() {
  const navigate = useNavigate();

  const [adoptions, setAdoptions] =
    useState([]);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (
      !user ||
      user.role !== "admin"
    ) {
      navigate("/");
      return;
    }

    loadAdoptions();
  }, []);

  const loadAdoptions = () => {
    axios
      .get(
        "http://localhost:5000/api/adoptions"
      )
      .then((res) => {
        setAdoptions(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateStatus = async (
    id,
    status
  ) => {
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
    <div className={styles.adminContainer}>
      <h1 className={styles.adminTitle}>
        🛠 Admin Adoption Requests
      </h1>

      {adoptions.length === 0 ? (
        <p>No adoption requests found.</p>
      ) : (
        adoptions.map((adoption) => (
          <div
            key={adoption._id}
            className={styles.adoptionCard}
          >
            <h2>{adoption.petName}</h2>

            <div className={styles.infoGrid}>
              <p>
                <strong>Applicant:</strong>{" "}
                {adoption.userName ||
                  adoption.applicantName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {adoption.userEmail ||
                  adoption.email}
              </p>

              <p>
                <strong>Contact:</strong>{" "}
                {adoption.contact}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {adoption.address}
              </p>

              <p>
                <strong>Occupation:</strong>{" "}
                {adoption.occupation}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  adoption.createdAt
                ).toLocaleDateString()}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {adoption.status}
              </p>
            </div>

            <div className={styles.reasonBox}>
              <strong>Reason</strong>
              <p>{adoption.reason}</p>
            </div>

            <div className={styles.buttonRow}>
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
          </div>
        ))
      )}
    </div>
  );
}