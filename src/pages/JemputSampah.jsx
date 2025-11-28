import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Truck,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Home,
  CheckCircle,
} from "lucide-react";

const JemputSampah = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    date: "",
    time: "",
    wasteType: "",
    estimatedWeight: "",
    notes: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBack = () => {
    // Check if came from dashboard
    if (location.state?.from === "/dashboard") {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  };

  const wasteTypes = [
    "Plastik",
    "Kertas & Kardus",
    "Logam",
    "Elektronik",
    "Kaca",
    "Campuran",
  ];

  const timeSlots = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "13:00 - 15:00",
    "15:00 - 17:00",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        date: "",
        time: "",
        wasteType: "",
        estimatedWeight: "",
        notes: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#004019]">
      {/* Header */}
      <div className="bg-[#06221199] backdrop-blur-xl border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-3 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-white/5 rounded-xl transition-all duration-300"
            >
              <svg
                className="w-6 h-6 text-white"
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
            <div>
              <h1 className="text-2xl md:text-2xl font-bold text-white">
                Jemput Sampah
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Jadwalkan penjemputan sampah di lokasi Anda
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-xl">
            <Truck className="w-10 h-10 text-emerald-400 mb-3" />
            <h3 className="text-white font-semibold mb-2">
              Gratis Penjemputan
            </h3>
            <p className="text-slate-400 text-sm">
              Minimal 5kg sampah terpilah
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-xl">
            <Clock className="w-10 h-10 text-blue-400 mb-3" />
            <h3 className="text-white font-semibold mb-2">Jadwal Fleksibel</h3>
            <p className="text-slate-400 text-sm">
              Pilih waktu yang sesuai untuk Anda
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-xl">
            <CheckCircle className="w-10 h-10 text-purple-400 mb-3" />
            <h3 className="text-white font-semibold mb-2">Dapatkan Poin</h3>
            <p className="text-slate-400 text-sm">
              Setiap kg = 100 poin reward
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Section */}
          <div className="bg-[#06221199] backdrop-blur-xl border-b border-emerald-500/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-emerald-400" />
              Alamat Penjemputan
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Alamat Lengkap
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Masukkan alamat lengkap Anda"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Kota
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Contoh: Jakarta"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="12345"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+62 812-3456-7890"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="bg-[#06221199] backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-emerald-400" />
              Jadwal Penjemputan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Tanggal
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Waktu
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  required
                >
                  <option value="">Pilih Waktu</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Waste Details Section */}
          <div className="bg-[#06221199] backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Truck className="w-6 h-6 text-emerald-400" />
              Detail Sampah
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-3">
                  Jenis Sampah
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {wasteTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, wasteType: type })
                      }
                      className={`p-3 rounded-xl font-medium transition-all duration-300 ${
                        formData.wasteType === type
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                          : "bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Perkiraan Berat (kg)
                </label>
                <input
                  type="number"
                  name="estimatedWeight"
                  value={formData.estimatedWeight}
                  onChange={handleChange}
                  min="5"
                  step="0.5"
                  placeholder="Minimal 5 kg"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  required
                />
                <p className="text-slate-400 text-sm mt-2">
                  Estimasi poin:{" "}
                  {formData.estimatedWeight
                    ? Math.floor(parseFloat(formData.estimatedWeight) * 100)
                    : 0}{" "}
                  poin
                </p>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Catatan (Opsional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Informasi tambahan untuk driver"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
          >
            <Truck className="w-6 h-6" />
            Jadwalkan Penjemputan
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-emerald-500/20 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-emerald-500/20 rounded-full">
                <CheckCircle className="w-16 h-16 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Penjemputan Berhasil Dijadwalkan!
              </h3>
              <p className="text-slate-300">
                Driver kami akan segera menghubungi Anda sebelum waktu penjemputan.
              </p>
              <div className="w-full bg-slate-800/50 rounded-2xl p-4 space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Tanggal:</span>
                  <span className="text-white font-medium">
                    {formData.date}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Waktu:</span>
                  <span className="text-white font-medium">
                    {formData.time}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimasi Poin:</span>
                  <span className="text-emerald-400 font-bold">
                    +{Math.floor(parseFloat(formData.estimatedWeight) * 100)}{" "}
                    poin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JemputSampah;
