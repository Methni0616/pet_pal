import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import styles from "./PetDashboard.module.css";

export default function PetDashboard() {
  const { petId } = useParams();

  const [data, setData] =
    useState(null);

  useEffect(() => {
    loadDashboard();
  }, [petId]);

  const loadDashboard = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/dashboard/${petId}`
      );

      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    return (
      <h2 className={styles.loading}>
        Loading Dashboard...
      </h2>
    );
  }

  return (
    <div className={styles.container}>
      <h1>
        📊 {data.pet.name}'s Dashboard
      </h1>

      <div className={styles.petHeader}>
        <img
          src={data.pet.image}
          alt={data.pet.name}
        />

        <div>
          <h2>{data.pet.name}</h2>

          <p>
            <strong>Species:</strong>{" "}
            {data.pet.species}
          </p>

          <p>
            <strong>Breed:</strong>{" "}
            {data.pet.breed}
          </p>

          <p>
            <strong>Age:</strong>{" "}
            {data.pet.age}
          </p>
        </div>
      </div>

      <div className={styles.healthCard}>
        <h2>Health Score</h2>

        <div
          className={
            styles.healthScore
          }
        >
          {data.healthScore}%
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          💉
          <h3>
            {
              data.stats
                .vaccinations
            }
          </h3>
          <p>Vaccinations</p>
        </div>

        <div className={styles.card}>
          ⚖
          <h3>
            {data.stats.weights}
          </h3>
          <p>Weight Records</p>
        </div>

        <div className={styles.card}>
          💊
          <h3>
            {
              data.stats
                .medications
            }
          </h3>
          <p>Medications</p>
        </div>

        <div className={styles.card}>
          🏥
          <h3>
            {
              data.stats
                .vetVisits
            }
          </h3>
          <p>Vet Visits</p>
        </div>

        <div className={styles.card}>
          🍽
          <h3>
            {
              data.stats
                .feedings
            }
          </h3>
          <p>Feedings</p>
        </div>

        <div className={styles.card}>
          📋
          <h3>
            {
              data.stats
                .healthRecords
            }
          </h3>
          <p>Health Records</p>
        </div>
      </div>

      <div className={styles.latestCard}>
        <h2>
          Latest Weight
        </h2>

        <h3>
          {data.latestWeight} kg
        </h3>
      </div>
    </div>
  );
}