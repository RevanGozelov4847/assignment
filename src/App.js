import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FlashCards from './components/FlashCard';
import FlashCardManagement from './components/FlashCardManagement';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flash-cards" element={<FlashCards />} />
        <Route path="/flash-cards-management" element={<FlashCardManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
