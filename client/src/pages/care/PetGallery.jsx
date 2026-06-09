import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./PetGallery.module.css";

export default function PetGallery() {
  const { petId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [petName, setPetName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (petId) {
      loadPhotos();
    }
  }, [petId]);

  const loadPhotos = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/gallery/pet/${petId}`,
      );

      setPhotos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadPhoto = async () => {
    if (!petName || !image) {
      alert("Please enter pet name and select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("petId", petId);

      formData.append("petName", petName);

      formData.append("image", image);

      await axios.post("http://localhost:5000/api/gallery/upload", formData);

      setPetName("");
      setImage(null);

      document.getElementById("imageInput").value = "";

      loadPhotos();

      alert("Photo uploaded successfully");
    } catch (error) {
      console.error(error);

      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const deletePhoto = async (id) => {
    const confirmDelete = window.confirm("Delete this photo?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`);

      loadPhotos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.galleryContainer}>
      <h1 className={styles.title}>📸 Pet Gallery</h1>

      <p className={styles.subtitle}>Upload and manage memories for this pet</p>

      <div className={styles.uploadCard}>
        <h2>Upload New Photo</h2>

        <input
          type="text"
          placeholder="Pet Name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          className={styles.input}
        />

        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className={styles.input}
        />

        <button onClick={uploadPhoto} className={styles.uploadBtn}>
          {loading ? "Uploading..." : "Upload Photo"}
        </button>
      </div>

      <div className={styles.galleryGrid}>
        {photos.length === 0 ? (
          <p className={styles.emptyText}>No photos uploaded yet 🐾</p>
        ) : (
          photos.map((photo) => (
            <div key={photo._id} className={styles.photoCard}>
              <img
                src={photo.imageUrl}
                alt={photo.petName}
                className={styles.image}
              />

              <div className={styles.cardBody}>
                <h3>{photo.petName}</h3>

                <button
                  className={styles.deleteBtn}
                  onClick={() => deletePhoto(photo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
