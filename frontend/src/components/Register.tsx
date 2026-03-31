import API from "@/services/api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/register", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <form onSubmit={submit} className="w-96 space-y-4 p-8 shadow-xl rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/10">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Create Account</h2>
        {error && <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded">{error}</div>}
        <input
          placeholder="Name"
          className="w-full border border-white/20 bg-black/50 text-white placeholder:text-zinc-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-white/20 bg-black/50 text-white placeholder:text-zinc-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-white/20 bg-black/50 text-white placeholder:text-zinc-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="w-full bg-white hover:bg-white/90 text-black font-medium py-3 rounded-lg transition-colors">
          Register
        </button>
        <p className="text-center text-zinc-400 text-sm mt-4">
          Already have an account? <Link to="/login" className="text-white hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}