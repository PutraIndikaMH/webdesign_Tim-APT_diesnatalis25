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
    <div className="min-h-screen bg-[#004019]">
      {/* Navigation */}
      <Navigation onLoginClick={() => {}} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-g bg-[#0c2f1e6f] border border-emerald-500/30 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <img
                src={userData.avatar}
                alt="User Avatar"
                className="w-20 h-20 rounded-2xl shadow-2xl shadow-emerald-500/50 object-cover border-2 border-emerald-500/30"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Selamat Datang, {userData.name}! 👋
                </h1>
                <p className="text-slate-300">
                  Mari lanjutkan kontribusi Anda untuk lingkungan yang lebih
                  bersih
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
                <Zap className="w-10 h-10 text-yellow-400" />
                <div>
                  <p className="text-slate-400 text-xs">Total Poin</p>
                  <p className="text-white font-bold text-2xl">
                    {userPoints.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className=" bg-[#171d1b8d] backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className="text-white text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className=" bg-[#171d1b8d] backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/20 rounded-xl">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Quick Actions</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      navigate(action.path, { state: { from: "/dashboard" } })
                    }
                    className={`group relative bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 hover:border-${action.color}-500/50 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-2xl"></div>
                    <div className="relative z-10">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {action.title}
                      </h3>
                      <p className="text-slate-400 text-sm">{action.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Challenge */}
            <div className="bg-[#171d1b8d] backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-xl">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Monthly Challenge
                  </h2>
                </div>
                <span className="text-sm text-slate-400">15 hari tersisa</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">
                      Input 50kg Sampah Plastik
                    </span>
                    <span className="text-emerald-400 font-semibold">
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
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="bg-[#171d1b8d] backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={userData.avatar}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-500/30"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">
                      {userData.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{userData.email}</p>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Member sejak</span>
                    <span className="text-white font-semibold">
                      {userData.joinDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Level</span>
                    <span className="text-emerald-400 font-semibold">
                      Gold Member
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowEditProfile(true)}
                  className="w-full py-3 bg-green-700 hover:bg-green-900 text-white font-semibold rounded-xl transition-all duration-300 border border-slate-700/50 hover:border-emerald-500/50"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#171d1b8d] backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/20 rounded-xl">
                  <Activity className="w-5 h-5 text-orange-400" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Recent Activity
                </h2>
              </div>

              <div className="space-y-4">
                {recentActivities.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    Belum ada aktivitas
                  </div>
                ) : (
                  recentActivities.map((activity) => {
                    const IconComponent =
                      activity.icon === "Upload" ? Upload : Gift;
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 bg-green-600/50 rounded-xl hover:bg-slate-500 transition-all duration-300"
                      >
                        <div
                          className={`p-2 rounded-lg bg-${activity.color}-500/20`}
                        >
                          <IconComponent
                            className={`w-4 h-4 text-${activity.color}-400`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {activity.action}
                          </p>
                          <p className="text-slate-400 text-xs mt-1">
                            {getRelativeTime(activity.timestamp)}
                          </p>
                        </div>
                        <span
                          className={`text-sm font-semibold ${
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
