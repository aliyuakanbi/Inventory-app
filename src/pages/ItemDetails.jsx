import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// ✅ Use the environment variable for backend URL
const API_URL = import.meta.env.VITE_API_URL;

const ItemDetails = () => {
  const { id } = useParams(); // Get item ID from URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`${API_URL}/items/${id}`);
        if (!res.ok) throw new Error("Item not found");
        const data = await res.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching item:", error);
        setError("❌ Failed to fetch item.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <p>Loading item...</p>;
  if (error || !item) return <p>{error || "Item not found."}</p>;

  return (
    <div className="item-details-container" style={{ color: "black" }}>
      <h1>{item.name}</h1>
      <p><strong>Price:</strong> ₦{item.price}</p>
      <p><strong>Bought Date:</strong> {new Date(item.boughtDate).toLocaleDateString()}</p>
      <p><strong>Expiry Date:</strong> {new Date(item.expiryDate).toLocaleDateString()}</p>
      <p><strong>Added By:</strong> {item.addedBy}</p>
      <p><strong>Taken By:</strong> {item.takenBy}</p>
    </div>
  );
};

export default ItemDetails;
