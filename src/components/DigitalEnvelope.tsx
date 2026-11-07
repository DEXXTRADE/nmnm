import React, { useState } from 'react';
import { Copy, Check, QrCode, Smartphone, Gift, Heart } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';

interface DigitalEnvelopeProps {
  envelope: WeddingConfig['digitalEnvelope'];
  lang: 'id' | 'en';
}

export const DigitalEnvelope: React.FC<DigitalEnvelopeProps> = ({ envelope, lang }) => {
  const [copied, setCopied] = useState(false);
  const [showQrisModal, setShowQrisModal] = useState(false);

  const copyDana = () => {
    navigator.clipboard.writeText(envelope.danaNumber.replace(/[^0-9]/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="bg-stone-900/90 backdrop-blur-xl border border-stone-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-300 mb-4 border border-amber-500/20">
          <Gift className="w-6 h-6" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif text-amber-100 mb-2">
          {lang === 'id' ? 'Amplop Digital' : 'Digital Envelope'}
        </h3>
        <p className="text-sm text-stone-400 mb-6 max-w-md mx-auto">
          {lang === 'id'
            ? 'Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih berupa kado digital, dapat melalui DANA atau scan QRIS.'
            : 'Your blessings are the greatest gift. Should you wish to honor us with a digital wedding gift, you may transfer via DANA or scan the QRIS.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {/* DANA Card */}
          <div className="bg-gradient-to-br from-blue-950/60 to-stone-950 border border-blue-600/30 rounded-2xl p-5 shadow-lg relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  DANA E-Wallet
                </span>
                <Smartphone className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-xs text-stone-400 mb-1">{lang === 'id' ? 'Nomor Akun:' : 'Account Number:'}</p>
              <p className="text-lg font-mono font-bold text-white tracking-wider mb-2">
                {envelope.danaNumber}
              </p>
              <p className="text-xs text-stone-300">
                a.n <span className="font-semibold text-white">{envelope.danaAccountName}</span>
              </p>
            </div>

            <button
              onClick={copyDana}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-200 text-xs font-medium flex items-center justify-center gap-2 transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'id' ? 'Nomor Tersalin!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{lang === 'id' ? 'Salin No. DANA' : 'Copy DANA Number'}</span>
                </>
              )}
            </button>
          </div>

          {/* QRIS Card */}
          <div className="bg-stone-950/80 border border-amber-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  QRIS Instant Pay
                </span>
                <QrCode className="w-5 h-5 text-amber-400" />
              </div>
              <div className="bg-white p-2.5 rounded-xl flex items-center justify-center w-28 h-28 mx-auto my-2 shadow">
                <img
                  src={envelope.qrisImageUrl}
                  alt="QRIS Wedding"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[11px] text-center text-stone-400">
                {lang === 'id' ? 'Support Semua Bank & E-Wallet' : 'Supports all Mobile Banking & E-Wallets'}
              </p>
            </div>

            <button
              onClick={() => setShowQrisModal(true)}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-200 text-xs font-medium flex items-center justify-center gap-2 transition"
            >
              <QrCode className="w-4 h-4" />
              <span>{lang === 'id' ? 'Perbesar QRIS' : 'Enlarge QRIS'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal QRIS Viewer */}
      {showQrisModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl p-6 max-w-sm w-full text-center relative shadow-2xl">
            <button
              onClick={() => setShowQrisModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 text-xl"
              aria-label="Tutup"
            >
              ✕
            </button>
            <h4 className="text-lg font-serif text-amber-200 mb-1">
              QRIS Amplop Digital
            </h4>
            <p className="text-xs text-stone-400 mb-4">
              {envelope.danaAccountName}
            </p>
            <div className="bg-white p-4 rounded-2xl inline-block mx-auto shadow-lg mb-4">
              <img
                src={envelope.qrisImageUrl}
                alt="QRIS Full"
                className="w-60 h-60 object-contain mx-auto"
              />
            </div>
            <p className="text-xs text-stone-300">
              {lang === 'id' ? 'Buka aplikasi e-wallet atau m-banking kamu lalu scan kode QR di atas.' : 'Open your banking app to scan.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
