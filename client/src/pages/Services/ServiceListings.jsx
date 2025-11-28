import React, { useState } from "react";
import "./ServiceListings.css"; // Make sure this file is in the same folder

export default function ServiceListings() {
  const [services] = useState([
    { id: 1, name: "Happy Paws Vet Clinic", type: "Vet", location: "Colombo", rating: 4.8 },
    { id: 2, name: "Purrfect Groomers", type: "Grooming", location: "Kandy", rating: 4.5 },
    { id: 3, name: "Cozy Pet Boarding", type: "Boarding", location: "Galle", rating: 4.6 },
    { id: 4, name: "Fetch Training Center", type: "Training", location: "Colombo", rating: 4.7 },
  ]);

  return (
    <div className="service-container">
      <h1 className="title">Find Services</h1>
      <p className="subtitle">
        Explore nearby vets, groomers, and pet boarding services in one place.
      </p>

      <div className="service-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h2 className="service-name">{service.name}</h2>
            <p className="service-type">{service.type}</p>
            <p className="service-location">{service.location}</p>
            <p className="service-rating">⭐ {service.rating}</p>
            <button className="book-btn">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
