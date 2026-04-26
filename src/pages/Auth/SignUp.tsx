import { useState } from "react";
import type { ChangeEvent } from "react";
import { UserPlus } from "lucide-react";
import AuthForm from "../../components/Forms/Auth/AuthForm";
import InputField from "../../components/Forms/Auth/InputField";
import { Link } from "react-router-dom";

type FormState = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitting:", form);
  };

  return (
    <AuthForm
      icon={<UserPlus size={24} />}
      iconClass="signin-icon--user"
      title="Sign Up"
      subtitle="Create your account to get started."
      onSubmit={handleSubmit}
      footer={
        <p className="small mb-0 text-center">
          Already have an account? <Link to="/auth/signin">Sign in</Link>
        </p>
      }
    >
      <InputField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
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
