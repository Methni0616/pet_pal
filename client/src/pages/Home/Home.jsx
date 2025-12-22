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
          <button onClick={() => navigate("/adopt")} className="hero-btn">
            Adopt a Pet
          </button>
          <button onClick={() => navigate("/care")} className="hero-btn">
            Care for My Pet
          </button>
          <button onClick={() => navigate("/services")} className="hero-btn">
            Find Services
          </button>

          <button onClick={() => navigate("/favorites")} className="hero-btn">
            Favorites
          </button>
          <button
            onClick={() => navigate("/my-adoptions")}
            className="hero-btn"
          >
            My Adoptions
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <img
            src="https://www.adoptapet.gov.mt/wp-content/uploads/2023/02/banner-cat-dop-1-e1675789209106.jpg"
            alt="Adopt"
            className="feature-img"
          />
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
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} <strong>Pet Pal</strong>. Made with 💖
            by Methni.
          </p>

          <div className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <span>|</span>
            <a href="/contact">Contact Us</a>
            <span>|</span>
            <a href="/terms">Terms & Conditions</a>
            <span>|</span>
            <a href="/faq">FAQs</a>
          </div>

          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
