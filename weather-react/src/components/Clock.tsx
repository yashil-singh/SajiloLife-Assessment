import { formatTime } from "@/lib/utils";
import { useEffect, useState } from "react";

const Clock = ({ className }: { className?: string }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    let now = new Date();
    setTime(formatTime(now));

    // run every second
    const interval = setInterval(() => {
      now = new Date();
      setTime(formatTime(now));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span className={className}>{time}</span>;
};

export default Clock;
