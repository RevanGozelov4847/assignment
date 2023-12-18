import React, { useState } from 'react';

const FlashCardManagement = () => {
  const [newCard, setNewCard] = useState({
    question: '',
    answer: '',
    status: 'Want to Learn'
  });

  const handleCreateCard = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('http://localhost:3001/flashCards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        console.log('New card created successfully');
        setNewCard({
          question: '',
          answer: '',
          status: 'Want to Learn'
        });
      } else {
        console.error('Failed to create a new card');
      }
    } catch (error) {
      console.error('Error creating a new card:', error);
    }
  };

  return (
    <div>
      <h1>Flash Card Management</h1>
      {/* Create Card Form */}
      <form onSubmit={handleCreateCard}>
        <label>
          Question:
          <input
            type="text"
            value={newCard.question}
            onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
          />
        </label>
        <label>
          Answer:
          <input
            type="text"
            value={newCard.answer}
            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
          />
        </label>
        <label>
          Status:
          <select
            value={newCard.status}
            onChange={(e) => setNewCard({ ...newCard, status: e.target.value })}
          >
            <option value="Learned">Learned</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
          </select>
        </label>
        <button type="submit">Create Card</button>
      </form>
    </div>
  );
};

export default FlashCardManagement;
