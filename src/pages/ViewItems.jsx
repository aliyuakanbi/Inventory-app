import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ✅ Use environment variable instead of hardcoded localhost
const API_URL = import.meta.env.VITE_API_URL;

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/items`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      setStatus("❌ Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="view-items-container p-4 text-black">
      <h1 className="text-xl font-bold mb-4">📦 All Items</h1>
      {loading ? (
        <p>Loading...</p>
      ) : status ? (
        <p>{status}</p>
      ) : items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item._id} className="border-b pb-2">
              <Link
                to={`/items/${item._id}`}
                className="text-blue-600 hover:underline font-semibold"
              >
                {item.name}
              </Link>{" "}
              – ₦{item.price}
              <div className="text-sm">
                Added by: {item.addedBy || "N/A"}, Taken by: {item.takenBy || "N/A"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewItems;
