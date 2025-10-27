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
      </Routes>
    </Router>
  );
}

export default App;


