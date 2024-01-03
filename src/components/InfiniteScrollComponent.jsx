import React, { useState, useEffect } from "react";

const InfiniteScrollComponent = ({ loadMoreData, hasMore }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const isScrollingNearBottom = () => {
    return (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    );
  };

  const handleScroll = async () => {
    if (isScrollingNearBottom() && !loading && hasMore) {
      setLoading(true);
      const newItems = await loadMoreData();
      setItems([...items, ...newItems]);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, loading, hasMore]);

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      {loading && <div>Loading more items...</div>}
    </div>
  );
};

export default InfiniteScrollComponent;
