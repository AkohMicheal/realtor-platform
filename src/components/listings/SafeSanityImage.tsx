'use client';

import Image from 'next/image';
import { createImageUrlBuilder } from '@sanity/image-url';
import { client, isSanityConfigured } from '@/lib/sanity/client';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';
import { cn } from '@/lib/utils';

const builder = createImageUrlBuilder(client);

interface SafeSanityImageProps {
  imageSource: any;
  altText: string;
  aspectRatio?: 'video' | 'portrait' | 'square' | 'fullscreen';
  priority?: boolean;
  className?: string;
}

const aspectClasses = {
  video: 'aspect-[16/9]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  fullscreen: 'h-[75vh] sm:h-[82vh] w-full max-w-5xl',
};

const dimensions = {
  video: { width: 1200, height: 675 },
  portrait: { width: 900, height: 1200 },
  square: { width: 900, height: 900 },
  fullscreen: { width: 2400, height: 1800 },
};

export function SafeSanityImage({
  imageSource,
  altText,
  aspectRatio = 'video',
  priority = false,
  className,
}: SafeSanityImageProps) {
  const isFullscreen = aspectRatio === 'fullscreen';
  const placeholderRatio = isFullscreen ? 'video' : aspectRatio;

  const hasAsset = Boolean(
    imageSource &&
      (typeof imageSource === 'string' ||
        imageSource.url ||
        (imageSource.asset &&
          (imageSource.asset._ref || imageSource.asset._id || imageSource.asset.url)))
  );

  if (!hasAsset || !isSanityConfigured) {
    return (
      <MediaPlaceholder
        type="image"
        aspectRatio={placeholderRatio}
        label="Listing Photos Coming Soon"
        subtext="Contact via WhatsApp for private off-market photos and video tours"
        className={className}
      />
    );
  }

  const { width, height } = dimensions[aspectRatio];

  let url = '';
  try {
    if (typeof imageSource === 'string') {
      url = imageSource;
    } else if (imageSource.asset?.url && !imageSource.hotspot && !imageSource.crop) {
      url = imageSource.asset.url;
    } else if (isFullscreen) {
      // For fullscreen, do NOT crop to fixed aspect ratio; let Sanity deliver the full image
      // preserving whether the original asset is portrait or landscape
      url = builder
        .image(imageSource)
        .maxWidth(2400)
        .maxHeight(1800)
        .auto('format')
        .quality(90)
        .url();
    } else {
      url = builder
        .image(imageSource)
        .width(width)
        .height(height)
        .fit('crop')
        .auto('format')
        .quality(85)
        .url();
    }
  } catch (err) {
    console.error('Failed to build image URL from source:', err);
    return (
      <MediaPlaceholder
        type="image"
        aspectRatio={placeholderRatio}
        label="Listing Photos Coming Soon"
        subtext="Contact via WhatsApp for private off-market photos and video tours"
        className={className}
      />
    );
  }

  if (!url) {
    return (
      <MediaPlaceholder
        type="image"
        aspectRatio={placeholderRatio}
        label="Listing Photos Coming Soon"
        subtext="Contact via WhatsApp for private off-market photos and video tours"
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-xl',
        isFullscreen ? 'bg-transparent flex items-center justify-center' : 'bg-slate-900',
        aspectClasses[aspectRatio],
        className
      )}
    >
      <Image
        src={url}
        alt={altText || 'RECB Verified Real Estate Property'}
        fill
        sizes={isFullscreen ? '95vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        priority={priority}
        className={cn(
          'transition-transform duration-500 ease-out',
          isFullscreen ? 'object-contain' : 'object-cover hover:scale-105'
        )}
      />
    </div>
  );
}
