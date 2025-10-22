import { useState, useEffect, useRef } from 'react';

export function useScrollHeader() {
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel pending RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Only update if crossing threshold
        if (currentScrollY > 20 && !scrolled) {
          setScrolled(true);
        } else if (currentScrollY <= 20 && scrolled) {
          setScrolled(false);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scrolled]);

  return { scrolled };
}
