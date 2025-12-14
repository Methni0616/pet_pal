import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BookingPage.css";

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const services = [
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
  ];

  useEffect(() => {
    const selected = services.find((s) => s.id === Number(id));
    setService(selected);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      id: Date.now(),
      serviceId: service.id,
      serviceName: service.name,
      customerName,
      date,
      time,
      notes,
      status: "Upcoming"
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, newBooking]));

    navigate("/my-bookings"); // Redirect after booking
  };

  if (!service) return <p>Loading...</p>;

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h1 className="booking-title">📅 Book Service</h1>
        <p className="booking-subtitle">
          Schedule an appointment for your pet
        </p>

        <div className="service-summary">
          <strong>{service.name}</strong><br />
          {service.type} • {service.location}
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button type="submit" className="confirm-btn">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
