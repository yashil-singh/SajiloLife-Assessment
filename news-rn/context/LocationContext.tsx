import useFetch from "@/hooks/useFetch";
import { fetchNameByCoord } from "@/services/api";
import { createContext, ReactNode, useEffect, useState } from "react";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";

interface LocationContext {
  location: string | null;
  setLocation: (location: string) => void;
}

export const LocationContext = createContext<LocationContext | null>(null);

const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<string | null>(null);

  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);

  const { data, fetchData: fetchLocation } = useFetch(
    () => fetchNameByCoord(lat, lon),
    false,
  );

  useEffect(() => {
    const checkLocalStorage = async () => {
      const storedLocation = await SecureStore.getItemAsync("location");

      if (storedLocation) {
        setLocation(storedLocation);
      } else {
        async function getCurrentLocation() {
          let { status } = await Location.requestForegroundPermissionsAsync();

          if (status !== "granted") {
            return;
          }

          let location = await Location.getCurrentPositionAsync({});
          setLat(location.coords.latitude);
          setLon(location.coords.longitude);
        }

        getCurrentLocation();
      }
    };

    checkLocalStorage();
  }, []);

  useEffect(() => {
    if (lat && lon && !location) {
      fetchLocation();
    }
  }, [lon, lat]);

  useEffect(() => {
    const setGlobalLocation = async () => {
      if (data) {
        setLocation(data.city);

        await SecureStore.setItemAsync("location", data.city);
      }
    };

    setGlobalLocation();
  }, [data]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
