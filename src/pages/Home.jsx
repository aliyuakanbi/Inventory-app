import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <div className="mb-4 p-3 rounded-md border border-yellow-300 bg-yellow-100 text-yellow-800">
        🚧 This app is under construction — updates coming soon!
      </div>

      {!user ? (
        <p className="text-center text-lg">🔒 Please log in to continue</p>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name} 👋</h1>
          <p>Your role: <strong>{user.role}</strong></p>
        </>
      )}
    </div>
  );
};

export default Home;
