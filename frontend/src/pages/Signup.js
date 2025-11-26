import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const { signup, signupWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(username, password);
      // Redirect to login and prefill
      navigate("/login", { state: { username, password } });
    } catch (err) {
      setError("Signup failed. Try another username.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-sky-400 p-6">
      <form className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center text-gray-800">Create Account</h1>

        <button
          type="button"
          onClick={signupWithGoogle}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>

        <div className="flex items-center justify-center gap-2 text-gray-400">or</div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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

        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
          Sign Up
        </button>

        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="hover:text-indigo-600 font-medium">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
