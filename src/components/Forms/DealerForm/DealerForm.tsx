import type ActionReturnMessage from "../../../interfaces/action-return.interface";
import InputField from "../Auth/InputField";
import { Form } from "react-router-dom";

interface DealerFormProps {
  isSubmitting: boolean;
  response: undefined | ActionReturnMessage;
}

export default function DealerForm({ isSubmitting = false, response }: DealerFormProps) {
  if (response === undefined || response.type == "error") {
    return (
      <Form method="POST" className="dealer-form">
        <div className="dealer-form__grid">
          <div className="dealer-form__field dealer-form__field--half">
            <InputField label="Your Name" name="fullName" type="text" placeholder="John Doe" />
          </div>

          <div className="dealer-form__field dealer-form__field--half">
            <InputField
              label="Business Name"
              name="businessName"
              type="text"
              placeholder="John Inc."
            />
          </div>

          <div className="dealer-form__field dealer-form__field--half">
            <InputField
              label="Your Email"
              name="yourEmail"
              type="email"
              placeholder="contact@gmail.com"
            />
          </div>

          <div className="dealer-form__field dealer-form__field--half">
            <InputField
              label="Business Email"
              name="businessEmail"
              type="email"
              placeholder="contact@yourbusiness.com"
            />
          </div>

          <div className="dealer-form__field dealer-form__field--full">
            <InputField
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              placeholder="(555) 000-0000"
            />
          </div>

          <div className="dealer-form__field dealer-form__field--half">
            <InputField label="City" name="city" type="text" placeholder="e.g. Montreal" />
          </div>

          <div className="dealer-form__field dealer-form__field--half">
            <InputField
              label="Postal Code"
              name="postalCode"
              type="text"
              placeholder="e.g. H1A 1A1"
            />
          </div>

          {/* This will only activate if its an error message */}
          {response?.message && (
            <div className="dealer-form__field dealer-form__field--full">
              <div className="alert alert-danger py-2 small mt-2 text-center" role="alert">
                {response.message}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-brand fw-semibold w-100 mt-2"
        >
          {isSubmitting ? "Submitting…" : "Submit Application"}
        </button>
      </Form>
    );
  } else if (response.type == "success") {
    return (
      <div className="dealer-form__success">
        <div className="dealer-form__success-icon">✓</div>
        <h3 className="dealer-form__success-title">{response.message}</h3>
        <p className="dealer-form__success-text">
          Thank you for your interest in becoming a dealer. Our team will review your application
          and reach out to you shortly.
        </p>
      </div>
    );
  }
}
