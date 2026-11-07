import React, { useState, useEffect } from 'react';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  ChevronDown,
  Volume2,
  VolumeX,
  Share2,
  Lock,
  Instagram,
  Sparkles,
  Compass,
  ArrowRight,
  ShieldCheck,
  Video
} from 'lucide-react';
import {
  WeddingConfig,
  GuestWish,
  DEFAULT_CONFIG,
  INITIAL_WISHES,
} from './types/wedding';
import { parseGuestName } from './utils/weddingLogic';
import { ParticleEffect } from './components/ParticleEffect';
import { MusicPlayer } from './components/MusicPlayer';
import { CountdownTimer } from './components/CountdownTimer';
import { Guestbook } from './components/Guestbook';
import { DigitalEnvelope } from './components/DigitalEnvelope';
import { GallerySection } from './components/GallerySection';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  // Config state
  const [config, setConfig] = useState<WeddingConfig>(() => {
    const saved = localStorage.getItem('vowcraft_wedding_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  });

  // Wishes state
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    const savedWishes = localStorage.getItem('vowcraft_wedding_wishes');
    if (savedWishes) {
      try {
        return JSON.parse(savedWishes);
      } catch (e) {
        return INITIAL_WISHES;
      }
    }
    return INITIAL_WISHES;
  });

  // Invitation open state
  const [isOpened, setIsOpened] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  // Hidden admin panel trigger
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Guest personal name parsed from URL ?to=Nama
  const [guestName, setGuestName] = useState('Tamu Undangan');

  useEffect(() => {
    setGuestName(parseGuestName(window.location.search));
  }, []);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setAutoPlayMusic(true);
    // Smooth scroll down to first content
    setTimeout(() => {
      document.getElementById('couple-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSaveConfig = (newConfig: WeddingConfig) => {
    setConfig(newConfig);
    localStorage.setItem('vowcraft_wedding_config', JSON.stringify(newConfig));
  };

  const handleAddWish = (newWish: Omit<GuestWish, 'id' | 'timestamp'>) => {
    const created: GuestWish = {
      ...newWish,
      id: 'wish-' + Date.now(),
      timestamp: config.lang === 'id' ? 'Baru saja' : 'Just now',
    };
    const updated = [created, ...wishes];
    setWishes(updated);
    localStorage.setItem('vowcraft_wedding_wishes', JSON.stringify(updated));
  };

  // Theme-based accent classes
  const themeClasses = {
    'warm-bronze': {
      textAccent: 'text-amber-300',
      bgAccent: 'bg-amber-600',
      borderAccent: 'border-amber-500/30',
      gradientOverlay: 'from-black/90 via-black/70 to-stone-950',
    },
    'romantic-rose': {
      textAccent: 'text-rose-300',
      bgAccent: 'bg-rose-600',
      borderAccent: 'border-rose-500/30',
      gradientOverlay: 'from-stone-950/90 via-rose-950/60 to-stone-950',
    },
    'emerald-gold': {
      textAccent: 'text-emerald-300',
      bgAccent: 'bg-emerald-600',
      borderAccent: 'border-emerald-500/30',
      gradientOverlay: 'from-stone-950/90 via-emerald-950/60 to-stone-950',
    },
    'midnight-navy': {
      textAccent: 'text-blue-300',
      bgAccent: 'bg-blue-600',
      borderAccent: 'border-blue-500/30',
      gradientOverlay: 'from-slate-950/90 via-blue-950/60 to-slate-950',
    },
  }[config.themeColor];

  return (
    <div className="relative min-h-screen bg-stone-950 text-stone-100 overflow-x-hidden font-sans selection:bg-amber-800 selection:text-white">
      {/* Background Watermark Couple Photo */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-25 filter blur-[2px] pointer-events-none scale-105 transition-all duration-1000"
        style={{ backgroundImage: `url(${config.watermarkPhoto})` }}
      />
      <div className={`fixed inset-0 z-0 bg-gradient-to-b ${themeClasses.gradientOverlay} pointer-events-none`} />

      {/* Floating Particle Effect */}
      <ParticleEffect themeColor={config.themeColor} />

      {/* Background Music Player */}
      <MusicPlayer musicUrl={config.musicUrl} autoPlayTrigger={autoPlayMusic} />

      {/* Hidden Admin Access Button (Floating Top Left) */}
      <button
        onClick={() => setIsAdminOpen(true)}
        aria-label="Panel Admin Tersembunyi"
        title="Admin Jasa Web Wedding (Klik untuk ubah teks, foto & warna)"
        className="fixed top-5 left-5 z-40 p-2.5 rounded-full bg-stone-900/60 hover:bg-amber-600/80 border border-stone-800 hover:border-amber-400 text-stone-400 hover:text-white backdrop-blur-md transition-all shadow-xl group"
      >
        <Lock className="w-4 h-4 transition group-hover:scale-110" />
      </button>

      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto min-h-screen flex flex-col justify-between shadow-2xl">
        {/* ================= COVER / HERO SECTION ================= */}
        <section
          id="cover-section"
          className="min-h-screen flex flex-col justify-between items-center text-center px-4 py-12 relative"
        >
          {/* Subtle Frame Corner Ornaments */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-amber-500/40 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-amber-500/40 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-amber-500/40 pointer-events-none" />

          {/* Top Header Label */}
          <div className="mt-8 space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-300 font-cinzel">
              {config.lang === 'id' ? 'The Wedding of' : 'The Wedding of'}
            </span>
          </div>

          {/* Hero Couple Portrait Frame (Timeless Snapshot Style) */}
          <div className="my-6 relative max-w-sm w-full mx-auto">
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/30 group">
              <img
                src={config.coverPhoto}
                alt={`${config.groom.nickName} & ${config.bride.nickName}`}
                className="w-full aspect-[3/4] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Couple Big Names Overlay */}
              <div className="absolute bottom-6 inset-x-0 px-4 text-center">
                <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-wide font-normal drop-shadow-md">
                  {config.bride.nickName} <span className="text-amber-400 font-script text-5xl">&</span> {config.groom.nickName}
                </h1>
                <p className="text-xs tracking-widest text-amber-200 mt-2 font-cinzel">
                  {config.akad.date}
                </p>
              </div>
            </div>
          </div>

          {/* Guest Invitation Box & Open Button */}
          <div className="w-full max-w-md mx-auto space-y-4 mb-6">
            <div className="bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-2xl p-4 shadow-xl">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                {config.lang === 'id' ? 'Kepada Yth. Bapak/Ibu/Saudara/i:' : 'Dear Honorable Guest:'}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
                {guestName}
              </h2>
              <p className="text-[11px] text-stone-400 mt-1 italic">
                {config.lang === 'id'
                  ? '*Mohon maaf bila ada kesalahan penulisan nama/gelar'
                  : '*Pardon any spelling mistakes in names/titles'}
              </p>
            </div>

            {!isOpened ? (
              <button
                onClick={handleOpenInvitation}
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm rounded-2xl shadow-xl shadow-amber-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{config.lang === 'id' ? 'Buka Undangan' : 'Open Invitation'}</span>
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 text-xs text-amber-300">
                <ChevronDown className="w-4 h-4 animate-bounce" />
                <span>{config.lang === 'id' ? 'Silakan scroll ke bawah' : 'Scroll down to explore'}</span>
              </div>
            )}
          </div>
        </section>

        {/* Content sections only revealed smoothly after clicking open or if scrolled */}
        {isOpened && (
          <div className="space-y-16 py-8">
            {/* ================= HOLY QUOTE SECTION ================= */}
            <section className="px-6 text-center max-w-2xl mx-auto">
              <div className="p-8 rounded-3xl bg-stone-900/60 backdrop-blur-xl border border-stone-800/80 shadow-2xl">
                <p className="text-xl sm:text-2xl font-serif text-amber-200 leading-relaxed mb-4 text-center direction-rtl">
                  {config.quoteArabic}
                </p>
                <div className="w-16 h-0.5 bg-amber-500/40 mx-auto my-4" />
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic font-light">
                  "{config.quoteTranslation}"
                </p>
                <span className="block text-xs uppercase tracking-widest text-amber-400 font-cinzel mt-4">
                  {config.quoteSource}
                </span>
              </div>
            </section>

            {/* ================= COUPLE PROFILES SECTION ================= */}
            <section id="couple-section" className="px-4 text-center">
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
                  {config.lang === 'id' ? 'Maha Suci Allah yang Menciptakan Makhluk-Nya Berpasangan' : 'Glorious is He Who Created All in Pairs'}
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif text-amber-100 mt-2">
                  {config.lang === 'id' ? 'Kedua Mempelai' : 'The Bride & Groom'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {/* Bride Card */}
                <div className="bg-stone-900/70 backdrop-blur-md border border-stone-800 rounded-3xl p-6 shadow-xl flex flex-col items-center">
                  <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-amber-400/40 p-1 mb-4 shadow-lg">
                    <img
                      src={config.bride.photo}
                      alt={config.bride.fullName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h4 className="text-2xl font-serif text-amber-100">
                    {config.bride.fullName}
                  </h4>
                  <span className="text-xs text-amber-400/90 font-medium mt-1">
                    {config.bride.orderChild}
                  </span>
                  <p className="text-xs text-stone-400 mt-2">
                    {config.lang === 'id' ? 'Putri dari Pasangan:' : 'Daughter of:'}
                  </p>
                  <p className="text-sm text-stone-200 font-medium mt-0.5">
                    Bpk. {config.bride.fatherName} & Ibu {config.bride.motherName}
                  </p>
                  <a
                    href={`https://instagram.com/${config.bride.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-4 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition"
                  >
                    <Instagram className="w-3.5 h-3.5 text-rose-400" />
                    <span>@{config.bride.instagram}</span>
                  </a>
                </div>

                {/* Groom Card */}
                <div className="bg-stone-900/70 backdrop-blur-md border border-stone-800 rounded-3xl p-6 shadow-xl flex flex-col items-center">
                  <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-amber-400/40 p-1 mb-4 shadow-lg">
                    <img
                      src={config.groom.photo}
                      alt={config.groom.fullName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h4 className="text-2xl font-serif text-amber-100">
                    {config.groom.fullName}
                  </h4>
                  <span className="text-xs text-amber-400/90 font-medium mt-1">
                    {config.groom.orderChild}
                  </span>
                  <p className="text-xs text-stone-400 mt-2">
                    {config.lang === 'id' ? 'Putra dari Pasangan:' : 'Son of:'}
                  </p>
                  <p className="text-sm text-stone-200 font-medium mt-0.5">
                    Bpk. {config.groom.fatherName} & Ibu {config.groom.motherName}
                  </p>
                  <a
                    href={`https://instagram.com/${config.groom.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-4 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition"
                  >
                    <Instagram className="w-3.5 h-3.5 text-amber-400" />
                    <span>@{config.groom.instagram}</span>
                  </a>
                </div>
              </div>
            </section>

            {/* ================= EVENTS SCHEDULE & COUNTDOWN ================= */}
            <section className="px-4 py-8">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
                  {config.lang === 'id' ? 'Hitung Mundur Hari Bahagia' : 'Countdown to the Big Day'}
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif text-amber-100 mt-2">
                  {config.lang === 'id' ? 'Waktu & Tempat Acara' : 'Events & Location'}
                </h3>
              </div>

              {/* Countdown Clock */}
              <CountdownTimer targetDate={config.countdownDate} lang={config.lang} />

              {/* Event Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
                {/* Akad Nikah */}
                <div className="bg-stone-900/80 backdrop-blur-xl border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs border border-amber-500/20">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{config.akad.title}</span>
                    </div>

                    <h4 className="text-2xl font-serif text-amber-100">
                      {config.akad.date}
                    </h4>

                    <div className="space-y-2 text-xs text-stone-300">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{config.akad.time}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-stone-100">{config.akad.venue}</strong>
                          <span className="text-stone-400">{config.akad.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href={config.akad.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 w-full py-2.5 px-4 rounded-xl bg-amber-600/20 hover:bg-amber-600/40 border border-amber-500/30 text-amber-200 text-xs font-medium flex items-center justify-center gap-2 transition"
                  >
                    <Compass className="w-4 h-4" />
                    <span>{config.lang === 'id' ? 'Buka Google Maps' : 'Open Location Map'}</span>
                  </a>
                </div>

                {/* Resepsi Pernikahan */}
                <div className="bg-stone-900/80 backdrop-blur-xl border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs border border-rose-500/20">
                      <Heart className="w-3.5 h-3.5" />
                      <span>{config.resepsi.title}</span>
                    </div>

                    <h4 className="text-2xl font-serif text-amber-100">
                      {config.resepsi.date}
                    </h4>

                    <div className="space-y-2 text-xs text-stone-300">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{config.resepsi.time}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-stone-100">{config.resepsi.venue}</strong>
                          <span className="text-stone-400">{config.resepsi.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href={config.resepsi.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 w-full py-2.5 px-4 rounded-xl bg-rose-600/20 hover:bg-rose-600/40 border border-rose-500/30 text-rose-200 text-xs font-medium flex items-center justify-center gap-2 transition"
                  >
                    <Compass className="w-4 h-4" />
                    <span>{config.lang === 'id' ? 'Buka Google Maps' : 'Open Location Map'}</span>
                  </a>
                </div>
              </div>

              {/* Live Streaming Button */}
              {config.streamingUrl && (
                <div className="text-center mt-6">
                  <a
                    href={config.streamingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-medium hover:bg-rose-900/90 transition shadow-lg"
                  >
                    <Video className="w-4 h-4 text-rose-400 animate-pulse" />
                    <span>{config.lang === 'id' ? 'Saksikan Siaran Langsung (Live Streaming)' : 'Watch Live Streaming'}</span>
                  </a>
                </div>
              )}
            </section>

            {/* ================= LOVE STORY TIMELINE ================= */}
            <section className="px-4 py-8">
              <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
                  {config.lang === 'id' ? 'Perjalanan Kisah Kami' : 'How We Met'}
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif text-amber-100 mt-2">
                  {config.lang === 'id' ? 'Kisah Cinta' : 'Our Love Story'}
                </h3>
              </div>

              <div className="max-w-2xl mx-auto space-y-6 relative before:absolute before:inset-y-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-stone-800">
                {config.loveStory.map((story, i) => (
                  <div
                    key={story.id}
                    className={`relative flex items-center gap-4 ${
                      i % 2 === 0 ? 'sm:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Circle Node */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-stone-900 border-2 border-amber-500 text-amber-300 flex items-center justify-center text-xs font-bold shadow-md z-10">
                      ♥
                    </div>

                    {/* Content Box */}
                    <div className="ml-12 sm:ml-0 sm:w-1/2 p-5 bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-2xl shadow-lg">
                      <span className="text-[11px] font-mono font-bold text-amber-400">
                        {story.year}
                      </span>
                      <h4 className="text-base font-serif font-bold text-stone-100 mt-1">
                        {story.title}
                      </h4>
                      <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                        {story.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ================= GALLERY & VIDEO PREWEDDING ================= */}
            <GallerySection
              gallery={config.gallery}
              videoUrl={config.videoUrl}
              lang={config.lang}
            />

            {/* ================= DIGITAL ENVELOPE (DANA & QRIS) ================= */}
            <DigitalEnvelope envelope={config.digitalEnvelope} lang={config.lang} />

            {/* ================= GUESTBOOK & WISHES ================= */}
            <Guestbook
              wishes={wishes}
              onAddWish={handleAddWish}
              coupleNames={`${config.bride.nickName} & ${config.groom.nickName}`}
              lang={config.lang}
            />

            {/* ================= HEALTH PROTOCOL NOTICE ================= */}
            <section className="px-4 text-center max-w-xl mx-auto">
              <div className="p-6 rounded-2xl bg-stone-900/50 border border-stone-800/80 text-xs text-stone-400 space-y-3">
                <div className="flex items-center justify-center gap-2 text-amber-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{config.lang === 'id' ? 'Protokol Kesehatan & Kebersihan' : 'Health & Comfort Protocol'}</span>
                </div>
                <p>
                  {config.lang === 'id'
                    ? 'Demi kenyamanan bersama, para tamu dimohon hadir dalam kondisi sehat, menjaga kebersihan area, dan saling menghormati sesama undangan.'
                    : 'For mutual comfort, guests are encouraged to arrive in good health and respect the venue amenities.'}
                </p>
              </div>
            </section>

            {/* ================= CLOSING WORDS ================= */}
            <section className="px-4 py-8 text-center max-w-md mx-auto space-y-3">
              <p className="text-xs text-stone-400 italic">
                {config.lang === 'id'
                  ? 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.'
                  : 'It would be a great honor and joy to have your presence and blessings on our special day.'}
              </p>
              <h4 className="text-xl font-serif text-amber-200">
                {config.bride.nickName} & {config.groom.nickName}
              </h4>
              <p className="text-[11px] text-stone-500">
                Beserta segenap keluarga besar kedua mempelai
              </p>
            </section>
          </div>
        )}

        {/* ================= FOOTER & DEVELOPER JASA WEB WEDDING ================= */}
        <footer className="mt-16 py-8 px-4 border-t border-stone-900 bg-stone-950/90 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs text-stone-400">
            <span>© 2026 {config.bride.nickName} & {config.groom.nickName}</span>
            <span>·</span>
            <span>All Rights Reserved</span>
          </div>

          {/* Agency Developer Watermark & Client Order Contact */}
          <div className="p-4 rounded-2xl bg-stone-900/80 border border-amber-500/20 max-w-md mx-auto shadow-lg space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block">
              Website Dibuat Oleh:
            </span>
            <h5 className="text-sm font-serif font-bold text-white">
              {config.developerContact.agencyName}
            </h5>
            <p className="text-xs text-stone-400">
              {config.developerContact.tagline}
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <a
                href={`https://wa.me/${config.developerContact.whatsapp}?text=Halo%20VowCraft!%20Saya%20tertarik%20pesan%20jasa%20pembuatan%20website%20undangan%20pernikahan%20digital.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700/30 hover:bg-emerald-700/50 border border-emerald-500/40 text-emerald-200 text-xs font-medium transition"
              >
                <span>WhatsApp Pembuat Web</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Login Admin</span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
