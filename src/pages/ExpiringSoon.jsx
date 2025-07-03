import { useEffect, useState } from "react";

const ExpiringSoon = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/expiring-soon")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch expiring items:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">⚠️ Expiring Soon</h1>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No items expiring in the next 3 days.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
            >
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>Expires on: {new Date(item.expiryDate).toDateString()}</p>
              <p>Taken by: {item.takenBy}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpiringSoon;
