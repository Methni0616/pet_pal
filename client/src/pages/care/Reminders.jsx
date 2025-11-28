import React, { useState } from "react";
import "./Reminders.css";

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [type, setType] = useState("meal");
  const [time, setTime] = useState("");

  const addReminder = () => {
    if (!time) return;
    const newReminder = { id: Date.now(), type, time };
    setReminders([...reminders, newReminder]);
    setTime("");
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  return (
    <div className="reminders-container">
      <h1 className="title">Reminders</h1>
      <p className="subtitle">Set reminders for meals, walks, grooming, and vet visits 🐾</p>

      <div className="card">
        <h2 className="card-title">Add a Reminder</h2>
        <select
          className="select-box"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="meal">Meal</option>
          <option value="walk">Walk</option>
          <option value="grooming">Grooming</option>
          <option value="vet">Vet Visit</option>
        </select>

        <input
          type="time"
          className="time-input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button onClick={addReminder} className="add-btn">Add Reminder</button>
      </div>

      <div className="card">
        <h2 className="card-title">Your Reminders</h2>
        {reminders.length === 0 ? (
          <p className="subtitle">No reminders added yet.</p>
        ) : (
          <ul className="reminder-list">
            {reminders.map((r) => (
              <li key={r.id} className="reminder-item">
                <span className="reminder-type">{r.type}</span>
                <span>{r.time}</span>
                <button className="delete-btn" onClick={() => deleteReminder(r.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

