import React from "react";
import "./FAQ.css";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I adopt a pet?",
      answer:
        "Go to the Adopt section, browse available pets, and submit an adoption request.",
    },
    {
      question: "Is Pet Pal free to use?",
      answer:
        "Yes! Pet Pal is completely free for users looking to adopt or manage pets.",
    },
    {
      question: "Can I save pets to view later?",
      answer:
        "Yes, you can add pets to your Favorites and access them anytime.",
    },
    {
      question: "How do I track my adoptions?",
      answer:
        "Use the My Adoptions page to see your adoption history and status.",
    },
    {
      question: "How can I contact Pet Pal support?",
      answer:
        "Visit the Contact Us page and submit your inquiry or feedback.",
    },
  ];

  return (
    <div className="faq-container">
      <h2 className="faq-title">❓ FAQs / Help Center</h2>
      <p className="faq-subtitle">
        Find answers to common questions about Pet Pal
      </p>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-card">
            <h4>{faq.question}</h4>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
