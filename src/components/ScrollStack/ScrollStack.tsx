'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollStack.css';

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
  index: number;
  totalCards: number;
  baseScale?: number;
  itemScale?: number;
}

export const ScrollStackItem = ({
  children,
  itemClassName = '',
  index,
  totalCards: _totalCards,
  baseScale = 0.85,
  itemScale = 0.03
}: ScrollStackItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this card relative to viewport (window scroll)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start center"]
  });

  // Calculate target scale based on card index
  const targetScale = baseScale + index * itemScale;

  // Transform scroll progress to scale value
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, targetScale]
  );

  return (
    <motion.div
      ref={cardRef}
      className={`scroll-stack-card ${itemClassName}`.trim()}
      style={{
        scale,
        position: 'sticky',
        top: '20vh',
        zIndex: index + 1,
      }}
    >
      {children}
    </motion.div>
  );
};

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  baseScale?: number;
  itemScale?: number;
  onStackComplete?: () => void;
}

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  baseScale = 0.85,
  itemScale = 0.03,
  onStackComplete: _onStackComplete,
}: ScrollStackProps) => {
  // Count total cards
  const totalCards = Array.isArray(children) ? children.length : 1;

  // Enhance children with index and props
  const enhancedChildren = Array.isArray(children)
    ? children.map((child, index) => {
        if (child && typeof child === 'object' && 'type' in child && child.type === ScrollStackItem) {
          return {
            ...child,
            props: {
              ...child.props,
              index,
              totalCards,
              baseScale,
              itemScale
            }
          };
        }
        return child;
      })
    : children;

  return (
    <div className={`scroll-stack-container ${className}`.trim()}>
      <div
        className="scroll-stack-inner"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: `${itemDistance}px`,
          paddingBottom: `${itemDistance * 2}px`
        }}
      >
        {enhancedChildren}
      </div>
    </div>
  );
};

export default ScrollStack;
