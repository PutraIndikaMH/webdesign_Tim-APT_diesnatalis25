import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Trophy, Medal, Award, TrendingUp, Crown } from "lucide-react";
import {
  getLeaderboard,
  getUserPoints,
  getUserRank,
  updateLeaderboardWithUser,
} from "../utils/storage";
import AvatarImg from "../assets/Generic_avatar2.png?url";

const DailyPoin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userRank, setUserRank] = useState({
    rank: 0,
    points: 0,
    name: "You",
    avatar: "YU",
  });
  const [userPoints, setUserPoints] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Get user name from localStorage
    const user = JSON.parse(localStorage.getItem("te-tome-user") || "{}");
    setUserName(user.name || "User");

    // Update leaderboard with current user data first
    updateLeaderboardWithUser();

    // Then fetch updated data
    setLeaderboardData(getLeaderboard());
    setUserRank(getUserRank());
    setUserPoints(getUserPoints());
  }, []);

  const handleBack = () => {
    // Check if came from dashboard
    if (location.state?.from === "/dashboard") {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-slate-300" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return null;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 hover:border-yellow-500/50";
      case 2:
        return "from-slate-500/20 to-slate-600/10 border-slate-500/30 hover:border-slate-500/50";
      case 3:
        return "from-orange-500/20 to-orange-600/10 border-orange-500/30 hover:border-orange-500/50";
      default:
        return "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40";
    }
  };

  return (
    <div className="min-h-screen bg-[#004019]">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-xl border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto  px-3 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
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
              <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-white truncate">
                Daily Poin Leaderboard
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                Top 10 kontributor sampah hari ini
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-2xl p-4 sm:p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-yellow-500/20 rounded-xl">
                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Top Contributor
                </p>
                <p className="text-white font-bold text-base sm:text-xl">
                  Budi Santoso
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-2xl p-4 sm:p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-emerald-500/20 rounded-xl">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Total Points Today
                </p>
                <p className="text-white font-bold text-base sm:text-xl">
                  125,470
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-2xl p-4 sm:p-6 backdrop-blur-xl sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-blue-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Active Users
                </p>
                <p className="text-white font-bold text-base sm:text-xl">
                  1,245
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-4 sm:p-8 shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
            Leaderboard
          </h2>

          <div className="space-y-3">
            {leaderboardData.map((user) => {
              const isCurrentUser = user.name === userName;
              return (
                <div
                  key={user.rank}
                  className={`group relative bg-gradient-to-r ${
                    isCurrentUser
                      ? "from-purple-500/30 to-purple-600/20 border-purple-500/50 ring-2 ring-purple-400/30"
                      : getRankColor(user.rank)
                  } border rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                >
                  {isCurrentUser && (
                    <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                      YOU
                    </div>
                  )}
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                      {user.rank <= 3 ? (
                        <div className="scale-75 sm:scale-100">
                          {getRankIcon(user.rank)}
                        </div>
                      ) : (
                        <span className="text-xl sm:text-2xl font-bold text-slate-400">
                          {user.rank}
                        </span>
                      )}
                    </div>

                    {/* Avatar */}
                    {isCurrentUser ? (
                      <img
                        src={AvatarImg}
                        alt="Your Avatar"
                        className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-purple-400 shadow-lg"
                      />
                    ) : (
                      <div
                        className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${
                          user.rank === 1
                            ? "from-yellow-400 to-yellow-600"
                            : user.rank === 2
                            ? "from-slate-300 to-slate-500"
                            : user.rank === 3
                            ? "from-orange-400 to-orange-600"
                            : "from-emerald-400 to-emerald-600"
                        } flex items-center justify-center text-sm sm:text-base font-bold text-white shadow-lg`}
                      >
                        {user.avatar}
                      </div>
                    )}

                    {/* Name & Trend */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-white font-semibold text-base sm:text-lg truncate">
                        {user.name}
                      </h3>
                      <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-emerald-400 text-xs sm:text-sm font-medium">
                          {user.trend} today
                        </span>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg sm:text-2xl font-bold text-white">
                        {user.points.toLocaleString()}
                      </div>
                      <div className="text-slate-400 text-xs sm:text-sm">
                        points
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  {user.rank <= 3 && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="px-2 sm:px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                        Top {user.rank}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Your Rank Card */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-2xl p-4 sm:p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <img
                src={AvatarImg}
                alt="User Avatar"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-purple-500/50 shadow-lg flex-shrink-0"
              />
              <div className="min-w-0">
                <h3 className="text-white font-semibold text-base sm:text-lg truncate">
                  {userRank.name}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm truncate">
                  Keep collecting points!
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                #{userRank.rank}
              </div>
              <div className="text-slate-400 text-xs sm:text-sm">
                {userPoints.toLocaleString()} points
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPoin;
