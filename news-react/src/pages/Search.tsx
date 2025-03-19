import ArticleCard from "@/components/ArticleCard";
import ArticleCardSekeleton from "@/components/ArticleCardSekeleton";
import Input from "@/components/Input";
import Pagination from "@/components/Pagination";
import useFetch from "@/hooks/useFetch";
import { fetchArticles } from "@/services/api";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);

  const { data, loading, error, fetchData, reset } = useFetch(
    () =>
      fetchArticles(
        (searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1))
          .split(" ")
          .join("_"),
        12,
        undefined,
        page,
      ),
    false,
  );

  const articles = data?.results;

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await fetchData();
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchData();
    }
  }, [page]);

  return (
    <div>
      <Input
        Icon={SearchIcon}
        placeholder="Search..."
        value={searchQuery}
        onChange={(value) => setSearchQuery(value)}
      />

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
          <h1 className="mt-4 text-xl font-bold capitalize">
            Articles related to '{searchQuery}'
          </h1>
          <div className="article-card-container mt-4">
            {articles?.map((article) => (
              <ArticleCard key={article.uri} data={article} />
            ))}
            {articles!.length < 1 && (
              <span className="col-span-4 mt-5 text-center font-semibold">
                No search results found.
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

export default Search;
