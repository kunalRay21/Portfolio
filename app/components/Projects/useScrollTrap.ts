/**
 * useScrollTrap Hook
 * ==================
 *
 * A reusable React hook for implementing scroll-trapping behavior on full-screen sections.
 *
 * FEATURES:
 * ---------
 * • Detects when a section fully occupies the viewport using IntersectionObserver
 * • Intercepts scroll events (wheel/touch) when section is active
 * • Prevents default page scroll and redirects to internal scroll logic
 * • Releases scroll control when internal scroll completes
 * • Smooth, jank-free UX with RAF-based updates
 * • Mobile-friendly with touch support
 *
 * USAGE EXAMPLE:
 * --------------
 * const MyScrollSection = () => {
 *   const { sectionRef, isActive, progress, onScroll } = useScrollTrap({
 *     onScrollProgress: (delta) => {
 *       // Handle scroll delta here
 *       // Return true to prevent default scroll, false to allow it
 *       return shouldHijackScroll;
 *     },
 *     threshold: 0.99,
 *   });
 *
 *   return <section ref={sectionRef} className="h-screen">...</section>;
 * };
 *
 * PARAMETERS:
 * -----------
 * @param onScrollProgress - Callback receiving scroll delta; return true to hijack scroll
 * @param threshold - IntersectionObserver threshold (0-1) for activation
 * @param enabled - Whether the trap is enabled
 *
 * RETURNS:
 * --------
 * @returns sectionRef - Ref to attach to the trapping section
 * @returns isActive - Boolean indicating if section is actively trapping scroll
 * @returns progress - Current scroll progress (0-1)
 *
 * BROWSER SUPPORT:
 * ----------------
 * • Modern browsers with IntersectionObserver support
 * • Polyfill recommended for older browsers
 *
 * ACCESSIBILITY NOTES:
 * --------------------
 * • Keyboard navigation is NOT blocked by this hook
 * • Screen readers can navigate normally
 * • Consider adding skip links for better UX
 * • Ensure focus management for trapped sections
 */

import { useRef, useEffect, useState, RefObject } from "react";

interface UseScrollTrapOptions {
  onScrollProgress?: (delta: number, direction: "up" | "down") => boolean;
  threshold?: number;
  enabled?: boolean;
}

interface UseScrollTrapReturn {
  sectionRef: RefObject<HTMLElement | null>;
  isActive: boolean;
  progress: number;
}

export function useScrollTrap(
  options: UseScrollTrapOptions = {},
): UseScrollTrapReturn {
  const { onScrollProgress, threshold = 0.99, enabled = true } = options;

  const sectionRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  // IntersectionObserver for section detection
  useEffect(() => {
    if (!enabled) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isFullyVisible = entry.intersectionRatio >= threshold;
          setIsActive(isFullyVisible);
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, threshold, 1],
        rootMargin: "0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [enabled, threshold]);

  // Scroll event handling
  useEffect(() => {
    if (!enabled || !onScrollProgress) return;

    let rafId: number | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (!isActive) return;

      const delta = e.deltaY;
      const direction = delta > 0 ? "down" : "up";

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const shouldPrevent = onScrollProgress(delta, direction);
        if (shouldPrevent) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    };

    // Touch handling
    let touchStartY = 0;
    let lastTouchY = 0;
    let isTouching = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (!isActive) return;
      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
      isTouching = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isActive || !isTouching) return;

      const currentY = e.touches[0].clientY;
      const delta = lastTouchY - currentY;
      lastTouchY = currentY;

      const direction = delta > 0 ? "down" : "up";
      const shouldPrevent = onScrollProgress(delta, direction);

      if (shouldPrevent) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enabled, isActive, onScrollProgress]);

  return {
    sectionRef,
    isActive,
    progress,
  };
}
