import React, { useState, useEffect } from 'react';

const FlashCard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/flashCards')
      .then(response => response.json())
      .then(data => setCards(data))
      .catch(error => console.error('Error fetching flash cards:', error));
  }, []);

  return (
    <div>
      <h1>Flash Cards</h1>
      <ul>
        {cards.map(card => (
          <li key={card.id}>
            <div>
              <strong>Front:</strong> {card.question}
            </div>
            <div>
              <strong>Back:</strong> {card.answer}
            </div>
            <div>
              <strong>Last Modified:</strong> {card.lastModified}
            </div>
            <div>
              <strong>Status:</strong> {card.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlashCard;
