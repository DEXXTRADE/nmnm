import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseGuestName, calculateCountdown, formatWhatsAppMessage } from './weddingLogic';

describe('Wedding Pure Logic Tests', () => {
  it('correctly parses guest name from URL query parameter', () => {
    assert.equal(parseGuestName('?to=Budi%20Pratama'), 'Budi Pratama');
    assert.equal(parseGuestName('?tamu=Siti%20&to=Joko'), 'Joko');
    assert.equal(parseGuestName(''), 'Tamu Undangan');
  });

  it('correctly calculates countdown math', () => {
    const fixedNow = new Date('2026-12-01T00:00:00Z');
    const target = '2026-12-30T10:00:00Z';
    const countdown = calculateCountdown(target, fixedNow);
    assert.equal(countdown.days, 29);
    assert.equal(countdown.hours, 10);
    assert.equal(countdown.isPassed, false);
  });

  it('formats WhatsApp greeting link text cleanly', () => {
    const formatted = formatWhatsAppMessage('Arina & Bagas', 'Kirana', 'Semoga samawa', 'Hadir');
    assert.match(formatted, /Arina%20%26%20Bagas/);
    assert.match(formatted, /Kirana/);
  });
});
