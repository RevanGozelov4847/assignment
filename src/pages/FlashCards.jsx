import React, { useState, useEffect } from "react";
import CardFormModal from "../components/CardFormModal";
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
  const [checkedCards, setCheckedCards] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("Last Modified");

  const [draggedCardId, setDraggedCardId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/flashCardsAndOrder")
      .then((response) => response.json())
      .then((data) => {
        setFlashCards(data.flashCards);
      })
      .catch((error) => console.error("Error fetching flash cards:", error));
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
    setCheckedCards((prevChecked) => prevChecked.filter((id) => id !== cardId));
  };

const toggleCardFlip = (cardId) => {
  setFlippedCards((prevFlippedCards) => ({
    ...prevFlippedCards,
    [cardId]: !prevFlippedCards[cardId],
  }));

  setCheckedCards((prevChecked) =>
    prevChecked.includes(cardId)
      ? prevChecked.filter((id) => id !== cardId)
      : [...prevChecked, cardId]
  );
};


  const toggleCardCheck = (cardId) => {
    setCheckedCards((prevChecked) =>
      prevChecked.includes(cardId)
        ? prevChecked.filter((id) => id !== cardId)
        : [...prevChecked, cardId]
    );
  };

  const handleShare = () => {
    const selectedCardDetails = flashCards
      .filter((card) => checkedCards.includes(card.id))
      .map(({ id, question, answer, status, lastModified }) => ({
        id,
        question,
        answer,
        status,
        lastModified,
      }));

    const jsonData = JSON.stringify(selectedCardDetails, null, 2);

    const subject = "Flash Cards Selection";
    const body = `Here are the details of the selected flash cards:\n\n${jsonData}`;

    const emailLink = `mailto:your-email@example.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = emailLink;
  };

  const renderCardActions = (card) => (
    <div className={`card-actions ${flippedCards[card.id] ? "visible" : ""}`}>
      {flippedCards[card.id] && (
        <>
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
        </>
      )}
    </div>
  );

  const handleDragStart = (cardId) => {
    setDraggedCardId(cardId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (targetCardId) => {
    if (draggedCardId !== targetCardId) {
      const updatedCards = flashCards.map((card) => {
        if (card.id === draggedCardId) {
          return {
            ...card,
            order: flashCards.find((c) => c.id === targetCardId).order,
          };
        }
        if (card.id === targetCardId) {
          return {
            ...card,
            order: flashCards.find((c) => c.id === draggedCardId).order,
          };
        }
        return card;
      });

      setFlashCards(updatedCards);
    }

    setDraggedCardId(null);
  };

  const getSortedCards = () => {
    if (!flashCards) {
      return [];
    }

    if (sortOption === "Last Modified") {
      return [...flashCards].sort(
        (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
      );
    } else if (sortOption === "Alphabetical order") {
      return [...flashCards].sort((a, b) =>
        a.question.localeCompare(b.question)
      );
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
        filterStatus === "All" ||
        card.status.toLowerCase() === filterStatus.toLowerCase()
    );

  return (
    <div>
      <h1>Flash Cards</h1>
      <button onClick={() => setModalOpen((prevOpen) => !prevOpen)}>
        Create New Card
      </button>

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
      {filteredAndSortedCards.map((card, index) => (
  <div
    key={card.id}
    className="flash-card-container"
    draggable
    onDragStart={() => handleDragStart(card.id)}
    onDragOver={(e) => handleDragOver(e)}
    onDrop={() => handleDrop(card.id)}
    onClick={() => toggleCardFlip(card.id)} // Updated this line
  >
    <div
      className={`flash-card ${
        flippedCards[card.id] ? "flipped" : ""
      } ${checkedCards.includes(card.id) ? "selected" : ""}`}
    >
      <input
        type="checkbox"
        className="card-checkbox"
        checked={checkedCards.includes(card.id)}
        onChange={() => toggleCardCheck(card.id)}
      />

      <div className="card-face">
        <div className="card-info">
          <div className="card-text">{card.question}</div>
          <div className="last-modified-text">
            Last Modified: {new Date(card.lastModified).toLocaleString()}
          </div>
        </div>
        {checkedCards.includes(card.id) && renderCardActions(card)}
      </div>
      <div
        className="card-face card-back"
        onClick={(event) => toggleCardFlip(card.id, event)}
      >
        <div className="card-info">
          <div className="card-text">{card.answer}</div>
          <div className="last-modified-text">
            Last Modified: {new Date(card.lastModified).toLocaleString()}
          </div>
        </div>
        {checkedCards.includes(card.id) && renderCardActions(card)}
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

      <div>
        <button onClick={handleShare}>Share Selected Cards</button>
      </div>
    </div>
  );
};

export default FlashCards;
