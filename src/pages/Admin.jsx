import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Admin = () => {
  const [activities, setActivities] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterMonth, setFilterMonth] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await axios.get(`${API_URL}/activity`);
      setActivities(res.data);
    } catch (error) {
      console.error('❌ Failed to fetch activities:', error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const filtered = activities.filter((a) => {
    const matchesName = filterName
      ? a.takenBy?.toLowerCase().includes(filterName.toLowerCase())
      : true;

    const matchesMonth = filterMonth
      ? new Date(a.date).toLocaleString('default', { month: 'long' }) === filterMonth
      : true;

    return matchesName && matchesMonth;
  });

  const grouped = {};
  filtered.forEach((a) => {
    const name = a.takenBy || 'Unknown';
    if (!grouped[name]) grouped[name] = [];
    grouped[name].push(a);
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10 text-black dark:text-white flex justify-center">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-400 mb-8">
          👨‍💼 Admin Overview
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <input
            type="text"
            placeholder="Filter by name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="px-4 py-2 border rounded-md text-black"
          />
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="px-4 py-2 border rounded-md text-black"
          >
            <option value="">All Months</option>
            {[
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December',
            ].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {(filterName || filterMonth) && (
            <button
              onClick={() => {
                setFilterName('');
                setFilterMonth('');
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Grouped Activities */}
        {Object.keys(grouped).length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No activities found.
          </p>
        ) : (
          Object.entries(grouped).map(([person, items], i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6"
            >
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                👤 {person} —{' '}
                <span className="text-gray-600 dark:text-gray-400">
                  {items.length} item{items.length !== 1 && 's'}
                </span>
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {items.map((item, j) => (
                  <li key={j}>
                    Took{' '}
                    <span className="font-semibold text-green-700 dark:text-green-400">
                      {item.itemName}
                    </span>{' '}
                    on {formatDate(item.date)}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
