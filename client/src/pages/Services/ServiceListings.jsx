import React, { useState } from "react";
import "./ServiceListings.css";

export default function ServiceListings() {
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

  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FORM FIELDS
  const [customerName, setCustomerName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [notes, setNotes] = useState("");

  // SAVE BOOKING TO LOCAL STORAGE
  const saveBooking = (e) => {
    e.preventDefault();

    const newBooking = {
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      customerName,
      date: selectedDate,
      notes
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    existing.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    alert("Booking Saved Successfully! 🎉");

    // Close popup
    setIsModalOpen(false);

    // reset form
    setCustomerName("");
    setSelectedDate("");
    setNotes("");
  };

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
              <img src={service.img} alt={service.type} className="service-icon" />
              <h2 className="service-name">{service.name}</h2>
            </div>
            <p className="service-type">{service.type}</p>
            <p className="service-location">{service.location}</p>
            <p className="service-rating">
              {Array.from({ length: Math.floor(service.rating) }).map((_, i) => (
                <span key={i} className="star">⭐</span>
              ))} {service.rating}
            </p>

            <button
              className="book-btn"
              onClick={() => {
                setSelectedService(service);
                setIsModalOpen(true);
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* ------------------- MODAL POPUP ------------------- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container popup-animate">
          
            <h2 className="modal-title">Book: {selectedService?.name}</h2>

            <form className="modal-form" onSubmit={saveBooking}>
              
              <label>Your Name:</label>
              <input 
                type="text" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />

              <label>Preferred Date:</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />

              <label>Notes:</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write additional notes..."
              />

              <button type="submit" className="submit-btn">
                Confirm Booking
              </button>
            </form>

            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

