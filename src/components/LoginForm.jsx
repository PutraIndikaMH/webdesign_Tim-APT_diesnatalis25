import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const LoginForm = ({ onClose, requireMessage = false }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy authentication
    if (email === "user@gmail.com" && password === "user123") {
      // Save user to localStorage
      const user = {
        name: "User",
        email: email,
        avatar: "U",
        joinDate: "2024",
      };
      localStorage.setItem("te-tome-user", JSON.stringify(user));

      // Redirect to dashboard
      onClose();
      navigate("/dashboard");
    } else {
      setError("Email atau password salah");
    }
  };

  return (
    <div className="fixed scroll-smooth md:scroll-auto inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md mx-4 animate-in zoom-in-95 duration-300">
        <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-500/20 p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 group"
          >
            <X
              size={20}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            {/* require-login message from parent */}
            {requireMessage && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                Anda harus login terlebih dahulu
              </div>
            )}
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-400">Masuk ke akun Te-Tome Anda</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="nama@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-slate-400">
                <input type="checkbox" className="mr-2" />
                Ingat saya
              </label>
              <a
                href="#"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02]"
            >
              Masuk
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Belum punya akun?{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate("/register");
              }}
              className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              Daftar sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
