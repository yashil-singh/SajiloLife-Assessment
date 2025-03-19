import ArticleCard from "@/components/ArticleCard";
import ArticleCardSekeleton from "@/components/ArticleCardSekeleton";
import Pagination from "@/components/Pagination";
import useFetch from "@/hooks/useFetch";
import useLocation from "@/hooks/useLocationContext";
import { fetchArticles } from "@/services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Articles = () => {
  const { category } = useParams();
  const { location } = useLocation();

  const filteredCategory = category
    ? category?.charAt(0).toUpperCase() + category?.slice(1)
    : undefined;

  const [page, setPage] = useState(1);

  const { data, loading, error, fetchData } = useFetch(() =>
    fetchArticles(location!, 12, filteredCategory, page),
  );

  const articles = data?.results;

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <h1 className="text-xl font-bold capitalize">
        {category ? category : "Articles"}
      </h1>

      {loading && (
        <div className="article-card-container mt-4">
          {[0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
            (item) => (
              <ArticleCardSekeleton key={`article-card-skeleton-${item}`} />
            ),
          )}
        </div>
      )}

      {!loading && data && (
        <>
          <div className="article-card-container mt-4">
            {articles?.map((article) => (
              <ArticleCard key={article.uri} data={article} />
            ))}
            {articles!.length < 1 && (
              <span className="col-span-4 mt-5 text-center font-semibold">
                There are no news to show.
              </span>
            )}
          </div>
          <div className="mt-12">
            {articles!.length > 0 && (
              <Pagination
                page={page}
                pages={data.pages}
                onPageChange={(page) => setPage(page)}
                className="mx-auto max-w-xl"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Articles;
