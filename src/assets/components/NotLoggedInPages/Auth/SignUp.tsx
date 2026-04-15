import { useState } from "react";
import AuthForm from "./AuthForm";
import InputField from "./InputField";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ email, password, confirm });
  };

  return (
    <AuthForm
      title="Create Account"
      subtitle="Get started with your account"
      onSubmit={handleSubmit}
      footer={
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/auth/signin" className="cursor-pointer text-blue-600">
            Sign In
          </Link>
        </p>
      }
    >
      <InputField
        label="Email address"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
      />

      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••"
      />

      <InputField
        label="Confirm Password"
        type="password"
        value={confirm}
        onChange={setConfirm}
        placeholder="••••••••"
      />
    </AuthForm>
  );
}
