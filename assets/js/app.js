/**
 * The Wedding of Arina & Bagas - Pure Vanilla JS Engine
 * Commercial Grade, No-Build GitHub Pages Ready
 */

// Default Configuration State
const DEFAULT_CONFIG = {
  themeColor: 'warm-bronze',
  groom: {
    fullName: 'Bagas Sadewa, S.Kom.',
    nickName: 'Bagas',
    fatherName: 'Samuel Sudarsono',
    motherName: 'Masuya Rahayu',
    orderChild: 'Putra ke-2',
    instagram: 'bagas.wedding',
    photo: 'assets/images/groom_portrait_1793976527573.jpg',
  },
  bride: {
    fullName: 'Arina Febriana, S.Ds.',
    nickName: 'Arina',
    fatherName: 'Sumarni Hidayat',
    motherName: 'Maryati Susanti',
    orderChild: 'Putri ke-1',
    instagram: 'arina.febriana',
    photo: 'assets/images/bride_portrait_1793976527158.jpg',
  },
  coverPhoto: 'assets/images/wedding_couple_hero_1793976526912.jpg',
  watermarkPhoto: 'assets/images/wedding_couple_hero_1793976526912.jpg',
  quoteArabic: 'وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ',
  quoteTranslation: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
  quoteSource: 'QS. Ar-Rum: 21',
  akad: {
    title: 'Akad Nikah',
    date: 'Rabu, 30 Desember 2026',
    time: '08:00 - 10:00 WIB',
    venue: 'Masjid Raya Al-Jabbar & The Trans Luxury Ballroom',
    address: 'Jl. Gatot Subroto No.289, Cibangkong, Kota Bandung, Jawa Barat 40273',
    mapsUrl: 'https://maps.app.goo.gl/aAEqaPAFNVCK1gvaA',
  },
  resepsi: {
    title: 'Resepsi Pernikahan',
    date: 'Kamis, 31 Desember 2026',
    time: '11:00 - 14:00 WIB',
    venue: 'Grand Ballroom The Trans Luxury Hotel',
    address: 'Jl. Gatot Subroto No.289, Cibangkong, Kota Bandung, Jawa Barat 40273',
    mapsUrl: 'https://maps.app.goo.gl/aAEqaPAFNVCK1gvaA',
  },
  countdownDate: '2026-12-30T08:00:00',
  gallery: [
    { id: '1', url: 'assets/images/wedding_couple_hero_1793976526912.jpg', caption: 'Timeless Portrait in Ivory' },
    { id: '2', url: 'assets/images/prewedding_landscape_1793976527564.jpg', caption: 'Sunrise Walk in Misty Pine' },
    { id: '3', url: 'assets/images/bride_portrait_1793976527158.jpg', caption: 'Radiant Bride Elegance' },
    { id: '4', url: 'assets/images/groom_portrait_1793976527573.jpg', caption: 'Classic Bespoke Groom' }
  ],
  digitalEnvelope: {
    danaNumber: '0812-3456-7890',
    danaAccountName: 'Bagas Sadewa & Arina',
    qrisImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DANA-ARINA-BAGAS-WEDDING',
  },
  musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112191.mp3',
  developerContact: {
    agencyName: 'VowCraft Wedding Tech',
    tagline: 'Jasa Pembuatan Website Undangan Pernikahan Digital Elegan & Interaktif',
    whatsapp: '6281234567890',
  }
};

const INITIAL_WISHES = [
  {
    id: 'w1',
    guestName: 'Melissa & Pratama',
    message: 'Selamat berbahagia Arina & Bagas! Semoga cinta kalian selalu mekar abadi, rukun dan berkah hingga kakek nenek.',
    timestamp: 'Baru saja',
    rsvp: 'Hadir',
    photoUrl: 'assets/images/bride_portrait_1793976527158.jpg'
  },
  {
    id: 'w2',
    guestName: 'Citra Kusuma & Keluarga',
    message: 'Baarakallahu laka wa baaraka alaika wa jamaa bainakuma fii khoir. Doa terbaik untuk kedua mempelai!',
    timestamp: '1 jam yang lalu',
    rsvp: 'Hadir'
  },
  {
    id: 'w3',
    guestName: 'Arya Sukma (Sahabat Kampus)',
    message: 'Alhamdulillah akhirnya hari bahagia tiba! Lancar sampai hari-H sobatku Bagas & Arina!',
    timestamp: '3 jam yang lalu',
    rsvp: 'Hadir'
  },
  {
    id: 'w4',
    guestName: 'Cecilia & Suami',
    message: 'Happy wedding day! Maaf kami belum bisa hadir langsung, namun doa tulus kami selalu menyertai kalian berdua ❤️',
    timestamp: 'Kemarin',
    rsvp: 'Tidak Hadir'
  }
];

// App State
let weddingConfig = loadConfig();
let weddingWishes = loadWishes();
let isMusicPlaying = false;
let currentRsvpChoice = 'Hadir';
let currentGuestPhotoData = null;
let adminClickCounter = 0;

function loadConfig() {
  const saved = localStorage.getItem('vowcraft_wedding_config');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { return DEFAULT_CONFIG; }
  }
  return DEFAULT_CONFIG;
}

function saveConfig(cfg) {
  weddingConfig = cfg;
  localStorage.setItem('vowcraft_wedding_config', JSON.stringify(cfg));
  renderAll();
}

function loadWishes() {
  const saved = localStorage.getItem('vowcraft_wedding_wishes');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { return INITIAL_WISHES; }
  }
  return INITIAL_WISHES;
}

function saveWishes(wishes) {
  weddingWishes = wishes;
  localStorage.setItem('vowcraft_wedding_wishes', JSON.stringify(wishes));
  renderWishes();
  renderAdminWishes();
}

// Guest Name Parser
function parseGuestName() {
  const params = new URLSearchParams(window.location.search);
  const to = params.get('to') || params.get('tamu') || params.get('guest');
  return to ? decodeURIComponent(to) : 'Tamu Undangan';
}

// Particle Canvas Animation
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const count = 35;
  for (let i = 0; i < count; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      isSparkle: Math.random() > 0.6
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    petals.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      if (p.y > height + 20) { p.y = -20; p.x = Math.random() * width; }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      if (p.isSparkle) {
        ctx.fillStyle = 'rgba(254, 240, 138, 0.5)';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = weddingConfig.themeColor === 'romantic-rose'
          ? 'rgba(251, 113, 133, 0.45)'
          : weddingConfig.themeColor === 'emerald-gold'
          ? 'rgba(234, 179, 8, 0.45)'
          : 'rgba(245, 158, 11, 0.45)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size, -p.size * 0.5, p.size * 1.5, p.size, 0, p.size * 1.8);
        ctx.bezierCurveTo(-p.size * 1.5, p.size, -p.size, -p.size * 0.5, 0, 0);
        ctx.fill();
      }

      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

// Countdown Clock Timer
function updateCountdown() {
  const target = new Date(weddingConfig.countdownDate).getTime();
  const now = new Date().getTime();
  const diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % 1000) / 1000);

  const dEl = document.getElementById('countDays');
  const hEl = document.getElementById('countHours');
  const mEl = document.getElementById('countMinutes');
  const sEl = document.getElementById('countSeconds');

  if (dEl) dEl.innerText = String(days).padStart(2, '0');
  if (hEl) hEl.innerText = String(hours).padStart(2, '0');
  if (mEl) mEl.innerText = String(mins).padStart(2, '0');
  if (sEl) sEl.innerText = String(secs).padStart(2, '0');
}

// Audio Player
function setupAudio() {
  const audio = document.getElementById('weddingAudio');
  const btn = document.getElementById('btnMusicToggle');
  const iconPlay = document.getElementById('iconMusicPlay');
  const iconMute = document.getElementById('iconMusicMute');

  if (!audio || !btn) return;
  audio.src = weddingConfig.musicUrl;

  btn.addEventListener('click', () => {
    if (isMusicPlaying) {
      audio.pause();
      isMusicPlaying = false;
      iconPlay.classList.add('hidden');
      iconMute.classList.remove('hidden');
      btn.classList.remove('bg-amber-600/80', 'text-white');
      btn.classList.add('bg-black/60', 'text-stone-300');
    } else {
      audio.play().then(() => {
        isMusicPlaying = true;
        iconPlay.classList.remove('hidden');
        iconMute.classList.add('hidden');
        btn.classList.add('bg-amber-600/80', 'text-white');
        btn.classList.remove('bg-black/60', 'text-stone-300');
      }).catch(() => {
        isMusicPlaying = false;
      });
    }
  });
}

function startMusicOnOpen() {
  const audio = document.getElementById('weddingAudio');
  const btn = document.getElementById('btnMusicToggle');
  const iconPlay = document.getElementById('iconMusicPlay');
  const iconMute = document.getElementById('iconMusicMute');

  if (audio) {
    audio.play().then(() => {
      isMusicPlaying = true;
      if (iconPlay) iconPlay.classList.remove('hidden');
      if (iconMute) iconMute.classList.add('hidden');
      if (btn) {
        btn.classList.add('bg-amber-600/80', 'text-white');
        btn.classList.remove('bg-black/60', 'text-stone-300');
      }
    }).catch(() => {});
  }
}

// Render Gallery (Pure Photos)
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = '';

  weddingConfig.gallery.forEach((item, index) => {
    const card = document.createElement('div');
    const isBig = index === 0;
    card.className = `group relative overflow-hidden rounded-2xl cursor-pointer border border-stone-800 hover:border-amber-500/50 transition-all duration-300 shadow-md ${
      isBig ? 'col-span-2 row-span-2 aspect-[4/3] md:aspect-auto' : 'aspect-square'
    }`;
    card.innerHTML = `
      <img src="${item.url}" alt="${item.caption || 'Prewedding'}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div>
          <p class="text-xs font-serif text-amber-200">${item.caption || 'Momen Prewedding'}</p>
          <span class="text-[10px] text-stone-300 flex items-center gap-1 mt-0.5">🔍 Klik untuk memperbesar</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openLightbox(item.url, item.caption));
    grid.appendChild(card);
  });
}

// Render Wishes Feed
function renderWishes() {
  const feed = document.getElementById('wishesFeed');
  const countEl = document.getElementById('wishesCountText');
  if (countEl) countEl.innerText = `Menampilkan ${weddingWishes.length} Doa & Ucapan`;
  if (!feed) return;
  feed.innerHTML = '';

  weddingWishes.forEach(w => {
    const card = document.createElement('div');
    card.className = 'bg-stone-900/60 backdrop-blur-md border border-stone-800/80 rounded-xl p-4 transition hover:border-amber-500/30 shadow-md';
    
    const rsvpBadgeColor = w.rsvp === 'Hadir'
      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
      : w.rsvp === 'Tidak Hadir'
      ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
      : 'bg-amber-950/60 text-amber-300 border-amber-500/40';

    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-semibold text-xs border border-amber-400/30">
            ${(w.guestName || 'G').charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 class="text-sm font-semibold text-stone-100">${escapeHtml(w.guestName)}</h4>
            <span class="text-[11px] text-stone-400 block">${w.timestamp}</span>
          </div>
        </div>
        <span class="text-[10px] px-2 py-0.5 rounded-full border ${rsvpBadgeColor}">${w.rsvp}</span>
      </div>
      <p class="text-sm text-stone-300 mt-2.5 leading-relaxed font-light">${escapeHtml(w.message)}</p>
      ${w.photoUrl ? `<div class="mt-3"><img src="${w.photoUrl}" alt="Foto Tamu" class="max-h-48 rounded-lg object-cover border border-stone-700 shadow-md cursor-pointer" onclick="openLightbox('${w.photoUrl}', 'Foto dari ${escapeHtml(w.guestName)}')"></div>` : ''}
    `;
    feed.appendChild(card);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Lightbox Modal
function openLightbox(imgUrl, caption = '') {
  const modal = document.getElementById('modalLightbox');
  const img = document.getElementById('imgLightbox');
  const cap = document.getElementById('captionLightbox');
  if (!modal || !img) return;
  img.src = imgUrl;
  if (cap) cap.innerText = caption;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeLightbox() {
  const modal = document.getElementById('modalLightbox');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Render All Elements from Config
function renderAll() {
  const c = weddingConfig;

  // Background Watermark & Theme
  const bg = document.getElementById('bgWatermark');
  if (bg) bg.style.backgroundImage = `url("${c.watermarkPhoto}")`;

  const coverImg = document.getElementById('imgCover');
  if (coverImg) coverImg.src = c.coverPhoto;

  const namesEl = document.getElementById('textCoupleNames');
  if (namesEl) namesEl.innerHTML = `${c.bride.nickName} <span class="text-amber-400 font-script text-5xl">&</span> ${c.groom.nickName}`;

  const heroDate = document.getElementById('textHeroDate');
  if (heroDate) heroDate.innerText = c.akad.date;

  const guestName = parseGuestName();
  const guestEl = document.getElementById('textGuestName');
  if (guestEl) guestEl.innerText = guestName;
  const inputName = document.getElementById('inputGuestName');
  if (inputName && !inputName.value) inputName.value = guestName !== 'Tamu Undangan' ? guestName : '';

  // Quotes
  const qArabic = document.getElementById('quoteArabic');
  if (qArabic) qArabic.innerText = c.quoteArabic;
  const qTrans = document.getElementById('quoteTranslation');
  if (qTrans) qTrans.innerText = `"${c.quoteTranslation}"`;
  const qSrc = document.getElementById('quoteSource');
  if (qSrc) qSrc.innerText = c.quoteSource;

  // Bride & Groom
  const bImg = document.getElementById('imgBride');
  if (bImg) bImg.src = c.bride.photo;
  const bName = document.getElementById('brideFullName');
  if (bName) bName.innerText = c.bride.fullName;
  const bOrder = document.getElementById('brideOrderChild');
  if (bOrder) bOrder.innerText = c.bride.orderChild;
  const bParents = document.getElementById('brideParents');
  if (bParents) bParents.innerText = `Bpk. ${c.bride.fatherName} & Ibu ${c.bride.motherName}`;
  const bIg = document.getElementById('brideInstagramText');
  if (bIg) bIg.innerText = `@${c.bride.instagram}`;
  const bIgLink = document.getElementById('brideInstagramLink');
  if (bIgLink) bIgLink.href = `https://instagram.com/${c.bride.instagram}`;

  const gImg = document.getElementById('imgGroom');
  if (gImg) gImg.src = c.groom.photo;
  const gName = document.getElementById('groomFullName');
  if (gName) gName.innerText = c.groom.fullName;
  const gOrder = document.getElementById('groomOrderChild');
  if (gOrder) gOrder.innerText = c.groom.orderChild;
  const gParents = document.getElementById('groomParents');
  if (gParents) gParents.innerText = `Bpk. ${c.groom.fatherName} & Ibu ${c.groom.motherName}`;
  const gIg = document.getElementById('groomInstagramText');
  if (gIg) gIg.innerText = `@${c.groom.instagram}`;
  const gIgLink = document.getElementById('groomInstagramLink');
  if (gIgLink) gIgLink.href = `https://instagram.com/${c.groom.instagram}`;

  // Events
  const akDate = document.getElementById('akadDate');
  if (akDate) akDate.innerText = c.akad.date;
  const akTime = document.getElementById('akadTime');
  if (akTime) akTime.innerText = `⏰ ${c.akad.time}`;
  const akVenue = document.getElementById('akadVenue');
  if (akVenue) akVenue.innerText = c.akad.venue;
  const akAddr = document.getElementById('akadAddress');
  if (akAddr) akAddr.innerText = c.akad.address;
  const akMap = document.getElementById('akadMapUrl');
  if (akMap) akMap.href = c.akad.mapsUrl;

  const resDate = document.getElementById('resepsiDate');
  if (resDate) resDate.innerText = c.resepsi.date;
  const resTime = document.getElementById('resepsiTime');
  if (resTime) resTime.innerText = `⏰ ${c.resepsi.time}`;
  const resVenue = document.getElementById('resepsiVenue');
  if (resVenue) resVenue.innerText = c.resepsi.venue;
  const resAddr = document.getElementById('resepsiAddress');
  if (resAddr) resAddr.innerText = c.resepsi.address;
  const resMap = document.getElementById('resepsiMapUrl');
  if (resMap) resMap.href = c.resepsi.mapsUrl;

  // Envelope
  const danaNum = document.getElementById('envelopeDanaNumber');
  if (danaNum) danaNum.innerText = c.digitalEnvelope.danaNumber;
  const danaNm = document.getElementById('envelopeDanaName');
  if (danaNm) danaNm.innerText = c.digitalEnvelope.danaAccountName;
  const qrisPrev = document.getElementById('imgQrisPreview');
  if (qrisPrev) qrisPrev.src = c.digitalEnvelope.qrisImageUrl;

  // Closing & Footer
  const closeNames = document.getElementById('closingCoupleNames');
  if (closeNames) closeNames.innerText = `${c.bride.nickName} & ${c.groom.nickName}`;
  const copyRight = document.getElementById('footerCopyright');
  if (copyRight) copyRight.innerText = `© 2026 ${c.bride.nickName} & ${c.groom.nickName}`;
  const agencyName = document.getElementById('footerAgencyName');
  if (agencyName) agencyName.innerText = c.developerContact.agencyName;
  const agencyTag = document.getElementById('footerAgencyTagline');
  if (agencyTag) agencyTag.innerText = c.developerContact.tagline;
  const agencyWa = document.getElementById('footerAgencyWa');
  if (agencyWa) agencyWa.href = `https://wa.me/${c.developerContact.whatsapp}?text=Halo!%20Saya%20tertarik%20pesan%20jasa%20pembuatan%20website%20undangan%20pernikahan%20digital.`;

  renderGallery();
  renderWishes();
}

// Setup Event Handlers
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initParticleCanvas();
  setupAudio();
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Buka Undangan Button
  const btnOpen = document.getElementById('btnOpenInvitation');
  const invContent = document.getElementById('invitationContent');
  if (btnOpen && invContent) {
    btnOpen.addEventListener('click', () => {
      invContent.classList.remove('hidden');
      startMusicOnOpen();
      setTimeout(() => {
        document.getElementById('couple-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    });
  }

  // Lightbox Close
  const btnCloseLb = document.getElementById('btnCloseLightbox');
  if (btnCloseLb) btnCloseLb.addEventListener('click', closeLightbox);
  const modalLb = document.getElementById('modalLightbox');
  if (modalLb) {
    modalLb.addEventListener('click', (e) => {
      if (e.target === modalLb) closeLightbox();
    });
  }

  // QRIS Modal Enlarge
  const btnEnlargeQris = document.getElementById('btnEnlargeQris');
  if (btnEnlargeQris) {
    btnEnlargeQris.addEventListener('click', () => {
      openLightbox(weddingConfig.digitalEnvelope.qrisImageUrl, `QRIS Amplop Digital - ${weddingConfig.digitalEnvelope.danaAccountName}`);
    });
  }

  // Copy DANA Number
  const btnCopy = document.getElementById('btnCopyDana');
  const labelCopy = document.getElementById('labelCopyDana');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const pureNumber = weddingConfig.digitalEnvelope.danaNumber.replace(/[^0-9]/g, '');
      navigator.clipboard.writeText(pureNumber).then(() => {
        if (labelCopy) labelCopy.innerText = '✓ Nomor DANA Tersalin!';
        setTimeout(() => {
          if (labelCopy) labelCopy.innerText = 'Salin No. DANA';
        }, 2000);
      });
    });
  }

  // Guest RSVP selector
  const rsvpBtns = document.querySelectorAll('.btn-rsvp');
  rsvpBtns.forEach(b => {
    b.addEventListener('click', () => {
      currentRsvpChoice = b.getAttribute('data-status');
      rsvpBtns.forEach(btn => {
        btn.classList.remove('bg-amber-600', 'text-white', 'border-amber-500');
        btn.classList.add('bg-stone-950/50', 'text-stone-300', 'border-stone-800');
      });
      b.classList.add('bg-amber-600', 'text-white', 'border-amber-500');
      b.classList.remove('bg-stone-950/50', 'text-stone-300', 'border-stone-800');
    });
  });

  // Guest Photo Upload
  const inputPhoto = document.getElementById('inputGuestPhoto');
  const previewCont = document.getElementById('guestPhotoPreviewContainer');
  const previewImg = document.getElementById('imgGuestPreview');
  const removePhoto = document.getElementById('btnRemoveGuestPhoto');

  if (inputPhoto) {
    inputPhoto.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > 3 * 1024 * 1024) {
          alert('Ukuran foto maksimal 3MB');
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          currentGuestPhotoData = reader.result;
          if (previewImg) previewImg.src = currentGuestPhotoData;
          if (previewCont) previewCont.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (removePhoto) {
    removePhoto.addEventListener('click', () => {
      currentGuestPhotoData = null;
      if (inputPhoto) inputPhoto.value = '';
      if (previewCont) previewCont.classList.add('hidden');
    });
  }

  // Submit Wish Form
  const formWish = document.getElementById('formWish');
  if (formWish) {
    formWish.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('inputGuestName');
      const msgInput = document.getElementById('inputGuestMessage');
      if (!nameInput || !msgInput) return;

      const gName = nameInput.value.trim();
      const gMsg = msgInput.value.trim();
      if (!gName || !gMsg) return;

      const newWish = {
        id: 'wish-' + Date.now(),
        guestName: gName,
        message: gMsg,
        timestamp: 'Baru saja',
        rsvp: currentRsvpChoice,
        photoUrl: currentGuestPhotoData || undefined
      };

      weddingWishes.unshift(newWish);
      saveWishes(weddingWishes);

      // Offer WhatsApp forwarding
      const waText = encodeURIComponent(`Halo ${weddingConfig.bride.nickName} & ${weddingConfig.groom.nickName}! 🤍\n\nSaya *${gName}* ingin menyampaikan ucapan doa untuk pernikahan kalian:\n\n"${gMsg}"\n\nKonfirmasi Kehadiran: *${currentRsvpChoice}*\n\nTerima kasih atas undangannya!`);
      const forwardWa = confirm('Ucapan doa Anda telah berhasil tampil di Buku Tamu! Apakah Anda ingin meneruskan ucapan ini ke WhatsApp Pengantin?');
      if (forwardWa) {
        window.open(`https://wa.me/?text=${waText}`, '_blank');
      }

      msgInput.value = '';
      currentGuestPhotoData = null;
      if (previewCont) previewCont.classList.add('hidden');
    });
  }

  // ================= ADMIN PANEL TRIGGER (TERSEMBUNYI TANPA NONGOL DI PUBLIK) =================
  // 1. Shortcut Keyboard: Ctrl + Shift + A
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openAdminPanel();
    }
  });

  // 2. URL parameter ?admin=1
  if (new URLSearchParams(window.location.search).get('admin') === '1') {
    openAdminPanel();
  }

  // 3. Secret Trigger: Klik 5 kali pada teks hak cipta footer
  const footerCopy = document.getElementById('footerCopyright');
  if (footerCopy) {
    footerCopy.addEventListener('click', () => {
      adminClickCounter++;
      if (adminClickCounter >= 5) {
        adminClickCounter = 0;
        openAdminPanel();
      }
    });
  }

  setupAdminPanelLogic();
});

// Admin Panel Logic
function openAdminPanel() {
  const modal = document.getElementById('modalAdmin');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeAdminPanel() {
  const modal = document.getElementById('modalAdmin');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function setupAdminPanelLogic() {
  const btnClose = document.getElementById('btnCloseAdmin');
  if (btnClose) btnClose.addEventListener('click', closeAdminPanel);

  const formLogin = document.getElementById('formAdminLogin');
  const loginSection = document.getElementById('adminLoginSection');
  const dashSection = document.getElementById('adminDashboardSection');
  const footerAction = document.getElementById('adminFooterAction');
  const errorMsg = document.getElementById('loginErrorMsg');

  // Stored password or default
  let storedAdminPass = localStorage.getItem('vowcraft_admin_pass') || 'admin123';
  let storedAdminEmail = localStorage.getItem('vowcraft_admin_email') || 'admin@wedding.com';

  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('adminEmailInput')?.value.trim();
      const pass = document.getElementById('adminPassInput')?.value.trim();

      if (email === storedAdminEmail && pass === storedAdminPass) {
        if (errorMsg) errorMsg.classList.add('hidden');
        if (loginSection) loginSection.classList.add('hidden');
        if (dashSection) dashSection.classList.remove('hidden');
        if (footerAction) footerAction.classList.remove('hidden');
        populateAdminFields();
      } else {
        if (errorMsg) errorMsg.classList.remove('hidden');
      }
    });
  }

  // Admin Logout
  const btnLogout = document.getElementById('btnAdminLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (dashSection) dashSection.classList.add('hidden');
      if (footerAction) footerAction.classList.add('hidden');
      if (loginSection) loginSection.classList.remove('hidden');
      closeAdminPanel();
    });
  }

  // Tab switching
  const tabBtns = document.querySelectorAll('.btn-tab-admin');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      tabBtns.forEach(b => {
        b.classList.remove('bg-amber-600/30', 'text-amber-200', 'border-amber-500/40');
        b.classList.add('text-stone-400');
      });
      btn.classList.add('bg-amber-600/30', 'text-amber-200', 'border-amber-500/40');
      btn.classList.remove('text-stone-400');

      document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
      const activePane = document.getElementById(targetId);
      if (activePane) activePane.classList.remove('hidden');
    });
  });

  // Change Password Form
  const formPass = document.getElementById('formChangePassword');
  const passNotice = document.getElementById('passwordNotice');
  if (formPass) {
    formPass.addEventListener('submit', (e) => {
      e.preventDefault();
      const newP = document.getElementById('inputNewAdminPassword')?.value;
      if (newP && newP.length >= 6) {
        storedAdminPass = newP;
        localStorage.setItem('vowcraft_admin_pass', newP);
        if (passNotice) {
          passNotice.classList.remove('hidden');
          setTimeout(() => passNotice.classList.add('hidden'), 3000);
        }
        document.getElementById('inputNewAdminPassword').value = '';
      } else {
        alert('Password minimal 6 karakter!');
      }
    });
  }

  // File Upload Handlers in Admin
  setupAdminFileUploads();

  // Save All Changes Button
  const btnSave = document.getElementById('btnSaveAllChanges');
  if (btnSave) {
    btnSave.addEventListener('click', () => {
      collectAdminFieldsAndSave();
      const notice = document.getElementById('saveSuccessNotice');
      if (notice) {
        notice.classList.remove('hidden');
        setTimeout(() => notice.classList.add('hidden'), 3500);
      }
    });
  }
}

function populateAdminFields() {
  const c = weddingConfig;

  // Couple
  const bFull = document.getElementById('editBrideFullName');
  if (bFull) bFull.value = c.bride.fullName;
  const bNick = document.getElementById('editBrideNickName');
  if (bNick) bNick.value = c.bride.nickName;
  const bParents = document.getElementById('editBrideParents');
  if (bParents) bParents.value = `Bpk. ${c.bride.fatherName} & Ibu ${c.bride.motherName}`;
  const bOrder = document.getElementById('editBrideOrderChild');
  if (bOrder) bOrder.value = c.bride.orderChild;

  const gFull = document.getElementById('editGroomFullName');
  if (gFull) gFull.value = c.groom.fullName;
  const gNick = document.getElementById('editGroomNickName');
  if (gNick) gNick.value = c.groom.nickName;
  const gParents = document.getElementById('editGroomParents');
  if (gParents) gParents.value = `Bpk. ${c.groom.fatherName} & Ibu ${c.groom.motherName}`;
  const gOrder = document.getElementById('editGroomOrderChild');
  if (gOrder) gOrder.value = c.groom.orderChild;

  // Events
  const countDate = document.getElementById('editCountdownDate');
  if (countDate) countDate.value = c.countdownDate;
  const akDate = document.getElementById('editAkadDate');
  if (akDate) akDate.value = c.akad.date;
  const akTime = document.getElementById('editAkadTime');
  if (akTime) akTime.value = c.akad.time;
  const akVenue = document.getElementById('editAkadVenue');
  if (akVenue) akVenue.value = c.akad.venue;

  const resDate = document.getElementById('editResepsiDate');
  if (resDate) resDate.value = c.resepsi.date;
  const resTime = document.getElementById('editResepsiTime');
  if (resTime) resTime.value = c.resepsi.time;
  const resVenue = document.getElementById('editResepsiVenue');
  if (resVenue) resVenue.value = c.resepsi.venue;

  // Envelope
  const danaNum = document.getElementById('editDanaNumber');
  if (danaNum) danaNum.value = c.digitalEnvelope.danaNumber;
  const danaName = document.getElementById('editDanaName');
  if (danaName) danaName.value = c.digitalEnvelope.danaAccountName;

  renderAdminGalleryList();
  renderAdminWishes();
}

function collectAdminFieldsAndSave() {
  const c = { ...weddingConfig };

  const bFull = document.getElementById('editBrideFullName')?.value;
  if (bFull) c.bride.fullName = bFull;
  const bNick = document.getElementById('editBrideNickName')?.value;
  if (bNick) c.bride.nickName = bNick;

  const gFull = document.getElementById('editGroomFullName')?.value;
  if (gFull) c.groom.fullName = gFull;
  const gNick = document.getElementById('editGroomNickName')?.value;
  if (gNick) c.groom.nickName = gNick;

  const countD = document.getElementById('editCountdownDate')?.value;
  if (countD) c.countdownDate = countD;

  const akDate = document.getElementById('editAkadDate')?.value;
  if (akDate) c.akad.date = akDate;
  const akTime = document.getElementById('editAkadTime')?.value;
  if (akTime) c.akad.time = akTime;
  const akVenue = document.getElementById('editAkadVenue')?.value;
  if (akVenue) c.akad.venue = akVenue;

  const resDate = document.getElementById('editResepsiDate')?.value;
  if (resDate) c.resepsi.date = resDate;
  const resTime = document.getElementById('editResepsiTime')?.value;
  if (resTime) c.resepsi.time = resTime;
  const resVenue = document.getElementById('editResepsiVenue')?.value;
  if (resVenue) c.resepsi.venue = resVenue;

  const danaNum = document.getElementById('editDanaNumber')?.value;
  if (danaNum) c.digitalEnvelope.danaNumber = danaNum;
  const danaName = document.getElementById('editDanaName')?.value;
  if (danaName) c.digitalEnvelope.danaAccountName = danaName;

  saveConfig(c);
}

function setupAdminFileUploads() {
  // Cover / Watermark
  const editCover = document.getElementById('editCoverFile');
  if (editCover) {
    editCover.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        readFileAsDataUrl(file, (dataUrl) => {
          weddingConfig.coverPhoto = dataUrl;
          weddingConfig.watermarkPhoto = dataUrl;
          saveConfig(weddingConfig);
        });
      }
    });
  }

  // Bride Photo
  const editBride = document.getElementById('editBrideFile');
  if (editBride) {
    editBride.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        readFileAsDataUrl(file, (dataUrl) => {
          weddingConfig.bride.photo = dataUrl;
          saveConfig(weddingConfig);
        });
      }
    });
  }

  // Groom Photo
  const editGroom = document.getElementById('editGroomFile');
  if (editGroom) {
    editGroom.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        readFileAsDataUrl(file, (dataUrl) => {
          weddingConfig.groom.photo = dataUrl;
          saveConfig(weddingConfig);
        });
      }
    });
  }

  // QRIS Image
  const editQris = document.getElementById('editQrisFile');
  if (editQris) {
    editQris.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        readFileAsDataUrl(file, (dataUrl) => {
          weddingConfig.digitalEnvelope.qrisImageUrl = dataUrl;
          saveConfig(weddingConfig);
        });
      }
    });
  }

  // Add Photo to Gallery via File
  const addGalPhoto = document.getElementById('inputAddGalleryPhoto');
  if (addGalPhoto) {
    addGalPhoto.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        readFileAsDataUrl(file, (dataUrl) => {
          weddingConfig.gallery.push({
            id: 'gal-' + Date.now(),
            url: dataUrl,
            caption: 'Foto Prewedding ' + (weddingConfig.gallery.length + 1)
          });
          saveConfig(weddingConfig);
          renderAdminGalleryList();
        });
      }
    });
  }

  // Clear All Wishes
  const btnClearAll = document.getElementById('btnClearAllWishes');
  if (btnClearAll) {
    btnClearAll.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin menghapus SELURUH komentar tamu?')) {
        saveWishes([]);
      }
    });
  }
}

function readFileAsDataUrl(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => callback(reader.result);
  reader.readAsDataURL(file);
}

// Admin Gallery List View
function renderAdminGalleryList() {
  const cont = document.getElementById('adminGalleryList');
  if (!cont) return;
  cont.innerHTML = '';

  weddingConfig.gallery.forEach((item, index) => {
    const itemCard = document.createElement('div');
    itemCard.className = 'bg-stone-950 p-2.5 rounded-xl border border-stone-800 relative group flex flex-col justify-between';
    itemCard.innerHTML = `
      <div class="aspect-square rounded-lg overflow-hidden mb-2 bg-stone-900 border border-stone-800">
        <img src="${item.url}" alt="Galeri" class="w-full h-full object-cover" />
      </div>
      <p class="text-[11px] text-stone-300 truncate">${item.caption || 'Foto ' + (index + 1)}</p>
      <div class="flex items-center gap-2 mt-2">
        <label class="text-[10px] bg-stone-800 hover:bg-stone-700 px-2 py-1 rounded text-stone-200 cursor-pointer">
          Ganti File
          <input type="file" accept="image/*" class="hidden file-replace-gal" data-index="${index}" />
        </label>
        <button type="button" class="text-[10px] bg-rose-900/60 hover:bg-rose-800 px-2 py-1 rounded text-rose-200 cursor-pointer btn-del-gal" data-index="${index}">
          Hapus
        </button>
      </div>
    `;
    cont.appendChild(itemCard);
  });

  // Rebind replace and delete handlers
  cont.querySelectorAll('.file-replace-gal').forEach(inp => {
    inp.addEventListener('change', (e) => {
      const idx = parseInt(inp.getAttribute('data-index'));
      const file = e.target.files?.[0];
      if (file) {
        readFileAsDataUrl(file, (dataUrl) => {
          weddingConfig.gallery[idx].url = dataUrl;
          saveConfig(weddingConfig);
          renderAdminGalleryList();
        });
      }
    });
  });

  cont.querySelectorAll('.btn-del-gal').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      if (confirm('Hapus foto ini dari galeri?')) {
        weddingConfig.gallery.splice(idx, 1);
        saveConfig(weddingConfig);
        renderAdminGalleryList();
      }
    });
  });
}

// Admin Wishes Moderation List (FITUR HAPUS KOMENAN)
function renderAdminWishes() {
  const cont = document.getElementById('adminWishesList');
  if (!cont) return;
  cont.innerHTML = '';

  if (weddingWishes.length === 0) {
    cont.innerHTML = '<div class="p-4 text-center text-xs text-stone-500">Belum ada komentar ucapan tamu.</div>';
    return;
  }

  weddingWishes.forEach((w, index) => {
    const item = document.createElement('div');
    item.className = 'p-3 bg-stone-950 border border-stone-800 rounded-xl flex items-start justify-between gap-3';
    item.innerHTML = `
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <strong class="text-xs text-amber-200">${escapeHtml(w.guestName)}</strong>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">${w.rsvp}</span>
          <span class="text-[10px] text-stone-500">${w.timestamp}</span>
        </div>
        <p class="text-xs text-stone-300 mt-1">${escapeHtml(w.message)}</p>
        ${w.photoUrl ? `<div class="mt-2"><img src="${w.photoUrl}" class="w-12 h-12 object-cover rounded border border-stone-700" /></div>` : ''}
      </div>
      <button type="button" class="px-2.5 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 border border-rose-500/30 text-rose-200 text-xs transition cursor-pointer btn-delete-wish" data-id="${w.id}">
        🗑️ Hapus
      </button>
    `;
    cont.appendChild(item);
  });

  // Bind delete wish handlers
  cont.querySelectorAll('.btn-delete-wish').forEach(btn => {
    btn.addEventListener('click', () => {
      const wishId = btn.getAttribute('data-id');
      if (confirm('Hapus komentar ucapan ini dari buku tamu?')) {
        const filtered = weddingWishes.filter(item => item.id !== wishId);
        saveWishes(filtered);
      }
    });
  });
}
