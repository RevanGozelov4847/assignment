import React, { useState } from 'react';
import FlashCard from './FlashCard';
import CardFormModal from './CardFormModal';
import { useFlashCardsContext } from '../context/FlashCardsContext';

const FlashCards = () => {
  const { flashCards, addFlashCard, updateFlashCard, deleteFlashCard } = useFlashCardsContext();
  const [newCard, setNewCard] = useState({
    id: null,
    question: '',
    answer: '',
    status: 'Want to Learn',
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCreateCard = () => {
    if (newCard.id) {
      updateFlashCard({
        ...newCard,
        lastModified: new Date().toISOString(),
      });
    } else {
      addFlashCard({
        ...newCard,
        id: Date.now(),
        lastModified: new Date().toISOString(), 
      });
    }

    setNewCard({
      id: null,
      question: '',
      answer: '',
      status: 'Want to Learn',
    });
    setModalOpen(false);
  };

  const handleEditCard = (card) => {
    setNewCard(card);
    setModalOpen(true);
  };

  const handleDeleteCard = (cardId) => {
    deleteFlashCard(cardId);
  };

  return (
    <div>
      <h1>Flash Cards</h1>
      <button onClick={() => setModalOpen(true)}>Create New Card</button>

      <div className="flash-cards-container">
        {flashCards.map((card) => (
          <div key={card.id} onClick={() => handleEditCard(card)}>
            <FlashCard card={card} />
            <button type="button" onClick={() => handleDeleteCard(card.id)}>
              Delete Card
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CardFormModal
          isNewCard={!newCard.id}
          card={newCard}
          onClose={() => setModalOpen(false)}
          onSave={handleCreateCard}
          onChange={(field, value) => setNewCard((prevCard) => ({ ...prevCard, [field]: value }))}
        />
      )}
    </div>
  );
};

export default FlashCards;
