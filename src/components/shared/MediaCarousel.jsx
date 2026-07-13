import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

/**
 * Premium media carousel with lazy loading, skeletons and lightweight thumbnails.
 * media: [{ type: 'image' | 'video', url: string }]
 */
function MediaCarousel({ media = [], title = '' }) {
  const items = useMemo(() => media.filter((m) => m && m.url), [media]);
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  // Track which slides have started loading (lazy neighbors only)
  const [ready, setReady] = useState(() => new Set([0]));
  // Track successful loads for skeleton removal
  const [loaded, setLoaded] = useState(() => new Set());

  const markReady = useCallback((i) => {
    setReady((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }, []);
  const markLoaded = useCallback((i) => {
    setLoaded((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }, []);

  // Pre-arm current + neighbors for smooth transitions
  useEffect(() => {
    markReady(index);
    if (index + 1 < items.length) markReady(index + 1);
    if (index - 1 >= 0) markReady(index - 1);
  }, [index, items.length, markReady]);

  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!autoplay || items.length <= 1) return;
    const current = items[index];
    if (current?.type === 'video') return;
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

  // Respect reduced-data / save-data
  const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData;

  if (!items.length) return null;

  const Skeleton = () => (
    <div className="absolute inset-0 overflow-hidden bg-brand-blue-deep/5">
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)] bg-[length:200%_100%] animate-[shimmer_1.6s_ease-in-out_infinite]" />
    </div>
  );

  const renderItem = (item, i) => {
    const isActive = i === index;
    const isNeighbor = Math.abs(i - index) <= 1;
    const shouldLoad = ready.has(i) && (isActive || isNeighbor || !saveData);
    const isLoaded = loaded.has(i);

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
          <div className="relative w-full h-full">
            {!isLoaded && <Skeleton />}
            {shouldLoad && (
              <iframe
                src={src}
                title={`${title} – vidéo ${i + 1}`}
                className="w-full h-full"
                loading="lazy"
                onLoad={() => markLoaded(i)}
                allow="accelerated-2d-canvas; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        );
      }
      return (
        <div className="relative w-full h-full">
          {!isLoaded && <Skeleton />}
          {shouldLoad && (
            <video
              src={item.url}
              controls
              playsInline
              preload={isActive ? 'metadata' : 'none'}
              onLoadedData={() => markLoaded(i)}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      );
    }

    return (
      <div className="relative w-full h-full">
        {!isLoaded && <Skeleton />}
        {shouldLoad && (
          <img
            src={item.url}
            alt={`${title} – image ${i + 1}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchpriority={i === 0 ? 'high' : 'low'}
            onLoad={() => markLoaded(i)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>
    );
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-3xl bg-brand-blue-deep shadow-floating ring-1 ring-brand-blue/10">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((it, i) => (
            <div key={i} className="relative flex-shrink-0 w-full h-full">
              {renderItem(it, i)}
              {it.type === 'image' && loaded.has(i) && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-blue-deep/40 via-transparent to-transparent" />
              )}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />

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

            <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 text-white text-xs font-semibold backdrop-blur">
              {index + 1} <span className="opacity-60">/ {items.length}</span>
            </div>

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

      {/* Lightweight thumbnails — lazy loaded */}
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
                <img
                  src={it.url}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width="96"
                  height="64"
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaCarousel;
