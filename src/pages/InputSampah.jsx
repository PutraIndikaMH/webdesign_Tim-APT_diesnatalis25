import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Upload,
  Image as ImageIcon,
  X,
  CheckCircle,
  Camera,
} from "lucide-react";
import {
  addUserPoints,
  updateUserRank,
  addWaste,
  addRecentActivity,
  updateLeaderboardWithUser,
} from "../utils/storage";

const InputSampah = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBack = () => {
    // Check if came from dashboard
    if (location.state?.from === "/dashboard") {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  };

  const categories = [
    "Plastik Botol",
    "Plastik Kemasan",
    "Kertas",
    "Kardus",
    "Kaleng",
    "Kaca",
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const weightKg = parseFloat(weight);
    const pointsEarned = Math.floor(weightKg * 100);

    // Update points and waste
    addUserPoints(pointsEarned);
    updateUserRank(pointsEarned);
    addWaste(weightKg);

    // Add to recent activities
    addRecentActivity(`Input Sampah ${category}`, pointsEarned, "Upload");

    // Update leaderboard
    updateLeaderboardWithUser();

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedFile(null);
      setPreview(null);
      setCategory("");
      setWeight("");
    }, 3000);
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-[#004019]">
      {/* Header */}
      <div className="bg-[#06221199] backdrop-blur-xl border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-white/5 rounded-xl transition-all duration-300 flex-shrink-0"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
                Input Sampah
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5 sm:mt-1 truncate">
                Upload foto sampah untuk mendapatkan poin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 md:space-y-8"
        >
          {/* Upload Area */}
          <div className="bg-[#0215096f] backdrop-blur-xl border border-emerald-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
            <label className="block text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
              Upload Foto Sampah
            </label>

            {!preview ? (
              <label className="group relative block w-full aspect-video border-2 border-dashed border-emerald-500/30 hover:border-emerald-500/60 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden bg-[#1739286f] hover:bg-green-800/60">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="p-6 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-all duration-300 group-hover:scale-110">
                    <Camera className="w-12 h-12 text-emerald-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-lg mb-2">
                      Click to upload atau drag & drop
                    </p>
                    <p className="text-slate-400 text-sm">
                      PNG, JPG, JPEG (max. 5MB)
                    </p>
                  </div>
                </div>
              </label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full aspect-video object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 p-2 bg-red-500/90 hover:bg-red-600 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}
          </div>

          {/* Category Selection */}
          <div className=" bg-[#06221199] backdrop-blur-xl border border-emerald-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
            <label className="block text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
              Kategori Sampah
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`p-3 sm:p-4 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 ${
                    category === cat
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                      : " bg-[#1739286f] hover:bg-green-800/60 text-slate-300 hover:bg-slate-800 border border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Weight Input */}
          <div className="bg-[#082c1699] backdrop-blur-xl border border-emerald-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
            <label className="block text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
              Perkiraan Berat (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Masukkan berat sampah"
              className="w-full px-6 py-4 bg-green-900 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
              required
            />
            <p className="text-white text-sm mt-3">1 kg sampah = 100 poin</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedFile || !category || !weight}
            className="w-full py-4 sm:py-5 bg-green-500 hover:from-emerald-600 hover:to-emerald-700 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 sm:gap-3"
          >
            <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
            Submit Sampah
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-emerald-500/20 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-emerald-500/20 rounded-full">
                <CheckCircle className="w-16 h-16 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Berhasil!</h3>
              <p className="text-slate-300">
                Sampah berhasil diinput. Poin akan segera ditambahkan ke akun
                Anda.
              </p>
              <div className="text-emerald-400 text-3xl font-bold">
                +{Math.floor(parseFloat(weight) * 100)} Poin
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputSampah;
