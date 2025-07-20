import { useState } from "react";

// ✅ Load API base URL from environment
const API_URL = import.meta.env.VITE_API_URL;

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    boughtDate: "",
    expiryDate: "",
    price: "",
    takenBy: "",
    addedBy: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const itemToSend = {
        ...formData,
        price: parseFloat(formData.price),
        boughtDate: new Date(formData.boughtDate),
        expiryDate: new Date(formData.expiryDate),
      };

      const res = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToSend),
      });

      if (res.ok) {
        setStatus("✅ Item added successfully!");
        setFormData({
          name: "",
          boughtDate: "",
          expiryDate: "",
          price: "",
          takenBy: "",
          addedBy: "",
        });
      } else {
        const err = await res.json();
        setStatus("❌ Error: " + err.error);
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to connect to server.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-10 overflow-x-hidden">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Add Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "takenBy", "addedBy"].map((field) => (
            <input
              key={field}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          ))}
          <input
            id="boughtDate"
            type="date"
            value={formData.boughtDate}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            id="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            id="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Add Item
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddItem;
