export interface WeddingConfig {
  themeColor: 'warm-bronze' | 'romantic-rose' | 'emerald-gold' | 'midnight-navy';
  lang: 'id' | 'en';
  groom: {
    fullName: string;
    nickName: string;
    fatherName: string;
    motherName: string;
    orderChild: string;
    instagram: string;
    photo: string;
  };
  bride: {
    fullName: string;
    nickName: string;
    fatherName: string;
    motherName: string;
    orderChild: string;
    instagram: string;
    photo: string;
  };
  coverPhoto: string;
  watermarkPhoto: string;
  quoteArabic: string;
  quoteTranslation: string;
  quoteSource: string;
  akad: {
    title: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    mapsUrl: string;
  };
  resepsi: {
    title: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    mapsUrl: string;
  };
  countdownDate: string; // ISO format e.g. "2026-12-30T08:00:00"
  loveStory: Array<{
    id: string;
    year: string;
    title: string;
    desc: string;
  }>;
  gallery: Array<{
    id: string;
    url: string;
    caption: string;
  }>;
  videoUrl: string; // YouTube or direct video embed
  digitalEnvelope: {
    danaNumber: string;
    danaAccountName: string;
    qrisImageUrl: string;
    instructions: string;
  };
  streamingUrl: string;
  musicUrl: string;
  developerContact: {
    agencyName: string;
    tagline: string;
    whatsapp: string;
    portfolioUrl: string;
    instagram: string;
  };
}

export interface GuestWish {
  id: string;
  guestName: string;
  message: string;
  timestamp: string;
  rsvp: 'Hadir' | 'Tidak Hadir' | 'Ragu-ragu';
  photoUrl?: string;
}

export const DEFAULT_CONFIG: WeddingConfig = {
  themeColor: 'warm-bronze',
  lang: 'id',
  groom: {
    fullName: 'Bagas Sadewa, S.Kom.',
    nickName: 'Bagas',
    fatherName: 'Samuel Sudarsono',
    motherName: 'Masuya Rahayu',
    orderChild: 'Putra ke-2',
    instagram: 'bagas.wedding',
    photo: '/src/assets/images/groom_portrait_1793976527573.jpg',
  },
  bride: {
    fullName: 'Arina Febriana, S.Ds.',
    nickName: 'Arina',
    fatherName: 'Sumarni Hidayat',
    motherName: 'Maryati Susanti',
    orderChild: 'Putri ke-1',
    instagram: 'arina.febriana',
    photo: '/src/assets/images/bride_portrait_1793976527158.jpg',
  },
  coverPhoto: '/src/assets/images/wedding_couple_hero_1793976526912.jpg',
  watermarkPhoto: '/src/assets/images/wedding_couple_hero_1793976526912.jpg',
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
  loveStory: [
    {
      id: '1',
      year: '2021',
      title: 'Pertemuan Pertama di Kampus',
      desc: 'Berawal dari ruang seminar desain dan teknologi, sebuah perbincangan singkat membuka jalan kebersamaan yang hangat.',
    },
    {
      id: '2',
      year: '2023',
      title: 'Komitmen & Perjalanan Bersama',
      desc: 'Melewati berbagai dinamika pekerjaan, saling mendukung cita-cita hingga menyatukan dua keluarga besar.',
    },
    {
      id: '3',
      year: '2025',
      title: 'Momen Lamaran (Engagement)',
      desc: 'Dengan restu kedua orang tua, Bagas melamar Arina di tepi danau yang tenang, mengukir janji suci pernikahan.',
    },
  ],
  gallery: [
    {
      id: 'g1',
      url: '/src/assets/images/wedding_couple_hero_1793976526912.jpg',
      caption: 'Timeless Portrait in Ivory',
    },
    {
      id: 'g2',
      url: '/src/assets/images/prewedding_landscape_1793976527564.jpg',
      caption: 'Sunrise Walk in Misty Pine',
    },
    {
      id: 'g3',
      url: '/src/assets/images/bride_portrait_1793976527158.jpg',
      caption: 'Radiant Bride Elegance',
    },
    {
      id: 'g4',
      url: '/src/assets/images/groom_portrait_1793976527573.jpg',
      caption: 'Classic Bespoke Groom',
    },
  ],
  videoUrl: 'https://www.youtube.com/embed/HHBsvKnCkwI?autoplay=1&mute=1&loop=1',
  digitalEnvelope: {
    danaNumber: '0812-3456-7890',
    danaAccountName: 'Bagas Sadewa & Arina',
    qrisImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DANA-ARINA-BAGAS-WEDDING',
    instructions: 'Kirimkan kado pernikahan cashless melalui e-wallet DANA atau scan QRIS langsung di atas.',
  },
  streamingUrl: 'https://youtube.com',
  musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112191.mp3',
  developerContact: {
    agencyName: 'VowCraft Wedding Tech',
    tagline: 'Jasa Pembuatan Website Undangan Pernikahan Digital Elegan & Interaktif',
    whatsapp: '6281234567890',
    portfolioUrl: 'https://github.com',
    instagram: 'vowcraft.studio',
  },
};

export const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'w1',
    guestName: 'Melissa & Pratama',
    message: 'Selamat berbahagia Arina & Bagas! Semoga cinta kalian selalu mekar abadi, rukun dan berkah hingga kakek nenek.',
    timestamp: 'Baru saja',
    rsvp: 'Hadir',
    photoUrl: '/src/assets/images/bride_portrait_1793976527158.jpg',
  },
  {
    id: 'w2',
    guestName: 'Citra Kusuma & Keluarga',
    message: 'Baarakallahu laka wa baaraka alaika wa jamaa bainakuma fii khoir. Doa terbaik untuk kedua mempelai!',
    timestamp: '1 jam yang lalu',
    rsvp: 'Hadir',
  },
  {
    id: 'w3',
    guestName: 'Arya Sukma (Sahabat Kampus)',
    message: 'Alhamdulillah akhirnya hari bahagia tiba! Lancar sampai hari-H sobatku Bagas & Arina!',
    timestamp: '3 jam yang lalu',
    rsvp: 'Hadir',
  },
  {
    id: 'w4',
    guestName: 'Cecilia & Suami',
    message: 'Happy wedding day! Maaf kami belum bisa hadir langsung, namun doa tulus kami selalu menyertai kalian berdua ❤️',
    timestamp: 'Kemarin',
    rsvp: 'Tidak Hadir',
  },
];
