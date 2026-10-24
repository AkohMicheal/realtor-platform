'use client';

import { useState, useEffect, useCallback } from 'react';
import { SanityImage } from '@/types';
import { SafeSanityImage } from '@/components/listings/SafeSanityImage';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface PropertyGalleryProps {
  images?: SanityImage[];
  title: string;
}

export function PropertyGallery({ images = [], title }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = images && images.length > 0;

  const nextSlide = useCallback(() => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [hasImages, images.length]);

  const prevSlide = useCallback(() => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [hasImages, images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, nextSlide, prevSlide]);

  if (!hasImages) {
    return (
      <MediaPlaceholder
        type="image"
        aspectRatio="video"
        label="Property Photos Coming Soon"
        subtext="Detailed survey and interior video walkthrough available upon private request"
      />
    );
  }

  const mainImage = images[currentIndex] || images[0];

  return (
    <div className="space-y-3">
      {/* Main Feature View */}
      <div className="group relative w-full overflow-hidden rounded-2xl bg-slate-900 shadow-md">
        <SafeSanityImage
          imageSource={mainImage}
          altText={`${title} - Photo ${currentIndex + 1}`}
          aspectRatio="video"
          priority
        />

        {/* Expand / Lightbox Trigger */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-lg bg-black/70 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-black"
          aria-label="Open full screen gallery"
        >
          <Maximize2 className="h-3.5 w-3.5" /> View Fullscreen ({currentIndex + 1}/{images.length})
        </button>

        {/* Carousel arrows if multiple */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                currentIndex === idx
                  ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <SafeSanityImage
                imageSource={img}
                altText={`Thumbnail ${idx + 1}`}
                aspectRatio="video"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Lightbox Navigation */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/25"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/25"
                aria-label="Next image"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          {/* Image */}
          <div className="relative max-h-[85vh] max-w-5xl w-full">
            <SafeSanityImage
              imageSource={mainImage}
              altText={title}
              aspectRatio="video"
            />
            <p className="mt-3 text-center text-sm text-slate-300">
              {title} — {currentIndex + 1} of {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
