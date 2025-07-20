import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  const { user, login } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("Logging in...");

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("📦 Login response:", data);

      if (res.ok) {
        login(data.user); // ✅ Save to context + localStorage
        setStatus("✅ Login successful!");
        navigate("/");
      } else {
        setStatus("❌ " + (data.message || "Invalid credentials"));
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setStatus("❌ Could not connect to server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Don’t have an account?
          </span>{" "}
          <Link
            to="/signup"
            className="text-black dark:text-white hover:text-blue-600 hover:underline font-bold transition"
          >
            Sign up
          </Link>
        </div>

        {status && (
          <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
