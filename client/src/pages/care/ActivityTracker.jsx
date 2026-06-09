import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import styles from "./ActivityTracker.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function ActivityTracker() {
  const { petId } = useParams();
  const [activities, setActivities] = useState([]);

  const [petName, setPetName] = useState("");
  const [activityType, setActivityType] = useState("Walk");
  const [duration, setDuration] = useState("");
  const [activityDate, setActivityDate] = useState("");

  const [selectedPet, setSelectedPet] = useState("All");

  useEffect(() => {
    if (petId) {
      loadActivities();
    }
  }, [petId]);

  const loadActivities = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/activities/pet/${petId}`,
      );

      setActivities(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addActivity = async () => {
    if (!petName || !duration || !activityDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/activities", {
        petId,
        petName,
        activityType,
        duration,
        activityDate,
      });

      setPetName("");
      setDuration("");
      setActivityDate("");

      loadActivities();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteActivity = async (id) => {
    if (!window.confirm("Delete this activity?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/activities/${id}`);

      loadActivities();
    } catch (error) {
      console.error(error);
    }
  };

  const petNames = ["All", ...new Set(activities.map((a) => a.petName))];

  const filteredActivities =
    selectedPet === "All"
      ? activities
      : activities.filter((a) => a.petName === selectedPet);

  const totals = {
    Walk: 0,
    Play: 0,
    Exercise: 0,
  };

  filteredActivities.forEach((a) => {
    totals[a.activityType] += Number(a.duration);
  });

  const chartData = {
    labels: ["Walk", "Play", "Exercise"],

    datasets: [
      {
        label: "Minutes",
        data: [totals.Walk, totals.Play, totals.Exercise],
        backgroundColor: ["#ec8f48", "#db6027", "#ffb347"],
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className={styles.activityContainer}>
      <div className={styles.heroSection}>
        <h1>🐾 Activity Tracker</h1>

        <p>Track walks, exercise and playtime for your pets.</p>
      </div>

      <div className={styles.formCard}>
        <h2>Add New Activity</h2>

        <div className={styles.formGrid}>
          <input
            type="text"
            placeholder="Pet Name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />

          <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
          >
            <option>Walk</option>
            <option>Play</option>
            <option>Exercise</option>
          </select>

          <input
            type="number"
            placeholder="Duration (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <input
            type="date"
            value={activityDate}
            onChange={(e) => setActivityDate(e.target.value)}
          />
        </div>

        <button className={styles.addBtn} onClick={addActivity}>
          Add Activity
        </button>
      </div>

      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <h2>📊 Activity Summary</h2>

          <select
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value)}
            className={styles.petFilter}
          >
            {petNames.map((pet) => (
              <option key={pet} value={pet}>
                {pet}
              </option>
            ))}
          </select>
        </div>

        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className={styles.activityGrid}>
        {filteredActivities.map((activity) => (
          <div key={activity._id} className={styles.activityCard}>
            <h3>{activity.petName}</h3>

            <p>
              <strong>Activity:</strong> {activity.activityType}
            </p>

            <p>
              <strong>Duration:</strong> {activity.duration} min
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(activity.activityDate).toLocaleDateString()}
            </p>

            <button
              className={styles.deleteBtn}
              onClick={() => deleteActivity(activity._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
