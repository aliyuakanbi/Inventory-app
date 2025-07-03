import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  if (!user) return <p className="p-6 text-center">🔒 Please log in</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user.name} 👋</h1>
      <p>Your role: <strong>{user.role}</strong></p>
    </div>
  );
};

export default Dashboard;
