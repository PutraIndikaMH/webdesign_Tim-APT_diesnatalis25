import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    kabupatenKota: "",
    kecamatan: "",
    rtRw: "",
    noRumah: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 mb-6 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Kembali ke Beranda</span>
        </button>

        {/* Card */}
        <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-500/20 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-2">
              Daftar Akun
            </h1>
            <p className="text-slate-400">
              Buat akun baru untuk bergabung dengan Te-Tome
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="nama@email.com"
                required
              />
            </div>

            {/* Lokasi Section */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Lokasi</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Kabupaten/Kota */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Kabupaten/Kota
                  </label>
                  <input
                    type="text"
                    name="kabupatenKota"
                    value={formData.kabupatenKota}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Contoh: Jakarta Selatan"
                    required
                  />
                </div>

                {/* Kecamatan */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Kecamatan
                  </label>
                  <input
                    type="text"
                    name="kecamatan"
                    value={formData.kecamatan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Contoh: Kebayoran Baru"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* RT/RW */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    RT/RW
                  </label>
                  <input
                    type="text"
                    name="rtRw"
                    value={formData.rtRw}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Contoh: 001/005"
                    required
                  />
                </div>

                {/* No Rumah */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    No. Rumah
                  </label>
                  <input
                    type="text"
                    name="noRumah"
                    value={formData.noRumah}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Contoh: 123"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Minimal 8 karakter"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] mt-6"
            >
              Daftar
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Sudah punya akun?{" "}
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              Masuk di sini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
