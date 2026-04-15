import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  rightText,
}: any) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {rightText && (
          <span className="cursor-pointer text-sm text-red-500">
            {rightText}
          </span>
        )}
      </div>

      <div className="relative">
        <input
          className="w-full rounded-xl border border-gray-300 px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type={isPassword ? (show ? "text" : "password") : type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
