import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FlashCards from "./pages/FlashCards";
import { FlashCardsProvider } from "./context/FlashCardsContext";
import Navbar from "./components/Navbar";
import "./assets/scss/main.scss";
import ContactPage from "./pages/ContactPage";

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>

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
    </DndProvider>

  );
  
};

export default App;
