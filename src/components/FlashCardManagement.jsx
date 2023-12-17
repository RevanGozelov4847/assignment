import React, { useState } from 'react';

const FlashCardManagement = ({ onAddCard }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [status, setStatus] = useState('Want to Learn');

  const handleAddCard = () => {
    const newCard = {
      front,
      back,
      lastModified: new Date().toLocaleString(),
      status,
    };

    fetch('http://localhost:3001/flashCards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    })
      .then(response => response.json())
      .then(data => {
        onAddCard(data);
        setFront('');
        setBack('');
        setStatus('Want to Learn');
      })
      .catch(error => console.error('Error adding card:', error));
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
