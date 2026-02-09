import React, { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, summary, [role="button"], [data-cursor="interactive"]';

const GradientCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const echoRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncCapability = () => {
      setIsEnabled(pointerQuery.matches && !motionQuery.matches);
    };

    syncCapability();
    pointerQuery.addEventListener('change', syncCapability);
    motionQuery.addEventListener('change', syncCapability);

    return () => {
      pointerQuery.removeEventListener('change', syncCapability);
      motionQuery.removeEventListener('change', syncCapability);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const ring = ringRef.current;
    const echo = echoRef.current;
    if (!ring || !echo) return;

    let rafId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let echoX = targetX;
    let echoY = targetY;
    let isInteractiveHover = false;
    let isVisible = false;

    const handlePointerMove = (event: PointerEvent) => {
      // Offset keeps the native pointer clearly visible.
      targetX = event.clientX + 8;
      targetY = event.clientY + 8;
      isVisible = true;
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      isInteractiveHover = target.closest(INTERACTIVE_SELECTOR) !== null;
    };

    const handlePointerLeave = () => {
      isVisible = false;
    };

    const animate = () => {
      ringX += (targetX - ringX) * 0.2;
      ringY += (targetY - ringY) * 0.2;
      echoX += (targetX - echoX) * 0.1;
      echoY += (targetY - echoY) * 0.1;

      const ringScale = isInteractiveHover ? 1.22 : 1;
      const echoScale = isInteractiveHover ? 1.36 : 1;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      echo.style.transform = `translate3d(${echoX}px, ${echoY}px, 0) translate(-50%, -50%) scale(${echoScale})`;

      ring.style.opacity = isVisible ? (isInteractiveHover ? '0.42' : '0.28') : '0';
      echo.style.opacity = isVisible ? (isInteractiveHover ? '0.44' : '0.29') : '0';

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      <div
        ref={echoRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '999px',
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.36) 0%, rgba(59, 130, 246, 0.108) 55%, rgba(59, 130, 246, 0) 100%)',
          filter: 'blur(1.6px)',
          opacity: 0,
          willChange: 'transform, opacity',
          transition: 'opacity 160ms ease-out',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '999px',
          border: '1px solid rgba(96, 165, 250, 0.48)',
          background: 'rgba(59, 130, 246, 0.08)',
          boxShadow: '0 0 12px rgba(59, 130, 246, 0.22)',
          opacity: 0,
          willChange: 'transform, opacity',
          transition: 'opacity 140ms ease-out',
        }}
      />
    </>
  );
};

export default GradientCursor;
