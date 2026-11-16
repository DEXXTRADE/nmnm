import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  normalizeAudioUrl,
  validateAudioUrl,
  splitDataUrlIntoChunks,
  reassembleChunksToDataParts,
  resolveDeveloperSocialVisibility,
  computeRsvpStats,
  resolveGuestDisplayName,
  parseBulkGuestNames,
  buildGuestInviteUrl,
  buildGuestWhatsappMessage
} = require('../assets/js/helpers.js');

test('normalizeAudioUrl converts Google Drive, Dropbox, and GitHub blob links to direct audio URLs', () => {
  assert.equal(
    normalizeAudioUrl('https://drive.google.com/file/d/1AbCdEf12345/view?usp=sharing'),
    'https://drive.google.com/uc?export=download&id=1AbCdEf12345'
  );
  assert.equal(
    normalizeAudioUrl('https://www.dropbox.com/s/xyz/wedding.mp3?dl=0'),
    'https://www.dropbox.com/s/xyz/wedding.mp3?raw=1'
  );
  assert.equal(
    normalizeAudioUrl('https://github.com/user/repo/blob/main/audio/song.mp3'),
    'https://raw.githubusercontent.com/user/repo/main/audio/song.mp3'
  );
  assert.equal(
    normalizeAudioUrl('assets/audio/wedding-music-123.mp3'),
    'assets/audio/wedding-music-123.mp3'
  );
});

test('validateAudioUrl rejects non-playable webpage links and accepts valid audio sources', () => {
  const yt = validateAudioUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  assert.equal(yt.ok, false);
  assert.match(yt.reason, /YouTube/i);

  const sp = validateAudioUrl('https://open.spotify.com/track/12345');
  assert.equal(sp.ok, false);
  assert.match(sp.reason, /Spotify/i);

  const gdriveFolder = validateAudioUrl('https://drive.google.com/drive/folders/12345');
  assert.equal(gdriveFolder.ok, false);

  const validMp3 = validateAudioUrl('https://cdn.example.com/song.mp3');
  assert.equal(validMp3.ok, true);

  const validFs = validateAudioUrl('firestore-audio://track_999');
  assert.equal(validFs.ok, true);
});

test('splitDataUrlIntoChunks & reassembleChunksToDataParts roundtrip large audio faithfully', () => {
  const rawBase64 = 'UklGRiQAAABXQVZFZm10IBAAAAABAAEA' + 'A'.repeat(900000);
  const originalDataUrl = `data:audio/wav;base64,${rawBase64}`;

  const split = splitDataUrlIntoChunks(originalDataUrl, 350000);
  assert.equal(split.mime, 'audio/wav');
  assert.equal(split.totalChunks, 3);
  assert.equal(split.chunks.length, 3);

  // Reassemble in shuffled order to verify index-based ordering
  const chunkDocs = [
    { index: 2, data: split.chunks[2] },
    { index: 0, data: split.chunks[0] },
    { index: 1, data: split.chunks[1] }
  ];
  const rebuilt = reassembleChunksToDataParts(
    { mime: split.mime, totalChunks: split.totalChunks },
    chunkDocs
  );
  assert.ok(rebuilt);
  assert.equal(rebuilt.mime, 'audio/wav');
  assert.equal(rebuilt.dataUrl, originalDataUrl);
});

test('resolveDeveloperSocialVisibility hides blank optional fields including WhatsApp without restoring defaults', () => {
  const allEmpty = resolveDeveloperSocialVisibility({
    agencyName: 'DexxDigital',
    tagline: '',
    whatsapp: '',
    instagram: '',
    tiktok: '',
    shopee: ''
  });
  assert.equal(allEmpty.showWa, false);
  assert.equal(allEmpty.showIg, false);
  assert.equal(allEmpty.showTiktok, false);
  assert.equal(allEmpty.showShopee, false);
  assert.equal(allEmpty.showTagline, false);
  assert.equal(allEmpty.showSocialRow, false);

  const partial = resolveDeveloperSocialVisibility({
    agencyName: 'StudioKu',
    tagline: 'Jasa Undangan',
    whatsapp: '',
    instagram: '@studioku',
    tiktok: '',
    shopee: 'shopee.co.id/studioku'
  });
  assert.equal(partial.agencyName, 'StudioKu');
  assert.equal(partial.showWa, false);
  assert.equal(partial.showIg, true);
  assert.equal(partial.igHref, 'https://instagram.com/studioku');
  assert.equal(partial.showTiktok, false);
  assert.equal(partial.showShopee, true);
  assert.equal(partial.shopeeHref, 'https://shopee.co.id/studioku');
  assert.equal(partial.showSocialRow, true);
});

test('computeRsvpStats totals Hadir, Tidak Hadir, and Ragu-ragu accurately from guestbook wishes', () => {
  assert.deepEqual(computeRsvpStats([]), {
    total: 0,
    hadir: 0,
    tidakHadir: 0,
    raguRagu: 0
  });

  const stats = computeRsvpStats([
    { id: '1', rsvp: 'Hadir' },
    { id: '2', rsvp: 'Tidak Hadir' },
    { id: '3', rsvp: 'Ragu-ragu' },
    { id: '4', rsvp: 'hadir' },
    { id: '5', rsvp: 'Ragu Ragu' },
    { id: '6' } // missing rsvp defaults to Hadir
  ]);

  assert.deepEqual(stats, {
    total: 6,
    hadir: 3,
    tidakHadir: 1,
    raguRagu: 2
  });
});

test('resolveGuestDisplayName resolves URL param or falls back to admin defaultGuestName safely', () => {
  assert.deepEqual(
    resolveGuestDisplayName('?to=Bapak%20Hendra%20%26%20Keluarga', 'Sahabat Terbaik'),
    { name: 'Bapak Hendra & Keluarga', isCustomUrlGuest: true }
  );
  assert.deepEqual(
    resolveGuestDisplayName('?tamu=Siti%20Rahma', 'Tamu Undangan'),
    { name: 'Siti Rahma', isCustomUrlGuest: true }
  );
  assert.deepEqual(
    resolveGuestDisplayName('', 'Keluarga Besar Mempelai'),
    { name: 'Keluarga Besar Mempelai', isCustomUrlGuest: false }
  );
  assert.deepEqual(
    resolveGuestDisplayName('?to=100%25%20Hadir%20%ZZ', 'Tamu Undangan'),
    { name: '100% Hadir %ZZ', isCustomUrlGuest: true }
  );
});

test('parseBulkGuestNames preserves academic commas, deduplicates case-insensitively, and builds clean invite links', () => {
  const existing = [{ id: 'g1', name: 'Dr. Budi Santoso, S.Kom.', note: 'VIP' }];
  const parsed = parseBulkGuestNames(
    '\n  dr. budi santoso, s.kom. \n Ibu Siti Aminah, M.Pd.\n\nReza & Partner\nReza & Partner\n',
    existing,
    'Teman Kantor'
  );
  assert.equal(parsed.length, 2);
  assert.equal(parsed[0].name, 'Ibu Siti Aminah, M.Pd.');
  assert.equal(parsed[0].note, 'Teman Kantor');
  assert.equal(parsed[1].name, 'Reza & Partner');

  const link = buildGuestInviteUrl('https://dexx.id/?admin=1#admin', 'Ibu Siti Aminah, M.Pd.');
  assert.equal(link, 'https://dexx.id/?to=Ibu%20Siti%20Aminah%2C%20M.Pd.');

  const msg = buildGuestWhatsappMessage({
    guestName: 'Ibu Siti Aminah',
    coupleNames: 'Arina & Bagas',
    eventDate: 'Rabu, 30 Desember 2028',
    venue: 'Masjid Raya Al-Mashun',
    inviteUrl: link
  });
  assert.match(msg, /Ibu Siti Aminah/);
  assert.match(msg, /Arina & Bagas/);
  assert.match(msg, /Ibu%20Siti%20Aminah/);
});
