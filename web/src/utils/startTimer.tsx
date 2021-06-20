import { useEffect } from "react";

export const startTimer = (start, startTime, setDiff) => {
  useEffect(() => {
    const interval =
      startTime != null && start
        ? setInterval(() => {
            // if (pause) {
            setDiff((new Date() as any) - startTime);
            // }
          }, 1000)
        : null;

    return () => {
      clearInterval(interval);
    };
  }, [start, startTime]);
};
