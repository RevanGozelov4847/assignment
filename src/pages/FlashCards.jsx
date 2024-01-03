import React, { useEffect, useState } from "react";
import { useFlashCards, ActionTypes } from "../context/FlashCardsContext";
import FlashCard from "../components/FlashCard";
import { Modal, EditForm } from "../components/Modal";
// import InfiniteScroll from "react-infinite-scroll-component";

const FlashCards = () => {
  const { state, dispatch } = useFlashCards();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); 
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
  const [isEditing, setIsEditing] = useState(false);
  const [dragState, setDragState] = useState({
    draggedIndex: null,
    hoverIndex: null,
  });
  const areCardsSelected = selectedCards.length > 0;

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  const loadMore = () => {
    if (loading) return; 
    setLoading(true);
    const nextPage = currentPage + 1;

    fetch(
      `http://localhost:3001/flashCards?_page=${nextPage}&_limit=${cardsPerPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          dispatch({ type: ActionTypes.ADD_CARD, payload: data });
          setCurrentPage(nextPage);
        }
      })
      .catch((error) => {
        console.error("Error fetching more data:", error);
        setHasMore(false);
      })
      .finally(() => setLoading(false)); 
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore
    ) {
      loadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.cards.length, hasMore]);

  useEffect(() => {
    fetch(
      `http://localhost:3001/flashCards?_page=${currentPage}&_limit=${cardsPerPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: ActionTypes.SET_CARDS, payload: data });
        if (data.length < cardsPerPage) {
          setHasMore(false);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, currentPage, cardsPerPage]);

  const handleEdit = (editedCard) => {
    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()} ${currentTime.getDate()} ${currentTime.toLocaleDateString(
      "en-US",
      { month: "long" }
    )}`;

    const updatedCard = {
      ...editedCard,
      lastModified: formattedTime,
    };

    fetch(`http://localhost:3001/flashCards/${editedCard.id}`, {
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
          lastModified: formattedTime,
        };
        dispatch({
          type: ActionTypes.UPDATE_CARD,
          payload: cardWithLastModified,
        });
      })
      .catch((error) => console.error("Error updating card:", error));

    setEditCard(null);
    setIsEditing(false);
  };

  const handleCreate = () => {
    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()} ${currentTime.getDate()} ${currentTime.toLocaleDateString(
      "en-US",
      { month: "long" }
    )}`;

    const createdCard = {
      ...newCard,
      id: Date.now(),
      lastModified: formattedTime,
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
          lastModified: formattedTime,
        };
        dispatch({
          type: ActionTypes.ADD_CARD,
          payload: cardWithLastModified,
        });
      })
      .catch((error) => console.error("Error creating card:", error));

    setNewCard({ front: "", back: "", status: "Noted" });
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

  const handleDrop = (draggedIndex, hoverIndex) => {
    const updatedCards = [...state.cards];
    const [draggedCard] = updatedCards.splice(draggedIndex, 1);
    updatedCards.splice(hoverIndex, 0, draggedCard);

    dispatch({ type: ActionTypes.SET_CARDS, payload: updatedCards });

    localStorage.setItem(
      "flashCardOrder",
      JSON.stringify(updatedCards.map((card) => card.id))
    );

    fetch("http://localhost:3001/cardOrder", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCards.map((card) => card.id)),
    })
      .then((response) => response.json())
      .then((data) => console.log("Card order updated in db.json:", data))
      .catch((error) => console.error("Error updating card order:", error));

    setDragState({ draggedIndex: null, hoverIndex: null });
  };

  const filteredCards = state.cards.filter((card) => {
    return (
      (statusFilter === "All" || card.status === statusFilter) &&
      (searchText.trim() === "" ||
        card.front.toLowerCase().includes(searchText.toLowerCase()) ||
        card.back.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  const sortedCards = filteredCards.sort((a, b) => {
    if (sortCriteria === "front") {
      return (a.front || "").localeCompare(b.front || "");
    } else if (sortCriteria === "lastModified") {
      return new Date(b.lastModified) - new Date(a.lastModified);
    }
    return 0;
  });

  useEffect(() => {
    fetch("http://localhost:3001/flashCards")
      .then((response) => response.json())
      .then((data) => dispatch({ type: ActionTypes.SET_CARDS, payload: data }))
      .catch((error) => console.error("Error fetching data:", error));
  }, [dispatch]);

  return (
    <div className="flash-cards-container">
      {/* <InfiniteScroll
        dataLength={state.cards.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading More...</h4>}
        endMessage={<p>No more cards to load.</p>}
      > */}
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
          <button
            className={`share-button ${
              areCardsSelected ? "cards-selected" : ""
            }`}
            onClick={handleShare}
            disabled={!areCardsSelected}
          >
            Share Selected
          </button>
        </div>
      </div>
      <div className="cards">
        {sortedCards.map((card, index) => (
          <div
            key={card.id}
            className={`flash-card-wrapper ${
              dragState.draggedIndex === index ? "dragged" : ""
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(dragState.draggedIndex, index)}
          >
            <FlashCard
              card={card}
              onEdit={() => {
                setEditCard(card);
                setIsEditing(true);
              }}
              onDelete={handleDelete}
              onSelect={() => handleSelect(card)}
              isSelected={selectedCards.some((c) => c.id === card.id)}
              onDrop={(draggedIndex) =>
                setDragState({ draggedIndex, hoverIndex: index })
              }
            />
          </div>
        ))}
        {hasMore && <div>Loading more cards...</div>}
      </div>
      {hasMore && !loading && (
        <div className="load-more">
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
      {/* </InfiniteScroll> */}
      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <EditForm
            card={editCard}
            onSave={(editedCard) => handleEdit(editedCard)}
            onCancel={() => setIsEditing(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default FlashCards;
