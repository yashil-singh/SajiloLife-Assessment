import { formatDate, formatTime } from "@/lib/utils";
import { fetchHourlyForecast } from "@/services/api";
import useFetch from "@/services/useFetch";
import { MessageCircleWarning } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Forecast {
  dt: number; // Timestamp
  dt_txt: string; // Formatted date-time string

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
  pop: number; // Probability of precipitation

  sys: {
    pod: string; // Part of day (e.g., "d" for day, "n" for night)
  };
}

interface ForecastData {
  list: Forecast[];
}

const ForecastData = ({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) => {
  const {
    data: forecastData,
    error: forecastError,
    refetch: fetchForecastData,
  } = useFetch<ForecastData>(
    () => fetchHourlyForecast(longitude!, latitude!),
    false,
  );

  const [forecasts, setForecasts] = useState<Forecast[] | []>([]);

  useEffect(() => {
    if (longitude && latitude) {
      fetchForecastData();
    }
  }, [longitude, latitude]);

  useEffect(() => {
    const filterTodaysForecast = () => {
      if (forecastData) {
        const today = formatDate(new Date());

        const todaysForcasts = forecastData?.list.filter(
          (item) => formatDate(new Date(item.dt * 1000)) === today,
        );

        setForecasts(todaysForcasts);
      }
    };

    filterTodaysForecast();
  }, [forecastData]);

  useEffect(() => {
    if (forecastError) {
      toast.error(forecastError.message ?? "Oops! Something went wrong.");
    }
  }, [forecastError]);
  return (
    <section className="py-8">
      <h1 className="text-xl font-bold">
        Chances of rain <span className="text-sm">(every 3 hrs)</span>
      </h1>
      {forecastData ? (
        <>
          <div className="mt-4 space-y-5">
            {forecasts.map((forecast) => (
              <div key={forecast.dt} className="flex items-center">
                <span className="w-[75px] text-lg font-bold">
                  {formatTime(new Date(forecast.dt * 1000))}
                </span>
                <div className="ml-4 flex h-7 flex-1 rounded-full bg-white/20">
                  <div
                    className="bg-accent h-full w-full rounded-full"
                    style={{ maxWidth: `${(forecast.pop * 100).toFixed()}%` }}
                  ></div>
                </div>

                <span className="w-[64px] text-right text-lg font-medium">
                  {(forecast.pop * 100).toFixed()}{" "}
                  <span className="text-foreground/50">%</span>
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <span className="mt-4 text-center text-sm font-medium">
          No data to show.
        </span>
      )}

      {forecastError && (
        <span className="text-destructive mt-4 flex items-center gap-2 rounded-xl bg-white/20 p-2 text-sm">
          <MessageCircleWarning />{" "}
          <span className="text-foreground font-medium">
            {forecastError?.message}
          </span>
        </span>
      )}
    </section>
  );
};

export default ForecastData;
