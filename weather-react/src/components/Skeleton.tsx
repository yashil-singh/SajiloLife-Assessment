import { twMerge } from "tailwind-merge";

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "h-4 w-12 animate-pulse rounded-xl bg-gray-200",
        className,
      )}
    ></div>
  );
};

export default Skeleton;
