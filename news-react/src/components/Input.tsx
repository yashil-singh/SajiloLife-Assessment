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
    <div className="border-border focus-within:ring-primary flex items-center rounded-xl border pl-2 ring-offset-2 focus-within:ring-2">
      {Icon && <Icon className="text-primary size-6" />}
      <input
        className={twMerge(
          "flex-1 px-4 py-3 text-sm outline-none",
          Icon && "pl-2",
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
