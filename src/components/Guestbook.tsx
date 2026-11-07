import React, { useState } from 'react';
import { Send, Camera, MessageSquare, Check, X, HelpCircle, ExternalLink, Sparkles } from 'lucide-react';
import { GuestWish } from '../types/wedding';
import { formatWhatsAppMessage } from '../utils/weddingLogic';

interface GuestbookProps {
  wishes: GuestWish[];
  onAddWish: (wish: Omit<GuestWish, 'id' | 'timestamp'>) => void;
  coupleNames: string;
  lang: 'id' | 'en';
}

export const Guestbook: React.FC<GuestbookProps> = ({
  wishes,
  onAddWish,
  coupleNames,
  lang,
}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rsvp, setRsvp] = useState<'Hadir' | 'Tidak Hadir' | 'Ragu-ragu'>('Hadir');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert(lang === 'id' ? 'Ukuran foto maksimal 2MB' : 'Max photo size is 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onAddWish({
        guestName: name.trim(),
        message: message.trim(),
        rsvp,
        photoUrl: photoPreview || undefined,
      });

      setIsSubmitting(false);
      setSuccessNotice(true);
      setTimeout(() => setSuccessNotice(false), 4000);

      // Offer WhatsApp forwarding
      const waEncoded = formatWhatsAppMessage(coupleNames, name.trim(), message.trim(), rsvp);
      const openWa = window.confirm(
        lang === 'id'
          ? 'Ucapan berhasil ditambahkan ke Buku Tamu! Apakah Anda ingin meneruskan ucapan ini langsung ke WhatsApp Pengantin?'
          : 'Wish added to Guestbook! Would you like to forward this wish directly to the Couple via WhatsApp?'
      );
      if (openWa) {
        window.open(`https://wa.me/?text=${waEncoded}`, '_blank');
      }

      setName('');
      setMessage('');
      setPhotoPreview(null);
    }, 400);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Form Card */}
      <div className="bg-stone-900/90 backdrop-blur-xl border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-300 mb-3 border border-amber-500/20">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-amber-100">
            {lang === 'id' ? 'Buku Tamu & Ucapan Doa' : 'Wishes & Guestbook'}
          </h3>
          <p className="text-sm text-stone-400 mt-2 max-w-md mx-auto">
            {lang === 'id'
              ? 'Tinggalkan doa restu dan pesan hangat untuk kedua mempelai secara real-time.'
              : 'Leave your heartfelt blessings and warm wishes for the bride & groom.'}
          </p>
        </div>

        {successNotice && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-sm flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              {lang === 'id'
                ? 'Terima kasih! Ucapan dan doa Anda telah berhasil tersimpan dan tampil.'
                : 'Thank you! Your wish has been recorded and published in real-time.'}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              {lang === 'id' ? 'Nama Anda *' : 'Your Name *'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === 'id' ? 'Masukkan nama lengkap atau panggilan' : 'Enter your name'}
              className="w-full px-4 py-3 bg-stone-950/70 border border-stone-700/80 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              {lang === 'id' ? 'Konfirmasi Kehadiran (RSVP) *' : 'RSVP Attendance *'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Hadir', 'Tidak Hadir', 'Ragu-ragu'] as const).map((status) => (
                <button
                  type="button"
                  key={status}
                  onClick={() => setRsvp(status)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all text-center ${
                    rsvp === status
                      ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-900/40'
                      : 'bg-stone-950/50 text-stone-300 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {status === 'Hadir' && '✓ '}
                  {status === 'Tidak Hadir' && '✗ '}
                  {status === 'Ragu-ragu' && '? '}
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              {lang === 'id' ? 'Pesan & Doa Restu *' : 'Blessings & Message *'}
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={lang === 'id' ? 'Tuliskan ucapan selamat dan doa tulus Anda di sini...' : 'Write your wishes for the couple...'}
              className="w-full px-4 py-3 bg-stone-950/70 border border-stone-700/80 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          {/* Photo attachment from guest */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              {lang === 'id' ? 'Kirim Foto Bersama / Momen (Opsional)' : 'Attach Guest Photo (Optional)'}
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-stone-800/80 hover:bg-stone-700 border border-stone-700 rounded-xl text-xs font-medium text-stone-200 transition">
                <Camera className="w-4 h-4 text-amber-400" />
                <span>{photoPreview ? (lang === 'id' ? 'Ganti Foto' : 'Change Photo') : (lang === 'id' ? 'Pilih Foto' : 'Select Photo')}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              {photoPreview && (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-12 h-12 rounded-lg object-cover border border-amber-500/50 shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    aria-label="Hapus foto"
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-600 text-white rounded-full text-xs flex items-center justify-center shadow"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm rounded-xl shadow-lg shadow-amber-600/30 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? (lang === 'id' ? 'Mengirim...' : 'Sending...') : (lang === 'id' ? 'Kirim Ucapan & Doa' : 'Send Wish')}</span>
          </button>
        </form>
      </div>

      {/* Wishes Stream Feed */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-xs text-stone-400">
          <span className="font-medium tracking-wide">
            {lang === 'id' ? `Menampilkan ${wishes.length} Doa & Ucapan` : `Showing ${wishes.length} Wishes`}
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Guestbook</span>
          </span>
        </div>

        <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
          {wishes.map((w) => (
            <div
              key={w.id}
              className="bg-stone-900/60 backdrop-blur-md border border-stone-800/80 rounded-xl p-4 transition hover:border-amber-500/30 shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-semibold text-xs border border-amber-400/30">
                    {w.guestName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-100">{w.guestName}</h4>
                    <span className="text-[11px] text-stone-400 block">{w.timestamp}</span>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    w.rsvp === 'Hadir'
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                      : w.rsvp === 'Tidak Hadir'
                      ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                      : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {w.rsvp}
                </span>
              </div>

              <p className="text-sm text-stone-300 mt-2.5 leading-relaxed font-light">
                {w.message}
              </p>

              {w.photoUrl && (
                <div className="mt-3">
                  <img
                    src={w.photoUrl}
                    alt={`Foto dari ${w.guestName}`}
                    className="max-h-48 rounded-lg object-cover border border-stone-700 shadow-md"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
