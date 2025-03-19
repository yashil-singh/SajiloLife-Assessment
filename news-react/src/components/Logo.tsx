import { twMerge } from "tailwind-merge";
import logo from "@/assets/logo.png";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge("font-special text-primary relative", className)}>
      <img src={logo} className="absolute -top-2 -left-6 size-7 -rotate-12" />
      <span>Buzz</span>
    </div>
  );
};

export default Logo;
