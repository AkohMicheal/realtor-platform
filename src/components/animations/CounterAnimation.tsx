'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CounterAnimationProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function CounterAnimation({
  target,
  prefix = '',
  suffix = '',
  duration = 2,
  decimals = 0,
  className = '',
}: CounterAnimationProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const proxy = { val: 0 };
    const el = spanRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        val: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
        onUpdate: () => {
          if (el) {
            el.innerText =
              decimals > 0
                ? proxy.val.toFixed(decimals)
                : Math.round(proxy.val).toLocaleString();
          }
        },
      });
    }, el);

    return () => ctx.revert();
  }, [target, duration, decimals]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      {prefix && <span>{prefix}</span>}
      <span ref={spanRef}>0</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
