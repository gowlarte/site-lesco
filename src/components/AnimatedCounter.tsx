import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ end, suffix = "", duration = 2000 }: AnimatedCounterProps) {
  // O hook não recebe mais limiar: o gatilho agora é a posição do topo do
  // bloco, não a fração visível dele. Ver src/hooks/useScrollReveal.ts.
  const { ref, isVisible } = useScrollReveal();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-primary-foreground">
      {count}{suffix}
    </span>
  );
}
