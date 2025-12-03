import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyAdoptions.module.css";

export default function MyAdoptions() {
  const navigate = useNavigate();
  const [adoptions, setAdoptions] = useState([]);
  const [filter, setFilter] = useState("All");

  // Load adoptions from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myAdoptions")) || [];
    setAdoptions(stored);
  }, []);

  // Delete adoption request
  const handleDelete = (petId) => {
    const updated = adoptions.filter((a) => a.petId !== petId);
    setAdoptions(updated);
    localStorage.setItem("myAdoptions", JSON.stringify(updated));
  };

  // Filtered list
  const filteredAdoptions =
    filter === "All" ? adoptions : adoptions.filter((a) => a.status === filter);

  return (
    <div className={styles.container}>
      <h1>✅ My Adoptions</h1>
      <p>Track your adoption applications.</p>

      <div className={styles.filterButtons}>
        {["All", "Pending", "Approved", "Completed"].map((f) => (
          <button
            key={f}
            className={filter === f ? styles.activeFilter : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredAdoptions.length === 0 ? (
        <p className={styles.empty}>No adoption requests found 🐾</p>
      ) : (
        <div className={styles.adoptionsGrid}>
          {filteredAdoptions.map((a) => (
            <div key={a.petId} className={styles.adoptionCard}>
              <div className={styles.cardLeft}>
                <img
                  src={`https://source.unsplash.com/160x160/?${a.species.toLowerCase()}`}
                  alt={a.petName}
                  className={styles.petImage}
                />
                <div>
                  <h3>{a.petName}</h3>
                  <p>{a.species}</p>
                  <p>
                    <strong>Date:</strong> {a.date}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`${styles.status} ${
                        a.status === "Pending"
                          ? styles.pending
                          : a.status === "Approved"
                          ? styles.approved
                          : styles.completed
                      }`}
                    >
                      {a.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className={styles.cardRight}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(a.petId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

