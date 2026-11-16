/**
 * DexxDigital Pure Helpers - Audio URL Validation, Normalization, Firestore Chunking & Dev Medsos Visibility
 * Compatible with both Browser (<script>) and Node/TSX unit tests (CommonJS / global UMD)
 */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.DEXX_HELPERS = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function normalizeAudioUrl(rawUrl) {
    const url = String(rawUrl || '').trim();
    if (!url) return '';

    // Google Drive share link -> direct download/stream link
    const gdriveFileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (gdriveFileMatch && gdriveFileMatch[1]) {
      return `https://drive.google.com/uc?export=download&id=${gdriveFileMatch[1]}`;
    }
    const gdriveOpenMatch = url.match(/drive\.google\.com\/(?:open|uc)\?[^#]*id=([a-zA-Z0-9_-]+)/);
    if (gdriveOpenMatch && gdriveOpenMatch[1] && !url.includes('export=download')) {
      return `https://drive.google.com/uc?export=download&id=${gdriveOpenMatch[1]}`;
    }

    // Dropbox share link -> direct raw audio
    if (url.includes('dropbox.com/')) {
      if (url.includes('dl=0')) return url.replace('dl=0', 'raw=1');
      if (!url.includes('raw=1')) return url + (url.includes('?') ? '&raw=1' : '?raw=1');
    }

    // GitHub blob link -> raw.githubusercontent.com
    const githubBlobMatch = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/(.+)$/);
    if (githubBlobMatch) {
      return `https://raw.githubusercontent.com/${githubBlobMatch[1]}/${githubBlobMatch[2]}/${githubBlobMatch[3]}`;
    }

    return url;
  }

  function validateAudioUrl(rawUrl) {
    const normalized = normalizeAudioUrl(rawUrl);
    if (!normalized) {
      return { ok: true, normalized: '', reason: '' };
    }

    if (
      normalized.startsWith('assets/audio/') ||
      normalized.startsWith('/assets/audio/') ||
      normalized.startsWith('firestore-audio://') ||
      normalized.startsWith('data:audio/') ||
      normalized.startsWith('blob:')
    ) {
      return { ok: true, normalized, reason: '' };
    }

    const lower = normalized.toLowerCase();

    if (/^https?:\/\/(?:www\.|m\.|music\.)?(?:youtube\.com|youtu\.be)\//i.test(lower)) {
      return {
        ok: false,
        normalized,
        reason: 'Link halaman YouTube tidak bisa diputar langsung oleh browser. Gunakan file MP3 langsung atau unggah file audio dari perangkat Anda.'
      };
    }

    if (/^https?:\/\/(?:open\.)?spotify\.com\//i.test(lower)) {
      return {
        ok: false,
        normalized,
        reason: 'Link Spotify adalah halaman streaming tertutup, bukan file MP3 langsung. Gunakan URL file .mp3/.m4a atau unggah file audio dari perangkat Anda.'
      };
    }

    if (/^https?:\/\/(?:www\.|vt\.|vm\.)?tiktok\.com\//i.test(lower) || /^https?:\/\/(?:www\.)?instagram\.com\//i.test(lower)) {
      return {
        ok: false,
        normalized,
        reason: 'Link halaman media sosial (TikTok/Instagram) tidak bisa diputar sebagai file audio. Silakan unggah file MP3/M4A dari perangkat Anda.'
      };
    }

    if (/drive\.google\.com\/drive\/folders\//i.test(lower)) {
      return {
        ok: false,
        normalized,
        reason: 'Link folder Google Drive tidak bisa diputar. Bagikan link file audio-nya (drive.google.com/file/d/...) atau unggah file langsung.'
      };
    }

    if (!/^https?:\/\//i.test(normalized) && !normalized.startsWith('assets/')) {
      return {
        ok: false,
        normalized,
        reason: 'Format URL lagu tidak valid. Awali dengan https://... atau unggah file audio dari perangkat Anda.'
      };
    }

    return { ok: true, normalized, reason: '' };
  }

  function splitDataUrlIntoChunks(dataUrl, chunkSize = 350000) {
    const str = String(dataUrl || '');
    if (!str.includes(';base64,')) {
      throw new Error('Format Data URL audio tidak valid');
    }
    const [metaPart, base64Data] = str.split(';base64,');
    const mimeMatch = metaPart.match(/^data:([^;]+)/);
    const mime = mimeMatch ? mimeMatch[1].toLowerCase() : 'audio/mpeg';

    const chunks = [];
    for (let offset = 0; offset < base64Data.length; offset += chunkSize) {
      chunks.push(base64Data.slice(offset, offset + chunkSize));
    }

    return {
      mime,
      base64Length: base64Data.length,
      totalChunks: chunks.length,
      chunks
    };
  }

  function reassembleChunksToDataParts(meta, chunkDocs) {
    if (!meta || !meta.totalChunks || !Array.isArray(chunkDocs)) {
      return null;
    }
    const sorted = [...chunkDocs].sort((a, b) => Number(a.index) - Number(b.index));
    if (sorted.length < Number(meta.totalChunks)) {
      return null;
    }
    let combinedBase64 = '';
    for (let i = 0; i < Number(meta.totalChunks); i++) {
      const part = sorted.find((c) => Number(c.index) === i);
      if (!part || typeof part.data !== 'string') {
        return null;
      }
      combinedBase64 += part.data;
    }
    return {
      mime: meta.mime || 'audio/mpeg',
      base64: combinedBase64,
      dataUrl: `data:${meta.mime || 'audio/mpeg'};base64,${combinedBase64}`
    };
  }

  function resolveDeveloperSocialVisibility(devInput, defaultTagline = '') {
    const dev = devInput && typeof devInput === 'object' ? devInput : {};
    const agencyName = (dev.agencyName !== undefined ? String(dev.agencyName) : 'DexxDigital').trim() || 'DexxDigital';
    const rawTagline = dev.tagline !== undefined ? String(dev.tagline).trim() : String(defaultTagline || '').trim();
    const waDigits = String(dev.whatsapp ?? '').trim().replace(/[^0-9]/g, '');
    const igClean = String(dev.instagram ?? '').trim().replace(/^@/, '');
    const ttClean = String(dev.tiktok ?? '').trim().replace(/^@/, '');
    const shopeeRaw = String(dev.shopee ?? '').trim();

    const showWa = waDigits.length > 0;
    const showIg = igClean.length > 0;
    const showTiktok = ttClean.length > 0;
    const showShopee = shopeeRaw.length > 0;

    return {
      agencyName,
      tagline: rawTagline,
      showTagline: rawTagline.length > 0,
      waDigits,
      waHref: showWa
        ? `https://wa.me/${waDigits}?text=${encodeURIComponent(`Halo ${agencyName}! Saya tertarik pesan jasa pembuatan website undangan pernikahan digital.`)}`
        : '',
      showWa,
      igHref: showIg ? `https://instagram.com/${igClean}` : '',
      showIg,
      tiktokHref: showTiktok ? `https://tiktok.com/@${ttClean}` : '',
      showTiktok,
      shopeeHref: showShopee ? (shopeeRaw.startsWith('http') ? shopeeRaw : `https://${shopeeRaw}`) : '',
      showShopee,
      showSocialRow: showWa || showIg || showTiktok || showShopee
    };
  }

  return {
    normalizeAudioUrl,
    validateAudioUrl,
    splitDataUrlIntoChunks,
    reassembleChunksToDataParts,
    resolveDeveloperSocialVisibility
  };
});
