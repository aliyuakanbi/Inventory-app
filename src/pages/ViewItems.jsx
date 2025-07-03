import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ added for navigation

const API_URL = "http://localhost:5000/api/items";

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="view-items-container">
      <h1>📦 All Items</h1>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <Link to={`/items/${item._id}`} className="item-link">
                <strong>{item.name}</strong>
              </Link>{" "}
              – ₦{item.price} <br />
              Added by: {item.addedBy}, Taken by: {item.takenBy}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewItems;
