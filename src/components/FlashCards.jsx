import React, { useState } from "react";
import CardFormModal from "./CardFormModal";
import { useFlashCardsContext } from "../context/FlashCardsContext";

const FlashCards = () => {
  const { flashCards, addFlashCard, updateFlashCard, deleteFlashCard } =
    useFlashCardsContext();
  const [newCard, setNewCard] = useState({
    id: null,
    question: "",
    answer: "",
    status: "Want to Learn",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);

  const onSave = () => {
    console.log("Card saved!");
  };

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

    onSave();

    setNewCard({
      id: null,
      question: "",
      answer: "",
      status: "Want to Learn",
    });
    setModalOpen(false);
  };

  const handleEditCard = (card) => {
    setNewCard(card);
    setModalOpen(true);
  };

  const handleDeleteCard = (cardId) => {
    deleteFlashCard(cardId);
    setSelectedCard(null);
  };

  const toggleCardFlip = (cardId) => {
    setFlippedCards((prevFlippedCards) => ({
      ...prevFlippedCards,
      [cardId]: !prevFlippedCards[cardId],
    }));
    setSelectedCard(cardId);
  };

  return (
    <div>
      <h1>Flash Cards</h1>
      <button onClick={() => setModalOpen(true)}>Create New Card</button>

      <div className="flash-cards-container">
        {flashCards.map((card) => (
          <div key={card.id} className="flash-card-container">
            <div
              className={`flash-card ${flippedCards[card.id] ? "flipped" : ""}`}
              onClick={() => toggleCardFlip(card.id)}
            >
              <div className="card-face card-front">
                <div className="card-info">
                  <div className="card-text">{card.question}</div>
                  <div className="last-modified-text">
                    Last Modified: {new Date(card.lastModified).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="card-face card-back">
                <div className="card-info">
                  <div className="card-text">{card.answer}</div>
                  <div className="last-modified-text">
                    Last Modified: {new Date(card.lastModified).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            {selectedCard === card.id && (
              <div className="card-actions">
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => handleEditCard(card)}
                >
                  Edit Card
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  Delete Card
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CardFormModal
          isNewCard={!newCard.id}
          card={newCard}
          onClose={() => setModalOpen(false)}
          onSave={handleCreateCard}
          onChange={(field, value) =>
            setNewCard((prevCard) => ({ ...prevCard, [field]: value }))
          }
        />
      )}
    </div>
  );
};

export default FlashCards;
