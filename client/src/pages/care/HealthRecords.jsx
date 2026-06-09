import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./HealthRecords.module.css";

export default function HealthRecords() {
  const { petId } = useParams();
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    petName: "",
    ownerName: "",
    weight: "",
    vaccination: "",
    nextVetDate: "",
    notes: "",
  });

  useEffect(() => {
    if (petId) {
      loadRecords();
    }
  }, [petId]);

  const loadRecords = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/health/pet/${petId}`,
      );
      setRecords(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/health/${editingId}`, form);

        alert("Record Updated Successfully");
      } else {
        await axios.post("http://localhost:5000/api/health", {
          ...form,
          petId,
        });

        alert("Record Added Successfully");
      }

      setForm({
        petName: "",
        ownerName: "",
        weight: "",
        vaccination: "",
        nextVetDate: "",
        notes: "",
      });

      setEditingId(null);

      loadRecords();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this health record?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/health/${id}`);

      loadRecords();
    } catch (error) {
      console.error(error);
    }
  };

  const editRecord = (record) => {
    setEditingId(record._id);

    setForm({
      petName: record.petName,
      ownerName: record.ownerName,
      weight: record.weight,
      vaccination: record.vaccination,
      nextVetDate: record.nextVetDate?.split("T")[0] || "",
      notes: record.notes,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.healthContainer}>
      <h1 className={styles.title}>🩺 Pet Health Records</h1>

      <form className={styles.healthForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="petName"
          placeholder="Pet Name"
          value={form.petName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={form.ownerName}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="vaccination"
          placeholder="Vaccination"
          value={form.vaccination}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="nextVetDate"
          value={form.nextVetDate}
          onChange={handleChange}
          required
        />

        <textarea
          name="notes"
          placeholder="Medical Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Record" : "Save Record"}
        </button>
      </form>

      <div className={styles.recordsGrid}>
        {records.length === 0 ? (
          <p className={styles.emptyMessage}>No Health Records Found</p>
        ) : (
          records.map((record) => (
            <div key={record._id} className={styles.recordCard}>
              <h3>{record.petName}</h3>

              <p>
                <strong>Owner:</strong> {record.ownerName}
              </p>

              <p>
                <strong>Weight:</strong> {record.weight} kg
              </p>

              <p>
                <strong>Vaccination:</strong> {record.vaccination}
              </p>

              <p>
                <strong>Next Vet Date:</strong>{" "}
                {new Date(record.nextVetDate).toLocaleDateString()}
              </p>

              <p>
                <strong>Notes:</strong> {record.notes}
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(record.createdAt).toLocaleDateString()}
              </p>

              <div className={styles.recordButtons}>
                <button
                  type="button"
                  className={styles.editBtn}
                  onClick={() => editRecord(record)}
                >
                  ✏️ Edit
                </button>

                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => deleteRecord(record._id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
