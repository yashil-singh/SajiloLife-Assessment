import logo from "@/assets/logo.png";
import { twMerge } from "tailwind-merge";

const Logo = ({ className }: { className?: string }) => {
  return (
    <span>
      <img src={logo} className={twMerge("size-14", className)} />
    </span>
  );
};

export default Logo;
