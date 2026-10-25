'use client';

import Image from 'next/image';
import { createImageUrlBuilder } from '@sanity/image-url';
import { client, isSanityConfigured } from '@/lib/sanity/client';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';
import { cn } from '@/lib/utils';

const builder = createImageUrlBuilder(client);

interface SafeSanityImageProps {
  imageSource: { asset?: { _ref?: string }; hotspot?: { x: number; y: number } } | null | undefined;
  altText: string;
  aspectRatio?: 'video' | 'portrait' | 'square';
  priority?: boolean;
  className?: string;
}

const aspectClasses = {
  video: 'aspect-[16/9]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
};

const dimensions = {
  video: { width: 1200, height: 675 },
  portrait: { width: 900, height: 1200 },
  square: { width: 900, height: 900 },
};

export function SafeSanityImage({
  imageSource,
  altText,
  aspectRatio = 'video',
  priority = false,
  className,
}: SafeSanityImageProps) {
  if (!imageSource || !imageSource.asset || !imageSource.asset._ref || !isSanityConfigured) {
    return (
      <MediaPlaceholder
        type="image"
        aspectRatio={aspectRatio}
        label="Listing Photos Coming Soon"
        subtext="Contact via WhatsApp for private off-market photos and video tours"
        className={className}
      />
    );
  }

  const { width, height } = dimensions[aspectRatio];
  const url = builder
    .image(imageSource)
    .width(width)
    .height(height)
    .fit('crop')
    .auto('format')
    .quality(80)
    .url();

  return (
    <div className={cn('relative w-full overflow-hidden rounded-xl bg-slate-900', aspectClasses[aspectRatio], className)}>
      <Image
        src={url}
        alt={altText || 'RECB Verified Real Estate Property'}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        className="object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>
  );
}
