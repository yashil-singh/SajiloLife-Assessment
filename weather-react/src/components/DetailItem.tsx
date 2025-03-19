import { LucideIcon } from "lucide-react";

interface DetailItemProps {
  title: string;
  Icon: LucideIcon;
  value: string;
  metric?: string;
}

const DetailItem = ({ Icon, title, value, metric }: DetailItemProps) => {
  return (
    <div className="flex flex-col items-center">
      <span className="flex w-full max-w-[150px] items-center justify-center gap-2 rounded-full bg-white/20 px-3 py-2 font-bold">
        <Icon className="size-6" />
        {title}
      </span>

      <p className="mt-2 text-2xl font-semibold">
        {value} {metric && <span className="text-foreground/50">{metric}</span>}
      </p>
    </div>
  );
};

export default DetailItem;
