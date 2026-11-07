import React, { useState } from 'react';
import { Play, Image as ImageIcon, Maximize2, Sparkles } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';

interface GallerySectionProps {
  gallery: WeddingConfig['gallery'];
  videoUrl: string;
  lang: 'id' | 'en';
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery, videoUrl, lang }) => {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
          {lang === 'id' ? 'Momen Bahagia Kami' : 'Our Cherished Moments'}
        </span>
        <h3 className="text-3xl sm:text-4xl font-serif text-amber-100 mt-2">
          {lang === 'id' ? 'Galeri & Video Prewedding' : 'Prewedding Gallery & Film'}
        </h3>
        <p className="text-sm text-stone-400 mt-2 max-w-md mx-auto">
          {lang === 'id'
            ? 'Potret rekaman cinta dan kisah perjalanan kami menuju ikatan suci.'
            : 'Capturing our sweetest moments through frames and motion.'}
        </p>
      </div>

      {/* Video Prewedding Player */}
      {videoUrl && (
        <div className="mb-10 max-w-3xl mx-auto rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-black">
          <div className="relative aspect-video">
            <iframe
              src={videoUrl}
              title="Prewedding Teaser Film"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
          <div className="p-4 bg-stone-900/90 text-center">
            <h4 className="text-sm font-serif text-amber-200">
              {lang === 'id' ? 'The Cinematic Prewedding Video' : 'Cinematic Wedding Teaser'}
            </h4>
          </div>
        </div>
      )}

      {/* Photo Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {gallery.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item.url)}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-stone-800 hover:border-amber-500/50 transition-all duration-300 shadow-md ${
              idx === 0 ? 'col-span-2 row-span-2 aspect-[4/3] md:aspect-auto' : 'aspect-square'
            }`}
          >
            <img
              src={item.url}
              alt={item.caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="text-left">
                <p className="text-xs font-serif text-amber-200">{item.caption}</p>
                <span className="text-[10px] text-stone-300 flex items-center gap-1 mt-0.5">
                  <Maximize2 className="w-3 h-3 text-amber-400" />
                  {lang === 'id' ? 'Klik untuk memperbesar' : 'Click to enlarge'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-amber-400 p-2"
              aria-label="Tutup"
            >
              ✕
            </button>
            <img
              src={activePhoto}
              alt="Enlarged photo"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-stone-800 shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
