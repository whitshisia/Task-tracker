import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Prefill username and password if coming from signup
  useEffect(() => {
    if (location.state?.username) setUsername(location.state.username);
    if (location.state?.password) setPassword(location.state.password);
  }, [location.state]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-400 to-indigo-500 p-6">
      <form className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h1>

        <button
          type="button"
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="flex items-center justify-center gap-2 text-gray-400">or</div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition">
          Login
        </button>

        <div className="flex justify-between text-sm text-gray-500">
          <a href="/forgot-password" className="hover:text-sky-600">Forgot Password?</a>
          <a href="/signup" className="hover:text-sky-600">Don't have an account? Sign Up</a>
        </div>
      </form>
    </div>
  );
}
