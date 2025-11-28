import React, { useState } from "react";
import { X, User, Mail, Image as ImageIcon, AlertCircle } from "lucide-react";

const EditProfileModal = ({ onClose, userData, onSave }) => {
  const [name, setName] = useState(userData.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...userData, name });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
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
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-2">
              Edit Profile
            </h2>
            <p className="text-slate-400">Perbarui informasi profil Anda</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nama
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Masukkan nama"
                required
              />
            </div>

            {/* Email (Disabled) */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={userData.email}
                  disabled
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-slate-500 cursor-not-allowed"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="group relative">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-slate-800 border border-yellow-400/30 rounded-lg text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      Fitur ini akan segera hadir
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Perubahan email akan segera tersedia
              </p>
            </div>

            {/* Profile Picture (Coming Soon) */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Foto Profile
              </label>
              <div className="relative">
                <button
                  type="button"
                  disabled
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-slate-500 cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ImageIcon className="w-5 h-5" />
                  Pilih Foto
                </button>
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="group relative">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-slate-800 border border-yellow-400/30 rounded-lg text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Fitur ini akan segera hadir
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Upload foto profil akan segera tersedia
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02]"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
