import React, { useState } from "react";
import "./ActivityTracker.css";

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
            placeholder="Duration e.g., 30 min, 1 hour"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <button onClick={addActivity} className="add-btn">Add Activity</button>
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
                <span>{a.duration}</span>
                <button className="delete-btn" onClick={() => deleteActivity(a.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
