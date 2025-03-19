const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

export const OPEN_WEATHER_CONFIG = {
  BASE_URL,
  CURRENT_WEATHER_URL: `${BASE_URL}/data/2.5/weather?units=metric&appid=${API_KEY}`,
  GEO_REVERSE_URL: `${BASE_URL}/geo/1.0/reverse?units=metric&appid=${API_KEY}`,
  FORECAST_URL: `${BASE_URL}/data/2.5/forecast?units=metric&appid=${API_KEY}`,
  API_KEY,
};

export const fetchTodaysWeather = async (lon: number, lat: number) => {
  const response = await fetch(
    `${OPEN_WEATHER_CONFIG.CURRENT_WEATHER_URL}&lat=${lat}&lon=${lon}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) throw new Error("There was an error getting weather data.");

  const data = await response.json();

  return data;
};

export const fetchCordByName = async (city: string) => {
  const response = await fetch(
    `${OPEN_WEATHER_CONFIG.CURRENT_WEATHER_URL}&q=${city}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) throw new Error("Error getting location name.");

  const data = await response.json();

  return data;
};

export const fetchLocationNameByCoord = async (lon: number, lat: number) => {
  const response = await fetch(
    `${OPEN_WEATHER_CONFIG.GEO_REVERSE_URL}&lat=${lat}&lon=${lon}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) throw new Error("Error getting location name.");

  const data = await response.json();

  return data;
};

export const fetchHourlyForecast = async (lon: number, lat: number) => {
  const response = await fetch(
    `${OPEN_WEATHER_CONFIG.FORECAST_URL}&lon=${lon}&lat=${lat}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) throw new Error("Error getting hourly forecast.");

  const data = await response.json();

  return data;
};
