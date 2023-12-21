import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FlashCards from './components/FlashCards';
import { FlashCardsProvider } from './context/FlashCardsContext';
import "./assets/scss/main.scss"

const App = () => {
  return (
    <Router>
      <FlashCardsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flash-cards" element={<FlashCards />} />
        </Routes>
      </FlashCardsProvider>
    </Router>
  );
};

export default App;
