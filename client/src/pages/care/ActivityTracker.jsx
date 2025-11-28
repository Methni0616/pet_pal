import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./ActivityTracker.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ActivityTracker() {
  const [activities, setActivities] = useState([]);
  const [type, setType] = useState("walk");
  const [duration, setDuration] = useState("");

  const addActivity = () => {
    if (!duration) return;
    const newActivity = { id: Date.now(), type, duration };
    setActivities([...activities, newActivity]);
    setDuration("");
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  // Prepare data for chart
  const activityTotals = activities.reduce(
    (totals, a) => {
      const min = parseInt(a.duration); // Simple: assumes duration in minutes
      if (!isNaN(min)) totals[a.type] += min;
      return totals;
    },
    { walk: 0, play: 0, exercise: 0 }
  );

  const data = {
    labels: ["Walk", "Playtime", "Exercise"],
    datasets: [
      {
        label: "Minutes",
        data: [activityTotals.walk, activityTotals.play, activityTotals.exercise],
        backgroundColor: ["#ec8f48", "#db6027", "#1e40af"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Activity Tracker Chart" },
    },
  };

  return (
    <div className="activity-container">
      <h1 className="title">Activity Tracker</h1>
      <p className="subtitle">Track exercise, walking distance, or playtime 🐾</p>

      <div className="card">
        <h2 className="card-title">Add Activity</h2>
        <div className="auth-form">
          <select className="select-box" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="walk">Walk</option>
            <option value="play">Playtime</option>
            <option value="exercise">Exercise</option>
          </select>

          <input
            type="text"
            className="time-input"
            placeholder="Duration in minutes"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <button onClick={addActivity} className="add-btn">
            Add Activity
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Your Activities</h2>
        {activities.length === 0 ? (
          <p className="subtitle">No activities tracked yet.</p>
        ) : (
          <ul className="activity-list">
            {activities.map((a) => (
              <li key={a.id} className="activity-item">
                <span className="activity-type">{a.type}</span>
                <span>{a.duration} min</span>
                <button className="delete-btn" onClick={() => deleteActivity(a.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h2 className="card-title">Activity Chart</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
