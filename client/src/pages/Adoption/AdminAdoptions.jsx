import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AdminAdoptions.module.css";

export default function AdminAdoptions() {
  const navigate = useNavigate();

  const [adoptions, setAdoptions] = useState([]);
  const [search, setSearch] = useState("");

  const pendingCount = adoptions.filter(
    (a) => a.status === "Pending"
  ).length;

  const approvedCount = adoptions.filter(
    (a) => a.status === "Approved"
  ).length;

  const completedCount = adoptions.filter(
    (a) => a.status === "Completed"
  ).length;

  const filteredAdoptions = adoptions.filter(
    (adoption) =>
      adoption.petName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      adoption.userName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      adoption.userEmail
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

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
    <div className={styles.adminContainer}>
      <h1 className={styles.adminTitle}>
        🛠 Admin Adoption Requests
      </h1>

      {/* Statistics */}
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <h2>{pendingCount}</h2>
          <p>Pending</p>
        </div>

        <div className={styles.statCard}>
          <h2>{approvedCount}</h2>
          <p>Approved</p>
        </div>

        <div className={styles.statCard}>
          <h2>{completedCount}</h2>
          <p>Completed</p>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔍 Search by pet name, applicant or email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className={styles.searchInput}
        />
      </div>

      {filteredAdoptions.length === 0 ? (
        <p>No matching adoption requests found.</p>
      ) : (
        filteredAdoptions.map((adoption) => (
          <div
            key={adoption._id}
            className={styles.adoptionCard}
          >
            <h2>{adoption.petName}</h2>

            <div className={styles.infoGrid}>
              <p>
                <strong>Applicant:</strong>{" "}
                {adoption.userName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {adoption.userEmail}
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
              {adoption.status ===
                "Pending" && (
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
              )}

              {adoption.status ===
                "Approved" && (
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
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}