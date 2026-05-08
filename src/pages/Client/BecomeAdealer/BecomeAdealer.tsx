import { useActionData, useNavigation } from "react-router-dom";
import DealerForm from "../../../components/Forms/DealerForm/DealerForm";
import "../../../components/Forms/DealerForm/DealerForm.css";
import type ActionReturnMessage from "../../../interfaces/action-return.interface";

export default function BecomeAdealer() {
  const message = useActionData() as ActionReturnMessage;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="page">
      <div className="page-content">
        {/* Hero section */}
        <div className="text-center mt-5 mb-4">
          <h1 className="fw-bold" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
            Become a Dealer
          </h1>
          <p className="text-muted mx-auto" style={{ maxWidth: "520px", fontSize: "1rem" }}>
            Partner with us and expand your business. Fill out the form below to join the U-Owl
            business.
          </p>
        </div>

        {/* Form card */}
        <div
          className="rounded bg-white p-4 shadow-sm border mx-auto mb-5"
          style={{ width: "520px", maxWidth: "100%" }}
        >
          <DealerForm isSubmitting={isSubmitting} response={!message ? undefined : message} />
        </div>
      </div>
    </div>
  );
}
