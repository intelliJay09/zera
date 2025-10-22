import { useEffect } from 'react';

interface UseMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function useMobileMenu({ isOpen, onClose }: UseMobileMenuProps) {
  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Body scroll lock (with Lenis integration)
  useEffect(() => {
    if (isOpen) {
      // Stop Lenis smooth scroll
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }

      // Lock body scroll (iOS fix)
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        // Re-enable Lenis
        if (typeof window !== 'undefined' && window.lenis) {
          window.lenis.start();
        }

        // Unlock body scroll
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return {};
}
