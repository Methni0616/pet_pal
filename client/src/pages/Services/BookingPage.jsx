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
    { id: 1, name: "Happy Paws Vet Clinic", type: "Vet", location: "Colombo" },
    { id: 2, name: "Purrfect Groomers", type: "Grooming", location: "Kandy" }
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

    navigate("/my-bookings");
  };

  if (!service) return <p>Loading...</p>;

  return (
    <div className="booking-container">
      <h1>Book {service.name}</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookingPage; // ✅ THIS LINE FIXES THE ERROR
