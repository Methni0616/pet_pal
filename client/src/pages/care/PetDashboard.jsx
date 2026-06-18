import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { generatePetReport } from "../../utils/generatePetReport";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import styles from "./PetDashboard.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function PetDashboard() {
  const { petId } = useParams();

  const [data, setData] = useState(null);
  const [weightRecords, setWeightRecords] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, [petId]);

  const loadDashboard = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/dashboard/${petId}`,
      );

      const weightRes = await axios.get(
        `http://localhost:5000/api/weights/pet/${petId}`,
      );

      setData(res.data);
      setWeightRecords(weightRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const weightChartData = {
    labels: weightRecords.map((record) =>
      new Date(record.recordDate).toLocaleDateString(),
    ),

    datasets: [
      {
        label: "Weight (kg)",

        data: weightRecords.map((record) => record.weight),

        borderColor: "#db6027",

        backgroundColor: "#ec8f48",

        tension: 0.4,

        fill: false,
      },
    ],
  };

  if (!data) {
    return <h2 className={styles.loading}>Loading Dashboard...</h2>;
  }

  return (
    <div className={styles.container}>
      <h1>📊 {data.pet.name}'s Dashboard</h1>

      <div className={styles.petHeader}>
        <img src={data.pet.image} alt={data.pet.name} />

        <div>
          <h2>{data.pet.name}</h2>

          <p>
            <strong>Species:</strong> {data.pet.species}
          </p>

          <p>
            <strong>Breed:</strong> {data.pet.breed}
          </p>

          <p>
            <strong>Age:</strong> {data.pet.age}
          </p>
        </div>
      </div>

      <div className={styles.healthCard}>
        <h2>Health Score</h2>

        <div className={styles.healthScore}>{data.healthScore}%</div>
      </div>

      <div className={styles.reportSection}>
        <button
          className={styles.reportBtn}
          onClick={() => generatePetReport(data)}
        >
          📄 Download Health Report
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          💉
          <h3>{data.stats.vaccinations}</h3>
          <p>Vaccinations</p>
        </div>

        <div className={styles.card}>
          ⚖️
          <h3>{data.stats.weights}</h3>
          <p>Weight Records</p>
        </div>

        <div className={styles.card}>
          💊
          <h3>{data.stats.medications}</h3>
          <p>Medications</p>
        </div>

        <div className={styles.card}>
          🏥
          <h3>{data.stats.vetVisits}</h3>
          <p>Vet Visits</p>
        </div>

        <div className={styles.card}>
          🍽️
          <h3>{data.stats.feedings}</h3>
          <p>Feedings</p>
        </div>

        <div className={styles.card}>
          📋
          <h3>{data.stats.healthRecords}</h3>
          <p>Health Records</p>
        </div>
      </div>

      <div className={styles.latestCard}>
        <h2>Latest Weight</h2>

        <h3>{data.latestWeight || 0} kg</h3>
      </div>

      <div className={styles.chartCard}>
        <h2>📈 Weight History</h2>

        {weightRecords.length > 0 ? (
          <Line data={weightChartData} />
        ) : (
          <p>No weight records available.</p>
        )}
      </div>
    </div>
  );
}
