import type { InputHTMLAttributes } from "react";

type Props = {
  label: string | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({ label, ...props }: Props) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input className="form-control" {...props} />
    </div>
  );
}
