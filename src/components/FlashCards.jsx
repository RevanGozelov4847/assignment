import React, { useState, useEffect } from "react";
import CardFormModal from "./CardFormModal";
import { useFlashCardsContext } from "../context/FlashCardsContext";

const FlashCards = () => {
  const {
    flashCards,
    setFlashCards,
    addFlashCard,
    updateFlashCard,
    deleteFlashCard,
  } = useFlashCardsContext();
  const [newCard, setNewCard] = useState({
    id: null,
    question: "",
    answer: "",
    status: "Want to Learn",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("Last Modified");

  useEffect(() => {
    fetch('http://localhost:3001/flashCards')
      .then((response) => response.json())
      .then((data) => setFlashCards(data))
      .catch((error) => console.error('Error fetching flash cards:', error));
  }, [setFlashCards]); 

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

  const getSortedCards = () => {
    if (sortOption === "Last Modified") {
      return [...flashCards].sort((a, b) =>
        new Date(b.lastModified) - new Date(a.lastModified)
      );
    } else if (sortOption === "Alphabetical order") {
      return [...flashCards].sort((a, b) => a.question.localeCompare(b.question));
    } else {
      return flashCards;
    }
  };

  const filteredAndSortedCards = getSortedCards()
    .filter(
      (card) =>
        card.question.toLowerCase().includes(searchText.toLowerCase()) ||
        card.answer.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter(
      (card) =>
        filterStatus === "All" || card.status.toLowerCase() === filterStatus.toLowerCase()
    );

  return (
    <div>
      <h1>Flash Cards</h1>
      <button onClick={() => setModalOpen(true)}>Create New Card</button>

      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="Last Modified">Last Modified</option>
          <option value="Alphabetical order">Alphabetical order</option>
        </select>
      </div>

      <div className="flash-cards-container">
        {filteredAndSortedCards.map((card) => (
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
            </div>
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
