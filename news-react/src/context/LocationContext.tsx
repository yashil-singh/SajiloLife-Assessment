import useFetch from "@/hooks/useFetch";
import { fetchNameByCoord } from "@/services/api";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

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
    const storedLocation = localStorage.getItem("location");

    if (storedLocation) {
      setLocation(storedLocation);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLon(position.coords.longitude);
          setLat(position.coords.latitude);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              toast.error(
                "Location permission denied. Enable it in browser settings.",
              );
              break;
            case error.POSITION_UNAVAILABLE:
              toast.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              toast.error("Location request timed out.");
              break;
            default:
              toast.error("An unknown error occurred.");
          }
        },
        { enableHighAccuracy: true },
      );
    }
  }, []);

  useEffect(() => {
    if (lat && lon && !location) {
      fetchLocation();
    }
  }, [lon, lat]);

  useEffect(() => {
    if (data) {
      setLocation(data.city);

      localStorage.setItem("location", data.city);
    }
  }, [data]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
