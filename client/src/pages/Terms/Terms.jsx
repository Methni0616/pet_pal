import React from "react";
import "./Terms.css";

export default function Terms() {
  return (
    <div className="terms-container">
      <h2 className="terms-title">📜 Terms & Conditions</h2>
      <p className="terms-subtitle">
        Please read these terms carefully before using Pet Pal
      </p>

      <div className="terms-card">
        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using Pet Pal, you agree to be bound by these Terms and
          Conditions.
        </p>

        <h3>2. User Responsibilities</h3>
        <p>
          Users must provide accurate information and use the platform
          responsibly and ethically.
        </p>

        <h3>3. Adoption Process</h3>
        <p>
          Pet Pal acts as a facilitator. Final adoption decisions are made by
          shelters or service providers.
        </p>

        <h3>4. Account Termination</h3>
        <p>
          We reserve the right to suspend or terminate accounts that violate our
          policies.
        </p>

        <h3>5. Limitation of Liability</h3>
        <p>
          Pet Pal is not liable for any damages arising from the use of the
          platform.
        </p>

        <h3>6. Changes to Terms</h3>
        <p>
          These terms may be updated at any time. Continued use of the platform
          implies acceptance of changes.
        </p>
      </div>
    </div>
  );
}
