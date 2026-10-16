declare global {
  interface Window {
    lenis?: {
      stop: () => void;
      start: () => void;
      scrollTo: (target: number | string, options?: any) => void;
      on: (event: 'scroll', callback: () => void) => void;
      off: (event: 'scroll', callback: () => void) => void;
    };
  }
}

export {};
