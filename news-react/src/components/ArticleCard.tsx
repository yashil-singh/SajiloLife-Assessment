import { filterCategory } from "@/lib/utils";
import { Article } from "@/types";
import { formatDistanceToNow } from "date-fns";

const ArticleCard = ({ data }: { data: Article }) => {
  const { body, categories, dateTime, image, source, title, url } = data;

  return (
    <div className="overflow-hidden">
      <article className="space-y-3">
        <img
          src={image}
          className="aspect-[1/1] h-full w-full rounded-xl bg-black/10 object-cover"
        />

        <p className="line-clamp-1 text-xs text-gray-500">
          <a
            href={`//www.${source.uri}`}
            target="_blank"
            className="hover:underline"
          >
            {source.title}
          </a>{" "}
          • {formatDistanceToNow(new Date(dateTime))} ago
        </p>

        <a target="_blank" href={url} className="hover:underline">
          <h1 className="font-heading line-clamp-3 font-bold text-ellipsis sm:h-[60px] md:text-sm">
            {title}
          </h1>
        </a>

        <p className="mt-3 line-clamp-4 text-xs text-gray-500 sm:h-[64px]">
          {body}
        </p>

        <p className="text-primary flex items-center gap-2 space-x-1 text-xs font-semibold">
          {filterCategory({ categories })}
        </p>
      </article>
    </div>
  );
};

export default ArticleCard;
