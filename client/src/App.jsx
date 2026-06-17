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
import VaccinationTracker from "./pages/care/VaccinationTracker";
import WeightTracker from "./pages/care/WeightTracker";
import MedicationTracker from "./pages/care/MedicationTracker";

import ServiceListings from "./pages/Services/ServiceListings";
import BookingPage from "./pages/Services/BookingPage";

import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "./pages/Terms/Terms";

import AdminAdoptions from "./pages/Adoption/AdminAdoptions";

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
        <Route path="/care/health/:petId" element={<HealthRecords />} />

        <Route path="/care/reminders/:petId" element={<Reminders />} />

        <Route path="/care/activity/:petId" element={<ActivityTracker />} />

        <Route path="/care/gallery/:petId" element={<PetGallery />} />
        <Route path="/care/vaccinations/:petId"element={<VaccinationTracker />}/>
        <Route path="/care/weight/:petId" element={<WeightTracker />} />
        <Route path="/care/medications/:petId" element={<MedicationTracker />} />
        <Route path="/services" element={<ServiceListings />} />
        <Route path="/book/:id" element={<BookingPage />} />

        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="/admin-adoptions" element={<AdminAdoptions />} />
      </Routes>
    </Router>
  );
}

export default App;
