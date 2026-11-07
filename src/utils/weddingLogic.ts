export interface WeddingData {
  themeColor: string;
  lang: 'id' | 'en';
  groomName: string;
  brideName: string;
  eventDate: string;
}

export function parseGuestName(search: string): string {
  const params = new URLSearchParams(search);
  const to = params.get('to') || params.get('tamu') || params.get('guest');
  return to ? decodeURIComponent(to) : 'Tamu Undangan';
}

export function calculateCountdown(targetDateStr: string, now: Date = new Date()) {
  const target = new Date(targetDateStr).getTime();
  const diff = Math.max(0, target - now.getTime());
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPassed: diff === 0 };
}

export function formatWhatsAppMessage(coupleNames: string, guestName: string, message: string, rsvpStatus: string): string {
  const text = `Halo ${coupleNames}! 🤍\n\nSaya *${guestName}* ingin menyampaikan ucapan selamat dan doa untuk pernikahan kalian:\n\n"${message}"\n\nKonfirmasi Kehadiran: *${rsvpStatus}*\n\nTerima kasih atas undangannya!`;
  return encodeURIComponent(text);
}
