import React, { useEffect, useState } from "react";
import { useFlashCards, ActionTypes } from "../context/FlashCardsContext";
import FlashCard from "../components/FlashCard";

const FlashCards = () => {
  const { state, dispatch } = useFlashCards();
  const [newCard, setNewCard] = useState({
    front: "",
    back: "",
    status: "Noted",
  });
  const [editCard, setEditCard] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortCriteria, setSortCriteria] = useState("front");
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/flashCards")
      .then((response) => response.json())
      .then((data) => dispatch({ type: ActionTypes.SET_CARDS, payload: data }))
      .catch((error) => console.error("Error fetching data:", error));
  }, [dispatch]);

  const handleCreate = () => {
    const currentTime = new Date().toISOString();
    const createdCard = {
      ...newCard,
      id: Date.now(),
      lastModified: currentTime,
    };

    fetch("http://localhost:3001/flashCards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdCard),
    })
      .then((response) => response.json())
      .then((responseCard) => {
        const cardWithLastModified = {
          ...responseCard,
          lastModified: currentTime,
        };
        dispatch({
          type: ActionTypes.ADD_CARD,
          payload: cardWithLastModified,
        });
      })
      .catch((error) => console.error("Error creating card:", error));

    setNewCard({ front: "", back: "", status: "Noted" });
  };

  const handleEdit = () => {
    const currentTime = new Date().toISOString(); 
    const updatedCard = {
      ...editCard,
      lastModified: currentTime,
    };

    fetch(`http://localhost:3001/flashCards/${editCard.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard),
    })
      .then((response) => response.json())
      .then((responseCard) => {
        const cardWithLastModified = {
          ...responseCard,
          lastModified: currentTime,
        };
        dispatch({
          type: ActionTypes.UPDATE_CARD,
          payload: cardWithLastModified,
        });
      })
      .catch((error) => console.error("Error updating card:", error));

    setEditCard(null);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/flashCards/${id}`, {
      method: "DELETE",
    })
      .then(() => dispatch({ type: ActionTypes.DELETE_CARD, payload: id }))
      .catch((error) => console.error("Error deleting card:", error));
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleSelect = (card) => {
    const isSelected = selectedCards.some((c) => c.id === card.id);

    if (isSelected) {
      const updatedSelection = selectedCards.filter((c) => c.id !== card.id);
      setSelectedCards(updatedSelection);
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleShare = () => {
    const cardsToShare = selectedCards.map(({ id, front, back, status }) => ({
      id,
      front,
      back,
      status,
    }));

    const jsonData = JSON.stringify(cardsToShare, null, 2);

    window.location.href = `mailto:?subject=FlashCards&body=${encodeURIComponent(
      jsonData
    )}`;
  };

  const filteredCards = state.cards.filter((card) => {
    if (statusFilter !== "All" && card.status !== statusFilter) {
      return false;
    }

    if (searchText.trim() !== "") {
      const searchTerm = searchText.toLowerCase();
      return (
        card.front.toLowerCase().includes(searchTerm) ||
        card.back.toLowerCase().includes(searchTerm)
      );
    }

    return true;
  });

  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortCriteria === "front") {
      return a.front.localeCompare(b.front);
    } else if (sortCriteria === "lastModified") {
      return new Date(b.lastModified) - new Date(a.lastModified);
    }
    return 0;
  });

  return (
    <div className="flash-cards-container">
      <div className="search-sort">
        <div>
          <input
            type="text"
            placeholder="Front"
            value={newCard.front}
            onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
          />
          <input
            type="text"
            placeholder="Back"
            value={newCard.back}
            onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
          />
          <select
            value={newCard.status}
            onChange={(e) => setNewCard({ ...newCard, status: e.target.value })}
          >
            <option value="Learned">Learned</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
          </select>
          <button onClick={handleCreate}>Create</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Learned">Learned</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
          </select>
        </div>
        <div>
          <span>Sort:</span>
          <select
            value={sortCriteria}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="front">Alphabetic</option>
            <option value="lastModified">Last Modified Time</option>
          </select>
        </div>
      </div>
      <div className="cards">
        {sortedCards.map((card) => (
          <div key={card.id} className="flash-card-wrapper">
            {editCard && editCard.id === card.id ? (
              <>
                <input
                  type="text"
                  value={editCard.front}
                  onChange={(e) =>
                    setEditCard({ ...editCard, front: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editCard.back}
                  onChange={(e) =>
                    setEditCard({ ...editCard, back: e.target.value })
                  }
                />
                <select
                  value={editCard.status}
                  onChange={(e) =>
                    setEditCard({ ...editCard, status: e.target.value })
                  }
                >
                  <option value="Learned">Learned</option>
                  <option value="Want to Learn">Want to Learn</option>
                  <option value="Noted">Noted</option>
                </select>
                <button onClick={handleEdit}>Save</button>
              </>
            ) : (
              <FlashCard
                card={card}
                onEdit={(editedCard) => setEditCard(editedCard)}
                onDelete={handleDelete}
                onSelect={() => handleSelect(card)}
                isSelected={selectedCards.some((c) => c.id === card.id)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="share-section">
        <button
          onClick={handleShare}
          disabled={selectedCards.length === 0}
        >
          Share Selected
        </button>
      </div>
    </div>
  );
};

export default FlashCards;
