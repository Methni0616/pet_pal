import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceListings.css";

export default function ServiceListings() {
  const navigate = useNavigate();

  const [services] = useState([
    {
      id: 1,
      name: "Happy Paws Vet Clinic",
      type: "Vet",
      location: "Colombo",
      rating: 4.8,
      img: "https://cdn-icons-png.flaticon.com/512/616/616408.png"
    },
    {
      id: 2,
      name: "Purrfect Groomers",
      type: "Grooming",
      location: "Kandy",
      rating: 4.5,
      img: "https://cdn-icons-png.flaticon.com/512/806/806550.png"
    },
    {
      id: 3,
      name: "Cozy Pet Boarding",
      type: "Boarding",
      location: "Galle",
      rating: 4.6,
      img: "https://cdn-icons-png.flaticon.com/512/194/194280.png"
    },
    {
      id: 4,
      name: "Fetch Training Center",
      type: "Training",
      location: "Colombo",
      rating: 4.7,
      img: "https://cdn-icons-png.flaticon.com/512/262/262432.png"
    },
    {
      id: 5,
      name: "Happy Tails Daycare",
      type: "Daycare",
      location: "Negombo",
      rating: 4.4,
      img: "https://cdn-icons-png.flaticon.com/512/616/616549.png"
    },
    {
      id: 6,
      name: "Pawsome Walkers",
      type: "Walking",
      location: "Colombo",
      rating: 4.9,
      img: "https://cdn-icons-png.flaticon.com/512/194/194279.png"
    },
    {
      id: 7,
      name: "Furry Friends Pet Shop",
      type: "Shop",
      location: "Kandy",
      rating: 4.3,
      img: "https://cdn-icons-png.flaticon.com/512/1395/1395885.png"
    },
    {
      id: 8,
      name: "Pet Paradise Groomers",
      type: "Grooming",
      location: "Colombo",
      rating: 4.6,
      img: "https://cdn-icons-png.flaticon.com/512/616/616408.png"
    },
    {
      id: 9,
      name: "Whiskers & Paws Vet",
      type: "Vet",
      location: "Galle",
      rating: 4.7,
      img: "https://cdn-icons-png.flaticon.com/512/616/616408.png"
    },
    {
      id: 10,
      name: "Tail Waggers Training",
      type: "Training",
      location: "Negombo",
      rating: 4.5,
      img: "https://cdn-icons-png.flaticon.com/512/262/262432.png"
    },
    {
      id: 11,
      name: "Cozy Kennels Boarding",
      type: "Boarding",
      location: "Kandy",
      rating: 4.6,
      img: "https://cdn-icons-png.flaticon.com/512/194/194280.png"
    },
    {
      id: 12,
      name: "Pet Essentials Shop",
      type: "Shop",
      location: "Colombo",
      rating: 4.4,
      img: "https://cdn-icons-png.flaticon.com/512/1395/1395885.png"
    }
  ]);

  return (
    <div className="service-container">
      <h1 className="title">Find Services</h1>
      <p className="subtitle">
        Explore nearby vets, groomers, pet boarding, and other services for your pets.
      </p>

      <div className="service-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="card-header">
              <img
                src={service.img}
                alt={service.type}
                className="service-icon"
              />
              <h2 className="service-name">{service.name}</h2>
            </div>

            <p className="service-type">{service.type}</p>
            <p className="service-location">{service.location}</p>

            <p className="service-rating">
              {Array.from({ length: Math.floor(service.rating) }).map((_, i) => (
                <span key={i}>⭐</span>
              ))}{" "}
              {service.rating}
            </p>

            <button
              className="book-btn"
              onClick={() => navigate(`/book/${service.id}`)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
