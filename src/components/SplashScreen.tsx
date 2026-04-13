import { useEffect, useState, useRef } from "react";

interface SplashScreenProps {
  assetsReady: boolean;
  onFadeStart: () => void;
  onComplete: () => void;
}

export const SplashScreen = ({ assetsReady, onFadeStart, onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"loading" | "fadeout" | "done">("loading");
  const completedRef = useRef(false);
  const minTimeRef = useRef(false);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setPhase("done");
    onComplete();
  };

  // Minimum display time for the swoosh animation (2s for the sweep to complete)
  useEffect(() => {
    const t = setTimeout(() => {
      minTimeRef.current = true;
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  // When assets are ready AND minimum time has passed, start fadeout
  useEffect(() => {
    if (!assetsReady) return;

    const tryFade = () => {
      if (minTimeRef.current && phase === "loading") {
        onFadeStart();
        setPhase("fadeout");
      }
    };

    // Check immediately
    tryFade();

    // If min time hasn't passed yet, poll until it has
    if (!minTimeRef.current) {
      const interval = setInterval(() => {
        if (minTimeRef.current) {
          tryFade();
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [assetsReady, phase]);

  // Fadeout duration
  useEffect(() => {
    if (phase === "fadeout") {
      const t = setTimeout(finish, 600);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Safety timeout — force complete after 6s no matter what
  useEffect(() => {
    const t = setTimeout(() => {
      if (!completedRef.current) {
        onFadeStart();
        finish();
      }
    }, 6000);
    return () => clearTimeout(t);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-[600ms] ${
        phase === "fadeout" ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#141414" }}
    >
      <svg
        viewBox="0 0 481.11 151.67"
        className="w-[280px] sm:w-[360px] md:w-[420px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="splash-grad"
            x1="285.74" y1="161.58" x2="479.77" y2="-5.99"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".02" stopColor="#a3dba0" />
            <stop offset=".26" stopColor="#c6e1d7" />
            <stop offset=".5" stopColor="#f7c39b" />
            <stop offset=".8" stopColor="#ed8d7b" />
          </linearGradient>
          <clipPath id="swoosh-sweep">
            <rect x="0" y="0" width="481.11" height="151.67" className="splash-clip-rect" />
          </clipPath>
        </defs>

        {/* Swoosh light base */}
        <g className="splash-swoosh-light">
          <path fill="#e9e9e9" fillRule="evenodd" d="M480.95,24.2c-23.34,7.39-45.19,17.15-64.34,27.73-4.06,2.24-8,4.52-11.81,6.82-18.24,11.02-33.44,22.54-44.35,32.94-1.37,1.31-2.69,2.62-3.92,3.89-1.19,1.23-2.3,2.43-3.35,3.61-.06.07-.13.14-.19.21-.05.06-.09.09-.13.14,0,0-.02.02-.02.03-.07.07-.13.14-.18.2h0c-3.54,4.04-6.28,7.8-8.13,11.18-.15.28.08.62.39.58l9.25-1.16c.27-.03.44.31.24.5-22.29,22.93-10.81,36.03-5.97,39.99.38.31.08.92-.4.81-29.93-7.03-63.08-34.03-17.6-72.82.03-.02.06-.05.09-.08,2.55-2.16,5.35-4.38,8.41-6.62.02-.02.02-.02.04-.03.1-.07.2-.15.31-.22,23.23-16.99,45.61-28.04,64.02-35.17.13-.05.25-.09.38-.14,3.51-1.36,6.88-2.57,10.08-3.65.02,0,.04,0,.05-.02,16.9-5.72,29.12-7.85,33.41-8.48.17-.02.23.22.06.27-4.97,1.55-20.36,6.57-32.26,12.72,0,0-.02,0-.03.02-2.82,1.46-7.19,4.46-9.72,6.29-.27.2-.03.63.28.49,2.78-1.22,7.41-3.2,9.98-4.17,0,0,.02,0,.02,0,26.14-9.89,56.36-15,65.28-16.3.28-.04.37.36.1.45Z"/>
        </g>

        {/* Swoosh color gradient sweep */}
        <g clipPath="url(#swoosh-sweep)" className="splash-swoosh-color">
          <path fill="url(#splash-grad)" fillRule="evenodd" d="M480.95,24.2c-23.34,7.39-45.19,17.15-64.34,27.73-4.06,2.24-8,4.52-11.81,6.82-18.24,11.02-33.44,22.54-44.35,32.94-1.37,1.31-2.69,2.62-3.92,3.89-1.19,1.23-2.3,2.43-3.35,3.61-.06.07-.13.14-.19.21-.05.06-.09.09-.13.14,0,0-.02.02-.02.03-.07.07-.13.14-.18.2h0c-3.54,4.04-6.28,7.8-8.13,11.18-.15.28.08.62.39.58l9.25-1.16c.27-.03.44.31.24.5-22.29,22.93-10.81,36.03-5.97,39.99.38.31.08.92-.4.81-29.93-7.03-63.08-34.03-17.6-72.82.03-.02.06-.05.09-.08,2.55-2.16,5.35-4.38,8.41-6.62.02-.02.02-.02.04-.03.1-.07.2-.15.31-.22,23.23-16.99,45.61-28.04,64.02-35.17.13-.05.25-.09.38-.14,3.51-1.36,6.88-2.57,10.08-3.65.02,0,.04,0,.05-.02,16.9-5.72,29.12-7.85,33.41-8.48.17-.02.23.22.06.27-4.97,1.55-20.36,6.57-32.26,12.72,0,0-.02,0-.03.02-2.82,1.46-7.19,4.46-9.72,6.29-.27.2-.03.63.28.49,2.78-1.22,7.41-3.2,9.98-4.17,0,0,.02,0,.02,0,26.14-9.89,56.36-15,65.28-16.3.28-.04.37.36.1.45Z"/>
        </g>
      </svg>
    </div>
  );
};
