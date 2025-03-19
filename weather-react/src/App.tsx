import { useEffect, useState } from "react";
import Header from "./components/Header";
import background from "@/assets/background.png";
import useFetch from "./services/useFetch";
import { fetchLocationNameByCoord } from "./services/api";
import { Toaster } from "sonner";
import { toast } from "sonner";
import WeatherData from "./components/WeatherData";
import { Loader2 } from "lucide-react";
import ForecastData from "./components/ForecastData";

function App() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const {
    data: locationData,
    loading: locationLoading,
    error: locationError,
    refetch: fetchLocationData,
  } = useFetch(() => fetchLocationNameByCoord(longitude!, latitude!), false);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
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
      {
        enableHighAccuracy: true,
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (longitude && latitude) {
      fetchLocationData();
    }
  }, [longitude, latitude]);

  useEffect(() => {
    if (locationData) {
      setSelectedLocation(locationData[0].name);
    }
  }, [locationData]);

  useEffect(() => {
    if (locationError) {
      toast.error(locationError?.message ?? "Oops! Something went wrong.");
    }
  }, [locationError]);

  return (
    <main
      className="h-screen overflow-y-auto bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="z-10 min-h-screen p-4 pb-12 backdrop-blur-sm">
        <div className="fluid">
          <Header
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />

          {/* Current Location */}
          <div className="before:bg-primary relative mt-6 before:absolute before:-top-3 before:flex before:h-0.5 before:w-full before:max-w-[100px]">
            {locationLoading ? (
              <Loader2 className="text-primary size-7 animate-spin" />
            ) : (
              selectedLocation && (
                <h1 className="text-xl font-black">{selectedLocation}</h1>
              )
            )}
          </div>

          <WeatherData latitude={latitude!} longitude={longitude!} />

          <ForecastData latitude={latitude!} longitude={longitude!} />
        </div>
      </div>

      <Toaster
        closeButton
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              "flex bg-background min-h-14! px-4 rounded-xl max-w-lg w-full gap-2 items-center shadow-sm relative",
            title: "font-semibold text-sm text-foreground!",
            description: "text-sm text-muted-foreground",
            success: "text-green-500",
            info: "text-blue-500",
            error: "text-destructive",
            warning: "text-orange-500",
            closeButton:
              "absolute -top-1 -right-1 text-foreground bg-background border rounded-full cursor-pointer p-1",
          },
        }}
      />
    </main>
  );
}

export default App;
