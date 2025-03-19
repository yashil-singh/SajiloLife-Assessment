import { THEME } from "@/lib/constants";
import { Tabs } from "expo-router";
import { Home, Newspaper, Search } from "lucide-react-native";
import React from "react";

const RootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: THEME.colors.primary,
        headerShown: false,
        tabBarLabelStyle: { fontFamily: "OpenSans-500" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <Search size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="articles/index"
        options={{
          title: "Articles",
          tabBarIcon: ({ color }) => <Newspaper size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="articles/[category]/index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
