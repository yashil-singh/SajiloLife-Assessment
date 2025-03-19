import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { twMerge } from "tailwind-merge";

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (newPage: number) => void;
  className?: string;
}

const Pagination = ({
  page,
  pages,
  onPageChange,
  className,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pagesArray: (number | string)[] = [];

    if (pages <= maxPagesToShow) {
      return [...Array(pages)].map((_, i) => i + 1);
    }
    pagesArray.push(1);

    if (page > 3) {
      pagesArray.push("...");
    }

    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(pages - 1, page + 1);
      i++
    ) {
      pagesArray.push(i);
    }

    if (page < pages - 2) {
      pagesArray.push("...");
    }

    pagesArray.push(pages);

    return pagesArray;
  };

  return (
    <div
      className={twMerge(
        "mt-4 flex flex-wrap items-center justify-center gap-2",
        className,
      )}
    >
      {/* Previous Button */}
      <Button
        variant="ghost"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft />
      </Button>

      {/* Page Numbers */}
      {getPageNumbers().map((pageNumber, index) =>
        pageNumber === "..." ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <Button
            key={index}
            variant={page === pageNumber ? "default" : "ghost"}
            onClick={() => onPageChange(pageNumber as number)}
            className="px-4"
          >
            {pageNumber}
          </Button>
        ),
      )}

      {/* Next Button */}
      <Button
        variant="ghost"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
