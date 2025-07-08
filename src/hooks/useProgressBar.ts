import { useCallback, useRef, useState } from "react";

export default function useProgressBar() {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number>(null);

  const resetProgress = useCallback(() => {
    const interval = intervalRef.current;

    if (interval != null) {
      clearInterval(interval);
      intervalRef.current = null;
    }

    setProgress(0);
  }, []);

  const triggerProgress = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
          }
          return p;
        }

        return p + 10;
      });
    }, 500);
  }, []);

  return [progress, { triggerProgress, resetProgress }] as const;
}
