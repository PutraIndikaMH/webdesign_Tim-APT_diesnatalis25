import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Menu,
  X,
  Home as HomeIcon,
  Info,
  Grid,
  Settings,
  Phone,
  ChevronDown,
  LogOut,
} from "lucide-react";
import AvatarImg from "../assets/Generic_avatar2.png?url";

const Navigation = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem("te-tome-user");
      if (user) {
        setIsLoggedIn(true);
        setUserData(JSON.parse(user));
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };
    checkLoginStatus();

    // Listen for storage changes
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const scrollToSection = (id) => {
    // First navigate to home if not already there
    if (window.location.pathname !== "/home") {
      navigate("/home");
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    {
      icon: HomeIcon,
      label: "Home",
      action: () => {
        navigate("/home");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsMobileMenuOpen(false);
      },
    },
    {
      icon: Info,
      label: "About",
      action: () => scrollToSection("about"),
    },
    {
      icon: Grid,
      label: "Layanan",
      action: () => scrollToSection("layanan"),
    },
    {
      icon: Settings,
      label: "Cara Kerja",
      action: () => scrollToSection("cara-kerja"),
    },
    {
      icon: Phone,
      label: "Contact",
      action: () => {
        navigate("/contact");
        setIsMobileMenuOpen(false);
      },
    },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center px-4 md:px-6 lg:px-8 pt-4">
        <nav
          className={`w-full max-w-7xl flex items-center justify-between py-3 px-6 md:px-8 rounded-full transition-all duration-500 ${
            isScrolled
              ? "bg-slate-900/95 backdrop-blur-xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10"
              : "bg-black/30 backdrop-blur-md border border-white/10 shadow-xl"
          }`}
        >
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => navigate("/home")}
          >
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-emerald-100 transition-all duration-300">
              Te-Tome
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="group relative px-4 py-2 text-sm font-medium text-slate-200 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/5"
              >
                <span className="flex items-center gap-2">
                  <item.icon
                    size={16}
                    className="group-hover:text-emerald-400 transition-colors"
                  />
                  {item.label}
                </span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-400/50 text-white transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 group"
                >
                  <div className="relative">
                    <img
                      src={AvatarImg}
                      alt="User"
                      className="w-9 h-9 rounded-xl object-cover border-2 border-emerald-500/40 group-hover:border-emerald-400/60 transition-all duration-300"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-slate-400 font-medium">
                      Welcome back
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {userData?.name || "User"}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className="text-emerald-400 group-hover:translate-y-0.5 transition-transform"
                  />
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("te-tome-user");
                    setIsLoggedIn(false);
                    setUserData(null);
                    navigate("/home");
                  }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/80 hover:bg-red-600 backdrop-blur-xl border border-red-500/50 hover:border-red-400/70 text-white transition-all duration-300 hover:scale-105 shadow-lg"
                  title="Logout"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-semibold">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 group"
              >
                <User
                  size={18}
                  className="group-hover:rotate-12 transition-transform"
                />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 right-4 left-4 bg-slate-900/95 backdrop-blur-xl border border-emerald-500/20 rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="p-4 space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-3 px-4 py-3 text-slate-200 hover:text-white hover:bg-emerald-500/10 rounded-xl transition-all duration-300 group"
              >
                <item.icon
                  size={20}
                  className="group-hover:text-emerald-400 transition-colors"
                />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-4 mt-2 bg-gradient-to-r from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-400/50 text-white rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-emerald-500/10 group"
                >
                  <div className="relative">
                    <img
                      src={AvatarImg}
                      alt="User"
                      className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-500/40 group-hover:border-emerald-400/60 transition-all duration-300"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
                  </div>
                  <div className="flex-1 flex flex-col items-start">
                    <span className="text-xs text-slate-400 font-medium">
                      Welcome back
                    </span>
                    <span className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {userData?.name || "User"}
                    </span>
                  </div>
                  <ChevronDown size={18} className="text-emerald-400" />
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("te-tome-user");
                    setIsLoggedIn(false);
                    setUserData(null);
                    navigate("/home");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 mt-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onLoginClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 mt-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
              >
                <User size={20} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
