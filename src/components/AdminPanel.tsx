import React, { useState } from 'react';
import {
  Lock,
  Save,
  Palette,
  Image,
  Calendar,
  Heart,
  DollarSign,
  User,
  KeyRound,
  Download,
  CheckCircle,
  Eye,
  LogOut,
  Upload,
  Layers,
  Code
} from 'lucide-react';
import { WeddingConfig } from '../types/wedding';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: WeddingConfig;
  onSaveConfig: (newConfig: WeddingConfig) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState(() => localStorage.getItem('vowcraft_admin_email') || 'admin@wedding.com');
  const [adminPassword, setAdminPassword] = useState(() => localStorage.getItem('vowcraft_admin_pass') || 'admin123');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // Form edit state
  const [formData, setFormData] = useState<WeddingConfig>(config);
  const [activeTab, setActiveTab] = useState<'general' | 'couple' | 'events' | 'envelope' | 'media' | 'security' | 'export'>('general');
  const [saveToast, setSaveToast] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputEmail === adminEmail && inputPassword === adminPassword) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Email atau password salah. (Default: admin@wedding.com / admin123)');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert('Password minimal 6 karakter');
      return;
    }
    setAdminPassword(newPassword);
    localStorage.setItem('vowcraft_admin_pass', newPassword);
    setPasswordChangeSuccess(true);
    setNewPassword('');
    setTimeout(() => setPasswordChangeSuccess(false), 3000);
  };

  const handleSave = () => {
    onSaveConfig(formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  // Image upload helper converting file to data url
  const handleFileUpload = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (field === 'coverPhoto') {
          setFormData((prev) => ({ ...prev, coverPhoto: result }));
        } else if (field === 'watermarkPhoto') {
          setFormData((prev) => ({ ...prev, watermarkPhoto: result }));
        } else if (field === 'groomPhoto') {
          setFormData((prev) => ({
            ...prev,
            groom: { ...prev.groom, photo: result },
          }));
        } else if (field === 'bridePhoto') {
          setFormData((prev) => ({
            ...prev,
            bride: { ...prev.bride, photo: result },
          }));
        } else if (field === 'qris') {
          setFormData((prev) => ({
            ...prev,
            digitalEnvelope: { ...prev.digitalEnvelope, qrisImageUrl: result },
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadConfigJSON = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wedding-config-${formData.groom.nickName}-${formData.bride.nickName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-100 flex items-center gap-2">
                <span>VowCraft Admin Panel</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-sans">
                  Mode Edit Klien
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                Kelola teks, foto, tema warna, amplop DANA/QRIS tanpa koding
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2 rounded-lg bg-stone-800 text-sm"
          >
            ✕ Tutup
          </button>
        </div>

        {/* Content area */}
        {!isAuthenticated ? (
          /* Login Form */
          <div className="p-8 max-w-md mx-auto my-auto text-center w-full">
            <div className="w-16 h-16 rounded-2xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4 text-amber-400">
              <KeyRound className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-serif text-white mb-2">Masuk ke Panel Admin</h4>
            <p className="text-xs text-stone-400 mb-6">
              Fitur khusus pemilik jasa pembuatan web wedding untuk kustomisasi pesanan klien.
            </p>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-200 text-xs text-left">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5">
                  Email Admin
                </label>
                <input
                  type="email"
                  required
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="admin@wedding.com"
                  className="w-full px-4 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-amber-600/30 cursor-pointer"
              >
                Masuk ke Dasbor
              </button>
            </form>

            <div className="mt-6 p-3 bg-stone-950/50 rounded-xl border border-stone-800 text-[11px] text-stone-400">
              Default akses demo: <br />
              Email: <span className="text-amber-300 font-mono">admin@wedding.com</span> | Password:{' '}
              <span className="text-amber-300 font-mono">admin123</span>
            </div>
          </div>
        ) : (
          /* Dashboard with Tabs */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-stone-950/70 p-3 border-r border-stone-800 flex md:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('general')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition whitespace-nowrap ${
                  activeTab === 'general'
                    ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Tema & Bahasa</span>
              </button>
              <button
                onClick={() => setActiveTab('couple')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition whitespace-nowrap ${
                  activeTab === 'couple'
                    ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profil Mempelai</span>
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition whitespace-nowrap ${
                  activeTab === 'events'
                    ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Acara & Waktu</span>
              </button>
              <button
                onClick={() => setActiveTab('envelope')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition whitespace-nowrap ${
                  activeTab === 'envelope'
                    ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>DANA & QRIS</span>
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition whitespace-nowrap ${
                  activeTab === 'media'
                    ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Foto & Background</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Ganti Sandi</span>
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition whitespace-nowrap ${
                  activeTab === 'export'
                    ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Deploy GitHub</span>
              </button>

              <div className="mt-auto pt-4 border-t border-stone-800">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="flex items-center gap-2 px-3 py-2 text-stone-400 hover:text-rose-400 text-xs w-full transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar Admin</span>
                </button>
              </div>
            </div>

            {/* Tab Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {saveToast && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Perubahan berhasil disimpan dan langsung aktif di web!</span>
                </div>
              )}

              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-amber-100 pb-2 border-b border-stone-800">
                    Pilihan Tema & Bahasa
                  </h4>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-2">
                      Pilihan Palet Warna (Sesuai Permintaan Klien)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'warm-bronze', name: 'Warm Bronze', bg: 'bg-amber-700' },
                        { id: 'romantic-rose', name: 'Romantic Rose', bg: 'bg-rose-700' },
                        { id: 'emerald-gold', name: 'Emerald Gold', bg: 'bg-emerald-700' },
                        { id: 'midnight-navy', name: 'Midnight Navy', bg: 'bg-blue-800' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() =>
                            setFormData((p) => ({
                              ...p,
                              themeColor: t.id as WeddingConfig['themeColor'],
                            }))
                          }
                          className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition ${
                            formData.themeColor === t.id
                              ? 'border-amber-400 bg-amber-950/30'
                              : 'border-stone-800 bg-stone-950 hover:border-stone-700'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full ${t.bg}`} />
                          <span className="text-xs text-stone-200 font-medium">{t.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-2">
                      Bahasa Isi Undangan
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                        <input
                          type="radio"
                          name="lang"
                          checked={formData.lang === 'id'}
                          onChange={() => setFormData((p) => ({ ...p, lang: 'id' }))}
                          className="accent-amber-500"
                        />
                        Bahasa Indonesia
                      </label>
                      <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                        <input
                          type="radio"
                          name="lang"
                          checked={formData.lang === 'en'}
                          onChange={() => setFormData((p) => ({ ...p, lang: 'en' }))}
                          className="accent-amber-500"
                        />
                        English
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Kutipan Ayat / Doa Suci
                    </label>
                    <textarea
                      rows={2}
                      value={formData.quoteArabic}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, quoteArabic: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200"
                    />
                    <textarea
                      rows={2}
                      value={formData.quoteTranslation}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, quoteTranslation: e.target.value }))
                      }
                      placeholder="Terjemahan ayat..."
                      className="w-full mt-2 px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200"
                    />
                  </div>
                </div>
              )}

              {/* Couple Tab */}
              {activeTab === 'couple' && (
                <div className="space-y-6">
                  {/* Groom */}
                  <div className="p-4 bg-stone-950/60 rounded-2xl border border-stone-800 space-y-3">
                    <h5 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                      Data Mempelai Pria (Groom)
                    </h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-stone-400">Nama Lengkap</label>
                        <input
                          type="text"
                          value={formData.groom.fullName}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              groom: { ...p.groom, fullName: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-stone-400">Nama Panggilan</label>
                        <input
                          type="text"
                          value={formData.groom.nickName}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              groom: { ...p.groom, nickName: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-stone-400">Nama Ayah</label>
                        <input
                          type="text"
                          value={formData.groom.fatherName}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              groom: { ...p.groom, fatherName: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-stone-400">Nama Ibu</label>
                        <input
                          type="text"
                          value={formData.groom.motherName}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              groom: { ...p.groom, motherName: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-400">Ganti Foto Mempelai Pria (File)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('groomPhoto', e)}
                        className="block w-full text-xs text-stone-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-amber-600 file:text-white"
                      />
                    </div>
                  </div>

                  {/* Bride */}
                  <div className="p-4 bg-stone-950/60 rounded-2xl border border-stone-800 space-y-3">
                    <h5 className="text-xs uppercase tracking-wider text-rose-400 font-bold">
                      Data Mempelai Wanita (Bride)
                    </h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-stone-400">Nama Lengkap</label>
                        <input
                          type="text"
                          value={formData.bride.fullName}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              bride: { ...p.bride, fullName: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-stone-400">Nama Panggilan</label>
                        <input
                          type="text"
                          value={formData.bride.nickName}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              bride: { ...p.bride, nickName: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-stone-400">Nama Ayah</label>
                        <input
                          type="text"
                          value={formData.bride.fatherName}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              bride: { ...p.bride, fatherName: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-stone-400">Nama Ibu</label>
                        <input
                          type="text"
                          value={formData.bride.motherName}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              bride: { ...p.bride, motherName: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-400">Ganti Foto Mempelai Wanita (File)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('bridePhoto', e)}
                        className="block w-full text-xs text-stone-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-rose-600 file:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Events & Countdown */}
              {activeTab === 'events' && (
                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-amber-100 pb-2 border-b border-stone-800">
                    Waktu & Tanggal Acara
                  </h4>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Countdown Target (ISO Format e.g. 2026-12-30T08:00:00)
                    </label>
                    <input
                      type="text"
                      value={formData.countdownDate}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, countdownDate: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 font-mono"
                    />
                  </div>

                  {/* Akad */}
                  <div className="p-4 bg-stone-950/60 rounded-2xl border border-stone-800 space-y-2">
                    <h5 className="text-xs font-bold text-amber-300">Akad Nikah</h5>
                    <input
                      type="text"
                      value={formData.akad.date}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          akad: { ...p.akad, date: e.target.value },
                        }))
                      }
                      placeholder="Tanggal Akad"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                    />
                    <input
                      type="text"
                      value={formData.akad.time}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          akad: { ...p.akad, time: e.target.value },
                        }))
                      }
                      placeholder="Waktu Akad"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                    />
                    <input
                      type="text"
                      value={formData.akad.venue}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          akad: { ...p.akad, venue: e.target.value },
                        }))
                      }
                      placeholder="Lokasi / Gedung"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                    />
                  </div>

                  {/* Resepsi */}
                  <div className="p-4 bg-stone-950/60 rounded-2xl border border-stone-800 space-y-2">
                    <h5 className="text-xs font-bold text-amber-300">Resepsi Pernikahan</h5>
                    <input
                      type="text"
                      value={formData.resepsi.date}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          resepsi: { ...p.resepsi, date: e.target.value },
                        }))
                      }
                      placeholder="Tanggal Resepsi"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                    />
                    <input
                      type="text"
                      value={formData.resepsi.time}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          resepsi: { ...p.resepsi, time: e.target.value },
                        }))
                      }
                      placeholder="Waktu Resepsi"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                    />
                    <input
                      type="text"
                      value={formData.resepsi.venue}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          resepsi: { ...p.resepsi, venue: e.target.value },
                        }))
                      }
                      placeholder="Lokasi / Gedung"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100"
                    />
                  </div>
                </div>
              )}

              {/* Envelope (DANA & QRIS strictly) */}
              {activeTab === 'envelope' && (
                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-amber-100 pb-2 border-b border-stone-800">
                    Amplop Digital (DANA & QRIS)
                  </h4>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Nomor Akun DANA
                    </label>
                    <input
                      type="text"
                      value={formData.digitalEnvelope.danaNumber}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          digitalEnvelope: {
                            ...p.digitalEnvelope,
                            danaNumber: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Nama Pemilik Akun DANA
                    </label>
                    <input
                      type="text"
                      value={formData.digitalEnvelope.danaAccountName}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          digitalEnvelope: {
                            ...p.digitalEnvelope,
                            danaAccountName: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Upload Gambar QRIS Klien (File)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('qris', e)}
                      className="block w-full text-xs text-stone-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-amber-600 file:text-white"
                    />
                  </div>
                </div>
              )}

              {/* Media & Watermark Tab */}
              {activeTab === 'media' && (
                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-amber-100 pb-2 border-b border-stone-800">
                    Foto Sampul, Background Watermark & Video
                  </h4>
                  <div className="p-4 bg-stone-950/60 rounded-2xl border border-stone-800 space-y-2">
                    <label className="block text-xs font-bold text-amber-300">
                      Foto Utama & Background/Watermark Kedua Mempelai (File)
                    </label>
                    <p className="text-[11px] text-stone-400">
                      Upload foto kedua mempelai agar tampil elegan di latar belakang / watermark web.
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('coverPhoto', e)}
                      className="block w-full text-xs text-stone-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-amber-600 file:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      URL Video Prewedding (YouTube Embed)
                    </label>
                    <input
                      type="text"
                      value={formData.videoUrl}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, videoUrl: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-4 max-w-md">
                  <h4 className="text-base font-semibold text-amber-100 pb-2 border-b border-stone-800">
                    Pengaturan Sandi Admin
                  </h4>
                  <p className="text-xs text-stone-400">
                    Ubah password akses panel admin agar aman saat menyerahkan website ke klien.
                  </p>

                  {passwordChangeSuccess && (
                    <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs rounded-xl flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Password admin berhasil diperbarui!</span>
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-3">
                    <div>
                      <label className="block text-xs text-stone-300 mb-1">
                        Password Baru (min. 6 karakter)
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Ketik password baru..."
                        className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-100"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                    >
                      Simpan Password Baru
                    </button>
                  </form>
                </div>
              )}

              {/* Export to GitHub Tab */}
              {activeTab === 'export' && (
                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-amber-100 pb-2 border-b border-stone-800">
                    Sinkronisasi & Deploy ke GitHub Pages
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Untuk membuka jasa pembuatan web wedding, Anda dapat mengunduh konfigurasi klien saat ini dalam format JSON, atau meng-copy file proyek langsung ke VS Code dan push ke repositori GitHub untuk otomatis aktif di GitHub Pages tanpa build ribet!
                  </p>

                  <div className="p-4 bg-stone-950/60 rounded-2xl border border-stone-800 space-y-3">
                    <h5 className="text-xs font-bold text-amber-400">
                      1. Download Backup Konfigurasi Klien
                    </h5>
                    <button
                      onClick={downloadConfigJSON}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-medium transition"
                    >
                      <Download className="w-4 h-4 text-amber-400" />
                      <span>Download wedding-config.json</span>
                    </button>
                  </div>

                  <div className="p-4 bg-stone-950/60 rounded-2xl border border-stone-800 space-y-2">
                    <h5 className="text-xs font-bold text-amber-400">
                      2. Langkah Deploy ke GitHub Pages di VS Code:
                    </h5>
                    <ol className="text-xs text-stone-400 list-decimal list-inside space-y-1">
                      <li>Buka folder proyek ini di Visual Studio Code.</li>
                      <li>Inisialisasi git: <code className="text-amber-300 font-mono">git init</code></li>
                      <li>Koneksikan ke repo GitHub: <code className="text-amber-300 font-mono">git remote add origin https://github.com/username/wedding-klien.git</code></li>
                      <li>Jalankan build atau export: <code className="text-amber-300 font-mono">npm run build</code></li>
                      <li>Aktifkan <strong>GitHub Pages</strong> di menu Settings &gt; Pages repo GitHub Anda. Selesai! Web siap dibuka oleh puluhan ribu tamu undangan di HP, laptop, dan iPad.</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {isAuthenticated && (
          <div className="p-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between">
            <span className="text-[11px] text-stone-500">
              Perubahan tersimpan otomatis di browser storage
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-xs rounded-xl transition shadow-lg shadow-amber-600/30 flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Web</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
