import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (apiError) {
      setError(apiError?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={onSubmit} className="glass-card w-full max-w-md rounded-3xl p-7 shadow-xl">
        <p className="mb-2 text-sm font-semibold text-brand-600">Welcome Back</p>
        <h1 className="mb-6 text-3xl font-extrabold text-slate-900">Login to continue</h1>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-brand-100 bg-white px-3 py-3"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-brand-100 bg-white px-3 py-3"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-6 w-full shadow-lg shadow-brand-200"
        >
          {loading ? "Please wait..." : "Login"}
        </button>
        <p className="mt-4 text-sm text-slate-600">
          New user?{" "}
          <Link to="/register" className="font-medium text-brand-700">
            Create account
          </Link>
        </p>
        <p className="mt-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-700">
            Back to landing page
          </Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
