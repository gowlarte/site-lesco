import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function usePageAssets(containerRef: React.RefObject<HTMLDivElement | null>) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const prevPath = useRef(location.pathname);
  const isHome = location.pathname === "/";

  useEffect(() => {
    // Don't show loader on home
    if (isHome) {
      setIsLoading(false);
      prevPath.current = location.pathname;
      return;
    }

    // Only trigger on path change (not on initial mount for home)
    if (prevPath.current === location.pathname) {
      // First mount on a non-home route
      if (!prevPath.current || prevPath.current === location.pathname) {
        setIsLoading(true);
      }
    } else {
      setIsLoading(true);
    }
    prevPath.current = location.pathname;

    let cancelled = false;

    const checkAssets = async () => {
      // Wait for fonts
      try {
        await document.fonts.ready;
      } catch {}

      // Wait a frame for images to appear in the DOM
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));

      // Wait for all images in the container
      const container = containerRef.current;
      if (container) {
        const images = Array.from(container.querySelectorAll("img"));
        const pending = images.filter((img) => !img.complete);
        if (pending.length > 0) {
          await Promise.all(
            pending.map(
              (img) =>
                new Promise<void>((resolve) => {
                  img.addEventListener("load", () => resolve(), { once: true });
                  img.addEventListener("error", () => resolve(), { once: true });
                })
            )
          );
        }
      }

      if (!cancelled) setIsLoading(false);
    };

    checkAssets();

    // Safety timeout
    const safetyTimer = setTimeout(() => {
      if (!cancelled) setIsLoading(false);
    }, 2000);

    return () => {
      cancelled = true;
      clearTimeout(safetyTimer);
    };
  }, [location.pathname, isHome]);

  return { isLoading: isHome ? false : isLoading };
}
