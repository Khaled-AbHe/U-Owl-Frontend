import type { InputHTMLAttributes } from "react";

type Props = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({ label, ...props }: Props) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input className="form-control" {...props} />
    </div>
  );
}
