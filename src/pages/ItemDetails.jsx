import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ItemDetails = () => {
  const { id } = useParams(); // Get item ID from URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/items/${id}`);
        if (!res.ok) throw new Error("Item not found");
        const data = await res.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <p>Loading item...</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="item-details-container"  style={{ color: "black" }}>
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
