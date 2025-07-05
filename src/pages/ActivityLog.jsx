import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`${API_URL}/activity`);
        if (!res.ok) throw new Error("Failed to fetch logs");
        const data = await res.json();
        setLogs(data);
      } catch (err) {
        console.error("❌ Error fetching logs:", err);
        setError("Failed to load activity logs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          📝 Activity Log
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : logs.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">No activity yet.</p>
        ) : (
          <ul className="space-y-4">
            {logs.map((log) => (
              <li
                key={log._id}
                className="border-b border-gray-300 dark:border-gray-700 pb-3 text-gray-800 dark:text-gray-200"
              >
                <span>{log.message}</span>
                <br />
                <small className="text-gray-500 dark:text-gray-400">
                  {new Date(log.timestamp).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
