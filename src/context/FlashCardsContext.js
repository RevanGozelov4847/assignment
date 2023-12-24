import React, { createContext, useContext, useState, useEffect } from 'react';

const FlashCardsContext = createContext();

export const useFlashCardsContext = () => {
  const context = useContext(FlashCardsContext);

  if (!context) {
    throw new Error('useFlashCardsContext must be used within a FlashCardsProvider');
  }

  return context;
};

export const FlashCardsProvider = ({ children }) => {

  useEffect(() => {
    fetch('http://localhost:3001/flashCards')
      .then((response) => response.json())
      .then((data) => setFlashCards(data))
      .catch((error) => console.error('Error fetching flash cards:', error));
  }, []); 

  const addFlashCard = (newCard) => {
    fetch('http://localhost:3001/flashCards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    })
      .then((response) => response.json())
      .then((data) => setFlashCards((prevCards) => [...prevCards, data]))
      .catch((error) => console.error('Error adding flash card:', error));
  };

  const updateFlashCard = (updatedCard) => {
    fetch(`http://localhost:3001/flashCards/${updatedCard.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCard),
    })
      .then((response) => response.json())
      .then((data) =>
        setFlashCards((prevCards) =>
          prevCards.map((card) => (card.id === data.id ? data : card))
        )
      )
      .catch((error) => console.error('Error updating flash card:', error));
  };
  const [flashCards, setFlashCards] = useState([]);
  

  const deleteFlashCard = (cardId) => {
    fetch(`http://localhost:3001/flashCards/${cardId}`, {
      method: 'DELETE',
    })
      .then(() => setFlashCards((prevCards) => prevCards.filter((card) => card.id !== cardId)))
      .catch((error) => console.error('Error deleting flash card:', error));
  };

  return (
    <FlashCardsContext.Provider value={{ flashCards, addFlashCard, updateFlashCard, deleteFlashCard, setFlashCards }}>
    {children}
  </FlashCardsContext.Provider>
  );
};
