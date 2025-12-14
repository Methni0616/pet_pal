import React, { useEffect, useState } from "react";
import styles from "./MyAdoptions.module.css";

export default function MyAdoptions() {
  const [adoptions, setAdoptions] = useState([]);
  const [filter, setFilter] = useState("All");

  // Load adoptions from localStorage
  useEffect(() => {
    const storedAdoptions =
      JSON.parse(localStorage.getItem("myAdoptions")) || [];
    setAdoptions(storedAdoptions);
  }, []);

  // Delete adoption safely (by index)
  const handleDelete = (deleteIndex) => {
    const updatedAdoptions = adoptions.filter(
      (_, index) => index !== deleteIndex
    );

    setAdoptions(updatedAdoptions);
    localStorage.setItem(
      "myAdoptions",
      JSON.stringify(updatedAdoptions)
    );
  };

  // Filter adoptions by status
  const filteredAdoptions =
    filter === "All"
      ? adoptions
      : adoptions.filter((adoption) => adoption.status === filter);

  return (
    <div className={styles.container}>
      <h1>✅ My Adoptions</h1>
      <p>Track your adoption applications.</p>

      {/* Filter Buttons */}
      <div className={styles.filterButtons}>
        {["All", "Pending", "Approved", "Completed"].map((status) => (
          <button
            key={status}
            className={filter === status ? styles.activeFilter : ""}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Adoption List */}
      {filteredAdoptions.length === 0 ? (
        <p className={styles.empty}>No adoption requests found 🐾</p>
      ) : (
        <div className={styles.adoptionsGrid}>
          {filteredAdoptions.map((adoption, index) => (
            <div
              key={`${adoption.petName}-${index}`}
              className={styles.adoptionCard}
            >
              <div className={styles.cardLeft}>
                <div>
                  <h3>{adoption.petName}</h3>
                  <p>{adoption.species}</p>
                  <p>
                    <strong>Date:</strong> {adoption.date}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`${styles.status} ${
                        adoption.status === "Pending"
                          ? styles.pending
                          : adoption.status === "Approved"
                          ? styles.approved
                          : styles.completed
                      }`}
                    >
                      {adoption.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className={styles.cardRight}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(index)}
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

