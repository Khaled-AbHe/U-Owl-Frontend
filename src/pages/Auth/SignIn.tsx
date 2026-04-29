import { useState } from "react";
import { Link, useActionData, useNavigation } from "react-router-dom";
import { Shield, User } from "lucide-react";
import AuthForm from "../../components/Forms/Auth/AuthForm";
import InputField from "../../components/Forms/Auth/InputField";
import "./SignIn.css";

type Mode = "user" | "admin";

export default function SignIn() {
  const [mode, setMode] = useState<Mode>("user");

  // Receives the return value from signInAction (error string or undefined)
  const errorMessage = useActionData() as string | undefined;

  // Tells us when React Router is submitting — used to disable the button
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
      isSubmitting={isSubmitting}
      error={errorMessage}
      header={
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
        isAdmin ? (
          <p className="small mb-0 text-center">
            This session will be logged and monitored.
          </p>
        ) : (
          <p className="small mb-0 text-center">
            Don't have an account? <Link to="/auth/signUp">Sign up</Link>
          </p>
        )
      }
    >
      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="Enter email"
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="Enter password"
      />
    </AuthForm>
  );
}
