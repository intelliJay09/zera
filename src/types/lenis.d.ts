declare global {
  interface Window {
    lenis?: {
      stop: () => void;
      start: () => void;
      scrollTo: (target: number | string, options?: any) => void;
    };
  }
}

export {};
