import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FlashCards from "./pages/FlashCards";
import { FlashCardsProvider } from "./context/FlashCardsContext";
import Navbar from "./components/Navbar";
import "./assets/scss/main.scss";
import ContactPage from "./pages/ContactPage";

const App = () => {
  return (
    <Router>
      <FlashCardsProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flash-cards" element={<FlashCards />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </FlashCardsProvider>
    </Router>
  );
};

export default App;
