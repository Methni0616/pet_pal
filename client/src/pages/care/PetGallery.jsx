import React, { useState } from "react";
import "./PetGallery.css";

export default function PetGallery() {
  const [photos, setPhotos] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setPhotos([...photos, ...newPhotos]);
  };

  const deletePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  return (
    <div className="gallery-container">
      <h1 className="title">Pet Gallery</h1>
      <p className="subtitle">Upload and manage photos of your pets 🐶🐱</p>

      <div className="upload-card">
        <input type="file" multiple accept="image/*" onChange={handleUpload} />
        <button className="upload-btn">Upload Photos</button>
      </div>

      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <div key={index} className="gallery-item">
            <img src={photo} alt={`Pet ${index}`} />
            <button className="delete-btn" onClick={() => deletePhoto(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}