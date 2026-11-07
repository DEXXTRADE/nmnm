import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc3 } from 'lucide-react';

interface MusicPlayerProps {
  musicUrl: string;
  autoPlayTrigger: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ musicUrl, autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Browser autoplay restriction, will play when clicked
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Hentikan Musik Latar' : 'Putar Musik Latar'}
        className={`fixed top-5 right-5 z-40 p-3 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 shadow-xl flex items-center justify-center ${
          isPlaying
            ? 'bg-amber-600/80 text-white animate-spin-slow shadow-amber-500/20'
            : 'bg-black/60 text-stone-300 hover:text-white'
        }`}
        style={{ animationDuration: '6s' }}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-amber-200" />
        ) : (
          <VolumeX className="w-5 h-5 text-stone-400" />
        )}
      </button>
    </>
  );
};
