// src/pages/user/UserLogin.jsx
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import api from "../../lib/api.js";
import toast, { Toaster } from "react-hot-toast";
// import { FcGoogle } from "react-icons/fc"; // Google icon

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid email address");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const { data } = await api.post("/auth/user/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "user");

      toast.success("Login successful 🎉");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login handler
  const handleGoogleLogin = () => {
    window.location.href = "https://finhelp-backend-xrbc.onrender.com/auth/google"; 
    // 👆 Backend server ka URL (yaha Google auth start hoga)
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center px-4 font-poppins bg-white overflow-hidden">
      {/* <Toaster /> */}

      {/* Blurred Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#00FF7C]/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      {/* Glass Morph Card */}
      <div className="relative z-10 max-w-md w-full backdrop-blur-xl bg-white/40 border border-white/60 rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center mb-2 text-gray-900 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Login to{" "}
          <span className="text-[#00b76c] font-semibold">finHelp</span>
        </p>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#00b76c] focus:border-[#00b76c] outline-none transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#00b76c] focus:border-[#00b76c] outline-none transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#00FF7C] to-[#00b76c] disabled:opacity-60 hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-[1.02]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        {/* Google Login */}
 
          <button className="flex items-center mx-18 gap-2 border px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
          onClick={handleGoogleLogin}>
      <img
        src="https://www.svgrepo.com/show/355037/google.svg"
        alt="Google Logo"
        className="w-5 h-5"
      />
      Continue with Google
        </button>


        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/user/signup"
            className="text-[#00b76c] hover:text-[#008a55] font-medium transition"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
