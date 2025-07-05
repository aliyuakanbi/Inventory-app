import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const ExpiringSoon = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpiringItems = async () => {
      try {
        const res = await fetch(`${API_URL}/expiring-soon`);
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("❌ Failed to fetch expiring items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiringItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-black dark:text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">⚠️ Expiring Soon</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500">✅ No items expiring in the next 3 days.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item._id}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border border-gray-300 dark:border-gray-600"
              >
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>🗓 Expires: {new Date(item.expiryDate).toDateString()}</p>
                <p>👤 Taken by: {item.takenBy}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpiringSoon;
