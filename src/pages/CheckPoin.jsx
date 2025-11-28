import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Gift, Coins, Star, ShoppingBag, CheckCircle, X } from "lucide-react";
import {
  getUserPoints,
  getRewards,
  redeemReward,
  addRecentActivity,
} from "../utils/storage";

const CheckPoin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userPoints, setUserPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemResult, setRedeemResult] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleBack = () => {
    // Check if came from dashboard
    if (location.state?.from === "/dashboard") {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    setUserPoints(getUserPoints());
    setRewards(getRewards());
  }, []);

  const refreshData = () => {
    setUserPoints(getUserPoints());
    setRewards(getRewards());
  };

  const dummyRewards = [
    {
      id: 1,
      name: "Voucher Belanja 50K",
      points: 500,
      image: "🛒",
      category: "Voucher",
      stock: 45,
    },
    {
      id: 2,
      name: "Tumbler Stainless",
      points: 800,
      image: "🥤",
      category: "Merchandise",
      stock: 23,
    },
    {
      id: 3,
      name: "Tas Belanja Ramah Lingkungan",
      points: 600,
      image: "👜",
      category: "Merchandise",
      stock: 67,
    },
    {
      id: 4,
      name: "Voucher Pulsa 100K",
      points: 1000,
      image: "📱",
      category: "Voucher",
      stock: 89,
    },
    {
      id: 5,
      name: "Power Bank 10000mAh",
      points: 1500,
      image: "🔋",
      category: "Electronics",
      stock: 12,
    },
    {
      id: 6,
      name: "Voucher Makanan 75K",
      points: 750,
      image: "🍔",
      category: "Voucher",
      stock: 54,
    },
    {
      id: 7,
      name: "Earbuds Wireless",
      points: 2000,
      image: "🎧",
      category: "Electronics",
      stock: 8,
    },
    {
      id: 8,
      name: "Plant Starter Kit",
      points: 1200,
      image: "🌱",
      category: "Eco-Friendly",
      stock: 31,
    },
  ];

  const handleRedeemClick = (reward) => {
    if (userPoints >= reward.points && reward.stock > 0) {
      setSelectedReward(reward);
      setShowConfirmModal(true);
    }
  };

  const confirmRedeem = () => {
    if (selectedReward) {
      const result = redeemReward(selectedReward.id);
      if (result.success) {
        setRedeemResult(result);
        setShowConfirmModal(false);
        setShowModal(true);
        refreshData();

        // Add activity to recent activities
        addRecentActivity(`Redeemed: ${selectedReward.name}`);

        // Show toast notification
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    }
  };

  const cancelRedeem = () => {
    setShowConfirmModal(false);
    setSelectedReward(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReward(null);
    setRedeemResult(null);
  };

  return (
    <div className="min-h-screen bg-[#004019]">
      {/* Header */}
      <div className="bg-[#06221199] backdrop-blur-xl border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
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
                  Tukar Poin
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5 sm:mt-1 truncate">
                  Tukarkan poin Anda dengan hadiah menarik
                </p>
              </div>
            </div>

            {/* User Points */}
            <div className="hidden md:flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-full px-3 sm:px-4 py-2 sm:py-3">
              <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              <div>
                <p className="text-slate-400 text-xs">Poin Anda</p>
                <p className="text-white font-bold text-base sm:text-lg md:text-xl">
                  {userPoints.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Points Display */}
          <div className="md:hidden mt-3 sm:mt-4 bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              <span className="text-slate-400 text-xs sm:text-sm">
                Poin Anda
              </span>
            </div>
            <p className="text-white font-bold text-base sm:text-lg md:text-xl">
              {userPoints.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        {/* Rewards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {rewards.map((reward) => {
            const canAfford = userPoints >= reward.points;
            return (
              <div
                key={reward.id}
                className={`group relative bg-slate-900/50 backdrop-blur-xl border rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl transition-all duration-300 hover:scale-[1.03] ${
                  canAfford
                    ? "border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-emerald-500/20"
                    : "border-slate-700/30 opacity-60"
                }`}
              >
                {/* Stock Badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 bg-slate-800/80 backdrop-blur-sm rounded-full text-xs text-slate-300">
                  Stock: {reward.stock}
                </div>

                {/* Reward Image */}
                <div className="w-full aspect-square bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300">
                  {reward.image}
                </div>

                {/* Reward Info */}
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <span className="inline-block px-2 sm:px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full mb-2">
                      {reward.category}
                    </span>
                    <h3 className="text-white font-semibold text-base sm:text-lg leading-tight">
                      {reward.name}
                    </h3>
                  </div>

                  {/* Points */}
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold text-lg sm:text-xl">
                      {reward.points.toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-xs sm:text-sm">
                      poin
                    </span>
                  </div>

                  {/* Redeem Button */}
                  <button
                    onClick={() => handleRedeemClick(reward)}
                    disabled={!canAfford}
                    className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                      canAfford
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-emerald-500/50"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                    {canAfford ? "Tukar Sekarang" : "Poin Tidak Cukup"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-emerald-500/20 rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-scale-in">
            <button
              onClick={cancelRedeem}
              className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-xl transition-all duration-300"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-yellow-500/20 rounded-full">
                <svg
                  className="w-16 h-16 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Konfirmasi Penukaran
                </h3>
                <p className="text-slate-300 text-sm">
                  Apakah Anda yakin ingin menukar poin untuk reward ini?
                </p>
              </div>

              <div className="w-full bg-slate-800/50 rounded-2xl p-6 space-y-3">
                <div className="text-5xl mb-3">{selectedReward.image}</div>
                <h4 className="text-white font-semibold text-lg">
                  {selectedReward.name}
                </h4>
                <div className="flex items-center justify-center gap-2 text-emerald-400">
                  <Star className="w-5 h-5 fill-emerald-400" />
                  <span className="font-bold">
                    {selectedReward.points.toLocaleString()} poin
                  </span>
                </div>
              </div>

              <div className="w-full flex gap-3">
                <button
                  onClick={cancelRedeem}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Batal
                </button>
                <button
                  onClick={confirmRedeem}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Ya, Tukar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showModal && selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-emerald-500/20 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-xl transition-all duration-300"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-emerald-500/20 rounded-full">
                <CheckCircle className="w-16 h-16 text-emerald-400" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Reward Berhasil Ditukar!
                </h3>
                <p className="text-slate-300 text-sm">
                  Silahkan cek email Anda untuk informasi lebih lanjut
                </p>
              </div>

              <div className="w-full bg-slate-800/50 rounded-2xl p-6 space-y-3">
                <div className="text-5xl mb-3">{selectedReward.image}</div>
                <h4 className="text-white font-semibold text-lg">
                  {selectedReward.name}
                </h4>
                <div className="flex items-center justify-center gap-2 text-emerald-400">
                  <Star className="w-5 h-5 fill-emerald-400" />
                  <span className="font-bold">
                    -{selectedReward.points.toLocaleString()} poin
                  </span>
                </div>
              </div>

              <div className="w-full text-slate-400 text-sm">
                <p>Sisa poin Anda:</p>
                <p className="text-white text-2xl font-bold mt-1">
                  {redeemResult
                    ? redeemResult.newPoints.toLocaleString()
                    : userPoints.toLocaleString()}{" "}
                  poin
                </p>
              </div>

              <button
                onClick={closeModal}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-in-right">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-500/50 flex items-center gap-3 border border-emerald-400/30">
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-semibold">Poin Berhasil Ditukarkan!</p>
              <p className="text-sm text-emerald-100">
                Reward Anda sedang diproses
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckPoin;
