import React from "react";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <div className="policy-container">
      <h2 className="policy-title">🔐 Privacy Policy</h2>
      <p className="policy-subtitle">
        Your privacy matters to us at Pet Pal
      </p>

      <div className="policy-card">
        <h3>1. Information We Collect</h3>
        <p>
          We collect basic information such as your name, email address, and
          pet-related preferences when you register or use our services.
        </p>

        <h3>2. How We Use Your Information</h3>
        <p>
          Your information is used to improve user experience, manage adoptions,
          provide reminders, and communicate important updates.
        </p>

        <h3>3. Data Protection</h3>
        <p>
          We use appropriate security measures to protect your personal data
          from unauthorized access or disclosure.
        </p>

        <h3>4. Third-Party Services</h3>
        <p>
          Pet Pal may include links to third-party services such as veterinary
          providers. We are not responsible for their privacy practices.
        </p>

        <h3>5. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page.
        </p>
      </div>
    </div>
  );
}
