import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import useLocation from "@/hooks/useLocationContext";
import useFetch from "@/hooks/useFetch";
import { fetchArticles } from "@/services/api";
import ArticleCardSekeleton from "@/components/ArticleCardSekeleton";
import { useEffect } from "react";
import { toast } from "sonner";

const Home = () => {
  const { location } = useLocation();

  const { data, loading, error } = useFetch(() => fetchArticles(location!, 8));

  const {
    data: sportsData,
    loading: sportsDataLoading,
    error: sportsDataError,
  } = useFetch(() => fetchArticles(location!, 4, "Sports"));
  const {
    data: societyData,
    loading: societyDataLoading,
    error: societyDataError,
  } = useFetch(() => fetchArticles(location!, 4, "Society"));
  const {
    data: healthData,
    loading: healthDataLoading,
    error: healthDataError,
  } = useFetch(() => fetchArticles(location!, 4, "Health"));

  const articles = data?.results;
  const sports = sportsData?.results;
  const society = societyData?.results;
  const health = healthData?.results;

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }

    if (sportsDataError) {
      toast.error(sportsDataError.message);
    }

    if (societyDataError) {
      toast.error(societyDataError.message);
    }

    if (healthDataError) {
      toast.error(healthDataError.message);
    }
  }, [error, sportsDataError, societyDataError, healthDataError]);

  return (
    <>
      <section className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-8">
        <span className="font-heading text-center font-semibold text-gray-600 uppercase">
          Welcome to Buzz
        </span>

        <p className="mt-2 max-w-[400px] text-center text-lg font-medium">
          <span className="text-primary font-heading">Real-time</span> news,
          breaking <span className="text-primary font-heading">headlines</span>,
          and <span className="text-primary font-heading">trending</span>{" "}
          stories—all in one place.
        </p>
      </section>

      <section className="mt-14">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Latest News</h1>
          <Link
            to="/articles"
            className="text-primary flex items-center gap-1 text-sm font-semibold hover:underline"
          >
            See all <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="article-card-container mt-4">
          {loading &&
            [0, 1, 2, 3].map((item) => (
              <ArticleCardSekeleton key={`article-card-skeleton-${item}`} />
            ))}
          {articles?.map((data) => <ArticleCard data={data} key={data.uri} />)}
          {articles && articles.length < 1 && (
            <span className="col-span-4 text-center font-semibold">
              No news to show.
            </span>
          )}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Sports</h1>
          <Link
            to="/articles/sports"
            className="text-primary flex items-center gap-1 text-sm font-semibold hover:underline"
          >
            See all <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="article-card-container mt-4">
          {sportsDataLoading &&
            [0, 1, 2, 3].map((item) => (
              <ArticleCardSekeleton key={`article-card-skeleton-${item}`} />
            ))}
          {sports?.map((data) => <ArticleCard data={data} key={data.uri} />)}
          {sports && sports.length < 1 && (
            <span className="col-span-4 text-center font-semibold">
              No news to show.
            </span>
          )}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Society</h1>
          <Link
            to="/articles/society"
            className="text-primary flex items-center gap-1 text-sm font-semibold hover:underline"
          >
            See all <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="article-card-container mt-4">
          {societyDataLoading &&
            [0, 1, 2, 3].map((item) => (
              <ArticleCardSekeleton key={`article-card-skeleton-${item}`} />
            ))}
          {society?.map((data) => <ArticleCard data={data} key={data.uri} />)}
          {society && society.length < 1 && (
            <span className="col-span-4 text-center font-semibold">
              No news to show.
            </span>
          )}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Health</h1>
          <Link
            to="/articles/health"
            className="text-primary flex items-center gap-1 text-sm font-semibold hover:underline"
          >
            See all <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="article-card-container mt-4">
          {healthDataLoading &&
            [0, 1, 2, 3].map((item) => (
              <ArticleCardSekeleton key={`article-card-skeleton-${item}`} />
            ))}
          {health?.map((data) => <ArticleCard data={data} key={data.uri} />)}
          {health && health.length < 1 && (
            <span className="col-span-4 text-center font-semibold">
              No news to show.
            </span>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
