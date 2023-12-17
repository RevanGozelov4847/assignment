// components/HomePage.js
import React, { useState, useEffect } from 'react';
import FlashCard from '../components/FlashCard';
import FlashCardManagement from '../components/FlashCardManagement';

const HomePage = () => {
  const [flashCards, setFlashCards] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('lastModified');
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [status, setStatus] = useState('Want to Learn');

  useEffect(() => {
    fetch(`http://localhost:3001/flashCards`)
      .then(response => response.json())
      .then(data => {
        const filteredAndSortedCards = applyFiltersAndSort(data);
        setFlashCards(filteredAndSortedCards);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [searchText, statusFilter, sortBy]);

  const applyFiltersAndSort = (cards) => {
    // Apply text search filter
    const filteredCards = cards.filter(
      (card) =>
        card.front.toLowerCase().includes(searchText.toLowerCase()) ||
        card.back.toLowerCase().includes(searchText.toLowerCase())
    );

    // Apply status filter
    const statusFilteredCards =
      statusFilter === 'All' ? filteredCards : filteredCards.filter((card) => card.status === statusFilter);

    // Apply sorting
    const sortedCards = statusFilteredCards.sort((a, b) => {
      if (sortBy === 'lastModified') {
        return new Date(b.lastModified) - new Date(a.lastModified);
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      // Add more sorting options as needed
    });

    return sortedCards;
  };

  const handleAddCard = () => {
    const newCard = {
      front,
      back,
      lastModified: new Date().toLocaleString(),
      status,
    };

    fetch('http://localhost:3001/flashCards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    })
      .then(response => response.json())
      .then(data => {
        setFlashCards(prevCards => [...prevCards, data]);
        setFront('');
        setBack('');
        setStatus('Want to Learn');
      })
      .catch(error => console.error('Error adding card:', error));
  };

  const handleEditCard = (originalCard, updatedCard) => {
    fetch(`http://localhost:3001/flashCards/${originalCard.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCard),
    })
      .then(response => response.json())
      .then(data => {
        const updatedFlashCards = flashCards.map((card) =>
          card.id === originalCard.id ? data : card
        );
        setFlashCards(updatedFlashCards);
      })
      .catch(error => console.error('Error updating card:', error));
  };

  const handleDeleteCard = (cardToDelete) => {
    fetch(`http://localhost:3001/flashCards/${cardToDelete.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedFlashCards = flashCards.filter((card) => card.id !== cardToDelete.id);
        setFlashCards(updatedFlashCards);
      })
      .catch(error => console.error('Error deleting card:', error));
  };

  return (
    <div>
      <h1>Welcome to Flash Card App</h1>
      <input type="text" placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <label>Status:</label>
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Learned">Learned</option>
        <option value="Want to Learn">Want to Learn</option>
        <option value="Noted">Noted</option>
      </select>
      <label>Sort By:</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="lastModified">Last Modified</option>
        <option value="status">Status</option>
      </select>
      <h2>Flash Cards</h2>
      {flashCards.map((card) => (
        <FlashCard
          key={card.id}
          card={card}
          onEdit={handleEditCard}
          onDelete={handleDeleteCard}
        />
      ))}
      <FlashCardManagement onAddCard={handleAddCard} />
    </div>
  );
};

export default HomePage;
