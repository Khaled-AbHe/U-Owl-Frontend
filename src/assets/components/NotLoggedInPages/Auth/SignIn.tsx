import { useState } from "react";
import type { ChangeEvent } from "react";
import AuthForm from "./AuthForm";
import InputField from "./InputField";
import { Link } from "react-router-dom";

type FormState = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Replace with real auth call
    console.log("Signing in:", form);
  };

  return (
    <AuthForm
      title="Sign In"
      subtitle="Welcome back! Please login to your account."
      onSubmit={handleSubmit}
      footer={
        <p className="small mb-0 text-center">
          Don't have an account? <Link to="/auth/signup">Sign up</Link>
        </p>
      }
    >
      <InputField
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter email"
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter password"
      />
    </AuthForm>
  );
}
