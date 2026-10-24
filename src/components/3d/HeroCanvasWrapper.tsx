'use client';

import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
});

export function HeroCanvasWrapper() {
  return <HeroScene />;
}
