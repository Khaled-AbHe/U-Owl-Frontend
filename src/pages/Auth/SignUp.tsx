import { Link, useActionData, useNavigation } from "react-router-dom";
import { UserPlus } from "lucide-react";
import AuthForm from "../../components/Forms/Auth/AuthForm";
import InputField from "../../components/Forms/Auth/InputField";

export default function SignUp() {
  const errorMessage = useActionData() as string | undefined;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <AuthForm
      icon={<UserPlus size={24} />}
      iconClass="signin-icon--user"
      title="Sign Up"
      subtitle="Create your account to get started."
      isSubmitting={isSubmitting}
      error={errorMessage}
      footer={
        <p className="small mb-0 text-center">
          Already have an account? <Link to="/auth/signIn">Sign in</Link>
        </p>
      }
    >
      <InputField
        label="Name"
        name="name"
        placeholder="Enter your name"
      />
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
