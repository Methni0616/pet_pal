import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">🐾 Pet Pal</h1>
        <nav className="nav-buttons">
          <button
            onClick={() => navigate("/login")}
            className="nav-btn login-btn"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="nav-btn get-started-btn"
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h2 className="hero-title">
          Welcome to <span className="highlight">Pet Pal</span> 🐾
        </h2>
        <p className="hero-subtitle">
          Your all-in-one companion for pet adoption, care management, and
          trusted pet services.
        </p>
        <div className="hero-buttons">
          <button
            onClick={() => navigate("/adopt")}
            className="hero-btn adopt-btn"
          >
            Adopt a Pet
          </button>
          <button
            onClick={() => navigate("/care")}
            className="hero-btn care-btn"
          >
            Care for My Pet
          </button>
          <button
            onClick={() => navigate("/services")}
            className="hero-btn services-btn"
          >
            Find Services
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <img src="/images/adopt.jpg" alt="Adopt" className="feature-img" />
          <h3>Adopt a Pet</h3>
          <p>
            Find your perfect furry friend from nearby shelters and give them a
            loving home.
          </p>
        </div>

        <div className="feature-card">
          <img src="/images/care.jpg" alt="Care" className="feature-img" />
          <h3>Care for My Pet</h3>
          <p>
            Keep track of your pet’s health, meals, and vet appointments with
            smart reminders.
          </p>
        </div>

        <div className="feature-card">
          <img
            src="/images/services.jpg"
            alt="Services"
            className="feature-img"
          />
          <h3>Find Services</h3>
          <p>
            Explore nearby vets, groomers, and pet boarding services in one
            place.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Pet Pal. Made with 💖 by Methni.
      </footer>
    </div>
  );
}
