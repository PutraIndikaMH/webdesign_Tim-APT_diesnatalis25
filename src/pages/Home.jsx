import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import LoginForm from "../components/LoginForm";

import backgroundImage from "../assets/background2.png";
import inputImg from "../assets/outbox.png";
import dailyImg from "../assets/Group.png";
import checkImg from "../assets/Credit card.png";
import jemputImg from "../assets/directions_car (1).png";
import logoImg from "../assets/logo te-tome.png";

import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRequireLoginToast, setShowRequireLoginToast] = useState(false);
  const [showAlreadyLoginToast, setShowAlreadyLoginToast] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("te-tome-user");
      setIsLoggedIn(Boolean(user));
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const serviceCards = [
    { icon: inputImg, title: "Input Sampah", path: "/input-sampah" },
    { icon: dailyImg, title: "Daily Poin", path: "/daily-poin" },
    { icon: checkImg, title: "Check Poin", path: "/check-poin" },
    { icon: jemputImg, title: "Jemput Sampah", path: "/jemput-sampah" },
  ];

  const caraKerjaSteps = [
    {
      title: "Daftar & Login",
      description:
        "Buat akun dengan email dan mulai perjalanan Anda menuju gaya hidup ramah lingkungan",
      icon: "user",
      path: null, // No navigation for this step
    },
    {
      title: "Input Sampah",
      description:
        "Upload foto sampah plastik Anda dan dapatkan poin reward berdasarkan berat sampah",
      icon: "upload",
      path: "/input-sampah",
    },
    {
      title: "Kumpulkan Poin",
      description:
        "Setiap kontribusi Anda akan menghasilkan poin yang bisa ditukar dengan berbagai hadiah menarik",
      icon: "coins",
      path: "/daily-poin",
    },
    {
      title: "Tukar Reward",
      description:
        "Gunakan poin Anda untuk mendapatkan voucher, merchandise, dan hadiah eksklusif lainnya",
      icon: "gift",
      path: "/check-poin",
    },
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col font-sans bg-slate-950 overflow-x-hidden">
      {/* NAVBAR */}
      <Navigation onLoginClick={() => setShowLogin(true)} />

      {/* HERO SECTION */}
      <div className="relative w-full h-screen flex flex-col">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60"></div>
        </div>

        <div className="absolute top-0 left-0 right-0 z-10 w-full max-w-[1440px] mx-auto h-full flex flex-col px-6 md:px-12 lg:px-20">
          <main className="flex-grow flex flex-col items-center justify-center text-center pb-20 pt-32">
            <h1
              data-aos="zoom-in"
              data-aos-delay="200"
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight max-w-5xl drop-shadow-2xl"
            >
              Revolusi Pengelolaan Sampah Digital
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="400"
              className="text-lg md:text-xl text-slate-200 mb-12 max-w-2xl leading-relaxed drop-shadow-md font-light"
            >
              Te-Tome membantu meningkatkan kesadaran masyarakat dalam budaya
              membuang sampah plastik
            </p>
            <div
              data-aos="fade-up"
              data-aos-delay="600"
              className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center"
            >
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    setShowAlreadyLoginToast(true);
                    setTimeout(() => setShowAlreadyLoginToast(false), 2500);
                  } else {
                    setShowLogin(true);
                  }
                }}
                className="group h-14 px-10 bg-[#004019] hover:from-emerald-600 hover:to-emerald-700 rounded-full text-white font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105"
              >
                JOIN NOW{" "}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
              <button
                onClick={() => {
                  const aboutSection = document.getElementById("about");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="h-14 px-10 bg-transparent border-2 border-white hover:bg-white hover:text-slate-950 rounded-full text-white font-semibold tracking-wide transition-all duration-300 shadow-lg hover:scale-105"
              >
                LEARN MORE
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="relative w-full py-24 bg-[#0b3418] text-white"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div
            data-aos="fade-down"
            className="flex flex-col items-center mb-16 relative"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide">
              Tentang Te-Tome
            </h2>
            <div className="w-48 h-[1px] bg-slate-400/50"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div
              data-aos="fade-right"
              className="w-full aspect-[4/3] rounded-3xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10"></div>

              <img
                src={logoImg}
                alt="Tentang Te-Tome"
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div
              data-aos="fade-left"
              className="flex flex-col justify-center space-y-6"
            >
              <div className="space-y-6">
                <p className="text-slate-300 text-lg leading-relaxed text-justify font-light">
                  Te-Tome adalah platform berbasis website yang memungkinkan
                  masyarakat menukarkan 6 jenis sampah anorganik seperti Plastik
                  Botol, Plastik Kemasan, Kertas, Kardus, Kaleng, dan Kaca
                  menjadi uang tunai, voucher belanja, pulsa, atau barang
                  kebutuhan sehari-hari.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed text-justify font-light">
                  Kami mengubah kebiasaan “buang sampah” menjadi “kumpul & tukar
                  sampah” dengan memberikan reward nyata bagi setiap kilogram
                  sampah yang kamu serahkan. Dengan cara ini, Te-Tome tidak
                  hanya meningkatkan kesadaran masyarakat akan pentingnya
                  memilah sampah, tetapi juga menciptakan kebiasaan baru yang
                  menguntungkan secara finansial sekaligus menyelamatkan
                  lingkungan.
                </p>

                <p className="text-slate-300 text-lg leading-relaxed text-justify font-light">
                  Melalui teknologi sederhana dan jaringan pengepul terpercaya,
                  Te-Tome menghubungkan jutaan masyarakat Indonesia dengan
                  industri daur ulang, sehingga setiap botol, kemasan, kertas,
                  kardus, kaleng, dan kaca yang kamu tukarkan benar-benar didaur
                  ulang dan tidak lagi mencemari darat maupun laut.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-6">
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105">
                  Our Mission
                </button>
                <button className="px-8 py-3 rounded-full bg-transparent text-white font-semibold border-2 border-white hover:bg-white hover:text-slate-950 transition-all duration-300 hover:scale-105">
                  Our Vision
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAYANAN SECTION */}
      <section id="layanan" className="relative w-full py-24 bg-[#0a4121]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div
            data-aos="fade-down"
            className="flex flex-col items-center mb-16 relative"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide text-white">
              Layanan
            </h2>
            <div className="w-48 h-[1px] bg-slate-400/50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceCards.map((card, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                onClick={() => {
                  if (!isLoggedIn) {
                    setShowRequireLoginToast(true);
                    setTimeout(() => setShowRequireLoginToast(false), 2500);
                    // don't open the login modal — only show the toast
                    return;
                  }

                  navigate(card.path);
                }}
                className="group relative flex items-center gap-6 px-8 py-8 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 hover:from-emerald-500/30 hover:to-emerald-600/20 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02]"
              >
                <div className="flex-shrink-0 p-4 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110">
                  <img
                    src={card.icon}
                    alt={card.title}
                    className="w-8 h-8 object-contain brightness-0 invert"
                  />
                </div>

                <h3 className="text-2xl font-bold text-white tracking-wide">
                  {card.title}
                </h3>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-6 h-6 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARA KERJA SECTION */}
      <section
        id="cara-kerja"
        className="relative w-full py-24 bg-[#004B22] text-white overflow-hidden"
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div
            data-aos="fade-down"
            className="flex flex-col items-center mb-20 relative"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide bg-[#FFFFFF] bg-clip-text text-white  text-transparent">
              Cara Kerja
            </h2>
            <p className="text-white text-center max-w-2xl mt-2">
              Ikuti 4 langkah mudah untuk memulai kontribusi Anda dalam menjaga
              lingkungan
            </p>
            <div className="w-48 h-[1px] bg-slate-400/50 mt-6"></div>
          </div>

          {/* Steps with Connecting Lines */}
          <div className="relative">
            {/* Connecting Line - Hidden on Mobile */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
              <div className="absolute left-[12.5%] right-[12.5%] h-full">
                <svg
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 1000 20"
                >
                  <defs>
                    <linearGradient
                      id="line-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#ffffff", stopOpacity: 0.3 }}
                      />
                      <stop
                        offset="50%"
                        style={{ stopColor: "#ffffff", stopOpacity: 0.8 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#ffffff", stopOpacity: 0.3 }}
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 10 Q 250 0, 500 10 T 1000 10"
                    stroke="url(#line-gradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="10,5"
                  />
                </svg>
              </div>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
              {/* Step 1 - Daftar & Login */}
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                {/* TAMBAHAN: Class 'h-full' agar tinggi card sama rata */}
                <div className="relative h-full bg-[#0EB157] border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-900/20 flex flex-col items-center cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/5 rounded-3xl transition-all duration-500"></div>

                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#0EB157] font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>

                  <div className="relative mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-center text-white">
                    Daftar & Login
                  </h3>
                  <p className="text-white leading-relaxed text-center text-sm">
                    Buat akun dengan email dan mulai perjalanan Anda menuju gaya
                    hidup ramah lingkungan
                  </p>

                  <div className="hidden lg:flex absolute -right-11 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-white transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Step 2 - Input Sampah */}
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group cursor-pointer"
                onClick={() => navigate("/input-sampah")}
              >
                {/* TAMBAHAN: Class 'h-full' */}
                <div className="relative h-full bg-[#0EB157] border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-900/20 flex flex-col items-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/5 rounded-3xl transition-all duration-500"></div>

                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#0EB157] font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>

                  <div className="relative mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                      <img
                        src={inputImg}
                        alt="Input Sampah"
                        className="w-10 h-10 object-contain brightness-0 invert"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-center text-white">
                    Input Sampah
                  </h3>
                  <p className="text-white leading-relaxed text-center text-sm">
                    Upload foto sampah plastik Anda dan dapatkan poin reward
                    berdasarkan berat sampah
                  </p>

                  <div className="hidden lg:flex absolute -right-11 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-white transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Step 3 - Kumpulkan Poin */}
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group cursor-pointer"
                onClick={() => navigate("/daily-poin")}
              >
                {/* TAMBAHAN: Class 'h-full' */}
                <div className="relative h-full bg-[#0EB157] border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-900/20 flex flex-col items-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/5 rounded-3xl transition-all duration-500"></div>

                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#0EB157] font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>

                  <div className="relative mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-center text-white">
                    Kumpulkan Poin
                  </h3>
                  <p className="text-white leading-relaxed text-center text-sm">
                    Setiap kontribusi Anda akan menghasilkan poin yang bisa
                    ditukar dengan berbagai hadiah menarik
                  </p>

                  <div className="hidden lg:flex absolute -right-11 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-white transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Step 4 - Tukar Reward */}
              <div
                data-aos="fade-up"
                data-aos-delay="400"
                className="relative group cursor-pointer"
                onClick={() => navigate("/check-poin")}
              >
                {/* TAMBAHAN: Class 'h-full' */}
                <div className="relative h-full bg-[#0EB157] border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-900/20 flex flex-col items-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/5 rounded-3xl transition-all duration-500"></div>

                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#0EB157] font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    4
                  </div>

                  <div className="relative mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                      <img
                        src={checkImg}
                        alt="Tukar Reward"
                        className="w-10 h-10 object-contain brightness-0 invert"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-center text-white">
                    Tukar Reward
                  </h3>
                  <p className="text-white leading-relaxed text-center text-sm">
                    Gunakan poin Anda untuk mendapatkan voucher, merchandise,
                    dan hadiah eksklusif lainnya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="relative w-full py-2 bg-[#003116] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Te-Tome
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Platform digital untuk meningkatkan kesadaran masyarakat dalam
                pengelolaan sampah plastik yang berkelanjutan.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className="w-5 h-5 text-slate-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className="w-5 h-5 text-slate-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className="w-5 h-5 text-slate-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const aboutSection = document.getElementById("about");
                      if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const layananSection = document.getElementById("layanan");
                      if (layananSection) {
                        layananSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
                    Layanan
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/contact")}
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Layanan */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Layanan Kami</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        setShowRequireLoginToast(true);
                        setTimeout(() => setShowRequireLoginToast(false), 2500);
                        return;
                      }

                      navigate("/input-sampah");
                    }}
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
                    Input Sampah
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        setShowRequireLoginToast(true);
                        setTimeout(() => setShowRequireLoginToast(false), 2500);
                        return;
                      }

                      navigate("/daily-poin");
                    }}
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
                    Daily Poin
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        setShowRequireLoginToast(true);
                        setTimeout(() => setShowRequireLoginToast(false), 2500);
                        return;
                      }

                      navigate("/check-poin");
                    }}
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
                    Check Poin
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        setShowRequireLoginToast(true);
                        setTimeout(() => setShowRequireLoginToast(false), 2500);
                        return;
                      }

                      navigate("/jemput-sampah");
                    }}
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
                    Jemput Sampah
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Hubungi Kami</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <svg
                    className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:info@te-tome.com"
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm break-all"
                  >
                    info@te-tome.com
                  </a>
                </li>
                <li className="flex items-start gap-3 group">
                  <svg
                    className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:+6281234567890"
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm"
                  >
                    +62 812-3456-7890
                  </a>
                </li>
                <li className="flex items-start gap-3 group">
                  <svg
                    className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-slate-400 text-sm">
                    Jakarta, Indonesia
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} Te-Tome. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <button className="text-slate-500 hover:text-emerald-400 transition-colors duration-300">
                  Privacy Policy
                </button>
                <button className="text-slate-500 hover:text-emerald-400 transition-colors duration-300">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Form Modal */}
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}

      {/* Require-login Toast */}
      {showRequireLoginToast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-8 z-50">
          <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-3 rounded-2xl shadow-2xl border border-red-600/30">
            Anda harus login terlebih dahulu
          </div>
        </div>
      )}

      {/* Already Login Toast */}
      {showAlreadyLoginToast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-8 z-50">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl border border-emerald-600/30">
            Kamu sudah login! 🎉
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
