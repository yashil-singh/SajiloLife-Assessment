import { twMerge } from "tailwind-merge";

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "h-4 w-14 animate-pulse rounded-xl bg-black/10",
        className,
      )}
    ></div>
  );
};

export default Skeleton;
