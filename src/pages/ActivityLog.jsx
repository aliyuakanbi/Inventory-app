import { useEffect, useState } from "react";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/activity");
        const data = await res.json();
        setLogs(data);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">📝 Activity Log</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : logs.length === 0 ? (
          <p className="text-center">No activity yet.</p>
        ) : (
          <ul className="space-y-3">
            {logs.map((log) => (
              <li key={log._id} className="border-b pb-2 text-gray-700">
                <span>{log.message}</span>
                <br />
                <small className="text-gray-500">
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
