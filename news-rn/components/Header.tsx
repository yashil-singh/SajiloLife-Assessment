import { View, Text } from "react-native";
import React from "react";
import ThemedText from "./ThemedText";

const Header = () => {
  return (
    <View className="items-center justify-center px-4 py-2">
      <ThemedText
        weight="special"
        className="text-primary text-center text-4xl"
      >
        Buzz
      </ThemedText>
    </View>
  );
};

export default Header;
