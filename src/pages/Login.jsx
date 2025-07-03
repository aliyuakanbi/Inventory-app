import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../UserContext"; // ✅ import context

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { user, login } = useUser(); // ✅ get user & login function from context

  // ✅ Redirect if already logged in
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
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("📦 Login response:", data);

      if (res.ok) {
        setStatus("✅ Login successful!");
        login(data.user); // ✅ login using context
        navigate("/"); // ✅ Redirect
      } else {
        setStatus("❌ " + data.message);
      }
    } catch (err) {
      console.error("❌ Error logging in:", err);
      setStatus("❌ Error logging in.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
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
          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
