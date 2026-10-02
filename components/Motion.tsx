'use client';
import { useEffect } from 'react';
import { initSite } from '@/lib/site';

// Starts all GSAP / ScrollTrigger behaviour once mounted and fonts are ready.
export default function Motion() {
  useEffect(() => {
    let off: () => void = () => {};
    let dead = false;
    const go = () => { if (!dead) off = initSite(); };
    const wait = new Promise((r) => setTimeout(r, 2500));
    Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), wait]).then(go);
    return () => { dead = true; off(); };
  }, []);
  return null;
}
