/**
 * The Wedding of Arina & Bagas - Pure Vanilla JS Engine
 * Commercial Grade, No-Build GitHub Pages Ready
 * Developed by DexxDigital
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
    date: 'Rabu, 30 Desember 2028',
    time: '08:00 - 10:00 WIB',
    venue: 'Masjid Raya Al-Mashun',
    address: 'Jl. Sisingamangaraja No.74c, Mesjid, Kec. Medan Kota, Kota Medan, Sumatera Utara 20212',
    mapsUrl: 'https://maps.app.goo.gl/Cj57PxxYoUhdntUW7',
  },
  resepsi: {
    title: 'Resepsi Pernikahan',
    date: 'Kamis, 31 Desember 2029',
    time: '11:00 - 14:00 WIB',
    venue: 'Masjid Raya Al-Mashun',
    address: 'Jl. Sisingamangaraja No.74c, Mesjid, Kec. Medan Kota, Kota Medan, Sumatera Utara 20212',
    mapsUrl: 'https://maps.app.goo.gl/V64bA13rpYZs6AAw6',
  },
  countdownDate: '2028-12-30T08:00:00',
  gallery: [
    { id: '1', url: 'assets/images/wedding_couple_hero_1793976526912.jpg', caption: 'Timeless Portrait in Ivory' },
    { id: '2', url: 'assets/images/prewedding_landscape_1793976527564.jpg', caption: 'Sunrise Walk in Misty Pine' },
    { id: '3', url: 'assets/images/bride_portrait_1793976527158.jpg', caption: 'Radiant Bride Elegance' },
    { id: '4', url: 'assets/images/groom_portrait_1793976527573.jpg', caption: 'Classic Bespoke Groom' }
  ],
  digitalEnvelope: {
    bankEnabled: true,
    bankName: 'Bank Central Asia (BCA)',
    bankNumber: '123-456-7890',
    bankAccountName: 'Bagas Sadewa',
    danaEnabled: true,
    danaNumber: '0812-3456-7890',
    danaAccountName: 'Bagas Sadewa & Arina',
    qrisEnabled: true,
    qrisImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DANA-ARINA-BAGAS-WEDDING',
  },
  musicEnabled: true,
  musicTitle: 'Romantic Wedding Piano',
  musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112191.mp3',
  musicAudioChunkId: '',
  musicAudioMime: '',
  defaultGuestName: 'Tamu Undangan',
  guestInviteTemplate: '',
  guestList: [],
  developerContact: {
    agencyName: 'DexxDigital',
    tagline: 'Jasa Pembuatan Website Undangan Pernikahan Digital Elegan & Interaktif',
    whatsapp: '6281234567890',
    instagram: 'dexxdigital',
    tiktok: 'dexxdigital',
    shopee: '',
  }
};

const INITIAL_WISHES = [
  {
    id: 'w1',
    guestName: 'Melissa & Pratama',
    message: 'Selamat berbahagia Arina & Bagas! Semoga cinta kalian selalu mekar abadi, rukun dan berkah hingga kakek nenek.',
    createdAt: Date.now() - 18 * 60 * 1000,
    timestamp: '18 menit yang lalu',
    rsvp: 'Hadir',
    photoUrl: 'assets/images/bride_portrait_1793976527158.jpg'
  },
  {
    id: 'w2',
    guestName: 'Citra Kusuma & Keluarga',
    message: 'Baarakallahu laka wa baaraka alaika wa jamaa bainakuma fii khoir. Doa terbaik untuk kedua mempelai!',
    createdAt: Date.now() - 2 * 60 * 60 * 1000,
    timestamp: '2 jam yang lalu',
    rsvp: 'Hadir'
  },
  {
    id: 'w3',
    guestName: 'Arya Sukma (Sahabat Kampus)',
    message: 'Alhamdulillah akhirnya hari bahagia tiba! Lancar sampai hari-H sobatku Bagas & Arina!',
    createdAt: Date.now() - 26 * 60 * 60 * 1000,
    timestamp: 'Kemarin',
    rsvp: 'Hadir'
  },
  {
    id: 'w4',
    guestName: 'Cecilia & Suami',
    message: 'Happy wedding day! Maaf kami belum bisa hadir langsung, namun doa tulus kami selalu menyertai kalian berdua.',
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    timestamp: '3 hari yang lalu',
    rsvp: 'Tidak Hadir'
  }
];

const ACTIVE_FIREBASE_PROJECT_ID = 'wedding-d0f83';
const FIREBASE_PROJECT_STORAGE_KEY = 'dexxdigital_firebase_project';

// Reset cached config & wishes when switching to the fresh wedding-d0f83 project
try {
  if (localStorage.getItem(FIREBASE_PROJECT_STORAGE_KEY) !== ACTIVE_FIREBASE_PROJECT_ID) {
    localStorage.removeItem('dexxdigital_wedding_config');
    localStorage.removeItem('dexxdigital_wedding_wishes');
    localStorage.setItem(FIREBASE_PROJECT_STORAGE_KEY, ACTIVE_FIREBASE_PROJECT_ID);
  }
} catch (e) {}

// Modular Firebase State & Helpers (provided by assets/js/firebase.js via npm firebase)
let isFirebaseConnected = false;
let isFirebaseSyncBound = false;
let isInitialSeedingFirebase = false;
let isSavingConfigToCloud = false;
let isUploadingMusicFile = false;
let pendingLocalSaveUntil = 0;
let unsubscribeFirebaseConfig = null;
let unsubscribeFirebaseWishes = null;
const audioBlobUrlCache = new Map();
const audioChunkLoadingPromises = new Map();

function getFirebaseBridge() {
  return (typeof window !== 'undefined' && window.DEXX_FIREBASE && window.DEXX_FIREBASE.db)
    ? window.DEXX_FIREBASE
    : null;
}

function sanitizeForFirestore(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// App State
let weddingConfig = loadConfig();
let weddingWishes = loadWishes();
let isMusicPlaying = false;
let currentRsvpChoice = 'Hadir';
let currentGuestPhotoData = null;
let adminClickCounter = 0;

function updateFirebaseUIStatus(active, msg) {
  isFirebaseConnected = active;
  const dot = document.getElementById('firebaseStatusDot');
  const txt = document.getElementById('firebaseStatusText');
  const box = document.getElementById('firebaseNoticeBox');

  if (dot) {
    dot.className = active ? 'w-3 h-3 rounded-full bg-emerald-500 animate-pulse' : 'w-3 h-3 rounded-full bg-amber-500';
  }
  if (txt) {
    txt.className = active ? 'text-xs font-bold text-emerald-400 uppercase tracking-wider' : 'text-xs font-bold text-amber-400 uppercase tracking-wider';
    txt.innerText = active ? 'Firebase Firestore Aktif & Terhubung' : 'Firebase Menunggu Aktivasi / Rules';
  }
  if (box && msg) {
    box.className = active
      ? 'p-3 rounded-xl text-xs bg-emerald-950/80 border border-emerald-500/40 text-emerald-200'
      : 'p-3 rounded-xl text-xs bg-amber-950/80 border border-amber-500/40 text-amber-200';
    box.innerText = msg;
    box.classList.remove('hidden');
  }
}

function withPromiseTimeout(promise, ms, timeoutMessage) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(timeoutMessage || 'Waktu koneksi Firestore habis')), ms);
    })
  ]);
}

async function diagnoseFirestoreEndpoint() {
  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${ACTIVE_FIREBASE_PROJECT_ID}/databases/(default)/documents/wedding_data/config`
    );
    if (res.ok || res.status === 404) {
      return { ok: true };
    }
    const body = await res.json().catch(() => ({}));
    const rawMsg = body?.error?.message || '';
    const reason = body?.error?.details?.[0]?.reason || '';
    if (reason === 'SERVICE_DISABLED' || rawMsg.includes('Cloud Firestore API has not been used')) {
      return {
        ok: false,
        code: 'service-disabled',
        message: `Firestore Database belum diaktifkan di project "${ACTIVE_FIREBASE_PROJECT_ID}". Buka Firebase Console -> Build -> Firestore Database -> Create Database terlebih dahulu.`
      };
    }
    if (res.status === 403 || body?.error?.status === 'PERMISSION_DENIED') {
      return {
        ok: false,
        code: 'permission-denied',
        message: `Aturan Firestore Rules project "${ACTIVE_FIREBASE_PROJECT_ID}" masih tertutup. Buka tab Rules di Firebase Console dan atur: allow read, write: if true;`
      };
    }
    return {
      ok: false,
      code: 'firestore-error',
      message: rawMsg || `Firestore merespons status ${res.status}`
    };
  } catch (e) {
    return { ok: false, code: 'network-error', message: 'Tidak dapat menjangkau server Firestore. Periksa koneksi internet.' };
  }
}

function mergeWithDefaults(data) {
  const base = (typeof window !== 'undefined' && window.WEDDING_CONFIG && typeof window.WEDDING_CONFIG === 'object')
    ? window.WEDDING_CONFIG
    : DEFAULT_CONFIG;

  return {
    ...base,
    ...data,
    defaultGuestName: (data?.defaultGuestName !== undefined ? String(data.defaultGuestName).trim() : String(base.defaultGuestName || '').trim()) || 'Tamu Undangan',
    guestInviteTemplate: data?.guestInviteTemplate !== undefined ? String(data.guestInviteTemplate) : String(base.guestInviteTemplate || ''),
    guestList: Array.isArray(data?.guestList) ? data.guestList : (Array.isArray(base.guestList) ? base.guestList : []),
    bride: { ...base.bride, ...(data?.bride || {}) },
    groom: { ...base.groom, ...(data?.groom || {}) },
    akad: { ...base.akad, ...(data?.akad || {}) },
    resepsi: { ...base.resepsi, ...(data?.resepsi || {}) },
    digitalEnvelope: { ...base.digitalEnvelope, ...(data?.digitalEnvelope || {}) },
    developerContact: { ...base.developerContact, ...(data?.developerContact || {}) }
  };
}

function loadConfig() {
  const saved = localStorage.getItem('dexxdigital_wedding_config');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return mergeWithDefaults(parsed);
    } catch (e) {}
  }
  if (typeof window !== 'undefined' && window.WEDDING_CONFIG && typeof window.WEDDING_CONFIG === 'object') {
    return mergeWithDefaults(window.WEDDING_CONFIG);
  }
  return DEFAULT_CONFIG;
}

async function saveConfig(cfg) {
  const prevTs = Number(weddingConfig?._localUpdatedAt || 0);
  cfg._localUpdatedAt = Math.max(Date.now(), prevTs + 1);
  pendingLocalSaveUntil = Date.now() + 6000;
  weddingConfig = cfg;
  localStorage.setItem('dexxdigital_wedding_config', JSON.stringify(cfg));
  renderAll();

  // 1. Multi-device sync via backend server FIRST
  const serverPromise = fetch('/api/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cfg)
  }).catch((e) => {
    console.log('[DexxDigital] Local/static fallback: config saved locally', e?.message || '');
  });

  // 2. Multi-device cloud sync via Modular Firebase Firestore (wedding-d0f83) in parallel
  const fb = getFirebaseBridge();
  const firestorePromise = (async () => {
    if (!fb) return;
    isSavingConfigToCloud = true;
    try {
      await withPromiseTimeout(
        fb.setDoc(fb.doc(fb.db, 'wedding_data', 'config'), sanitizeForFirestore(cfg)),
        10000,
        'Waktu koneksi Firestore habis'
      );
      updateFirebaseUIStatus(true, 'Data berhasil disimpan & langsung sinkron ke seluruh perangkat via Firestore (wedding-d0f83)!');
    } catch (e) {
      console.warn('[DexxDigital] Firestore save notice:', e);
      if (e.code === 'permission-denied') {
        updateFirebaseUIStatus(false, 'Aturan Firestore diblokir. Harap buka aturan Rules di Firebase Console (wedding-d0f83): allow read, write: if true;');
      } else {
        const diag = await diagnoseFirestoreEndpoint();
        updateFirebaseUIStatus(false, !diag.ok ? diag.message : ('Gagal menyimpan ke Firestore: ' + (e.message || 'Error')));
      }
    } finally {
      isSavingConfigToCloud = false;
    }
  })();

  await Promise.allSettled([serverPromise, firestorePromise]);
}

async function seedDefaultWishesToFirestore(fb) {
  try {
    const wishesCol = fb.collection(fb.db, 'wedding_wishes');
    const existingSnap = await fb.getDocs(wishesCol);
    if (!existingSnap.empty) return;

    const batch = fb.writeBatch(fb.db);
    INITIAL_WISHES.forEach((w) => {
      const ref = fb.doc(fb.db, 'wedding_wishes', String(w.id));
      batch.set(ref, {
        guestName: w.guestName,
        message: w.message,
        rsvp: w.rsvp || 'Hadir',
        photoUrl: w.photoUrl || null,
        createdAtMs: w.createdAt || Date.now(),
        createdAt: new Date(w.createdAt || Date.now())
      });
    });
    await batch.commit();
  } catch (err) {
    console.warn('[DexxDigital] Seed wishes notice:', err);
  }
}

async function initFirebaseSync() {
  const fb = getFirebaseBridge();
  if (!fb) {
    if (!window._dexxFirebaseListenerAttached) {
      window._dexxFirebaseListenerAttached = true;
      window.addEventListener('dexx-firebase-ready', () => {
        initFirebaseSync();
      }, { once: true });
    }
    return;
  }

  if (isFirebaseSyncBound) return;
  isFirebaseSyncBound = true;

  const { db, doc, collection, setDoc, onSnapshot, query, orderBy } = fb;

  // Fast background check so admin UI reflects Firestore activation / Rules state immediately
  diagnoseFirestoreEndpoint().then((diag) => {
    if (!diag.ok && !isFirebaseConnected) {
      updateFirebaseUIStatus(false, diag.message);
    }
  });

  // 1. Real-time listener for Wedding Configuration
  try {
    const configDocRef = doc(db, 'wedding_data', 'config');
    unsubscribeFirebaseConfig = onSnapshot(configDocRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const cloudData = docSnapshot.data();
        if (cloudData && typeof cloudData === 'object') {
          if (isSavingConfigToCloud || Date.now() < pendingLocalSaveUntil) {
            return;
          }
          weddingConfig = mergeWithDefaults(cloudData);
          localStorage.setItem('dexxdigital_wedding_config', JSON.stringify(weddingConfig));
          renderAll();
          populateAdminFields(true);
          updateFirebaseUIStatus(true, 'Sinkronisasi Real-Time Aktif (wedding-d0f83)');
        }
      } else {
        // First run auto-seed clean initial config & wishes to Firestore (wedding-d0f83)
        try {
          isInitialSeedingFirebase = true;
          await setDoc(configDocRef, sanitizeForFirestore(weddingConfig));
          await seedDefaultWishesToFirestore(fb);
          updateFirebaseUIStatus(true, 'Data awal & foto setelan awal berhasil disinkronkan ke Firestore (wedding-d0f83).');
        } catch (seedErr) {
          console.warn('[DexxDigital] Auto-seed Firestore notice:', seedErr);
          if (seedErr?.code === 'permission-denied') {
            updateFirebaseUIStatus(false, 'Aturan Firestore ditolak. Buka Firebase Console (wedding-d0f83) -> Rules dan atur: allow read, write: if true;');
          }
        } finally {
          isInitialSeedingFirebase = false;
        }
      }
    }, (error) => {
      console.warn('[DexxDigital] Firestore config listener:', error.message);
      if (error.code === 'permission-denied') {
        updateFirebaseUIStatus(false, 'Aturan Firestore ditolak. Buka Firebase Console (wedding-d0f83) -> Rules dan atur: allow read, write: if true;');
      } else {
        diagnoseFirestoreEndpoint().then((diag) => {
          if (!diag.ok) updateFirebaseUIStatus(false, diag.message);
        });
      }
    });
  } catch (err) {
    console.warn('[DexxDigital] Firestore config listener setup error:', err);
  }

  // 2. Real-time listener for Guestbook Wishes & Photos
  try {
    const wishesQuery = query(collection(db, 'wedding_wishes'), orderBy('createdAt', 'desc'));
    unsubscribeFirebaseWishes = onSnapshot(wishesQuery, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const cloudWishes = [];
        querySnapshot.forEach((docSnap) => {
          const d = docSnap.data();
          const resolvedMs = parseTimestampMs(d.createdAt, null) || parseTimestampMs(d.createdAtMs, docSnap.id);
          cloudWishes.push({
            id: docSnap.id,
            guestName: d.guestName || 'Tamu',
            message: d.message || '',
            createdAt: resolvedMs || Date.now(),
            timestamp: d.timestamp || '',
            rsvp: d.rsvp || 'Hadir',
            photoUrl: d.photoUrl || undefined
          });
        });
        weddingWishes = cloudWishes;
        localStorage.setItem('dexxdigital_wedding_wishes', JSON.stringify(weddingWishes));
        renderWishes();
        renderAdminWishes();
      } else if (!querySnapshot.metadata?.fromCache && !isInitialSeedingFirebase) {
        // Reflect empty wishes list across devices when all wishes are cleared
        weddingWishes = [];
        localStorage.setItem('dexxdigital_wedding_wishes', JSON.stringify(weddingWishes));
        renderWishes();
        renderAdminWishes();
      }
    }, (error) => {
      console.warn('[DexxDigital] Firestore wishes listener:', error.message);
    });
  } catch (err) {
    console.warn('[DexxDigital] Firestore wishes listener setup error:', err);
  }

  // 3. Real-time sync for Admin Security Password
  try {
    onSnapshot(doc(db, 'wedding_data', 'admin_security'), (docSnap) => {
      if (docSnap.exists()) {
        const sec = docSnap.data();
        if (sec.password) {
          localStorage.setItem('dexxdigital_admin_pass', sec.password);
        }
        if (sec.email) {
          localStorage.setItem('dexxdigital_admin_email', sec.email);
        }
      }
    }, () => {});
  } catch (e) {}
}

async function syncFromServer() {
  // Sync from server API as backup before Firebase cloud connects
  try {
    const res = await fetch('/api/config?t=' + Date.now(), { cache: 'no-store' });
    if (res.ok) {
      const serverCfg = await res.json();
      if (serverCfg && serverCfg.bride && !isFirebaseConnected && !isSavingConfigToCloud && Date.now() >= pendingLocalSaveUntil) {
        const localTs = Number(weddingConfig?._localUpdatedAt || 0);
        const serverTs = Number(serverCfg._localUpdatedAt || 0);
        if (serverTs >= localTs || localTs === 0) {
          weddingConfig = mergeWithDefaults(serverCfg);
          localStorage.setItem('dexxdigital_wedding_config', JSON.stringify(weddingConfig));
          renderAll();
          populateAdminFields(true);
        }
      }
    }
  } catch (e) {}

  try {
    const resWishes = await fetch('/api/wishes?t=' + Date.now(), { cache: 'no-store' });
    if (resWishes.ok) {
      const serverWishes = await resWishes.json();
      if (Array.isArray(serverWishes) && serverWishes.length > 0) {
        weddingWishes = serverWishes;
        localStorage.setItem('dexxdigital_wedding_wishes', JSON.stringify(weddingWishes));
        renderWishes();
        renderAdminWishes();
      }
    }
  } catch (e) {}
}

function loadWishes() {
  const saved = localStorage.getItem('dexxdigital_wedding_wishes');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { return INITIAL_WISHES; }
  }
  return INITIAL_WISHES;
}

function saveWishes(wishes) {
  weddingWishes = wishes;
  localStorage.setItem('dexxdigital_wedding_wishes', JSON.stringify(wishes));
  renderWishes();
  renderAdminWishes();
}

// Guest Name Parser (URL ?to= or Admin Default Guest Name)
function resolveGuestDisplayInfo() {
  const defaultName = weddingConfig?.defaultGuestName || 'Tamu Undangan';
  if (typeof window !== 'undefined' && window.DEXX_HELPERS?.resolveGuestDisplayName) {
    return window.DEXX_HELPERS.resolveGuestDisplayName(window.location.search, defaultName);
  }
  const params = new URLSearchParams(window.location.search);
  const to = params.get('to') || params.get('tamu') || params.get('guest');
  if (to && to.trim()) {
    return { name: to.trim(), isCustomUrlGuest: true };
  }
  return { name: String(defaultName).trim() || 'Tamu Undangan', isCustomUrlGuest: false };
}

function parseGuestName() {
  return resolveGuestDisplayInfo().name;
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

// Indonesian & English Months Dictionary for Bulletproof Date Parsing
const MONTH_MAP = {
  januari: 0, jan: 0, january: 0,
  februari: 1, feb: 1, february: 1,
  maret: 2, mar: 2, march: 2,
  april: 3, apr: 3,
  mei: 4, may: 4,
  juni: 5, jun: 5, june: 5,
  juli: 6, jul: 6, july: 6,
  agustus: 7, ags: 7, agu: 7, aug: 7, august: 7,
  september: 8, sep: 8,
  oktober: 9, okt: 9, oct: 9, october: 9,
  november: 10, nov: 10,
  desember: 11, des: 11, dec: 11, december: 11
};

function parseCountdownDate(dateStr, timeStr) {
  const now = Date.now();

  function ensureFuture(ts) {
    if (!ts || isNaN(ts)) return null;
    let t = ts;
    // If target timestamp is in the past, advance by years so countdown never stays at 00
    while (t <= now) {
      const d = new Date(t);
      d.setFullYear(d.getFullYear() + 1);
      t = d.getTime();
    }
    return t;
  }

  // Fallback to Akad date if countdownDate is missing
  let sourceStr = (dateStr && String(dateStr).trim()) || weddingConfig?.akad?.date || '2028-12-30T08:00:00';

  // 1. Try ISO / Standard Date parsing
  if (sourceStr.includes('T') || sourceStr.match(/^\d{4}-\d{2}-\d{2}/)) {
    const directDate = new Date(sourceStr);
    if (!isNaN(directDate.getTime())) {
      const futureTs = ensureFuture(directDate.getTime());
      if (futureTs) return futureTs;
    }
  }

  // 2. Text Parser (e.g. "Rabu, 30 Desember 2028" or "30 Desember 2028" or "30/12/2028")
  try {
    const cleaned = String(sourceStr).toLowerCase();
    let month = null;

    // Check for month names / abbreviations
    for (const [mName, mIdx] of Object.entries(MONTH_MAP)) {
      const regex = new RegExp(`\\b${mName}\\b`);
      if (regex.test(cleaned)) {
        month = mIdx;
        break;
      }
    }

    // Year match (2025 - 2035)
    let year = null;
    const yearMatch = cleaned.match(/\b(202\d|203\d)\b/);
    if (yearMatch) {
      year = parseInt(yearMatch[1], 10);
    } else {
      year = new Date().getFullYear() + 2;
    }

    // Day match (1 - 31)
    let day = null;
    const tokens = cleaned.replace(/[^a-z0-9]/g, ' ').split(/\s+/);
    for (const token of tokens) {
      const num = parseInt(token, 10);
      if (!isNaN(num) && num >= 1 && num <= 31 && num !== year) {
        day = num;
        break;
      }
    }
    if (!day) day = 30;
    if (month === null) month = 11; // Default to Desember

    // Hour & Minute match
    let hour = 8, minute = 0;
    const combinedTime = String(timeStr || sourceStr || weddingConfig?.akad?.time || '');
    const timeMatch = combinedTime.match(/(\d{1,2})[:.](\d{2})/);
    if (timeMatch) {
      hour = parseInt(timeMatch[1], 10);
      minute = parseInt(timeMatch[2], 10);
    }

    const constructedDate = new Date(year, month, day, hour, minute, 0);
    if (!isNaN(constructedDate.getTime())) {
      return ensureFuture(constructedDate.getTime());
    }
  } catch (e) {}

  // Safe fallback to guaranteed future date
  const fallback = new Date();
  fallback.setFullYear(fallback.getFullYear() + 2);
  fallback.setMonth(11, 30);
  fallback.setHours(8, 0, 0, 0);
  return fallback.getTime();
}

// Countdown Clock Timer (Live Ticking Every Second)
function updateCountdown() {
  try {
    const targetTime = parseCountdownDate(weddingConfig?.countdownDate, weddingConfig?.akad?.time);
    const now = Date.now();
    let diff = targetTime - now;

    // If diff is <= 0 for any reason, advance 1 day so it continues counting
    if (diff <= 0) {
      diff = 24 * 3600 * 1000;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById('countDays') || document.getElementById('cdDays');
    const hEl = document.getElementById('countHours') || document.getElementById('cdHours');
    const mEl = document.getElementById('countMinutes') || document.getElementById('cdMinutes');
    const sEl = document.getElementById('countSeconds') || document.getElementById('cdSeconds');

    const dText = String(days).padStart(2, '0');
    const hText = String(hours).padStart(2, '0');
    const mText = String(mins).padStart(2, '0');
    const sText = String(secs).padStart(2, '0');

    if (dEl) dEl.textContent = dText;
    if (hEl) hEl.textContent = hText;
    if (mEl) mEl.textContent = mText;
    if (sEl) sEl.textContent = sText;

    const preview = document.getElementById('previewCountdownText');
    if (preview) {
      preview.innerText = `${days} hari ${hours} jam ${mins} mnt ${secs} dtk lagi`;
    }
  } catch (err) {
    console.warn('[DexxDigital] updateCountdown notice:', err);
  }
}

// Audio URL Normalizer & Validator (delegated to pure DEXX_HELPERS with inline fallback)
function normalizeAudioUrl(rawUrl) {
  if (typeof window !== 'undefined' && window.DEXX_HELPERS?.normalizeAudioUrl) {
    return window.DEXX_HELPERS.normalizeAudioUrl(rawUrl);
  }
  return String(rawUrl || '').trim();
}

function validateAudioUrl(rawUrl) {
  if (typeof window !== 'undefined' && window.DEXX_HELPERS?.validateAudioUrl) {
    return window.DEXX_HELPERS.validateAudioUrl(rawUrl);
  }
  return { ok: true, normalized: normalizeAudioUrl(rawUrl), reason: '' };
}

function base64ToBlobUrl(base64, mime) {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: mime || 'audio/mpeg' });
  return URL.createObjectURL(blob);
}

async function saveAudioToFirestoreChunks(fb, trackId, fileName, dataUrl) {
  if (!fb || !window.DEXX_HELPERS?.splitDataUrlIntoChunks) return false;
  const { mime, base64Length, totalChunks, chunks } = window.DEXX_HELPERS.splitDataUrlIntoChunks(dataUrl, 350000);
  if (totalChunks === 0) return false;

  const metaRef = fb.doc(fb.db, 'wedding_audio', `${trackId}_meta`);
  await withPromiseTimeout(
    fb.setDoc(metaRef, {
      trackId,
      fileName: String(fileName || 'lagu'),
      mime,
      base64Length,
      totalChunks,
      updatedAt: Date.now()
    }),
    10000,
    'Gagal menyimpan metadata audio ke Firestore'
  );

  const batchSize = 7;
  for (let start = 0; start < chunks.length; start += batchSize) {
    const batch = fb.writeBatch(fb.db);
    const end = Math.min(start + batchSize, chunks.length);
    for (let idx = start; idx < end; idx++) {
      const chunkRef = fb.doc(fb.db, 'wedding_audio', `${trackId}_chunk_${idx}`);
      batch.set(chunkRef, {
        trackId,
        index: idx,
        data: chunks[idx]
      });
    }
    await withPromiseTimeout(batch.commit(), 15000, 'Timeout mengunggah potongan lagu ke Firestore');
  }
  return { trackId, mime, totalChunks };
}

async function loadAudioBlobUrlFromFirestore(trackId) {
  if (!trackId) return null;
  if (audioBlobUrlCache.has(trackId)) {
    return audioBlobUrlCache.get(trackId);
  }
  if (audioChunkLoadingPromises.has(trackId)) {
    return audioChunkLoadingPromises.get(trackId);
  }

  const promise = (async () => {
    let fb = getFirebaseBridge();
    if (!fb) {
      await new Promise((resolve) => {
        const timer = setTimeout(resolve, 4000);
        window.addEventListener('dexx-firebase-ready', () => {
          clearTimeout(timer);
          resolve();
        }, { once: true });
      });
      fb = getFirebaseBridge();
    }
    if (!fb) return null;

    const metaSnap = await withPromiseTimeout(
      fb.getDoc(fb.doc(fb.db, 'wedding_audio', `${trackId}_meta`)),
      8000,
      'Timeout mengambil metadata audio Firestore'
    );
    if (!metaSnap.exists()) return null;
    const meta = metaSnap.data();
    const total = Number(meta?.totalChunks || 0);
    if (!total) return null;

    const chunkPromises = [];
    for (let i = 0; i < total; i++) {
      chunkPromises.push(fb.getDoc(fb.doc(fb.db, 'wedding_audio', `${trackId}_chunk_${i}`)));
    }
    const snaps = await withPromiseTimeout(Promise.all(chunkPromises), 15000, 'Timeout memuat audio Firestore');
    const chunkDocs = snaps.map((s) => (s.exists() ? s.data() : null)).filter(Boolean);
    const parts = window.DEXX_HELPERS?.reassembleChunksToDataParts(meta, chunkDocs);
    if (!parts || !parts.base64) return null;

    const blobUrl = base64ToBlobUrl(parts.base64, parts.mime);
    audioBlobUrlCache.set(trackId, blobUrl);
    return blobUrl;
  })().catch((err) => {
    console.warn('[DexxDigital] Firestore audio chunk load notice:', err?.message || err);
    return null;
  }).finally(() => {
    audioChunkLoadingPromises.delete(trackId);
  });

  audioChunkLoadingPromises.set(trackId, promise);
  return promise;
}

function setAudioToggleVisual(isPlaying) {
  const btn = document.getElementById('btnMusicToggle');
  const iconPlay = document.getElementById('iconMusicPlay');
  const iconMute = document.getElementById('iconMusicMute');
  if (iconPlay) iconPlay.classList.toggle('hidden', !isPlaying);
  if (iconMute) iconMute.classList.toggle('hidden', isPlaying);
  if (btn) {
    btn.classList.toggle('bg-amber-600/80', isPlaying);
    btn.classList.toggle('text-white', isPlaying);
    btn.classList.toggle('bg-black/60', !isPlaying);
    btn.classList.toggle('text-stone-300', !isPlaying);
  }
}

async function hydrateAudioElementWithChunkFallback(audioEl, chunkId, expectedKey, autoPlayIfActive) {
  if (!audioEl || !chunkId) return false;
  const blobUrl = await loadAudioBlobUrlFromFirestore(chunkId);
  if (!blobUrl) return false;
  // Ensure user hasn't switched away while chunks downloaded
  const currentExpected = `${normalizeAudioUrl(weddingConfig?.musicUrl || '')}::${weddingConfig?.musicAudioChunkId || ''}`;
  if (expectedKey && currentExpected !== expectedKey && audioEl.id === 'weddingAudio') {
    return false;
  }
  const shouldPlay = autoPlayIfActive && (isMusicPlaying || !audioEl.paused);
  audioEl.pause();
  audioEl.dataset.resolvedSrc = blobUrl;
  audioEl.src = blobUrl;
  audioEl.load();
  if (shouldPlay) {
    audioEl.play().then(() => {
      if (audioEl.id === 'weddingAudio') {
        isMusicPlaying = true;
        setAudioToggleVisual(true);
      }
    }).catch(() => {});
  }
  return true;
}

// Audio Player & Live Source Sync
function syncAudioSource() {
  const audio = document.getElementById('weddingAudio');
  const btn = document.getElementById('btnMusicToggle');
  if (!audio) return;

  const musicUrl = normalizeAudioUrl(weddingConfig?.musicUrl || '');
  const chunkId = String(weddingConfig?.musicAudioChunkId || '').trim();
  const isEnabled = weddingConfig?.musicEnabled !== false && Boolean(musicUrl || chunkId);
  const musicTitle = (weddingConfig?.musicTitle || 'Lagu Pernikahan').trim();

  if (btn) {
    btn.classList.toggle('hidden', !isEnabled);
    btn.setAttribute('title', `Audio Kontrol: ${musicTitle}`);
    btn.setAttribute('aria-label', `Audio Kontrol: ${musicTitle}`);
  }

  if (!isEnabled) {
    if (!audio.paused) audio.pause();
    audio.removeAttribute('src');
    delete audio.dataset.currentMusicUrl;
    delete audio.dataset.currentMusicKey;
    delete audio.dataset.resolvedSrc;
    audio.load();
    isMusicPlaying = false;
    setAudioToggleVisual(false);
    return;
  }

  if (!audio._boundFallbackError) {
    audio._boundFallbackError = true;
    audio.addEventListener('error', () => {
      const activeChunk = String(weddingConfig?.musicAudioChunkId || '').trim();
      if (activeChunk && !String(audio.src || '').startsWith('blob:')) {
        const keyNow = audio.dataset.currentMusicKey || '';
        hydrateAudioElementWithChunkFallback(audio, activeChunk, keyNow, isMusicPlaying);
      }
    });
  }

  const targetKey = `${musicUrl}::${chunkId}`;
  if (audio.dataset.currentMusicKey !== targetKey) {
    const wasPlaying = isMusicPlaying || !audio.paused;
    audio.pause();
    audio.currentTime = 0;
    audio.removeAttribute('src');
    audio.load();
    audio.dataset.currentMusicUrl = musicUrl;
    audio.dataset.currentMusicKey = targetKey;

    if ((musicUrl.startsWith('firestore-audio://') || !musicUrl) && chunkId) {
      const cachedBlob = audioBlobUrlCache.get(chunkId);
      if (cachedBlob) {
        audio.dataset.resolvedSrc = cachedBlob;
        audio.src = cachedBlob;
        audio.load();
      } else {
        hydrateAudioElementWithChunkFallback(audio, chunkId, targetKey, wasPlaying);
        return;
      }
    } else {
      audio.dataset.resolvedSrc = musicUrl;
      audio.src = musicUrl;
      audio.load();
    }

    if (wasPlaying) {
      audio.play().then(() => {
        isMusicPlaying = true;
        setAudioToggleVisual(true);
      }).catch(() => {
        isMusicPlaying = false;
        setAudioToggleVisual(false);
      });
    }
  }
}

function setupAudio() {
  const audio = document.getElementById('weddingAudio');
  const preview = document.getElementById('adminMusicPreview');
  const btn = document.getElementById('btnMusicToggle');

  if (!audio || !btn) return;
  syncAudioSource();

  // Pause main invitation audio whenever admin preview is played
  if (preview && !preview._boundAudioExclusive) {
    preview._boundAudioExclusive = true;
    preview.addEventListener('play', () => {
      if (!audio.paused) {
        audio.pause();
        isMusicPlaying = false;
        setAudioToggleVisual(false);
      }
    });
    preview.addEventListener('error', () => {
      const activeChunk = String(weddingConfig?.musicAudioChunkId || '').trim();
      if (activeChunk && !String(preview.src || '').startsWith('blob:')) {
        hydrateAudioElementWithChunkFallback(preview, activeChunk, '', false);
      }
    });
  }

  btn.addEventListener('click', () => {
    const musicUrl = normalizeAudioUrl(weddingConfig?.musicUrl || '');
    const chunkId = String(weddingConfig?.musicAudioChunkId || '').trim();
    if (weddingConfig?.musicEnabled === false || (!musicUrl && !chunkId)) return;
    syncAudioSource();

    if (isMusicPlaying) {
      audio.pause();
      isMusicPlaying = false;
      setAudioToggleVisual(false);
    } else {
      if (preview && !preview.paused) preview.pause();
      audio.play().then(() => {
        isMusicPlaying = true;
        setAudioToggleVisual(true);
      }).catch(() => {
        if (chunkId) {
          hydrateAudioElementWithChunkFallback(audio, chunkId, audio.dataset.currentMusicKey || '', true);
        }
        isMusicPlaying = false;
        setAudioToggleVisual(false);
      });
    }
  });
}

function startMusicOnOpen() {
  const audio = document.getElementById('weddingAudio');
  const preview = document.getElementById('adminMusicPreview');
  const musicUrl = normalizeAudioUrl(weddingConfig?.musicUrl || '');
  const chunkId = String(weddingConfig?.musicAudioChunkId || '').trim();

  if (audio && weddingConfig?.musicEnabled !== false && (musicUrl || chunkId)) {
    if (preview && !preview.paused) preview.pause();
    syncAudioSource();
    audio.play().then(() => {
      isMusicPlaying = true;
      setAudioToggleVisual(true);
    }).catch(() => {
      if (chunkId) {
        hydrateAudioElementWithChunkFallback(audio, chunkId, audio.dataset.currentMusicKey || '', true);
      }
    });
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
          <span class="text-[10px] text-stone-300 flex items-center gap-1 mt-0.5">Klik untuk memperbesar</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openLightbox(item.url, item.caption));
    grid.appendChild(card);
  });
}

const INDONESIAN_MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

function parseTimestampMs(rawCreatedAt, fallbackId) {
  if (typeof rawCreatedAt === 'number' && !isNaN(rawCreatedAt) && rawCreatedAt > 0) {
    return rawCreatedAt;
  }
  if (rawCreatedAt && typeof rawCreatedAt === 'object') {
    if (typeof rawCreatedAt.toMillis === 'function') {
      return rawCreatedAt.toMillis();
    }
    if (typeof rawCreatedAt.seconds === 'number') {
      return rawCreatedAt.seconds * 1000 + Math.floor((rawCreatedAt.nanoseconds || 0) / 1e6);
    }
    if (typeof rawCreatedAt._seconds === 'number') {
      return rawCreatedAt._seconds * 1000;
    }
  }
  if (typeof rawCreatedAt === 'string' && rawCreatedAt.trim()) {
    const asNum = Number(rawCreatedAt);
    if (!isNaN(asNum) && asNum > 1000000000000) return asNum;
    const parsed = Date.parse(rawCreatedAt);
    if (!isNaN(parsed)) return parsed;
  }
  // Extract epoch ms from wish id like "wish-1763218000000"
  if (typeof fallbackId === 'string') {
    const match = fallbackId.match(/^wish-(\d{12,15})$/);
    if (match) {
      const ts = parseInt(match[1], 10);
      if (!isNaN(ts)) return ts;
    }
  }
  return null;
}

function formatWishTime(wish) {
  if (!wish) return '';
  const tsMs = parseTimestampMs(wish.createdAt || wish.createdAtMs, wish.id);
  if (!tsMs) {
    if (wish.timestamp && wish.timestamp !== 'Baru saja') {
      return wish.timestamp;
    }
    return 'Beberapa waktu lalu';
  }

  const now = Date.now();
  const diffSec = Math.max(0, Math.floor((now - tsMs) / 1000));

  if (diffSec < 60) {
    return 'Baru saja';
  }
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${diffMin} menit yang lalu`;
  }
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) {
    return `${diffHour} jam yang lalu`;
  }

  const d = new Date(tsMs);
  const day = d.getDate();
  const month = INDONESIAN_MONTHS_SHORT[d.getMonth()] || '';
  const year = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay === 1) {
    return `Kemarin · ${hh}:${mm}`;
  }
  if (diffDay < 7) {
    return `${diffDay} hari yang lalu · ${day} ${month} ${year}`;
  }
  return `${day} ${month} ${year}, ${hh}:${mm}`;
}

function formatWishExactDate(wish) {
  const tsMs = parseTimestampMs(wish?.createdAt || wish?.createdAtMs, wish?.id);
  if (!tsMs) return wish?.timestamp || '';
  const d = new Date(tsMs);
  const day = d.getDate();
  const month = INDONESIAN_MONTHS_SHORT[d.getMonth()] || '';
  const year = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${day} ${month} ${year} pukul ${hh}:${mm}`;
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

    const displayTime = formatWishTime(w);
    const exactTime = formatWishExactDate(w);

    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-semibold text-xs border border-amber-400/30">
            ${(w.guestName || 'G').charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 class="text-sm font-semibold text-stone-100">${escapeHtml(w.guestName)}</h4>
            <span class="text-[11px] text-stone-400 block" title="${escapeHtml(exactTime)}">${escapeHtml(displayTime)}</span>
          </div>
        </div>
        <span class="text-[10px] px-2 py-0.5 rounded-full border ${rsvpBadgeColor}">${escapeHtml(w.rsvp || 'Hadir')}</span>
      </div>
      <p class="text-sm text-stone-300 mt-2.5 leading-relaxed font-light">${escapeHtml(w.message)}</p>
      ${w.photoUrl ? `<div class="mt-3"><img src="${w.photoUrl}" alt="Foto Tamu" class="max-h-48 rounded-lg object-cover border border-stone-700 shadow-md cursor-pointer wish-guest-photo" /></div>` : ''}
    `;
    const photoEl = card.querySelector('.wish-guest-photo');
    if (photoEl && w.photoUrl) {
      photoEl.addEventListener('click', () => openLightbox(w.photoUrl, `Foto dari ${w.guestName || 'Tamu'}`));
    }
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

  const resolvedGuest = resolveGuestDisplayInfo();
  const guestEl = document.getElementById('textGuestName');
  if (guestEl) guestEl.innerText = resolvedGuest.name;
  const inputName = document.getElementById('inputGuestName');
  if (inputName && !inputName.value && resolvedGuest.isCustomUrlGuest) {
    inputName.value = resolvedGuest.name;
  }

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
  if (akTime) akTime.innerText = c.akad.time;
  const akVenue = document.getElementById('akadVenue');
  if (akVenue) akVenue.innerText = c.akad.venue;
  const akAddr = document.getElementById('akadAddress');
  if (akAddr) akAddr.innerText = c.akad.address;
  const akMap = document.getElementById('akadMapUrl');
  if (akMap) akMap.href = c.akad.mapsUrl;

  const resDate = document.getElementById('resepsiDate');
  if (resDate) resDate.innerText = c.resepsi.date;
  const resTime = document.getElementById('resepsiTime');
  if (resTime) resTime.innerText = c.resepsi.time;
  const resVenue = document.getElementById('resepsiVenue');
  if (resVenue) resVenue.innerText = c.resepsi.venue;
  const resAddr = document.getElementById('resepsiAddress');
  if (resAddr) resAddr.innerText = c.resepsi.address;
  const resMap = document.getElementById('resepsiMapUrl');
  if (resMap) resMap.href = c.resepsi.mapsUrl;

  // Envelope (Bank, DANA [Opsional] & QRIS [Opsional])
  const env = c.digitalEnvelope || {};
  const bankNumVal = env.bankNumber !== undefined ? String(env.bankNumber).trim() : '123-456-7890';
  const bankNameVal = env.bankName !== undefined ? String(env.bankName).trim() : 'Bank Central Asia (BCA)';
  const bankAccVal = env.bankAccountName !== undefined ? String(env.bankAccountName).trim() : 'Bagas Sadewa';
  const showBank = env.bankEnabled !== false && Boolean(bankNumVal || bankNameVal);

  const danaNumVal = env.danaNumber !== undefined ? String(env.danaNumber).trim() : '0812-3456-7890';
  const danaAccVal = env.danaAccountName !== undefined ? String(env.danaAccountName).trim() : 'Bagas Sadewa & Arina';
  const showDana = env.danaEnabled !== false && Boolean(danaNumVal);

  const qrisUrlVal = env.qrisImageUrl !== undefined
    ? String(env.qrisImageUrl).trim()
    : 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DANA-ARINA-BAGAS-WEDDING';
  const showQris = env.qrisEnabled !== false && Boolean(qrisUrlVal);

  const labelBank = document.getElementById('labelBankName');
  if (labelBank) labelBank.innerText = bankNameVal || 'Transfer Bank';
  const bankNum = document.getElementById('envelopeBankNumber');
  if (bankNum) bankNum.innerText = bankNumVal || '-';
  const bankAcc = document.getElementById('envelopeBankAccountName');
  if (bankAcc) bankAcc.innerText = bankAccVal || '-';

  const danaNum = document.getElementById('envelopeDanaNumber');
  if (danaNum) danaNum.innerText = danaNumVal || '';
  const danaNm = document.getElementById('envelopeDanaName');
  if (danaNm) danaNm.innerText = danaAccVal || '-';
  const qrisPrev = document.getElementById('imgQrisPreview');
  if (qrisPrev && qrisUrlVal) qrisPrev.src = qrisUrlVal;

  const cardBank = document.getElementById('cardBankTransfer');
  const cardDana = document.getElementById('cardDanaTransfer');
  const cardQris = document.getElementById('cardQrisTransfer');
  if (cardBank) cardBank.classList.toggle('hidden', !showBank);
  if (cardDana) cardDana.classList.toggle('hidden', !showDana);
  if (cardQris) cardQris.classList.toggle('hidden', !showQris);

  const activeMethods = [];
  if (showBank) activeMethods.push('Transfer Bank');
  if (showDana) activeMethods.push('DANA');
  if (showQris) activeMethods.push('scan QRIS');

  const giftSection = document.getElementById('gift-section');
  if (giftSection) {
    giftSection.classList.toggle('hidden', activeMethods.length === 0);
  }

  const envGrid = document.getElementById('envelopeCardsGrid');
  if (envGrid) {
    if (activeMethods.length === 1) {
      envGrid.className = 'grid grid-cols-1 max-w-md mx-auto gap-4 text-left';
    } else if (activeMethods.length === 2) {
      envGrid.className = 'grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-4 text-left';
    } else {
      envGrid.className = 'grid grid-cols-1 md:grid-cols-3 gap-4 text-left';
    }
  }

  const giftSubtitle = document.getElementById('giftSectionSubtitle');
  if (giftSubtitle && activeMethods.length > 0) {
    let methodPhrase = activeMethods[0];
    if (activeMethods.length === 2) {
      methodPhrase = `${activeMethods[0]} atau ${activeMethods[1]}`;
    } else if (activeMethods.length === 3) {
      methodPhrase = `${activeMethods[0]}, ${activeMethods[1]} atau ${activeMethods[2]}`;
    }
    giftSubtitle.innerText = `Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih berupa kado digital, dapat melalui ${methodPhrase}.`;
  }

  // Closing & Footer - DexxDigital Branding
  const closeNames = document.getElementById('closingCoupleNames');
  if (closeNames) closeNames.innerText = `${c.bride.nickName} & ${c.groom.nickName}`;
  const copyRight = document.getElementById('footerCopyright');
  if (copyRight) copyRight.innerText = `© 2026 ${c.bride.nickName} & ${c.groom.nickName}`;
  
  const devVis = window.DEXX_HELPERS?.resolveDeveloperSocialVisibility
    ? window.DEXX_HELPERS.resolveDeveloperSocialVisibility(c.developerContact, DEFAULT_CONFIG.developerContact.tagline)
    : (() => {
        const dev = c.developerContact || {};
        const waDigits = String(dev.whatsapp ?? '').trim().replace(/[^0-9]/g, '');
        const igClean = String(dev.instagram ?? '').trim().replace(/^@/, '');
        const ttClean = String(dev.tiktok ?? '').trim().replace(/^@/, '');
        const shopeeRaw = String(dev.shopee ?? '').trim();
        const rawTagline = dev.tagline !== undefined ? String(dev.tagline).trim() : DEFAULT_CONFIG.developerContact.tagline;
        return {
          agencyName: (dev.agencyName || 'DexxDigital').trim() || 'DexxDigital',
          tagline: rawTagline,
          showTagline: rawTagline.length > 0,
          waDigits,
          waHref: waDigits ? `https://wa.me/${waDigits}` : '',
          showWa: waDigits.length > 0,
          igHref: igClean ? `https://instagram.com/${igClean}` : '',
          showIg: igClean.length > 0,
          tiktokHref: ttClean ? `https://tiktok.com/@${ttClean}` : '',
          showTiktok: ttClean.length > 0,
          shopeeHref: shopeeRaw ? (shopeeRaw.startsWith('http') ? shopeeRaw : `https://${shopeeRaw}`) : '',
          showShopee: shopeeRaw.length > 0,
          showSocialRow: Boolean(waDigits || igClean || ttClean || shopeeRaw)
        };
      })();

  const agencyName = document.getElementById('footerAgencyName');
  if (agencyName) agencyName.innerText = devVis.agencyName;
  const agencyTag = document.getElementById('footerAgencyTagline');
  if (agencyTag) {
    agencyTag.innerText = devVis.tagline;
    agencyTag.classList.toggle('hidden', !devVis.showTagline);
  }

  const agencyWa = document.getElementById('footerAgencyWa');
  if (agencyWa) {
    if (devVis.showWa) {
      agencyWa.href = devVis.waHref;
      agencyWa.classList.remove('hidden');
    } else {
      agencyWa.removeAttribute('href');
      agencyWa.classList.add('hidden');
    }
  }

  const agencyIg = document.getElementById('footerAgencyIg');
  if (agencyIg) {
    if (devVis.showIg) {
      agencyIg.href = devVis.igHref;
      agencyIg.classList.remove('hidden');
    } else {
      agencyIg.removeAttribute('href');
      agencyIg.classList.add('hidden');
    }
  }

  const agencyTiktok = document.getElementById('footerAgencyTiktok');
  if (agencyTiktok) {
    if (devVis.showTiktok) {
      agencyTiktok.href = devVis.tiktokHref;
      agencyTiktok.classList.remove('hidden');
    } else {
      agencyTiktok.removeAttribute('href');
      agencyTiktok.classList.add('hidden');
    }
  }

  const agencyShopee = document.getElementById('footerAgencyShopee');
  if (agencyShopee) {
    if (devVis.showShopee) {
      agencyShopee.href = devVis.shopeeHref;
      agencyShopee.classList.remove('hidden');
    } else {
      agencyShopee.removeAttribute('href');
      agencyShopee.classList.add('hidden');
    }
  }

  const devSocialsWrap = document.getElementById('footerDevSocials');
  if (devSocialsWrap) {
    devSocialsWrap.classList.toggle('hidden', !devVis.showSocialRow);
  }

  renderGallery();
  renderWishes();
  updateCountdown();
  syncAudioSource();
}

// Setup Event Handlers & App Lifecycle
let isAppInitialized = false;

function initApp() {
  if (isAppInitialized) return;
  isAppInitialized = true;

  renderAll();
  syncFromServer();
  initParticleCanvas();
  setupAudio();
  updateCountdown();
  if (!window._countdownTimerInterval) {
    window._countdownTimerInterval = setInterval(updateCountdown, 1000);
  }
  if (!window._wishTimeRefreshInterval) {
    window._wishTimeRefreshInterval = setInterval(() => {
      renderWishes();
      renderAdminWishes();
    }, 30000);
  }

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

  // Copy Bank Account Number
  const btnCopyBank = document.getElementById('btnCopyBank');
  const labelCopyBank = document.getElementById('labelCopyBank');
  if (btnCopyBank) {
    btnCopyBank.addEventListener('click', () => {
      const pureNum = (weddingConfig.digitalEnvelope?.bankNumber || '123-456-7890').replace(/[^0-9]/g, '');
      copyToClipboard(pureNum, () => {
        if (labelCopyBank) labelCopyBank.innerText = 'Nomor Rekening Tersalin!';
        setTimeout(() => {
          if (labelCopyBank) labelCopyBank.innerText = 'Salin No. Rekening';
        }, 2000);
      });
    });
  }

  // Copy DANA Number
  const btnCopy = document.getElementById('btnCopyDana');
  const labelCopy = document.getElementById('labelCopyDana');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const pureNumber = (weddingConfig.digitalEnvelope?.danaNumber || '').replace(/[^0-9]/g, '');
      copyToClipboard(pureNumber, () => {
        if (labelCopy) labelCopy.innerText = 'Nomor DANA Tersalin!';
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

      const nowMs = Date.now();
      const newWish = {
        id: 'wish-' + nowMs,
        guestName: gName,
        message: gMsg,
        createdAt: nowMs,
        timestamp: 'Baru saja',
        rsvp: currentRsvpChoice,
        photoUrl: currentGuestPhotoData || undefined
      };

      weddingWishes.unshift(newWish);
      saveWishes(weddingWishes);

      // 1. Save to Modular Firebase Firestore (Real-time sync to all devices)
      const fb = getFirebaseBridge();
      if (fb) {
        try {
          fb.addDoc(fb.collection(fb.db, 'wedding_wishes'), {
            guestName: gName,
            message: gMsg,
            rsvp: currentRsvpChoice,
            photoUrl: currentGuestPhotoData || null,
            createdAtMs: nowMs,
            createdAt: fb.serverTimestamp ? fb.serverTimestamp() : new Date(nowMs)
          }).catch(err => {
            console.warn('[DexxDigital] Firestore wish add error:', err);
          });
        } catch (fsErr) {
          console.warn('[DexxDigital] Firestore wish error:', fsErr);
        }
      }

      // 2. Multi-device sync: push new wish to server
      try {
        fetch('/api/wishes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newWish)
        }).catch(() => {});
      } catch (e) {}

      // Offer WhatsApp forwarding without blocking prompt
      const waText = encodeURIComponent(`Halo ${weddingConfig.bride.nickName} & ${weddingConfig.groom.nickName}!\n\nSaya *${gName}* ingin menyampaikan ucapan doa untuk pernikahan kalian:\n\n"${gMsg}"\n\nKonfirmasi Kehadiran: *${currentRsvpChoice}*\n\nTerima kasih atas undangannya!`);
      const linkWa = document.getElementById('linkSendWishWa');
      if (linkWa) linkWa.href = `https://wa.me/?text=${waText}`;

      const successNotice = document.getElementById('wishSuccessNotice');
      if (successNotice) {
        successNotice.classList.remove('hidden');
        setTimeout(() => successNotice.classList.add('hidden'), 8000);
      }

      msgInput.value = '';
      currentGuestPhotoData = null;
      if (previewCont) previewCont.classList.add('hidden');
    });
  }

  // 1. Secret Trigger: Klik/Tap Copyright Footer langsung membuka Admin Panel Klien (ramah HP), Developer Console khusus via Ctrl+Shift+89
  const footerCopy = document.getElementById('footerCopyright');
  if (footerCopy) {
    footerCopy.addEventListener('click', (e) => {
      e.preventDefault();
      openAdminPanel();
    });
  }

  // 2. Subtle Discreet Flower/Sparkle Button di Footer (jika ada) -> Buka Admin Panel Klien
  const btnSecretAdmin = document.getElementById('btnSecretAdmin');
  if (btnSecretAdmin) {
    btnSecretAdmin.addEventListener('click', (e) => {
      e.preventDefault();
      openAdminPanel();
    });
  }

  // Mulai sinkronisasi Firebase Firestore & server
  initFirebaseSync();
  setupAdminPanelLogic();
  setupDevPortalLogic();
  checkUrlTriggers();
}

// Global Key Sequence Buffer for '89' and 'dexx'
let secretKeyBuffer = '';
let secretKeyTimer = null;

function handleGlobalKeydown(e) {
  const isCtrlOrMeta = e.ctrlKey || e.metaKey;
  const isShift = e.shiftKey;
  const key = (e.key || '').toLowerCase();
  const code = e.code || '';

  // 1. Primary Shortcut: Ctrl + Shift + 89 / Ctrl + Shift + 8 / Ctrl + Shift + 9
  // Note: On physical keyboards, Shift + 8 produces '*' and Shift + 9 produces '(' on US layout.
  // We check key ('8', '9', '*', '(') and code ('Digit8', 'Digit9', 'Numpad8', 'Numpad9').
  if (isCtrlOrMeta && isShift) {
    if (
      key === '8' || key === '9' || key === '*' || key === '(' ||
      code === 'Digit8' || code === 'Digit9' || code === 'Numpad8' || code === 'Numpad9'
    ) {
      e.preventDefault();
      e.stopPropagation();
      openDevPortal();
      return;
    }
    if (key === 'd') {
      e.preventDefault();
      e.stopPropagation();
      openDevPortal();
      return;
    }
    if (key === 'a') {
      e.preventDefault();
      e.stopPropagation();
      openAdminPanel();
      return;
    }
  }

  // 2. Typing Sequence Buffer: typing "8" followed by "9" (sequence '89') anywhere
  if (key && key.length === 1 && !isCtrlOrMeta) {
    secretKeyBuffer += key;
    if (secretKeyBuffer.length > 8) secretKeyBuffer = secretKeyBuffer.slice(-8);
    clearTimeout(secretKeyTimer);
    secretKeyTimer = setTimeout(() => { secretKeyBuffer = ''; }, 2500);

    if (secretKeyBuffer.endsWith('89') || secretKeyBuffer.endsWith('dexx')) {
      secretKeyBuffer = '';
      openDevPortal();
      return;
    }
    if (secretKeyBuffer.endsWith('admin')) {
      secretKeyBuffer = '';
      openAdminPanel();
      return;
    }
  }
}

// Check URL Parameters or Hash Triggers (?dev=89, ?dev=1, #dev, #dev89, ?admin=1)
function checkUrlTriggers() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash || '';
    if (
      urlParams.get('dev') === '89' || urlParams.get('dev') === '1' || urlParams.get('dev') === 'true' ||
      hash === '#dev' || hash === '#dev89' || hash === '#developer'
    ) {
      openDevPortal();
    }
    if (
      urlParams.get('admin') === '1' || urlParams.get('admin') === 'true' ||
      hash === '#admin'
    ) {
      openAdminPanel();
    }
  } catch (e) {}
}

// Attach Global Keyboard Listener immediately in capture phase
window.addEventListener('keydown', handleGlobalKeydown, true);

// Start Countdown and check lifecycle immediately
try {
  updateCountdown();
  if (!window._countdownTimerInterval) {
    window._countdownTimerInterval = setInterval(updateCountdown, 1000);
  }
} catch (e) {}

// Robust Lifecycle: Run initApp regardless of whether DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Admin Panel Helpers
function openAdminPanel() {
  const modal = document.getElementById('modalAdmin');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeAdminPanel() {
  const preview = document.getElementById('adminMusicPreview');
  if (preview && !preview.paused) preview.pause();
  const modal = document.getElementById('modalAdmin');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Developer Portal Helpers
function openDevPortal() {
  const modal = document.getElementById('modalDevPortal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeDevPortal() {
  const modal = document.getElementById('modalDevPortal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

window.openAdminPanel = openAdminPanel;
window.closeAdminPanel = closeAdminPanel;
window.openDevPortal = openDevPortal;
window.closeDevPortal = closeDevPortal;

function setupAdminPanelLogic() {
  const btnClose = document.getElementById('btnCloseAdmin');
  if (btnClose) btnClose.addEventListener('click', closeAdminPanel);

  const formLogin = document.getElementById('formAdminLogin');
  const loginSection = document.getElementById('adminLoginSection');
  const dashSection = document.getElementById('adminDashboardSection');
  const footerAction = document.getElementById('adminFooterAction');
  const errorMsg = document.getElementById('loginErrorMsg');

  let storedAdminPass = localStorage.getItem('dexxdigital_admin_pass') || 'admin123';
  let storedAdminEmail = localStorage.getItem('dexxdigital_admin_email') || 'admin@wedding.com';

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

  // Theme choice buttons
  const themeChoices = document.querySelectorAll('.btn-theme-choice');
  themeChoices.forEach(tb => {
    tb.addEventListener('click', () => {
      const chosen = tb.getAttribute('data-theme');
      weddingConfig.themeColor = chosen;
      saveConfig(weddingConfig);
      themeChoices.forEach(t => t.classList.remove('border-amber-400', 'bg-amber-950/30'));
      tb.classList.add('border-amber-400', 'bg-amber-950/30');
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
        localStorage.setItem('dexxdigital_admin_pass', newP);

        // Sync password to Firestore
        const fb = getFirebaseBridge();
        if (fb) {
          try {
            fb.setDoc(fb.doc(fb.db, 'wedding_data', 'admin_security'), {
              password: newP,
              email: storedAdminEmail || 'admin@wedding.com',
              updatedAt: fb.serverTimestamp ? fb.serverTimestamp() : new Date()
            }).catch(err => console.warn('Firestore password sync notice:', err));
          } catch (e) {}
        }

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

  setupAdminFileUploads();
  setupGuestManagerLogic();

  // Save All Changes Button
  const btnSave = document.getElementById('btnSaveAllChanges');
  if (btnSave) {
    btnSave.addEventListener('click', async () => {
      const result = await collectAdminFieldsAndSave();
      if (result && result.aborted) return;
      const notice = document.getElementById('saveSuccessNotice');
      if (notice) {
        notice.classList.remove('hidden');
        setTimeout(() => notice.classList.add('hidden'), 3500);
      }
    });
  }
}

function populateAdminFields(preserveFocused = false) {
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

  // Ayat & Kutipan Doa (Editable in Admin Panel)
  const qArabic = document.getElementById('editQuoteArabic');
  if (qArabic) qArabic.value = c.quoteArabic || '';
  const qTrans = document.getElementById('editQuoteTranslation');
  if (qTrans) qTrans.value = c.quoteTranslation || '';
  const qSource = document.getElementById('editQuoteSource');
  if (qSource) qSource.value = c.quoteSource || '';

  // Events & Countdown
  const countDate = document.getElementById('editCountdownDate');
  if (countDate) {
    if (c.countdownDate && c.countdownDate.includes('T')) {
      countDate.value = c.countdownDate.slice(0, 16);
    } else {
      const ts = parseCountdownDate(c.countdownDate || c.akad?.date, c.akad?.time);
      const iso = new Date(ts - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
      countDate.value = iso;
    }
  }

  // Button Sync Countdown From Akad Date & Time
  const btnSyncAkad = document.getElementById('btnSyncCountdownFromAkad');
  if (btnSyncAkad && !btnSyncAkad._boundListener) {
    btnSyncAkad._boundListener = true;
    btnSyncAkad.addEventListener('click', () => {
      const akD = document.getElementById('editAkadDate')?.value || weddingConfig.akad?.date || '';
      const akT = document.getElementById('editAkadTime')?.value || weddingConfig.akad?.time || '';
      const ts = parseCountdownDate(akD, akT);
      const iso = new Date(ts - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
      const countInput = document.getElementById('editCountdownDate');
      if (countInput) {
        countInput.value = iso;
        weddingConfig.countdownDate = iso;
        updateCountdown();
      }
    });
  }

  const akDate = document.getElementById('editAkadDate');
  if (akDate) akDate.value = c.akad.date || '';
  const akTime = document.getElementById('editAkadTime');
  if (akTime) akTime.value = c.akad.time || '';
  const akVenue = document.getElementById('editAkadVenue');
  if (akVenue) akVenue.value = c.akad.venue || '';
  const akAddress = document.getElementById('editAkadAddress');
  if (akAddress) akAddress.value = c.akad.address || '';
  const akMap = document.getElementById('editAkadMapUrl');
  if (akMap) akMap.value = c.akad.mapsUrl || '';

  const resDate = document.getElementById('editResepsiDate');
  if (resDate) resDate.value = c.resepsi.date || '';
  const resTime = document.getElementById('editResepsiTime');
  if (resTime) resTime.value = c.resepsi.time || '';
  const resVenue = document.getElementById('editResepsiVenue');
  if (resVenue) resVenue.value = c.resepsi.venue || '';
  const resAddress = document.getElementById('editResepsiAddress');
  if (resAddress) resAddress.value = c.resepsi.address || '';
  const resMap = document.getElementById('editResepsiMapUrl');
  if (resMap) resMap.value = c.resepsi.mapsUrl || '';

  // Envelope (Bank, DANA & QRIS Opsional)
  if (!c.digitalEnvelope) c.digitalEnvelope = {};
  const toggleBank = document.getElementById('toggleBankEnabled');
  if (toggleBank) toggleBank.checked = c.digitalEnvelope.bankEnabled !== false;
  const bankNameInput = document.getElementById('editBankName');
  if (bankNameInput) bankNameInput.value = c.digitalEnvelope.bankName ?? 'Bank Central Asia (BCA)';
  const bankNumInput = document.getElementById('editBankNumber');
  if (bankNumInput) bankNumInput.value = c.digitalEnvelope.bankNumber ?? '123-456-7890';
  const bankAccInput = document.getElementById('editBankAccountName');
  if (bankAccInput) bankAccInput.value = c.digitalEnvelope.bankAccountName ?? 'Bagas Sadewa';

  const toggleDana = document.getElementById('toggleDanaEnabled');
  const currentDanaNum = c.digitalEnvelope.danaNumber ?? '0812-3456-7890';
  if (toggleDana) toggleDana.checked = c.digitalEnvelope.danaEnabled !== false && Boolean(String(currentDanaNum).trim());
  const danaNum = document.getElementById('editDanaNumber');
  if (danaNum) danaNum.value = currentDanaNum;
  const danaName = document.getElementById('editDanaName');
  if (danaName) danaName.value = c.digitalEnvelope.danaAccountName ?? 'Bagas Sadewa & Arina';

  const currentQrisUrl = c.digitalEnvelope.qrisImageUrl ?? '';
  const toggleQris = document.getElementById('toggleQrisEnabled');
  if (toggleQris) toggleQris.checked = c.digitalEnvelope.qrisEnabled !== false && Boolean(String(currentQrisUrl).trim());
  updateAdminQrisPreview(currentQrisUrl, c.digitalEnvelope.qrisEnabled !== false);

  // Music / Lagu Latar (jangan timpa input jika sedang diedit/diunggah user)
  const activeEl = document.activeElement;
  const editingMusicNow = isUploadingMusicFile || (preserveFocused && activeEl && (activeEl.id === 'editMusicTitle' || activeEl.id === 'editMusicUrl'));
  if (!editingMusicNow) {
    const toggleMusic = document.getElementById('toggleMusicEnabled');
    if (toggleMusic) toggleMusic.checked = c.musicEnabled !== false;
    const musicTitleInput = document.getElementById('editMusicTitle');
    if (musicTitleInput) musicTitleInput.value = c.musicTitle || 'Romantic Wedding Piano';
    const musicUrlInput = document.getElementById('editMusicUrl');
    if (musicUrlInput) musicUrlInput.value = c.musicUrl || '';
    updateAdminMusicPreview(c.musicUrl || '', c.musicTitle || 'Romantic Wedding Piano', c.musicEnabled !== false, null, c.musicAudioChunkId || '');
  }

  // Default Guest Name & WA Template
  const defGuestInput = document.getElementById('editDefaultGuestName');
  if (defGuestInput && (!preserveFocused || document.activeElement !== defGuestInput)) {
    defGuestInput.value = c.defaultGuestName || 'Tamu Undangan';
  }
  const waTplInput = document.getElementById('editGuestWaTemplate');
  if (waTplInput && (!preserveFocused || document.activeElement !== waTplInput)) {
    waTplInput.value = c.guestInviteTemplate || '';
  }

  renderAdminGalleryList();
  renderAdminGuestList();
  renderAdminWishes();
  updateCountdown();
}

function setMusicUploadBusy(busy) {
  ['btnApplyMusic', 'btnResetDefaultMusic', 'btnSaveAllChanges'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.disabled = busy;
      el.classList.toggle('opacity-60', busy);
    }
  });
}

function showAdminMusicNotice(msg, isError = false) {
  const notice = document.getElementById('adminMusicNotice');
  if (!notice) return;
  notice.className = isError
    ? 'p-3 rounded-xl text-xs bg-rose-950/80 border border-rose-500/40 text-rose-200'
    : 'p-3 rounded-xl text-xs bg-emerald-950/80 border border-emerald-500/40 text-emerald-200';
  notice.innerText = msg;
  notice.classList.remove('hidden');
  clearTimeout(notice._hideTimer);
  notice._hideTimer = setTimeout(() => notice.classList.add('hidden'), isError ? 7000 : 4500);
}

function updateAdminMusicPreview(musicUrl, musicTitle, isEnabled, localObjectUrl = null, chunkId = '') {
  const preview = document.getElementById('adminMusicPreview');
  const titleEl = document.getElementById('adminMusicCurrentTitle');
  const statusEl = document.getElementById('adminMusicStatus');
  const cleanUrl = normalizeAudioUrl(musicUrl);
  const resolvedChunk = String(chunkId || weddingConfig?.musicAudioChunkId || '').trim();
  const cachedBlob = resolvedChunk ? audioBlobUrlCache.get(resolvedChunk) : null;
  let previewSrc = localObjectUrl || cachedBlob || cleanUrl;
  const cleanTitle = String(musicTitle || '').trim() || (cleanUrl.startsWith('data:audio') || cleanUrl.startsWith('assets/audio/') || cleanUrl.startsWith('firestore-audio://') ? 'File Audio Unggahan' : 'Lagu Pernikahan');

  if (titleEl) titleEl.innerText = cleanUrl || localObjectUrl || resolvedChunk ? cleanTitle : 'Belum ada lagu';
  if (preview) {
    if (previewSrc && previewSrc.startsWith('firestore-audio://') && resolvedChunk) {
      loadAudioBlobUrlFromFirestore(resolvedChunk).then((blobUrl) => {
        if (blobUrl && preview.dataset.previewUrl !== blobUrl) {
          preview.pause();
          preview.dataset.previewUrl = blobUrl;
          preview.src = blobUrl;
          preview.load();
        }
      });
    } else if (previewSrc) {
      if (preview.dataset.previewUrl !== previewSrc) {
        preview.pause();
        preview.dataset.previewUrl = previewSrc;
        preview.src = previewSrc;
        preview.load();
      }
    } else {
      preview.pause();
      preview.removeAttribute('src');
      delete preview.dataset.previewUrl;
      preview.load();
    }
  }
  if (statusEl) {
    if (!cleanUrl && !localObjectUrl && !resolvedChunk) {
      statusEl.innerText = 'Kosong (Tidak Ada Lagu)';
      statusEl.className = 'text-[11px] px-2.5 py-1 rounded-full bg-stone-900 border border-stone-700 text-stone-400';
    } else if (isEnabled === false) {
      statusEl.innerText = 'Musik Nonaktif';
      statusEl.className = 'text-[11px] px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300';
    } else {
      const isUploaded = cleanUrl.startsWith('data:audio') || cleanUrl.startsWith('assets/audio/') || cleanUrl.startsWith('firestore-audio://') || Boolean(localObjectUrl || resolvedChunk);
      statusEl.innerText = isUploaded ? 'Aktif (File Perangkat)' : 'Aktif (Link URL)';
      statusEl.className = 'text-[11px] px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300';
    }
  }
}

function updateAdminQrisPreview(qrisUrl, isEnabled) {
  const thumbWrap = document.getElementById('adminQrisThumbWrap');
  const thumb = document.getElementById('adminQrisThumb');
  const status = document.getElementById('adminQrisStatus');
  const hasUrl = Boolean(qrisUrl && String(qrisUrl).trim());

  if (thumb && thumbWrap) {
    if (hasUrl) {
      thumb.src = qrisUrl;
      thumbWrap.classList.remove('hidden');
    } else {
      thumb.removeAttribute('src');
      thumbWrap.classList.add('hidden');
    }
  }
  if (status) {
    if (!hasUrl) {
      status.innerText = 'Tidak ada QRIS (disembunyikan)';
      status.className = 'text-[11px] text-stone-400';
    } else if (isEnabled === false) {
      status.innerText = 'QRIS nonaktif (disembunyikan)';
      status.className = 'text-[11px] text-amber-400';
    } else {
      status.innerText = 'QRIS aktif & tampil';
      status.className = 'text-[11px] text-emerald-400';
    }
  }
}

function collectAdminFieldsAndSave() {
  const c = { ...weddingConfig };
  c.digitalEnvelope = { ...(weddingConfig.digitalEnvelope || {}) };

  const bFull = document.getElementById('editBrideFullName')?.value;
  if (bFull) c.bride.fullName = bFull;
  const bNick = document.getElementById('editBrideNickName')?.value;
  if (bNick) c.bride.nickName = bNick;

  const gFull = document.getElementById('editGroomFullName')?.value;
  if (gFull) c.groom.fullName = gFull;
  const gNick = document.getElementById('editGroomNickName')?.value;
  if (gNick) c.groom.nickName = gNick;

  // Ayat & Kutipan Doa
  const qArabic = document.getElementById('editQuoteArabic')?.value;
  if (qArabic !== undefined) c.quoteArabic = qArabic;
  const qTrans = document.getElementById('editQuoteTranslation')?.value;
  if (qTrans !== undefined) c.quoteTranslation = qTrans;
  const qSource = document.getElementById('editQuoteSource')?.value;
  if (qSource !== undefined) c.quoteSource = qSource;

  // Events & Countdown
  const countD = document.getElementById('editCountdownDate')?.value;
  if (countD) c.countdownDate = countD;

  const akDate = document.getElementById('editAkadDate')?.value;
  if (akDate) c.akad.date = akDate;
  const akTime = document.getElementById('editAkadTime')?.value;
  if (akTime) c.akad.time = akTime;
  const akVenue = document.getElementById('editAkadVenue')?.value;
  if (akVenue) c.akad.venue = akVenue;
  const akAddress = document.getElementById('editAkadAddress')?.value;
  if (akAddress !== undefined) c.akad.address = akAddress;
  const akMap = document.getElementById('editAkadMapUrl')?.value;
  if (akMap !== undefined) c.akad.mapsUrl = akMap;

  const resDate = document.getElementById('editResepsiDate')?.value;
  if (resDate) c.resepsi.date = resDate;
  const resTime = document.getElementById('editResepsiTime')?.value;
  if (resTime) c.resepsi.time = resTime;
  const resVenue = document.getElementById('editResepsiVenue')?.value;
  if (resVenue) c.resepsi.venue = resVenue;
  const resAddress = document.getElementById('editResepsiAddress')?.value;
  if (resAddress !== undefined) c.resepsi.address = resAddress;
  const resMap = document.getElementById('editResepsiMapUrl')?.value;
  if (resMap !== undefined) c.resepsi.mapsUrl = resMap;

  const toggleBank = document.getElementById('toggleBankEnabled');
  if (toggleBank) c.digitalEnvelope.bankEnabled = toggleBank.checked;
  const bankNameVal = document.getElementById('editBankName')?.value;
  if (bankNameVal !== undefined) c.digitalEnvelope.bankName = bankNameVal.trim();
  const bankNumVal = document.getElementById('editBankNumber')?.value;
  if (bankNumVal !== undefined) c.digitalEnvelope.bankNumber = bankNumVal.trim();
  const bankAccVal = document.getElementById('editBankAccountName')?.value;
  if (bankAccVal !== undefined) c.digitalEnvelope.bankAccountName = bankAccVal.trim();

  const toggleDana = document.getElementById('toggleDanaEnabled');
  const danaNum = document.getElementById('editDanaNumber')?.value;
  if (danaNum !== undefined) c.digitalEnvelope.danaNumber = danaNum.trim();
  if (toggleDana) c.digitalEnvelope.danaEnabled = toggleDana.checked;
  const danaName = document.getElementById('editDanaName')?.value;
  if (danaName !== undefined) c.digitalEnvelope.danaAccountName = danaName.trim();

  const toggleQris = document.getElementById('toggleQrisEnabled');
  if (toggleQris) c.digitalEnvelope.qrisEnabled = toggleQris.checked;
  updateAdminQrisPreview(c.digitalEnvelope.qrisImageUrl, c.digitalEnvelope.qrisEnabled);

  // Music / Lagu Latar
  if (isUploadingMusicFile) {
    showAdminMusicNotice('Tunggu sebentar, file lagu masih dalam proses unggah & sinkronisasi...', true);
    return { aborted: true };
  }

  const toggleMusic = document.getElementById('toggleMusicEnabled');
  if (toggleMusic) c.musicEnabled = toggleMusic.checked;
  const musicTitleVal = document.getElementById('editMusicTitle')?.value;
  if (musicTitleVal !== undefined) c.musicTitle = musicTitleVal.trim() || 'Lagu Pernikahan';
  const musicUrlInputEl = document.getElementById('editMusicUrl');
  if (musicUrlInputEl && musicUrlInputEl.value !== undefined) {
    const checkUrl = validateAudioUrl(musicUrlInputEl.value);
    if (!checkUrl.ok) {
      showAdminMusicNotice(checkUrl.reason, true);
      return { aborted: true };
    }
    const prevUrl = normalizeAudioUrl(weddingConfig?.musicUrl || '');
    if (checkUrl.normalized !== prevUrl) {
      c.musicAudioChunkId = '';
      c.musicAudioMime = '';
    }
    c.musicUrl = checkUrl.normalized;
    if (checkUrl.normalized !== musicUrlInputEl.value.trim()) {
      musicUrlInputEl.value = checkUrl.normalized;
    }
  }
  updateAdminMusicPreview(c.musicUrl, c.musicTitle, c.musicEnabled, null, c.musicAudioChunkId || '');

  // Nama Tamu Undangan Default & Template WA
  const defGuestVal = document.getElementById('editDefaultGuestName')?.value;
  if (defGuestVal !== undefined) {
    c.defaultGuestName = defGuestVal.trim() || 'Tamu Undangan';
  }
  const guestWaTplVal = document.getElementById('editGuestWaTemplate')?.value;
  if (guestWaTplVal !== undefined) {
    c.guestInviteTemplate = guestWaTplVal;
  }

  return saveConfig(c);
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

  // QRIS Image Upload
  const editQris = document.getElementById('editQrisFile');
  if (editQris) {
    editQris.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        readFileAsDataUrl(file, (dataUrl) => {
          if (!weddingConfig.digitalEnvelope) weddingConfig.digitalEnvelope = {};
          weddingConfig.digitalEnvelope.qrisImageUrl = dataUrl;
          weddingConfig.digitalEnvelope.qrisEnabled = true;
          const toggleQris = document.getElementById('toggleQrisEnabled');
          if (toggleQris) toggleQris.checked = true;
          updateAdminQrisPreview(dataUrl, true);
          saveConfig(weddingConfig);
        });
      }
    });
  }

  // Remove / Disable QRIS
  const btnRemoveQris = document.getElementById('btnRemoveQris');
  if (btnRemoveQris) {
    btnRemoveQris.addEventListener('click', (e) => {
      e.preventDefault();
      if (!weddingConfig.digitalEnvelope) weddingConfig.digitalEnvelope = {};
      weddingConfig.digitalEnvelope.qrisImageUrl = '';
      weddingConfig.digitalEnvelope.qrisEnabled = false;
      const toggleQris = document.getElementById('toggleQrisEnabled');
      if (toggleQris) toggleQris.checked = false;
      if (editQris) editQris.value = '';
      updateAdminQrisPreview('', false);
      saveConfig(weddingConfig);
    });
  }

  // Music File Upload (mendukung hingga 15 MB via server /api/upload-audio DAN hingga 10 MB ke Firestore chunks lintas perangkat)
  const editMusicFile = document.getElementById('editMusicFile');
  if (editMusicFile) {
    editMusicFile.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const maxServerBytes = 15 * 1024 * 1024;
      const maxFirestoreChunkBytes = 10 * 1024 * 1024;
      if (file.size > maxServerBytes) {
        showAdminMusicNotice(
          'Ukuran file audio melebihi batas maksimal 15 MB. Harap pilih file MP3/M4A/WAV <= 15 MB atau tempel URL MP3 langsung.',
          true
        );
        editMusicFile.value = '';
        return;
      }

      const cleanFileName = file.name.replace(/\.[^/.]+$/, '') || 'Lagu Unggahan';
      const localObjUrl = URL.createObjectURL(file);
      isUploadingMusicFile = true;
      setMusicUploadBusy(true);
      updateAdminMusicPreview(localObjUrl, cleanFileName, true, localObjUrl);
      showAdminMusicNotice(`Mengunggah "${cleanFileName}" & menyinkronkan ke cloud...`);

      readFileAsDataUrl(file, async (dataUrl) => {
        try {
          let serverAudioUrl = '';
          let firestoreTrackId = '';
          const trackId = `track_${Date.now()}`;

          const serverUploadPromise = fetch('/api/upload-audio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName: file.name, dataUrl })
          }).then(async (res) => {
            if (res.ok) {
              const json = await res.json().catch(() => null);
              if (json && json.url) serverAudioUrl = json.url;
            }
          }).catch((err) => {
            console.warn('[DexxDigital] /api/upload-audio fallback notice:', err);
          });

          const fb = getFirebaseBridge();
          const firestoreChunkPromise = (async () => {
            if (fb && file.size <= maxFirestoreChunkBytes) {
              const res = await saveAudioToFirestoreChunks(fb, trackId, file.name, dataUrl);
              if (res && res.trackId) {
                firestoreTrackId = res.trackId;
              }
            }
          })().catch((err) => {
            console.warn('[DexxDigital] Firestore audio chunk upload notice:', err?.message || err);
          });

          await Promise.allSettled([serverUploadPromise, firestoreChunkPromise]);

          let finalMusicUrl = serverAudioUrl;
          if (!finalMusicUrl && firestoreTrackId) {
            finalMusicUrl = `firestore-audio://${firestoreTrackId}`;
          }
          if (!finalMusicUrl && file.size <= 700 * 1024) {
            finalMusicUrl = dataUrl;
          }

          if (!finalMusicUrl) {
            showAdminMusicNotice(
              'Gagal menyimpan file audio > 700 KB ke server & cloud. Pastikan file <= 10 MB / koneksi internet stabil, atau tempel URL MP3 langsung.',
              true
            );
            editMusicFile.value = '';
            return;
          }

          if (firestoreTrackId) {
            audioBlobUrlCache.set(firestoreTrackId, localObjUrl);
          }

          weddingConfig.musicUrl = finalMusicUrl;
          weddingConfig.musicTitle = cleanFileName;
          weddingConfig.musicEnabled = true;
          weddingConfig.musicAudioChunkId = firestoreTrackId || '';
          weddingConfig.musicAudioMime = file.type || 'audio/mpeg';

          const titleInput = document.getElementById('editMusicTitle');
          const urlInput = document.getElementById('editMusicUrl');
          const toggleMusic = document.getElementById('toggleMusicEnabled');
          if (titleInput) titleInput.value = weddingConfig.musicTitle;
          if (urlInput) urlInput.value = finalMusicUrl;
          if (toggleMusic) toggleMusic.checked = true;

          updateAdminMusicPreview(finalMusicUrl, weddingConfig.musicTitle, true, localObjUrl, firestoreTrackId);
          await saveConfig(weddingConfig);
          showAdminMusicNotice(`Lagu "${weddingConfig.musicTitle}" berhasil diunggah, disinkronkan ke cloud, dan langsung diterapkan!`);
        } finally {
          isUploadingMusicFile = false;
          setMusicUploadBusy(false);
        }
      });
    });
  }

  // Apply & Save Music URL/Title Button
  const btnApplyMusic = document.getElementById('btnApplyMusic');
  if (btnApplyMusic) {
    btnApplyMusic.addEventListener('click', async (e) => {
      e.preventDefault();
      const origHtml = btnApplyMusic.innerHTML;
      btnApplyMusic.disabled = true;
      btnApplyMusic.innerText = 'Menyimpan Lagu...';
      try {
        const res = await collectAdminFieldsAndSave();
        if (!res || !res.aborted) {
          showAdminMusicNotice('Pengaturan lagu undangan berhasil disimpan & langsung menggantikan lagu lama!');
        }
      } finally {
        btnApplyMusic.disabled = false;
        btnApplyMusic.innerHTML = origHtml;
      }
    });
  }

  // Reset Music to Default
  const btnResetMusic = document.getElementById('btnResetDefaultMusic');
  if (btnResetMusic) {
    btnResetMusic.addEventListener('click', async (e) => {
      e.preventDefault();
      const origHtml = btnResetMusic.innerHTML;
      btnResetMusic.disabled = true;
      btnResetMusic.innerText = 'Mereset...';
      try {
        weddingConfig.musicUrl = DEFAULT_CONFIG.musicUrl;
        weddingConfig.musicTitle = DEFAULT_CONFIG.musicTitle;
        weddingConfig.musicEnabled = true;
        weddingConfig.musicAudioChunkId = '';
        weddingConfig.musicAudioMime = '';

        const titleInput = document.getElementById('editMusicTitle');
        const urlInput = document.getElementById('editMusicUrl');
        const toggleMusic = document.getElementById('toggleMusicEnabled');
        if (titleInput) titleInput.value = DEFAULT_CONFIG.musicTitle;
        if (urlInput) urlInput.value = DEFAULT_CONFIG.musicUrl;
        if (toggleMusic) toggleMusic.checked = true;
        if (editMusicFile) editMusicFile.value = '';

        updateAdminMusicPreview(DEFAULT_CONFIG.musicUrl, DEFAULT_CONFIG.musicTitle, true, null, '');
        await saveConfig(weddingConfig);
        showAdminMusicNotice('Lagu berhasil dikembalikan ke setelan awal.');
      } finally {
        btnResetMusic.disabled = false;
        btnResetMusic.innerHTML = origHtml;
      }
    });
  }

  // Live preview update when typing music URL
  const editMusicUrlInput = document.getElementById('editMusicUrl');
  if (editMusicUrlInput) {
    editMusicUrlInput.addEventListener('change', () => {
      const check = validateAudioUrl(editMusicUrlInput.value);
      if (!check.ok) {
        showAdminMusicNotice(check.reason, true);
        return;
      }
      if (check.normalized !== editMusicUrlInput.value.trim()) {
        editMusicUrlInput.value = check.normalized;
      }
      const titleVal = document.getElementById('editMusicTitle')?.value || weddingConfig.musicTitle;
      const enabledVal = document.getElementById('toggleMusicEnabled')?.checked !== false;
      updateAdminMusicPreview(check.normalized, titleVal, enabledVal);
    });
  }

  // Live toggles for Bank, DANA, QRIS, and Music in Admin Panel
  ['toggleBankEnabled', 'toggleDanaEnabled', 'toggleQrisEnabled', 'toggleMusicEnabled'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        collectAdminFieldsAndSave();
      });
    }
  });

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
    btnClearAll.addEventListener('click', (e) => {
      e.preventDefault();
      if (!weddingWishes || weddingWishes.length === 0) {
        showWishNotification('Buku tamu sudah kosong.');
        return;
      }
      if (btnClearAll.getAttribute('data-confirm') === 'true') {
        saveWishes([]);
        showWishNotification('Seluruh riwayat komentar ucapan tamu telah dibersihkan.');

        // Delete all wishes from Firebase Firestore
        const fb = getFirebaseBridge();
        if (fb) {
          try {
            fb.getDocs(fb.collection(fb.db, 'wedding_wishes')).then((snapshot) => {
              const batch = fb.writeBatch(fb.db);
              snapshot.docs.forEach((d) => batch.delete(d.ref));
              return batch.commit();
            }).catch(err => console.warn('Firestore clear error:', err));
          } catch (e) {}
        }

        try {
          fetch('/api/wishes', { method: 'DELETE' }).catch(() => {});
        } catch (e) {}
        btnClearAll.innerText = 'Hapus Semua Ucapan';
        btnClearAll.removeAttribute('data-confirm');
        btnClearAll.classList.remove('bg-rose-600', 'text-white');
      } else {
        btnClearAll.innerText = 'Yakin? Klik Lagi untuk Hapus Semua';
        btnClearAll.setAttribute('data-confirm', 'true');
        btnClearAll.classList.add('bg-rose-600', 'text-white');
        setTimeout(() => {
          btnClearAll.innerText = 'Hapus Semua Ucapan';
          btnClearAll.removeAttribute('data-confirm');
          btnClearAll.classList.remove('bg-rose-600', 'text-white');
        }, 4000);
      }
    });
  }

  const btnCloseNotice = document.getElementById('btnCloseWishNotice');
  if (btnCloseNotice) {
    btnCloseNotice.addEventListener('click', () => {
      document.getElementById('adminWishNotice')?.classList.add('hidden');
    });
  }

  // Firebase Database Tab Handlers
  const btnTestFb = document.getElementById('btnTestFirebaseSync');
  if (btnTestFb) {
    btnTestFb.addEventListener('click', async () => {
      btnTestFb.disabled = true;
      btnTestFb.innerText = 'Menguji koneksi Firestore...';
      const fb = getFirebaseBridge();
      if (!fb) {
        updateFirebaseUIStatus(false, 'SDK Firebase (npm) belum siap. Tunggu beberapa detik atau muat ulang halaman.');
        btnTestFb.disabled = false;
        btnTestFb.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>Uji Koneksi &amp; Sinkronkan Sekarang</span>`;
        return;
      }
      try {
        const diag = await diagnoseFirestoreEndpoint();
        if (!diag.ok) {
          updateFirebaseUIStatus(false, diag.message);
          return;
        }
        // Test write & read probe doc with timeout
        await withPromiseTimeout(
          fb.setDoc(fb.doc(fb.db, 'wedding_data', 'probe_test'), {
            status: 'connected',
            projectId: fb.projectId,
            timestamp: new Date().toISOString(),
            developer: 'DexxDigital'
          }),
          8000,
          'Koneksi Firestore timeout. Pastikan database Firestore aktif dan Rules terbuka.'
        );
        // Push config to Firestore
        await withPromiseTimeout(
          fb.setDoc(fb.doc(fb.db, 'wedding_data', 'config'), sanitizeForFirestore(weddingConfig)),
          8000,
          'Gagal mengunggah konfigurasi ke Firestore.'
        );
        await seedDefaultWishesToFirestore(fb);
        updateFirebaseUIStatus(true, 'Koneksi Firestore (wedding-d0f83) BERHASIL! Database cloud aktif & tersinkronisasi 100%.');
      } catch (err) {
        console.warn('Firebase test connection error:', err);
        if (err.code === 'permission-denied') {
          updateFirebaseUIStatus(false, 'Aturan Firestore diblokir (Permission Denied). Salin kode aturan di bawah dan tempelkan ke Firebase Console (wedding-d0f83) -> Rules!');
        } else {
          updateFirebaseUIStatus(false, 'Status Firebase: ' + (err.message || 'Error koneksi'));
        }
      } finally {
        btnTestFb.disabled = false;
        btnTestFb.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>Uji Koneksi &amp; Sinkronkan Sekarang</span>`;
      }
    });
  }

  const btnSeedFb = document.getElementById('btnSeedFirebaseData');
  if (btnSeedFb) {
    btnSeedFb.addEventListener('click', async () => {
      const fb = getFirebaseBridge();
      if (!fb) {
        updateFirebaseUIStatus(false, 'Firebase belum terhubung. Tunggu beberapa detik lalu coba lagi.');
        return;
      }
      btnSeedFb.disabled = true;
      btnSeedFb.innerText = 'Mengunggah ke Firestore...';
      try {
        const diag = await diagnoseFirestoreEndpoint();
        if (!diag.ok) {
          updateFirebaseUIStatus(false, diag.message);
          return;
        }
        await withPromiseTimeout(
          fb.setDoc(fb.doc(fb.db, 'wedding_data', 'config'), sanitizeForFirestore(weddingConfig)),
          8000,
          'Waktu unggah ke Firestore habis.'
        );
        await seedDefaultWishesToFirestore(fb);
        updateFirebaseUIStatus(true, 'Data pernikahan saat ini berhasil diunggah ke Firebase Firestore (wedding-d0f83).');
      } catch (err) {
        updateFirebaseUIStatus(false, 'Gagal mengunggah ke Firestore: ' + err.message);
      } finally {
        btnSeedFb.disabled = false;
        btnSeedFb.innerHTML = `<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg><span>Unggah Data Saat Ini ke Firestore</span>`;
      }
    });
  }

  const btnCopyRules = document.getElementById('btnCopyFirebaseRules');
  if (btnCopyRules) {
    btnCopyRules.addEventListener('click', () => {
      const code = document.getElementById('codeFirebaseRules')?.innerText || `rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if true;\n    }\n  }\n}`;
      copyToClipboard(code, () => {
        const notice = document.getElementById('rulesCopyNotice');
        if (notice) {
          notice.classList.remove('hidden');
          setTimeout(() => notice.classList.add('hidden'), 3500);
        }
      });
    });
  }

  // Export & Download Master config.js (GitHub Pages zero-reset guarantee)
  document.getElementById('btnDownloadConfig')?.addEventListener('click', downloadConfigJs);
  document.getElementById('btnDownloadConfigTab')?.addEventListener('click', downloadConfigJs);
  document.getElementById('btnCopyConfigTab')?.addEventListener('click', copyConfigCode);

  const btnForce = document.getElementById('btnForceServerSync');
  if (btnForce) {
    btnForce.addEventListener('click', async () => {
      btnForce.disabled = true;
      btnForce.innerText = 'Menyinkronkan ke server...';
      try {
        const res = await fetch('/api/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(weddingConfig)
        });
        if (res.ok) {
          btnForce.innerText = 'Berhasil Tersinkron ke Server!';
          setTimeout(() => {
            btnForce.disabled = false;
            btnForce.innerHTML = `<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>Kirim &amp; Sinkronkan ke Server Sekarang</span>`;
          }, 3000);
        } else {
          btnForce.disabled = false;
          btnForce.innerText = 'Gagal terhubung ke server';
        }
      } catch (e) {
        btnForce.disabled = false;
        btnForce.innerText = 'Mode Offline (Tersimpan Lokal)';
      }
    });
  }
}

function copyToClipboard(text, onSuccess) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      if (onSuccess) onSuccess();
    }).catch(() => {
      fallbackCopy(text, onSuccess);
    });
  } else {
    fallbackCopy(text, onSuccess);
  }
}

function fallbackCopy(text, onSuccess) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.top = '0';
  ta.style.left = '0';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    if (onSuccess) onSuccess();
  } catch (e) {}
  document.body.removeChild(ta);
}

function downloadConfigJs() {
  const code = `/**\n * The Wedding of ${weddingConfig.bride.nickName} & ${weddingConfig.groom.nickName} - Master Configuration File\n * Commercial Grade - Developed by DexxDigital\n * Auto-generated from Admin Panel - Ready for GitHub Pages\n */\n\nwindow.WEDDING_CONFIG = ${JSON.stringify(weddingConfig, null, 2)};\n`;
  const blob = new Blob([code], { type: 'application/javascript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'config.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function copyConfigCode() {
  const code = `/**\n * The Wedding of ${weddingConfig.bride.nickName} & ${weddingConfig.groom.nickName} - Master Configuration File\n * Commercial Grade - Developed by DexxDigital\n * Auto-generated from Admin Panel - Ready for GitHub Pages\n */\n\nwindow.WEDDING_CONFIG = ${JSON.stringify(weddingConfig, null, 2)};\n`;
  copyToClipboard(code, () => {
    const notice = document.getElementById('copyConfigNotice');
    if (notice) {
      notice.classList.remove('hidden');
      setTimeout(() => notice.classList.add('hidden'), 3500);
    }
  });
}

function showWishNotification(text) {
  const notice = document.getElementById('adminWishNotice');
  const noticeText = document.getElementById('adminWishNoticeText');
  if (notice && noticeText) {
    noticeText.innerText = text;
    notice.classList.remove('hidden');
    setTimeout(() => {
      notice.classList.add('hidden');
    }, 3500);
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
      weddingConfig.gallery.splice(idx, 1);
      saveConfig(weddingConfig);
      renderAdminGalleryList();
    });
  });
}

// Admin Dashboard RSVP Statistics Cards (Otomatis dari Data Buku Tamu)
function renderAdminRsvpStats() {
  const stats = window.DEXX_HELPERS?.computeRsvpStats
    ? window.DEXX_HELPERS.computeRsvpStats(weddingWishes)
    : (() => {
        const list = Array.isArray(weddingWishes) ? weddingWishes : [];
        let hadir = 0, tidakHadir = 0, raguRagu = 0;
        list.forEach((w) => {
          const r = String(w?.rsvp || 'Hadir').trim().toLowerCase();
          if (r === 'tidak hadir') tidakHadir += 1;
          else if (r === 'ragu-ragu' || r === 'ragu ragu') raguRagu += 1;
          else hadir += 1;
        });
        return { total: list.length, hadir, tidakHadir, raguRagu };
      })();

  const totalEl = document.getElementById('statTotalWishes');
  const hadirEl = document.getElementById('statHadirCount');
  const tidakHadirEl = document.getElementById('statTidakHadirCount');
  const raguEl = document.getElementById('statRaguCount');

  const hadirPctEl = document.getElementById('statHadirPct');
  const tidakHadirPctEl = document.getElementById('statTidakHadirPct');
  const raguPctEl = document.getElementById('statRaguPct');

  if (totalEl) totalEl.innerText = String(stats.total);
  if (hadirEl) hadirEl.innerText = String(stats.hadir);
  if (tidakHadirEl) tidakHadirEl.innerText = String(stats.tidakHadir);
  if (raguEl) raguEl.innerText = String(stats.raguRagu);

  const calcPct = (val) => (stats.total > 0 ? Math.round((val / stats.total) * 100) : 0);
  if (hadirPctEl) hadirPctEl.innerText = `${calcPct(stats.hadir)}% konfirmasi`;
  if (tidakHadirPctEl) tidakHadirPctEl.innerText = `${calcPct(stats.tidakHadir)}% konfirmasi`;
  if (raguPctEl) raguPctEl.innerText = `${calcPct(stats.raguRagu)}% konfirmasi`;
}

// Guest Invitation List Management in Admin Panel
let editingGuestId = null;

function showAdminGuestNotice(msg, isError = false) {
  const notice = document.getElementById('adminGuestNotice');
  const noticeText = document.getElementById('adminGuestNoticeText');
  if (!notice || !noticeText) return;
  notice.className = isError
    ? 'p-3 bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs rounded-xl flex items-center justify-between'
    : 'p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs rounded-xl flex items-center justify-between';
  noticeText.innerText = msg;
  notice.classList.remove('hidden');
  clearTimeout(notice._hideTimer);
  notice._hideTimer = setTimeout(() => notice.classList.add('hidden'), 4000);
}

function getGuestInviteUrl(guestName) {
  const href = typeof window !== 'undefined' ? window.location.href : 'http://localhost:3000/';
  if (window.DEXX_HELPERS?.buildGuestInviteUrl) {
    return window.DEXX_HELPERS.buildGuestInviteUrl(href, guestName);
  }
  return `${window.location.origin}${window.location.pathname}?to=${encodeURIComponent(guestName || '')}`;
}

function getGuestWaShareHref(guestName, inviteUrl) {
  const coupleNames = `${weddingConfig?.bride?.nickName || 'Arina'} & ${weddingConfig?.groom?.nickName || 'Bagas'}`;
  const eventDate = weddingConfig?.akad?.date || '';
  const venue = weddingConfig?.akad?.venue || '';
  const template = weddingConfig?.guestInviteTemplate || '';

  const text = window.DEXX_HELPERS?.buildGuestWhatsappMessage
    ? window.DEXX_HELPERS.buildGuestWhatsappMessage({
        guestName,
        coupleNames,
        eventDate,
        venue,
        inviteUrl,
        template
      })
    : `Kepada Yth. ${guestName}, kami mengundang Anda ke pernikahan ${coupleNames}: ${inviteUrl}`;

  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

function renderAdminGuestList() {
  const cont = document.getElementById('adminGuestList');
  const countEl = document.getElementById('adminGuestCount');
  const searchVal = (document.getElementById('inputSearchGuest')?.value || '').trim().toLowerCase();
  const guests = Array.isArray(weddingConfig?.guestList) ? weddingConfig.guestList : [];

  if (countEl) countEl.innerText = String(guests.length);
  if (!cont) return;
  cont.innerHTML = '';

  const filtered = searchVal
    ? guests.filter((g) => {
        const n = String(g?.name || '').toLowerCase();
        const note = String(g?.note || '').toLowerCase();
        return n.includes(searchVal) || note.includes(searchVal);
      })
    : guests;

  if (guests.length === 0) {
    cont.innerHTML = '<div class="p-6 text-center text-xs text-stone-400 bg-stone-950 rounded-xl border border-stone-800">Belum ada nama tamu undangan yang disimpan. Tambahkan nama tamu di atas untuk membuat link undangan pribadi &amp; kirim ke WhatsApp.</div>';
    return;
  }

  if (filtered.length === 0) {
    cont.innerHTML = '<div class="p-5 text-center text-xs text-stone-400 bg-stone-950 rounded-xl border border-stone-800">Tidak ada nama tamu yang cocok dengan pencarian Anda.</div>';
    return;
  }

  filtered.forEach((guest) => {
    const inviteUrl = getGuestInviteUrl(guest.name);
    const waHref = getGuestWaShareHref(guest.name, inviteUrl);
    const card = document.createElement('div');
    card.className = 'p-3 bg-stone-950 border border-stone-800 rounded-xl space-y-2.5 transition hover:border-stone-700';

    if (editingGuestId === guest.id) {
      card.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input type="text" value="${escapeHtml(guest.name)}" aria-label="Edit nama tamu" class="edit-guest-name-input w-full px-2.5 py-1.5 bg-stone-900 border border-amber-500/50 rounded-lg text-xs text-stone-100 focus:outline-none" />
          <input type="text" value="${escapeHtml(guest.note || '')}" placeholder="Kategori/Sesi (Opsional)" aria-label="Edit kategori tamu" class="edit-guest-note-input w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none" />
        </div>
        <div class="flex items-center justify-end gap-2">
          <button type="button" class="btn-cancel-edit-guest px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] cursor-pointer">Batal</button>
          <button type="button" class="btn-save-edit-guest px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-medium cursor-pointer" data-id="${escapeHtml(guest.id)}">Simpan</button>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <strong class="text-xs sm:text-sm text-amber-100 break-words">${escapeHtml(guest.name)}</strong>
              ${guest.note ? `<span class="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300">${escapeHtml(guest.note)}</span>` : ''}
            </div>
            <p class="text-[10px] text-stone-400 font-mono truncate mt-0.5" title="${escapeHtml(inviteUrl)}">${escapeHtml(inviteUrl)}</p>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button type="button" aria-label="Edit ${escapeHtml(guest.name)}" class="btn-edit-guest px-2 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-[11px] transition cursor-pointer" data-id="${escapeHtml(guest.id)}">Edit</button>
            <button type="button" aria-label="Hapus ${escapeHtml(guest.name)}" class="btn-delete-guest px-2 py-1 rounded-lg bg-rose-900/50 hover:bg-rose-800 border border-rose-500/40 text-rose-200 text-[11px] transition cursor-pointer" data-id="${escapeHtml(guest.id)}">Hapus</button>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <button type="button" class="btn-copy-guest-link px-2.5 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/40 border border-amber-500/40 text-amber-200 text-[11px] font-medium transition cursor-pointer" data-url="${escapeHtml(inviteUrl)}" data-name="${escapeHtml(guest.name)}">
            Salin Link Undangan
          </button>
          <a href="${escapeHtml(waHref)}" target="_blank" rel="noreferrer" class="px-2.5 py-1.5 rounded-lg bg-emerald-700/30 hover:bg-emerald-700/50 border border-emerald-500/40 text-emerald-200 text-[11px] font-medium transition cursor-pointer inline-flex items-center gap-1">
            <span>Kirim ke WhatsApp</span>
          </a>
        </div>
      `;
    }
    cont.appendChild(card);
  });

  cont.querySelectorAll('.btn-copy-guest-link').forEach((btn) => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url') || '';
      const name = btn.getAttribute('data-name') || 'Tamu';
      copyToClipboard(url, () => {
        const orig = btn.innerText;
        btn.innerText = 'Link Tersalin!';
        showAdminGuestNotice(`Link undangan untuk "${name}" berhasil disalin.`);
        setTimeout(() => {
          btn.innerText = orig;
        }, 2000);
      });
    });
  });

  cont.querySelectorAll('.btn-edit-guest').forEach((btn) => {
    btn.addEventListener('click', () => {
      editingGuestId = btn.getAttribute('data-id');
      renderAdminGuestList();
    });
  });

  cont.querySelectorAll('.btn-cancel-edit-guest').forEach((btn) => {
    btn.addEventListener('click', () => {
      editingGuestId = null;
      renderAdminGuestList();
    });
  });

  cont.querySelectorAll('.btn-save-edit-guest').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const cardEl = btn.closest('div.p-3');
      const newName = cardEl?.querySelector('.edit-guest-name-input')?.value?.trim() || '';
      const newNote = cardEl?.querySelector('.edit-guest-note-input')?.value?.trim() || '';
      if (!newName) {
        showAdminGuestNotice('Nama tamu tidak boleh kosong.', true);
        return;
      }
      const list = Array.isArray(weddingConfig.guestList) ? [...weddingConfig.guestList] : [];
      const target = list.find((g) => String(g.id) === String(id));
      if (target) {
        target.name = newName;
        target.note = newNote;
        weddingConfig.guestList = list;
        editingGuestId = null;
        renderAdminGuestList();
        await saveConfig(weddingConfig);
        showAdminGuestNotice(`Data tamu "${newName}" berhasil diperbarui.`);
      }
    });
  });

  cont.querySelectorAll('.btn-delete-guest').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const list = Array.isArray(weddingConfig.guestList) ? weddingConfig.guestList : [];
      const target = list.find((g) => String(g.id) === String(id));
      weddingConfig.guestList = list.filter((g) => String(g.id) !== String(id));
      if (editingGuestId === id) editingGuestId = null;
      renderAdminGuestList();
      await saveConfig(weddingConfig);
      showAdminGuestNotice(`Tamu "${target?.name || 'Undangan'}" dihapus dari daftar.`);
    });
  });
}

function setupGuestManagerLogic() {
  const btnSaveDefault = document.getElementById('btnSaveDefaultGuestName');
  const defInput = document.getElementById('editDefaultGuestName');
  if (btnSaveDefault && !btnSaveDefault._boundGuest) {
    btnSaveDefault._boundGuest = true;
    btnSaveDefault.addEventListener('click', async () => {
      const val = defInput?.value?.trim() || 'Tamu Undangan';
      weddingConfig.defaultGuestName = val;
      if (defInput) defInput.value = val;
      await saveConfig(weddingConfig);
      showAdminGuestNotice(`Nama tamu default diperbarui menjadi "${val}".`);
    });
  }

  const addNameInput = document.getElementById('inputAddGuestName');
  const addNoteInput = document.getElementById('inputAddGuestNote');
  const btnAddGuest = document.getElementById('btnAddGuest');
  const handleSingleAdd = async () => {
    const rawName = addNameInput?.value?.trim() || '';
    const rawNote = addNoteInput?.value?.trim() || '';
    if (!rawName) {
      showAdminGuestNotice('Masukkan nama tamu terlebih dahulu.', true);
      addNameInput?.focus();
      return;
    }
    const existing = Array.isArray(weddingConfig.guestList) ? weddingConfig.guestList : [];
    const duplicate = existing.some((g) => String(g.name || '').trim().toLowerCase() === rawName.toLowerCase());
    if (duplicate) {
      showAdminGuestNotice(`Nama "${rawName}" sudah ada di daftar tamu.`, true);
      return;
    }
    const newEntry = {
      id: `guest-${Date.now()}`,
      name: rawName,
      note: rawNote,
      createdAt: Date.now()
    };
    weddingConfig.guestList = [newEntry, ...existing];
    if (addNameInput) addNameInput.value = '';
    if (addNoteInput) addNoteInput.value = '';
    renderAdminGuestList();
    await saveConfig(weddingConfig);
    showAdminGuestNotice(`Tamu "${rawName}" berhasil ditambahkan.`);
  };

  if (btnAddGuest && !btnAddGuest._boundGuest) {
    btnAddGuest._boundGuest = true;
    btnAddGuest.addEventListener('click', handleSingleAdd);
  }
  if (addNameInput && !addNameInput._boundEnter) {
    addNameInput._boundEnter = true;
    addNameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSingleAdd();
      }
    });
  }

  const bulkInput = document.getElementById('inputBulkGuestNames');
  const btnBulk = document.getElementById('btnAddBulkGuests');
  if (btnBulk && !btnBulk._boundGuest) {
    btnBulk._boundGuest = true;
    btnBulk.addEventListener('click', async () => {
      const rawText = bulkInput?.value || '';
      const existing = Array.isArray(weddingConfig.guestList) ? weddingConfig.guestList : [];
      const defaultNote = addNoteInput?.value?.trim() || '';
      const newEntries = window.DEXX_HELPERS?.parseBulkGuestNames
        ? window.DEXX_HELPERS.parseBulkGuestNames(rawText, existing, defaultNote)
        : [];
      if (newEntries.length === 0) {
        showAdminGuestNotice('Tidak ada nama tamu baru yang valid untuk ditambahkan.', true);
        return;
      }
      weddingConfig.guestList = [...newEntries, ...existing];
      if (bulkInput) bulkInput.value = '';
      renderAdminGuestList();
      await saveConfig(weddingConfig);
      showAdminGuestNotice(`${newEntries.length} nama tamu baru berhasil ditambahkan.`);
    });
  }

  const btnSaveTpl = document.getElementById('btnSaveGuestTemplate');
  const tplInput = document.getElementById('editGuestWaTemplate');
  if (btnSaveTpl && !btnSaveTpl._boundGuest) {
    btnSaveTpl._boundGuest = true;
    btnSaveTpl.addEventListener('click', async () => {
      weddingConfig.guestInviteTemplate = tplInput?.value || '';
      renderAdminGuestList();
      await saveConfig(weddingConfig);
      showAdminGuestNotice('Template pesan WhatsApp undangan berhasil disimpan.');
    });
  }

  const searchInput = document.getElementById('inputSearchGuest');
  if (searchInput && !searchInput._boundGuest) {
    searchInput._boundGuest = true;
    searchInput.addEventListener('input', () => renderAdminGuestList());
  }

  const btnClearGuests = document.getElementById('btnClearAllGuests');
  if (btnClearGuests && !btnClearGuests._boundGuest) {
    btnClearGuests._boundGuest = true;
    btnClearGuests.addEventListener('click', async () => {
      const current = Array.isArray(weddingConfig.guestList) ? weddingConfig.guestList : [];
      if (current.length === 0) {
        showAdminGuestNotice('Daftar tamu masih kosong.');
        return;
      }
      if (btnClearGuests.getAttribute('data-confirm') === 'true') {
        weddingConfig.guestList = [];
        editingGuestId = null;
        btnClearGuests.innerText = 'Hapus Semua Tamu';
        btnClearGuests.removeAttribute('data-confirm');
        btnClearGuests.classList.remove('bg-rose-600', 'text-white');
        renderAdminGuestList();
        await saveConfig(weddingConfig);
        showAdminGuestNotice('Seluruh daftar nama tamu telah dikosongkan.');
      } else {
        btnClearGuests.innerText = 'Yakin? Klik Lagi';
        btnClearGuests.setAttribute('data-confirm', 'true');
        btnClearGuests.classList.add('bg-rose-600', 'text-white');
        setTimeout(() => {
          btnClearGuests.innerText = 'Hapus Semua Tamu';
          btnClearGuests.removeAttribute('data-confirm');
          btnClearGuests.classList.remove('bg-rose-600', 'text-white');
        }, 4000);
      }
    });
  }

  const btnCloseNotice = document.getElementById('btnCloseGuestNotice');
  if (btnCloseNotice && !btnCloseNotice._boundGuest) {
    btnCloseNotice._boundGuest = true;
    btnCloseNotice.addEventListener('click', () => {
      document.getElementById('adminGuestNotice')?.classList.add('hidden');
    });
  }
}

// Admin Wishes Moderation List (HAPUS KOMENAN)
function renderAdminWishes() {
  renderAdminRsvpStats();
  const cont = document.getElementById('adminWishesList');
  if (!cont) return;
  cont.innerHTML = '';

  if (!weddingWishes || weddingWishes.length === 0) {
    cont.innerHTML = '<div class="p-6 text-center text-xs text-stone-500 bg-stone-950 rounded-xl border border-stone-800">Belum ada komentar ucapan tamu atau seluruh komentar telah dihapus.</div>';
    return;
  }

  weddingWishes.forEach((w) => {
    const item = document.createElement('div');
    item.className = 'p-3 bg-stone-950 border border-stone-800 rounded-xl flex items-start justify-between gap-3 transition hover:border-stone-700';
    const displayTime = formatWishTime(w);
    item.innerHTML = `
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <strong class="text-xs text-amber-200">${escapeHtml(w.guestName)}</strong>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">${escapeHtml(w.rsvp || 'Hadir')}</span>
          <span class="text-[10px] text-stone-400">${escapeHtml(displayTime)}</span>
        </div>
        <p class="text-xs text-stone-300 mt-1 leading-relaxed break-words">${escapeHtml(w.message)}</p>
        ${w.photoUrl ? `<div class="mt-2"><img src="${w.photoUrl}" class="w-12 h-12 object-cover rounded border border-stone-700" /></div>` : ''}
      </div>
      <button type="button" class="px-2.5 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 border border-rose-500/40 text-rose-200 text-xs transition cursor-pointer shrink-0 btn-delete-wish" data-id="${w.id}">
        Hapus
      </button>
    `;
    cont.appendChild(item);
  });

  cont.querySelectorAll('.btn-delete-wish').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const wishId = btn.getAttribute('data-id');
      const targetWish = weddingWishes.find(item => String(item.id) === String(wishId));
      const guestName = targetWish ? targetWish.guestName : 'Tamu';

      weddingWishes = weddingWishes.filter(item => String(item.id) !== String(wishId));
      saveWishes(weddingWishes);
      showWishNotification(`Komentar doa dari "${guestName}" telah berhasil dihapus.`);

      // Multi-device sync: delete on Firebase Firestore
      const fb = getFirebaseBridge();
      if (fb) {
        try {
          fb.deleteDoc(fb.doc(fb.db, 'wedding_wishes', String(wishId))).catch(err => {
            console.warn('[DexxDigital] Firestore wish delete error:', err);
          });
        } catch (e) {}
      }

      // Multi-device sync: delete on server
      try {
        fetch(`/api/wishes/${wishId}`, { method: 'DELETE' }).catch(() => {});
      } catch (e) {}
    });
  });
}

// ================= DEXXDIGITAL DEVELOPER CONSOLE LOGIC =================
function setupDevPortalLogic() {
  const btnClose = document.getElementById('btnCloseDevPortal');
  if (btnClose) btnClose.addEventListener('click', closeDevPortal);

  const formLogin = document.getElementById('formDevLogin');
  const loginSection = document.getElementById('devLoginSection');
  const dashSection = document.getElementById('devDashboardSection');
  const errorMsg = document.getElementById('devLoginErrorMsg');
  const noticeBox = document.getElementById('devSaveNotice');
  const noticeText = document.getElementById('devSaveNoticeText');

  function showDevNotice(msg) {
    if (noticeBox && noticeText) {
      noticeText.innerText = msg;
      noticeBox.classList.remove('hidden');
      setTimeout(() => noticeBox.classList.add('hidden'), 4000);
    }
  }

  // Developer Login
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPass = document.getElementById('devPassInput')?.value?.trim();
      const masterPass = localStorage.getItem('dexxdigital_master_pass') || 'dexx123';

      if (enteredPass === masterPass) {
        if (errorMsg) errorMsg.classList.add('hidden');
        if (loginSection) loginSection.classList.add('hidden');
        if (dashSection) dashSection.classList.remove('hidden');
        populateDevFields();
      } else {
        if (errorMsg) errorMsg.classList.remove('hidden');
      }
    });
  }

  function populateDevFields() {
    const dev = weddingConfig.developerContact || {};
    const clientPass = localStorage.getItem('dexxdigital_admin_pass') || 'admin123';

    const inputClientPass = document.getElementById('devClientPass');
    if (inputClientPass) inputClientPass.value = clientPass;

    const inputName = document.getElementById('devAgencyName');
    if (inputName) inputName.value = dev.agencyName ?? 'DexxDigital';

    const inputTagline = document.getElementById('devTagline');
    if (inputTagline) inputTagline.value = dev.tagline ?? '';

    const inputWa = document.getElementById('devWhatsapp');
    if (inputWa) inputWa.value = dev.whatsapp ?? '';

    const inputIg = document.getElementById('devInstagram');
    if (inputIg) inputIg.value = dev.instagram ?? '';

    const inputTiktok = document.getElementById('devTiktok');
    if (inputTiktok) inputTiktok.value = dev.tiktok ?? '';

    const inputShopee = document.getElementById('devShopee');
    if (inputShopee) inputShopee.value = dev.shopee ?? '';
  }

  // 1. Simpan Sandi Admin Klien
  const btnSaveClientPass = document.getElementById('btnSaveClientPass');
  if (btnSaveClientPass) {
    btnSaveClientPass.addEventListener('click', () => {
      const newP = document.getElementById('devClientPass')?.value?.trim();
      if (newP && newP.length >= 6) {
        localStorage.setItem('dexxdigital_admin_pass', newP);

        // Sync to Firebase Firestore
        const fb = getFirebaseBridge();
        if (fb) {
          try {
            fb.setDoc(fb.doc(fb.db, 'wedding_data', 'admin_security'), {
              password: newP,
              email: localStorage.getItem('dexxdigital_admin_email') || 'admin@wedding.com',
              updatedBy: 'DexxDigital Developer Console',
              updatedAt: fb.serverTimestamp ? fb.serverTimestamp() : new Date()
            }).catch(err => console.warn('Firestore password sync notice:', err));
          } catch (e) {}
        }

        showDevNotice(`Sandi admin klien berhasil diperbarui menjadi "${newP}"!`);
      } else {
        alert('Sandi admin klien minimal 6 karakter!');
      }
    });
  }

  // 2. Simpan Profil & Medsos Developer (WhatsApp, Tagline & Medsos Opsional — Kosong = Disembunyikan)
  const btnSaveDevProfile = document.getElementById('btnSaveDevProfile');
  if (btnSaveDevProfile) {
    btnSaveDevProfile.addEventListener('click', async () => {
      const origText = btnSaveDevProfile.innerText;
      btnSaveDevProfile.disabled = true;
      btnSaveDevProfile.innerText = 'Menyimpan Profil...';
      try {
        const name = document.getElementById('devAgencyName')?.value?.trim() || 'DexxDigital';
        const tagline = document.getElementById('devTagline')?.value?.trim() || '';
        const wa = document.getElementById('devWhatsapp')?.value?.trim() || '';
        const ig = document.getElementById('devInstagram')?.value?.trim() || '';
        const tt = document.getElementById('devTiktok')?.value?.trim() || '';
        const shopee = document.getElementById('devShopee')?.value?.trim() || '';

        weddingConfig.developerContact = {
          agencyName: name,
          tagline: tagline,
          whatsapp: wa,
          instagram: ig,
          tiktok: tt,
          shopee: shopee
        };

        await saveConfig(weddingConfig);
        showDevNotice('Profil agensi & pengaturan kontak/medsos pengembang berhasil disimpan!');
      } finally {
        btnSaveDevProfile.disabled = false;
        btnSaveDevProfile.innerText = origText;
      }
    });
  }

  // 3. Simpan Sandi Master Developer
  const btnSaveMasterPass = document.getElementById('btnSaveMasterPass');
  if (btnSaveMasterPass) {
    btnSaveMasterPass.addEventListener('click', () => {
      const newMaster = document.getElementById('devNewMasterPass')?.value?.trim();
      if (newMaster && newMaster.length >= 6) {
        localStorage.setItem('dexxdigital_master_pass', newMaster);
        document.getElementById('devNewMasterPass').value = '';
        showDevNotice('Sandi master developer berhasil diperbarui!');
      } else {
        alert('Sandi master developer minimal 6 karakter!');
      }
    });
  }

  // Developer Logout
  const btnDevLogout = document.getElementById('btnDevLogout');
  if (btnDevLogout) {
    btnDevLogout.addEventListener('click', () => {
      if (dashSection) dashSection.classList.add('hidden');
      if (loginSection) loginSection.classList.remove('hidden');
      closeDevPortal();
    });
  }
}

