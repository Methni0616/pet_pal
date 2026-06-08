import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./MyAdoptions.module.css";

export default function MyAdoptions() {
  const navigate = useNavigate();

  const [adoptions, setAdoptions] =
    useState([]);

  const [filter, setFilter] =
    useState("All");

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    loadAdoptions();
  }, []);

  const loadAdoptions = () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    axios
      .get(
        `http://localhost:5000/api/adoptions/user/${user._id}`
      )
      .then((res) => {
        setAdoptions(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const filteredAdoptions =
    filter === "All"
      ? adoptions
      : adoptions.filter(
          (adoption) =>
            adoption.status === filter
        );

  return (
    <div className={styles.container}>
      <h1>✅ My Adoptions</h1>

      <p>
        Track your adoption applications.
      </p>

      <div className={styles.filterButtons}>
        {[
          "All",
          "Pending",
          "Approved",
          "Completed",
        ].map((status) => (
          <button
            key={status}
            className={
              filter === status
                ? styles.activeFilter
                : ""
            }
            onClick={() =>
              setFilter(status)
            }
          >
            {status}
          </button>
        ))}
      </div>

      {filteredAdoptions.length === 0 ? (
        <p className={styles.empty}>
          No adoption requests found 🐾
        </p>
      ) : (
        <div className={styles.adoptionsGrid}>
          {filteredAdoptions.map(
            (adoption) => (
              <div
                key={adoption._id}
                className={
                  styles.adoptionCard
                }
              >
                <h3>
                  {adoption.petName}
                </h3>

                <p>
                  <strong>
                    Species:
                  </strong>{" "}
                  {adoption.species}
                </p>

                <p>
                  <strong>
                    Applicant:
                  </strong>{" "}
                  {adoption.userName}
                </p>

                <p>
                  <strong>
                    Email:
                  </strong>{" "}
                  {adoption.userEmail}
                </p>

                <p>
                  <strong>
                    Contact:
                  </strong>{" "}
                  {adoption.contact}
                </p>

                <p>
                  <strong>
                    Address:
                  </strong>{" "}
                  {adoption.address}
                </p>

                <p>
                  <strong>
                    Occupation:
                  </strong>{" "}
                  {adoption.occupation}
                </p>

                <p>
                  <strong>
                    Reason:
                  </strong>{" "}
                  {adoption.reason}
                </p>

                <p>
                  <strong>
                    Date:
                  </strong>{" "}
                  {new Date(
                    adoption.createdAt
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  <span
                    className={`${styles.status}
                    ${
                      adoption.status ===
                      "Pending"
                        ? styles.pending
                        : ""
                    }
                    ${
                      adoption.status ===
                      "Approved"
                        ? styles.approved
                        : ""
                    }
                    ${
                      adoption.status ===
                      "Completed"
                        ? styles.completed
                        : ""
                    }`}
                  >
                    {adoption.status}
                  </span>
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}