import { useState } from "react";
import AuthForm from "./AuthForm";
import InputField from "./InputField";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  return (
    <AuthForm
      title="Sign In"
      subtitle="Sign in to your account to continue"
      onSubmit={handleSubmit}
      footer={
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="cursor-pointer text-red-500">
            Create one
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
        rightText="Forgot password?"
      />

      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        Remember me for 30 days
      </label>
    </AuthForm>
  );
}
