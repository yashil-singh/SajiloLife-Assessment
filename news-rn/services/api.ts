import { Article } from "@/lib/types";

const OPEN_WEATHER_BASE_URL = "https://api.opencagedata.com";
const NEWS_API_BASE_URL = "https://eventregistry.org/api/v1";

const OPEN_WEATHER_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_OPEN_CAGE_API_KEY,
  GEO_URL: `${OPEN_WEATHER_BASE_URL}/geocode/v1/json`,
};

const NEWS_API_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_NEWS_API_KEY,
  ARTLES_URL: `${NEWS_API_BASE_URL}/article/getArticles`,
};

export const fetchNameByCoord = async (
  lat: number,
  lon: number,
): Promise<{
  city: string;
  country: string;
}> => {
  const response = await fetch(
    `${OPEN_WEATHER_CONFIG.GEO_URL}?q=${lat}%2C+${lon}&key=${OPEN_WEATHER_CONFIG.API_KEY}`,
    {
      method: "GET",
    },
  );

  if (!response.ok)
    throw new Error("There was an error getting current location.");

  const data = await response.json();

  const components = data.results[0].components;

  return { city: components.county, country: components.country };
};

export const fetchArticles = async (
  location?: string,
  limit?: number,
  category?: string,
  page: number = 1,
): Promise<{
  results: Article[];
  totalResults: number;
  page: number;
  count: number;
  pages: number;
}> => {
  const body = {
    query: {
      $query: {
        $and: [
          {
            locationUri: `http://en.wikipedia.org/wiki/${location ?? "Kathmandu"}`,
          },
          {
            lang: "eng",
          },
        ],
      },

      $filter: {
        forceMaxDataTimeWindow: "31",
      },
    },
    resultType: "articles",
    articlesSortBy: "date",
    articlesPage: page,
    articlesCount: limit ?? 100,
    includeArticleCategories: true,
    apiKey: NEWS_API_CONFIG.API_KEY,
  };

  if (category) {
    body.query.$query.$and.push({
      // @ts-expect-error: categoryUri is not recognized by TypeScript
      categoryUri: `dmoz/${category}`,
    });
  }

  const response = await fetch(`${NEWS_API_CONFIG.ARTLES_URL}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("There was an error getting articles.");

  const data = await response.json();

  return data.articles;
};
