import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import bg from "@/assets/background.png";
import logo from "@/assets/logo.png";
import sunrise from "@/assets/sunrise.png";
import sunset from "@/assets/sunset.png";
import Clock from "@/components/Clock";
import { formatDate, formatTime, getTimeDifference } from "@/lib/utils";
import {
  Cloud,
  Droplet,
  Loader2,
  MapPin,
  Search,
  Wind,
  WindArrowDown,
} from "lucide-react-native";
import WeatherDetailItem from "@/components/WeatherDetailItem";
import { useEffect, useState } from "react";
import SearchModal from "@/components/SearchModal";

import * as Location from "expo-location";
import {
  fetchCordByName,
  fetchHourlyForecast,
  fetchLocationNameByCoord,
  fetchTodaysWeather,
} from "@/services/api";
import useFetch from "@/services/useFetch";

interface Forecast {
  dt: number;
  dt_txt: string;

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };

  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];

  clouds: {
    all: number;
  };

  wind: {
    speed: number;
    deg: number;
    gust: number;
  };

  visibility: number;
  pop: number;

  sys: {
    pod: string;
  };
}

export default function Index() {
  const today = formatDate(new Date());

  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState("");

  const [forecasts, setForecasts] = useState<Forecast[] | []>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isInitial, setIsInitial] = useState(true);

  const {
    data: locationData,
    loading: locationLoading,
    error: locationError,
    refetch: fetchLocationData,
  } = useFetch(() => fetchLocationNameByCoord(longitude!, latitude!), false);

  const {
    data: weatherData,
    error: weatherError,
    refetch: fetchWeatherData,
  } = useFetch(() => fetchTodaysWeather(longitude!, latitude!), false);

  const {
    data: forecastData,
    error: forecastError,
    refetch: fetchForecastData,
  } = useFetch(() => fetchHourlyForecast(longitude!, latitude!), false);

  const {
    data: searchData,
    loading: searchLoading,
    refetch: fetchSearchResults,
    reset: resetSearchResults,
  } = useFetch(() => fetchCordByName(searchQuery), false);

  const resetSearch = () => {
    setSearchQuery("");
    setIsInitial(true);
    setIsSearchModalOpen(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsInitial(false);
        await fetchSearchResults();
      } else {
        resetSearchResults();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setIsLoadingLocation(false);
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      fetchLocationData();
      fetchWeatherData();
      fetchForecastData();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (locationData) {
      setSelectedLocation(locationData[0].name);
    }
  }, [locationData]);

  useEffect(() => {
    const filterTodaysForecast = () => {
      if (forecastData) {
        const today = formatDate(new Date());

        const todaysForcasts = forecastData?.list.filter(
          (item: Forecast) => formatDate(new Date(item.dt * 1000)) === today,
        );

        setForecasts(todaysForcasts);
      }
    };

    filterTodaysForecast();
  }, [forecastData]);

  return (
    <View>
      <Image
        source={bg}
        className="absolute inset-0 h-full w-full"
        blurRadius={3}
      />

      <ScrollView
        className="backdrop-blur-3xl"
        showsVerticalScrollIndicator={false}
      >
        <Image source={logo} className="ml-4 mt-4 size-14" />

        <View className="flex-row items-center justify-between p-4">
          <View>
            <Clock className="text-xl font-semibold" />
            <Text className="text-xl font-semibold">{today}</Text>
          </View>

          <TouchableOpacity onPress={() => setIsSearchModalOpen(true)}>
            <Search size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="ml-4 mt-2 h-1 w-[30%] rounded-full bg-primary"></View>

        <View className="mb-4 mt-2 p-4">
          {/* Current Location */}
          {isLoadingLocation || locationLoading ? (
            <ActivityIndicator
              className="size-7 text-primary"
              color="#738ffe"
            />
          ) : (
            selectedLocation && (
              <View className="flex-row items-center gap-1">
                <MapPin color="#738ffe" />
                <Text className="text-xl font-bold">{selectedLocation}</Text>
              </View>
            )
          )}

          {/* Weather and Temps */}
          <View className="flex flex-row items-end justify-center gap-6 py-8">
            <View className="flex flex-row items-start gap-2">
              <Text className="text-xl font-semibold">
                {weatherData?.weather[0]?.main}
              </Text>

              <View className="aspect-square size-32 items-center justify-center self-center rounded-full bg-white/20">
                <Image
                  source={{
                    uri: `${weatherData && `https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}`,
                  }}
                  className={`size-28 object-cover ${!weatherData && "hidden"}`}
                />
              </View>
            </View>

            <View>
              <Text className="text-6xl font-black">
                {weatherData ? weatherData?.main.temp.toFixed() : "- -"}°
              </Text>
              <Text className="text-xl text-foreground/50">
                / feels like{" "}
                <Text className="font-bold text-foreground">
                  {weatherData ? weatherData?.main.feels_like.toFixed() : "- -"}
                  °
                </Text>
              </Text>
            </View>
          </View>

          <View className="mt-4 h-1 rounded-full bg-primary"></View>

          {/* Weather Details */}
          <View className="mt-8">
            <View className="flex-row gap-4">
              <WeatherDetailItem
                title="Wind"
                Icon={Wind}
                value={weatherData ? weatherData?.wind.speed : "- -"}
                metric="km/h"
              />

              <WeatherDetailItem
                title="Humidity"
                Icon={Droplet}
                value={weatherData ? weatherData?.main.humidity : "- -"}
                metric="%"
              />
            </View>

            <View className="mt-4 flex-row gap-4">
              <WeatherDetailItem
                title="Clouds"
                Icon={Cloud}
                value={weatherData ? weatherData?.clouds.all : "- -"}
                metric="%"
              />

              <WeatherDetailItem
                title="Pressure"
                Icon={WindArrowDown}
                value={weatherData ? weatherData?.main.pressure : "- -"}
                metric="hpa"
              />
            </View>
          </View>

          <View className="mt-8 h-1 rounded-full bg-primary"></View>

          {/* Sunrise and Sunset */}
          <View className="mt-8">
            <View className="flex flex-row items-center justify-between gap-4 p-4">
              <View className="flex flex-row gap-4">
                <View className="aspect-square size-14 items-center justify-center self-center rounded-full bg-white/20 p-2">
                  <Image source={sunrise} className="size-8" />
                </View>
                <View className="flex flex-col">
                  <Text className="text-lg font-medium">Sunrise</Text>
                  <Text className="text-2xl font-bold">
                    {weatherData
                      ? formatTime(new Date(weatherData?.sys.sunrise * 1000))
                      : "- -:- - AM"}
                  </Text>
                </View>
              </View>

              {weatherData && (
                <Text className="font-medium">
                  {getTimeDifference(new Date(weatherData?.sys.sunrise * 1000))}
                </Text>
              )}
            </View>

            <View className="flex flex-row items-center justify-between gap-4 p-4">
              <View className="flex flex-row gap-4">
                <View className="aspect-square size-14 items-center justify-center self-center rounded-full bg-white/20 p-2">
                  <Image source={sunset} className="size-8" />
                </View>
                <View className="flex flex-col">
                  <Text className="text-lg font-medium">Sunset</Text>
                  <Text className="text-2xl font-bold">
                    {weatherData
                      ? formatTime(new Date(weatherData?.sys.sunset * 1000))
                      : "- -:- - PM"}
                  </Text>
                </View>
              </View>

              {weatherData && (
                <Text className="font-medium">
                  {getTimeDifference(new Date(weatherData?.sys.sunset * 1000))}
                </Text>
              )}
            </View>
          </View>

          <View className="mt-8 h-1 rounded-full bg-primary"></View>

          <View className="mt-8">
            <Text className="text-xl font-bold">
              Chances of rain <Text className="text-sm">(every 3 hrs)</Text>
            </Text>

            <View className="mt-4">
              {forecasts.map((forecast) => (
                <View
                  key={forecast.dt}
                  className="mb-4 flex flex-row items-center"
                >
                  <Text className="w-[75px] text-lg font-bold">
                    {formatTime(new Date(forecast.dt * 1000))}
                  </Text>
                  <View className="ml-4 flex h-7 flex-1 rounded-full bg-white/20">
                    <View
                      className="h-full w-full rounded-full bg-primary"
                      style={{ maxWidth: `${(forecast.pop * 100).toFixed()}%` }}
                    ></View>
                  </View>
                  <Text className="w-[64px] text-right text-lg font-medium">
                    {(forecast.pop * 100).toFixed()}{" "}
                    <Text className="text-foreground/50">%</Text>
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <SearchModal
        isVisible={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      >
        <Text className="mb-2 text-xl font-bold">Search</Text>
        <TextInput
          className="rounded-xl border border-border p-4"
          placeholder="Search for a city..."
          value={searchQuery}
          onChangeText={(value) => setSearchQuery(value)}
        />

        <View className="mt-4">
          {isInitial && !searchLoading && !searchData && (
            <Text className="text-sm font-medium text-gray-500">
              Search for a city to view how the weather is there.
            </Text>
          )}
          {searchLoading && (
            <>
              <ActivityIndicator
                className="size-7 text-primary"
                color="#738ffe"
              />
            </>
          )}
          {searchData && (
            <TouchableOpacity
              key={searchData?.name}
              className="flex w-full flex-col items-start rounded-xl px-5 py-2 font-medium"
              onPress={() => {
                setLatitude(searchData?.coord.lat);
                setLongitude(searchData?.coord.lon);
                resetSearch();
              }}
            >
              <Text className="text-lg text-primary">{searchData?.name}</Text>
              <Text>{searchData?.sys.country}</Text>
            </TouchableOpacity>
          )}
          {!searchLoading && !searchData && !isInitial && (
            <Text className="text-sm font-medium text-gray-500">
              No results found.
            </Text>
          )}
        </View>
      </SearchModal>
    </View>
  );
}
