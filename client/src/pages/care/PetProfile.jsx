import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./PetProfile.module.css";

export default function PetProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);

  const [stats, setStats] = useState({
    healthRecords: 0,
    reminders: 0,
    activities: 0,
    photos: 0,
  });

  useEffect(() => {
    if (id) {
      loadPet();
      loadStats();
    }
  }, [id]);

  const loadPet = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/pets/${id}`);

      setPet(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadStats = async () => {
    try {
      const [healthRes, reminderRes, activityRes, galleryRes] =
        await Promise.all([
          axios.get(`http://localhost:5000/api/health/pet/${id}`),
          axios.get(`http://localhost:5000/api/reminders/pet/${id}`),
          axios.get(`http://localhost:5000/api/activities/pet/${id}`),
          axios.get(`http://localhost:5000/api/gallery/pet/${id}`),
        ]);

      setStats({
        healthRecords: healthRes.data.length,
        reminders: reminderRes.data.length,
        activities: activityRes.data.length,
        photos: galleryRes.data.length,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!pet) {
    return <div className={styles.loading}>Loading Pet Profile...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <img src={pet.image} alt={pet.name} className={styles.petImage} />

        <div className={styles.petInfo}>
          <h1>{pet.name}</h1>

          <p>
            <strong>Species:</strong> {pet.species}
          </p>

          <p>
            <strong>Breed:</strong> {pet.breed}
          </p>

          <p>
            <strong>Age:</strong> {pet.age}
          </p>

          <p>
            <strong>Gender:</strong> {pet.gender}
          </p>

          <p>
            <strong>Status:</strong> {pet.status}
          </p>
        </div>
      </div>

      <div className={styles.dashboard}>
        <h2>📊 Pet Dashboard</h2>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>{stats.healthRecords}</h3>
            <p>Health Records</p>
          </div>

          <div className={styles.statCard}>
            <h3>{stats.reminders}</h3>
            <p>Reminders</p>
          </div>

          <div className={styles.statCard}>
            <h3>{stats.activities}</h3>
            <p>Activities</p>
          </div>

          <div className={styles.statCard}>
            <h3>{stats.photos}</h3>
            <p>Photos</p>
          </div>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h2>Pet Care Tools</h2>

        <div className={styles.actionGrid}>
          <button onClick={() => navigate(`/care/health/${pet._id}`)}>
            💊 Health Records
          </button>

          <button onClick={() => navigate(`/care/reminders/${pet._id}`)}>
            🕒 Reminders
          </button>

          <button onClick={() => navigate(`/care/activity/${pet._id}`)}>
            🚶 Activity Tracker
          </button>

          <button onClick={() => navigate(`/care/gallery/${pet._id}`)}>
            📸 Gallery
          </button>

          <button onClick={() => navigate(`/care/vaccinations/${pet._id}`)}>
            💉 Vaccinations
          </button>
        </div>
      </div>
    </div>
  );
}
