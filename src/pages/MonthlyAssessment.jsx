import { useState } from "react";

const MonthlyAssessment = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [summary, setSummary] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSummary(null);
    setItems([]);

    if (!month || !year) {
      setError("Please select both month and year");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/items`);
      const allItems = await res.json();

      const filtered = allItems.filter((item) => {
        const date = new Date(item.boughtDate);
        return (
          date.getMonth() + 1 === parseInt(month) &&
          date.getFullYear() === parseInt(year)
        );
      });

      const totalSpent = filtered.reduce((sum, item) => sum + item.price, 0);

      setSummary({
        month: `${new Date(year, month - 1).toLocaleString("default", {
          month: "long",
        })} ${year}`,
        totalItems: filtered.length,
        totalSpent,
      });

      setItems(filtered);
    } catch (err) {
      console.error(err);
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">📅 Monthly Assessment</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full p-3 rounded text-black"
        >
          <option value="">Select Month</option>
          {[...Array(12)].map((_, i) => (
            <option value={i + 1} key={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter year e.g. 2025"
          className="w-full p-3 rounded text-black"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700 transition"
        >
          Get Summary
        </button>
      </form>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {summary && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">{summary.month}</h3>
          <p>🧾 Total Items Bought: <strong>{summary.totalItems}</strong></p>
          <p>💸 Total Amount Spent: <strong>₦{summary.totalSpent}</strong></p>
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow">
          <h4 className="text-lg font-bold mb-4">🗒 Items List</h4>
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item._id}
                className="flex justify-between border-b border-gray-600 pb-2"
              >
                <span>{item.name}</span>
                <span>₦{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MonthlyAssessment;
