import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  normalizeAudioUrl,
  validateAudioUrl,
  splitDataUrlIntoChunks,
  reassembleChunksToDataParts,
  resolveDeveloperSocialVisibility
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
