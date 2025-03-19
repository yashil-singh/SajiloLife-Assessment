import { formatTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Text } from "react-native";

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

  return <Text className={className}>{time}</Text>;
};

export default Clock;
