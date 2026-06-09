import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./Reminders.module.css";

export default function Reminders() {
  const { petId } = useParams();
  const [reminders, setReminders] = useState([]);
  const [petName, setPetName] = useState("");
  const [type, setType] = useState("meal");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (petId) {
      loadReminders();
    }
  }, [petId]);

  const loadReminders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/reminders/pet/${petId}`,
      );

      setReminders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addReminder = async () => {
    if (!petName || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reminders", {
        petId,
        petName,
        type,
        date,
        time,
      });

      setPetName("");
      setType("meal");
      setDate("");
      setTime("");

      loadReminders();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReminder = async (id) => {
    const confirmDelete = window.confirm("Delete this reminder?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/reminders/${id}`);

      loadReminders();
    } catch (error) {
      console.error(error);
    }
  };

  const getReminderIcon = (type) => {
    switch (type) {
      case "meal":
        return "🍖";
      case "walk":
        return "🚶";
      case "grooming":
        return "✂️";
      case "vet":
        return "🩺";
      default:
        return "🐾";
    }
  };

  return (
    <div className={styles.remindersContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>⏰ Pet Reminders</h1>

        <p className={styles.subtitle}>
          Never miss a meal, walk, grooming session, or vet appointment.
        </p>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Add Reminder */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Add New Reminder</h2>

          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Pet Name"
              className={styles.input}
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
            />

            <select
              className={styles.select}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="meal">🍖 Meal</option>

              <option value="walk">🚶 Walk</option>

              <option value="grooming">✂️ Grooming</option>

              <option value="vet">🩺 Vet Visit</option>
            </select>

            <input
              type="date"
              className={styles.input}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="time"
              className={styles.input}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <button onClick={addReminder} className={styles.addBtn}>
              ➕ Add Reminder
            </button>
          </div>
        </div>

        {/* Reminder List */}
        <div className={styles.remindersSection}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Your Reminders</h2>

            {reminders.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No Reminders Yet</h3>

                <p>Add your first pet reminder.</p>
              </div>
            ) : (
              <div className={styles.reminderList}>
                {reminders.map((reminder) => (
                  <div key={reminder._id} className={styles.reminderItem}>
                    <div className={styles.reminderInfo}>
                      <h3>
                        {getReminderIcon(reminder.type)} {reminder.petName}
                      </h3>

                      <p>
                        <strong>Type:</strong> {reminder.type}
                      </p>

                      <p>
                        <strong>Date:</strong> {reminder.date}
                      </p>

                      <p>
                        <strong>Time:</strong> {reminder.time}
                      </p>
                    </div>

                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteReminder(reminder._id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
