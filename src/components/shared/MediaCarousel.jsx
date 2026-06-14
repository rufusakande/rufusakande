import { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

/**
 * Premium media carousel for portfolio detail.
 * Accepts a mixed list of images and videos.
 * media: [{ type: 'image' | 'video', url: string }]
 */
function MediaCarousel({ media = [], title = '' }) {
  const items = useMemo(() => media.filter((m) => m && m.url), [media]);
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!autoplay || items.length <= 1) return;
    const current = items[index];
    if (current?.type === 'video') return; // pause autoplay on videos
    const t = setTimeout(next, 5000);
    return () => clearTimeout(t);
  }, [autoplay, index, items, next]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (!items.length) return null;

  const renderItem = (item, i) => {
    if (item.type === 'video') {
      const isYoutube = /youtu\.?be/.test(item.url);
      const isVimeo = /vimeo\.com/.test(item.url);
      if (isYoutube || isVimeo) {
        let src = item.url;
        if (isYoutube) {
          const id = item.url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1];
          if (id) src = `https://www.youtube.com/embed/${id}`;
        } else if (isVimeo) {
          const id = item.url.match(/vimeo\.com\/(\d+)/)?.[1];
          if (id) src = `https://player.vimeo.com/video/${id}`;
        }
        return (
          <iframe
            key={i}
            src={src}
            title={`${title} – vidéo ${i + 1}`}
            className="w-full h-full"
            allow="accelerated-2d-canvas; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        );
      }
      return (
        <video
          key={i}
          src={item.url}
          controls
          playsInline
          className="w-full h-full object-cover"
        />
      );
    }
    return (
      <img
        key={i}
        src={item.url}
        alt={`${title} – image ${i + 1}`}
        loading={i === 0 ? 'eager' : 'lazy'}
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {/* Stage */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-3xl bg-brand-blue-deep shadow-floating ring-1 ring-brand-blue/10">
        {/* Track */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((it, i) => (
            <div key={i} className="relative flex-shrink-0 w-full h-full">
              {renderItem(it, i)}
              {it.type === 'image' && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-blue-deep/40 via-transparent to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Decorative golden frame highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />

        {/* Controls */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Précédent"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-brand-blue shadow-card flex items-center justify-center backdrop-blur transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Suivant"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-brand-blue shadow-card flex items-center justify-center backdrop-blur transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronRight size={20} />
            </button>

            {/* Counter pill */}
            <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 text-white text-xs font-semibold backdrop-blur">
              {index + 1} <span className="opacity-60">/ {items.length}</span>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Aller à l'élément ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-8 bg-brand-gold' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {items.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {items.map((it, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden ring-2 transition-all ${
                i === index ? 'ring-brand-gold scale-100' : 'ring-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`Aperçu ${i + 1}`}
            >
              {it.type === 'video' ? (
                <div className="w-full h-full bg-brand-blue-deep flex items-center justify-center text-white">
                  <Play size={18} fill="currentColor" />
                </div>
              ) : (
                <img src={it.url} alt="" className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaCarousel;
