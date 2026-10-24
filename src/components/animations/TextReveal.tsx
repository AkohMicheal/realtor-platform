'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!elRef.current) return;
      gsap.from(elRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    }, elRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
