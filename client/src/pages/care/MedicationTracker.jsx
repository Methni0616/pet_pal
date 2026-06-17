import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import styles from "./MedicationTracker.module.css";

export default function MedicationTracker() {
  const { petId } = useParams();

  const [pet, setPet] = useState(null);

  const [records, setRecords] =
    useState([]);

  const [form, setForm] = useState({
    medicineName: "",
    dosage: "",
    startDate: "",
    endDate: "",
    instructions: "",
  });

  useEffect(() => {
    loadPet();
    loadRecords();
  }, [petId]);

  const loadPet = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/pets/${petId}`
      );

      setPet(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadRecords = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/medications/pet/${petId}`
      );

      setRecords(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const addMedication = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/medications",
        {
          petId,
          petName: pet.name,
          ...form,
          status: "Ongoing",
        }
      );

      setForm({
        medicineName: "",
        dosage: "",
        startDate: "",
        endDate: "",
        instructions: "",
      });

      loadRecords();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleStatus = async (
    record
  ) => {
    try {
      await axios.put(
        `http://localhost:5000/api/medications/${record._id}`,
        {
          status:
            record.status ===
            "Ongoing"
              ? "Completed"
              : "Ongoing",
        }
      );

      loadRecords();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = async (
    id
  ) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/medications/${id}`
      );

      loadRecords();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>💊 Medication Tracker</h1>

      {pet && (
        <div
          className={
            styles.petHeader
          }
        >
          <img
            src={pet.image}
            alt={pet.name}
            className={
              styles.petImage
            }
          />

          <div>
            <h2>{pet.name}</h2>

            <p>
              <strong>
                Species:
              </strong>{" "}
              {pet.species}
            </p>

            <p>
              <strong>
                Breed:
              </strong>{" "}
              {pet.breed}
            </p>

            <p>
              <strong>Age:</strong>{" "}
              {pet.age}
            </p>
          </div>
        </div>
      )}

      <form
        className={styles.form}
        onSubmit={addMedication}
      >
        <input
          value={
            pet?.name || ""
          }
          disabled
        />

        <input
          name="medicineName"
          placeholder="Medicine Name"
          value={
            form.medicineName
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          name="dosage"
          placeholder="Dosage"
          value={form.dosage}
          onChange={
            handleChange
          }
          required
        />

        <div>
          <label>
            Start Date
          </label>

          <input
            type="date"
            name="startDate"
            value={
              form.startDate
            }
            onChange={
              handleChange
            }
            required
          />
        </div>

        <div>
          <label>
            End Date
          </label>

          <input
            type="date"
            name="endDate"
            value={
              form.endDate
            }
            onChange={
              handleChange
            }
            required
          />
        </div>

        <textarea
          name="instructions"
          placeholder="Instructions"
          value={
            form.instructions
          }
          onChange={
            handleChange
          }
        />

        <button type="submit">
          Save Medication
        </button>
      </form>

      <div
        className={
          styles.cardGrid
        }
      >
        {records.map(
          (record) => (
            <div
              key={record._id}
              className={
                styles.card
              }
            >
              <div
                className={
                  styles.cardContent
                }
              >
                <h3>
                  {
                    record.medicineName
                  }
                </h3>

                <p>
                  💊 Dosage:{" "}
                  {
                    record.dosage
                  }
                </p>

                <p>
                  📅 Start:{" "}
                  {new Date(
                    record.startDate
                  ).toLocaleDateString()}
                </p>

                <p>
                  🗓 End:{" "}
                  {new Date(
                    record.endDate
                  ).toLocaleDateString()}
                </p>

                <p>
                  📝{" "}
                  {record.instructions ||
                    "No instructions"}
                </p>
              </div>

              <button
                className={
                  record.status ===
                  "Completed"
                    ? styles.completedBtn
                    : styles.ongoingBtn
                }
                onClick={() =>
                  toggleStatus(
                    record
                  )
                }
              >
                {
                  record.status
                }
              </button>

              <button
                className={
                  styles.deleteBtn
                }
                onClick={() =>
                  deleteRecord(
                    record._id
                  )
                }
              >
                Delete
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}