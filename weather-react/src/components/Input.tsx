import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface InputProps {
  Icon?: LucideIcon;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
}

const Input = ({
  Icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputProps) => {
  return (
    <div className="border-border flex rounded-xl border">
      {Icon && <Icon className="size-6" />}
      <input
        className={twMerge(
          "flex-1 px-4 py-3 text-sm outline-none",
          Icon && "pl-6",
        )}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange && ((e) => onChange(e.target.value))}
      />
    </div>
  );
};

export default Input;
