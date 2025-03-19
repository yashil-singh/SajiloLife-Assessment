import Skeleton from "./Skeleton";

const ArticleCardSekeleton = () => {
  return (
    <div className="group w-full space-y-4">
      {/* Image */}
      <Skeleton className="h-[200px] w-full" />

      {/* Source and posted time */}
      <div className="flex gap-4">
        <Skeleton className="h-2" />
        <Skeleton className="h-2" />
      </div>

      {/* Title */}
      <div className="w-full space-y-2">
        <Skeleton className="w-full" />
        <Skeleton className="w-[50%]" />
      </div>

      {/* Body */}
      <div className="w-full space-y-2">
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-[50%]" />
      </div>

      {/* Category */}
      <Skeleton className="h-2" />
    </div>
  );
};

export default ArticleCardSekeleton;
