import { OPEN_WEATHER_IMAGE_BASE_URL } from "@/lib/constants";
import { fetchTodaysWeather } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import DetailItem from "./DetailItem";
import { Cloud, Droplet, Wind, WindArrowDown } from "lucide-react";
import { formatTime, getTimeDifference } from "@/lib/utils";
import sunrise from "@/assets/sunrise.png";
import sunset from "@/assets/sunset.png";

const WeatherData = ({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) => {
  const {
    data: weatherData,
    error: weatherError,
    refetch: fetchWeatherData,
  } = useFetch(() => fetchTodaysWeather(longitude!, latitude!), false);

  useEffect(() => {
    if (longitude && latitude) {
      fetchWeatherData();
    }
  }, [longitude, latitude]);

  useEffect(() => {
    if (weatherError) {
      toast.error(weatherError.message ?? "Oops! Something went wrong.");
    }
  }, [weatherError]);

  return (
    <>
      <section className="border-primary flex justify-center gap-6 border-b-2 py-8 md:gap-14">
        <div className="flex items-start gap-4">
          <span className="text-xl font-semibold">
            {weatherData?.weather[0]?.main}
          </span>

          <div className="aspect-square size-24 self-center rounded-full bg-white/30">
            <img
              src={`${weatherData && `${OPEN_WEATHER_IMAGE_BASE_URL}${weatherData?.weather[0]?.icon}@2x.png`}`}
              className={twMerge(
                "h-24 w-24 object-cover md:size-24",
                !weatherData && "hidden",
              )}
            />
          </div>
        </div>

        <span>
          <h1 className="text-6xl font-black md:text-8xl">
            {weatherData ? weatherData?.main.temp.toFixed() : "- -"}°
          </h1>
          <p className="text-foreground/50 text-xl">
            / feels like{" "}
            <span className="text-foreground font-bold">
              {weatherData ? weatherData?.main.feels_like.toFixed() : "- -"}°
            </span>
          </p>
        </span>
      </section>

      <section className="border-primary grid grid-cols-2 gap-x-2 gap-y-8 border-b-2 py-8">
        <DetailItem
          title="Wind"
          Icon={Wind}
          value={weatherData ? weatherData?.wind.speed : "- -"}
          metric="km/h"
        />

        <DetailItem
          title="Humidity"
          Icon={Droplet}
          value={weatherData ? weatherData?.main.humidity : "- -"}
          metric="%"
        />

        <DetailItem
          title="Clouds"
          Icon={Cloud}
          value={weatherData ? weatherData?.clouds.all : "- -"}
          metric="%"
        />

        <DetailItem
          title="Pressure"
          Icon={WindArrowDown}
          value={weatherData ? weatherData?.main.pressure : "- -"}
          metric="hpa"
        />
      </section>

      <section className="border-primary border-b-2 py-8">
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="flex gap-4">
            <span className="aspect-square size-10 self-center rounded-full bg-white/30 p-2">
              <img src={sunrise} />
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-medium">Sunrise</span>
              <span className="text-2xl font-bold">
                {weatherData
                  ? formatTime(new Date(weatherData?.sys.sunrise * 1000))
                  : "- -:- - AM"}
              </span>
            </div>
          </div>

          {weatherData && (
            <span className="font-medium">
              {getTimeDifference(new Date(weatherData?.sys.sunrise * 1000))}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 p-4">
          <div className="flex gap-4">
            <span className="aspect-square size-10 self-center rounded-full bg-white/30 p-2">
              <img src={sunset} />
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-medium">Sunset</span>
              <span className="text-2xl font-bold">
                {weatherData
                  ? formatTime(new Date(weatherData?.sys.sunset * 1000))
                  : "- -:- - PM"}
              </span>
            </div>
          </div>

          {weatherData && (
            <span className="font-medium">
              {getTimeDifference(new Date(weatherData?.sys.sunset * 1000))}
            </span>
          )}
        </div>
      </section>
    </>
  );
};

export default WeatherData;
