import React, { useState, useEffect } from 'react';
import { calculateCountdown } from '../utils/weddingLogic';

interface CountdownTimerProps {
  targetDate: string;
  lang: 'id' | 'en';
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, lang }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateCountdown(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateCountdown(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const labels = {
    id: { days: 'Hari', hours: 'Jam', minutes: 'Menit', seconds: 'Detik' },
    en: { days: 'Days', hours: 'Hours', minutes: 'Mins', seconds: 'Secs' },
  }[lang];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto my-6 text-center">
      <div className="bg-stone-900/80 backdrop-blur-md border border-amber-500/30 rounded-xl p-3 shadow-lg">
        <span className="block text-2xl sm:text-3xl font-serif font-bold text-amber-200 tabular-nums">
          {timeLeft.days}
        </span>
        <span className="text-[11px] sm:text-xs tracking-wider uppercase text-stone-400">
          {labels.days}
        </span>
      </div>
      <div className="bg-stone-900/80 backdrop-blur-md border border-amber-500/30 rounded-xl p-3 shadow-lg">
        <span className="block text-2xl sm:text-3xl font-serif font-bold text-amber-200 tabular-nums">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-[11px] sm:text-xs tracking-wider uppercase text-stone-400">
          {labels.hours}
        </span>
      </div>
      <div className="bg-stone-900/80 backdrop-blur-md border border-amber-500/30 rounded-xl p-3 shadow-lg">
        <span className="block text-2xl sm:text-3xl font-serif font-bold text-amber-200 tabular-nums">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-[11px] sm:text-xs tracking-wider uppercase text-stone-400">
          {labels.minutes}
        </span>
      </div>
      <div className="bg-stone-900/80 backdrop-blur-md border border-amber-500/30 rounded-xl p-3 shadow-lg">
        <span className="block text-2xl sm:text-3xl font-serif font-bold text-amber-300 tabular-nums">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-[11px] sm:text-xs tracking-wider uppercase text-stone-400">
          {labels.seconds}
        </span>
      </div>
    </div>
  );
};
