// components/FlashCardManagement.js
import React, { useState } from 'react';

const FlashCardManagement = ({ onAddCard }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [status, setStatus] = useState('Want to Learn'); // Default status

  const handleAddCard = () => {
    // Generate a new card object with the current date/time
    const newCard = {
      front,
      back,
      lastModified: new Date().toLocaleString(),
      status,
    };

    // Call the callback function to add the new card
    onAddCard(newCard);

    // Reset input fields after adding a card
    setFront('');
    setBack('');
    setStatus('Want to Learn');
  };

  return (
    <div className="flash-card-management">
      <h2>Create New Flash Card</h2>
      <label>Front (Question or Image):</label>
      <input type="text" value={front} onChange={(e) => setFront(e.target.value)} />

      <label>Back (Answer or Information):</label>
      <input type="text" value={back} onChange={(e) => setBack(e.target.value)} />

      <label>Status:</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Learned">Learned</option>
        <option value="Want to Learn">Want to Learn</option>
        <option value="Noted">Noted</option>
      </select>

      <button onClick={handleAddCard}>Add Card</button>
    </div>
  );
};

export default FlashCardManagement;
