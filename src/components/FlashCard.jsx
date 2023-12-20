import React, { useState } from 'react';

const FlashCard = ({ card }) => {
  const { question, answer, lastModified } = card;
  const [isFlipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped(!isFlipped);
  };

  return (
    <div className={`flash-card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className="card-face card-front">
        <div>{question}</div>
        <div>Last Modified: {new Date(lastModified).toLocaleString()}</div>
      </div>
      {isFlipped && (
        <div className="card-face card-back">
          <div>{answer}</div>
          <div>Last Modified: {new Date(lastModified).toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};

export default FlashCard;
