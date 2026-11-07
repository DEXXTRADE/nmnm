import React, { useEffect, useRef } from 'react';

interface ParticleEffectProps {
  themeColor: string;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({ themeColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color tones based on theme
    const petalColors =
      themeColor === 'romantic-rose'
        ? ['rgba(244, 63, 94, 0.4)', 'rgba(251, 113, 133, 0.5)', 'rgba(254, 205, 211, 0.6)']
        : themeColor === 'emerald-gold'
        ? ['rgba(234, 179, 8, 0.45)', 'rgba(16, 185, 129, 0.35)', 'rgba(253, 224, 71, 0.5)']
        : themeColor === 'midnight-navy'
        ? ['rgba(147, 197, 253, 0.4)', 'rgba(216, 180, 254, 0.35)', 'rgba(255, 255, 255, 0.5)']
        : ['rgba(217, 119, 6, 0.4)', 'rgba(245, 158, 11, 0.35)', 'rgba(254, 243, 199, 0.5)'];

    // Petal & sparkle items
    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      isSparkle: boolean;
    }

    const petals: Petal[] = [];
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
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        isSparkle: Math.random() > 0.6,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.isSparkle) {
          // Draw gentle four-point gold sparkle
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw elegant curved flower petal
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size, -p.size * 0.5, p.size * 1.5, p.size, 0, p.size * 1.8);
          ctx.bezierCurveTo(-p.size * 1.5, p.size, -p.size, -p.size * 0.5, 0, 0);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-70"
      aria-hidden="true"
    />
  );
};
