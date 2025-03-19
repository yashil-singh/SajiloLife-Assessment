import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import "./globals.css";
import { Image, StatusBar, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import Header from "@/components/Header";
import LocationProvider from "@/context/LocationContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    LimeLight: require("../assets/fonts/Limelight-Regular.ttf"),
    "OpenSans-300": require("../assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-400": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-500": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-600": require("../assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-700": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-800": require("../assets/fonts/OpenSans-ExtraBold.ttf"),
    "Domine-400": require("../assets/fonts/Domine-Regular.ttf"),
    "Domine-500": require("../assets/fonts/Domine-Medium.ttf"),
    "Domine-600": require("../assets/fonts/Domine-SemiBold.ttf"),
    "Domine-700": require("../assets/fonts/Domine-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <LocationProvider>
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            statusBarStyle: "auto",
            contentStyle: { backgroundColor: "#ffffff" },
            header: () => <Header />,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              title: "",
            }}
          />
        </Stack>
      </LocationProvider>
    </>
  );
}
