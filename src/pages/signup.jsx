import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// ✅ Use backend URL from environment
const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Signing up...");

    try {
      // ✅ Use API_URL from .env
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Signup successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/"); // 👈 Redirect to Home after signup
      } else {
        setStatus("❌ " + data.message);
      }
    } catch (err) {
      setStatus("❌ Error connecting to server");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

        {status && (
          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
