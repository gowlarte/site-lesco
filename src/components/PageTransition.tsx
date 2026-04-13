import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<"enter" | "exit">("enter");
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      setTransitionStage("exit");
    }
  }, [location.pathname]);

  const handleTransitionEnd = () => {
    if (transitionStage === "exit") {
      prevPathRef.current = location.pathname;
      setDisplayChildren(children);
      setTransitionStage("enter");
    }
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        transitionStage === "enter"
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2"
      }`}
      onTransitionEnd={handleTransitionEnd}
    >
      {displayChildren}
    </div>
  );
};
