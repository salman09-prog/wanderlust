import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API from "@/services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || "Login failed");
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <form onSubmit={submit} className="w-96 space-y-4 p-8 shadow-xl rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/10">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Welcome Back</h2>
        {error && <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded">{error}</div>}
        <input
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
          Login
        </button>
        <p className="text-center text-zinc-400 text-sm mt-4">
          Don't have an account? <Link to="/register" className="text-white hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}