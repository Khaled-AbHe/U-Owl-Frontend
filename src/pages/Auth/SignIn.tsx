import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Shield, User } from "lucide-react";
import AuthForm from "../../components/Forms/Auth/AuthForm";
import InputField from "../../components/Forms/Auth/InputField";
import "./SignIn.css";

type Mode = "user" | "admin";

type FormState = {
  email: string;
  password: string;
  adminCode: string;
};

export default function SignIn() {
  const [mode, setMode] = useState<Mode>("user");
  const [form, setForm] = useState<FormState>({ email: "", password: "", adminCode: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (mode === "admin") {
      console.log("Admin sign in:", { email: form.email, adminCode: form.adminCode });
    } else {
      console.log("User sign in:", { email: form.email });
    }
  };

  const isAdmin = mode === "admin";

  return (
    <AuthForm
      icon={isAdmin ? <Shield size={24} /> : <User size={24} />}
      iconClass={isAdmin ? "signin-icon--admin" : "signin-icon--user"}
      title="Sign In"
      subtitle={
        isAdmin
          ? "Restricted access. Admin credentials required."
          : "Welcome back! Please login to your account."
      }
      onSubmit={handleSubmit}
      header={
        /* Mode toggle tabs */
        <div className="signin-tabs mb-4">
          <button
            type="button"
            className={`signin-tab ${!isAdmin ? "signin-tab--active" : ""}`}
            onClick={() => setMode("user")}
          >
            <User size={15} className="me-1" />
            User
          </button>
          <button
            type="button"
            className={`signin-tab signin-tab--admin ${isAdmin ? "signin-tab--active signin-tab--active-admin" : ""}`}
            onClick={() => setMode("admin")}
          >
            <Shield size={15} className="me-1" />
            Admin
          </button>
        </div>
      }
      footer={
        isAdmin ? 
          <p className="small mb-0 text-center">
            This session will be logged and monitored.
          </p> 
        :
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
