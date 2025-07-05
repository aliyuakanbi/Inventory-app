import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

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
      const res = await fetch(`${API_URL}/items`);
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
      setError("❌ Failed to connect to server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-black dark:text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          📅 Monthly Assessment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

        {summary && (
          <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{summary.month}</h3>
            <p>🧾 Total Items Bought: <strong>{summary.totalItems}</strong></p>
            <p>💸 Total Amount Spent: <strong>₦{summary.totalSpent}</strong></p>
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
            <h4 className="text-lg font-bold mb-4">🗒 Items List</h4>
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between border-b border-gray-300 dark:border-gray-600 pb-2"
                >
                  <span>{item.name}</span>
                  <span>₦{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyAssessment;
