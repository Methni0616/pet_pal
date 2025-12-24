import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import PetListings from "./pages/Adoption/PetListings";
import PetDetails from "./pages/Adoption/PetDetails";
import Favorites from "./pages/Adoption/Favorites";
import AdoptionForm from "./pages/Adoption/AdoptionForm";
import Shelter from "./pages/Adoption/Shelter";
import MyAdoptions from "./pages/Adoption/MyAdoptions";

import MyPets from "./pages/care/MyPets";
import AddPet from "./pages/care/AddPet";
import PetProfile from "./pages/care/PetProfile";
import HealthRecords from "./pages/care/HealthRecords";
import Reminders from "./pages/care/Reminders";
import ActivityTracker from "./pages/care/ActivityTracker";
import PetGallery from "./pages/care/PetGallery";

import ServiceListings from "./pages/Services/ServiceListings";
import BookingPage from "./pages/Services/BookingPage";

import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "./pages/Terms/Terms";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/adopt" element={<PetListings />} />
        <Route path="/adopt/:id" element={<PetDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/adoption-form/:id" element={<AdoptionForm />} />
        <Route path="/shelter/:id" element={<Shelter />} />
        <Route path="/my-adoptions" element={<MyAdoptions />} />

        <Route path="/care" element={<MyPets />} />
        <Route path="/care/add" element={<AddPet />} />
        <Route path="/care/profile/:id" element={<PetProfile />} />
        <Route path="/care/health" element={<HealthRecords />} />
        <Route path="/care/reminders" element={<Reminders />} />
        <Route path="/care/activity" element={<ActivityTracker />} />
        <Route path="/care/gallery" element={<PetGallery />} />

        <Route path="/services" element={<ServiceListings />} />
        <Route path="/book/:id" element={<BookingPage />} />

        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms" element={<Terms />} />

      </Routes>
    </Router>
  );
}

export default App;
