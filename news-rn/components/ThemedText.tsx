import React from "react";
import { Text } from "react-native";

interface ThemedTextProps {
  children: React.ReactNode;
  className?: string;
  weight?: "300" | "400" | "500" | "600" | "700" | "800" | "special";
}

const ThemedText = ({
  children,
  className,
  weight = "500",
}: ThemedTextProps) => {
  const getFontFamily = () => {
    switch (weight) {
      case "300":
        return "OpenSans-300";
      case "400":
        return "OpenSans-400";
      case "600":
        return "OpenSans-600";
      case "700":
        return "OpenSans-700";
      case "800":
        return "OpenSans-800";
      case "special":
        return "LimeLight";

      default:
        return "OpenSans-500";
    }
  };

  return (
    <Text className={className} style={{ fontFamily: getFontFamily() }}>
      {children}
    </Text>
  );
};

export default ThemedText;
