import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  LogOut,
  TrendingUp,
  Upload,
  Gift,
  Truck,
  Activity,
  Target,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import {
  getUserPoints,
  getLeaderboard,
  getRecentActivities,
  getRelativeTime,
  getTotalWaste,
  getMonthlyChallenge,
  getUserRank,
} from "../utils/storage";
import AvatarImg from "../assets/Generic_avatar2.png?url";
import EditProfileModal from "../components/EditProfileModal";
import Navigation from "../components/Navigation";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userPoints, setUserPoints] = useState(0);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userData, setUserData] = useState({
    name: "User",
    email: "user@gmail.com",
    avatar: AvatarImg,
    joinDate: "2024",
    totalWaste: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [userRank, setUserRank] = useState({ rank: 0, points: 0 });
  const [monthlyChallenge, setMonthlyChallenge] = useState({
    current: 0,
    target: 50,
  });

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("te-tome-user");
    if (!loggedInUser) {
      navigate("/home");
      return;
    }

    const user = JSON.parse(loggedInUser);
    const userPoints = getUserPoints();
    const totalWaste = getTotalWaste();

    // If totalWaste is 0 but user has points, calculate from points (1kg = 100 points)
    const calculatedWaste =
      totalWaste > 0 ? totalWaste : Math.floor(userPoints / 100);

    const challenge = getMonthlyChallenge();
    const rank = getUserRank();

    setUserData({
      ...userData,
      name: user.name || "User",
      email: user.email,
      totalWaste: calculatedWaste,
    });
    setUserPoints(userPoints);
    setRecentActivities(getRecentActivities());
    setUserRank(rank);
    setMonthlyChallenge(challenge);
  }, []);

  const handleSaveProfile = (updatedData) => {
    const user = JSON.parse(localStorage.getItem("te-tome-user"));
    user.name = updatedData.name;
    localStorage.setItem("te-tome-user", JSON.stringify(user));
    setUserData(updatedData);
    setShowEditProfile(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("te-tome-user");
    navigate("/home");
  };

  const quickActions = [
    {
      icon: Upload,
      title: "Input Sampah",
      desc: "Upload foto sampah",
      path: "/input-sampah",
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Gift,
      title: "Tukar Poin",
      desc: "Redeem rewards",
      path: "/check-poin",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Truck,
      title: "Jemput Sampah",
      desc: "Jadwalkan pickup",
      path: "/jemput-sampah",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Leaderboard",
      desc: "Lihat peringkat",
      path: "/daily-poin",
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  const stats = [
    {
      label: "Total Poin",
      value: userPoints.toLocaleString(),
      icon: Star,
      color: "yellow",
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      label: "Sampah Diinput",
      value: `${userData.totalWaste} kg`,
      icon: Activity,
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Peringkat",
      value: `#${userRank.rank}`,
      icon: Trophy,
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-950">
      {/* Navigation */}
      <Navigation onLoginClick={() => {}} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 mt-20 sm:mt-24 md:mt-28 lg:mt-32">
        {/* Welcome Section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="bg-[#0c2f1e6f] border border-emerald-500/30 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 backdrop-blur-xl relative">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              <img
                src={userData.avatar}
                alt="User Avatar"
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl shadow-emerald-500/50 object-cover border-2 border-emerald-500/30 flex-shrink-0"
              />
              <div className="flex-1 text-center md:text-left min-w-0">
                <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2 leading-tight break-words">
                  Selamat Datang, {userData.name}! 👋
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm md:text-base break-words">
                  Mari lanjutkan kontribusi Anda untuk lingkungan yang lebih
                  bersih
                </p>
              </div>
              <div className="flex lg:hidden items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-white/10 w-full md:w-auto justify-center flex-shrink-0">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-slate-400 text-[10px] sm:text-xs whitespace-nowrap">
                    Total Poin
                  </p>
                  <p className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl whitespace-nowrap">
                    {userPoints.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10 flex-shrink-0">
                <Zap className="w-10 h-10 text-yellow-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-slate-400 text-xs whitespace-nowrap">
                    Total Poin
                  </p>
                  <p className="text-white font-bold text-2xl whitespace-nowrap">
                    {userPoints.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className=" bg-[#171d1b8d] backdrop-blur-xl border border-slate-700/50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div
                  className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-slate-400 text-[10px] sm:text-xs md:text-sm mb-1">
                {stat.label}
              </p>
              <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold break-all">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className=" bg-[#171d1b8d] backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
                <div className="p-1.5 sm:p-2 bg-emerald-500/20 rounded-lg sm:rounded-xl">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
                  Quick Actions
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      navigate(action.path, { state: { from: "/dashboard" } })
                    }
                    className={`group relative bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 hover:border-${action.color}-500/50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 text-left transition-all duration-300 hover:scale-[1.02] overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-2xl"></div>
                    <div className="relative z-10">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg mb-1">
                        {action.title}
                      </h3>
                      <p className="text-slate-400 text-[10px] sm:text-xs md:text-sm">
                        {action.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Challenge */}
            <div className="bg-[#171d1b8d] backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 mt-3 sm:mt-4 md:mt-5 lg:mt-6">
              <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6 gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg sm:rounded-xl">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  </div>
                  <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
                    Monthly Challenge
                  </h2>
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm text-slate-400 whitespace-nowrap">
                  15 hari tersisa
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <span className="text-slate-300 text-[10px] sm:text-xs md:text-sm lg:text-base">
                      Input 50kg Sampah Plastik
                    </span>
                    <span className="text-emerald-400 font-semibold text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                      {monthlyChallenge.current}/{monthlyChallenge.target} kg
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (monthlyChallenge.current / monthlyChallenge.target) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
            {/* User Profile Card */}
            <div className="bg-[#171d1b8d] backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={userData.avatar}
                    alt="User Avatar"
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl object-cover border-2 border-emerald-500/30"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg truncate">
                      {userData.name}
                    </h3>
                    <p className="text-slate-400 text-[10px] sm:text-xs md:text-sm truncate">
                      {userData.email}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs md:text-sm">
                    <span className="text-slate-400">Member sejak</span>
                    <span className="text-white font-semibold">
                      {userData.joinDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs md:text-sm">
                    <span className="text-slate-400">Level</span>
                    <span className="text-emerald-400 font-semibold">
                      Gold Member
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="w-full py-2 sm:py-2.5 md:py-3 bg-green-700 hover:bg-green-900 text-white font-semibold text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl transition-all duration-300 border border-slate-700/50 hover:border-emerald-500/50"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 sm:py-2.5 md:py-3 bg-red-500 hover:bg-red-600 text-white font-semibold text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <LogOut size={14} className="sm:w-4 sm:h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#171d1b8d] backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
                <div className="p-1.5 sm:p-2 bg-orange-500/20 rounded-lg sm:rounded-xl">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                </div>
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
                  Recent Activity
                </h2>
              </div>

              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {recentActivities.length === 0 ? (
                  <div className="text-center py-6 sm:py-8 text-slate-400 text-xs sm:text-sm">
                    Belum ada aktivitas
                  </div>
                ) : (
                  recentActivities.map((activity) => {
                    const IconComponent =
                      activity.icon === "Upload" ? Upload : Gift;
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-2 sm:gap-3 p-2 sm:p-2.5 md:p-3 bg-green-600/50 rounded-lg sm:rounded-xl hover:bg-slate-500 transition-all duration-300"
                      >
                        <div
                          className={`p-1.5 sm:p-2 rounded-lg bg-${activity.color}-500/20`}
                        >
                          <IconComponent
                            className={`w-3 h-3 sm:w-4 sm:h-4 text-${activity.color}-400`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[10px] sm:text-xs md:text-sm font-medium truncate">
                            {activity.action}
                          </p>
                          <p className="text-slate-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
                            {getRelativeTime(activity.timestamp)}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] sm:text-xs md:text-sm font-semibold flex-shrink-0 ${
                            activity.points.startsWith("+")
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {activity.points}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfileModal
          userData={userData}
          onClose={() => setShowEditProfile(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default Dashboard;
