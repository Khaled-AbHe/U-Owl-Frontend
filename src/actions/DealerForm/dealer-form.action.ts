import type ActionReturnMessage from "../../interfaces/action-return.interface";

const RegExpList = {
  phone: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, // Source https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Source: https://medium.com/@python-javascript-php-html-css/the-best-regular-expression-for-email-address-verification-42bf83ba2885
  postal: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i, // Source: https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
  city: /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/, // Source: https://stackoverflow.com/questions/11757013/regular-expressions-for-city-name
};

//// Helpers

// Returns true if the string isnt empty.
function isPresent(value: FormDataEntryValue | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// Returns
function isFieldValid(regex: RegExp, field: string): boolean {
  return regex.test(field.trim());
}

// Dealer Form Action

export async function dealerFormAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();

  const creds = {
    fullName: formData.get("fullName") as string,
    businessName: formData.get("businessName") as string,
    yourEmail: formData.get("yourEmail") as string,
    businessEmail: formData.get("businessEmail") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    city: formData.get("city") as string,
    postalCode: formData.get("postalCode") as string,
  };

  // Makes sure its all present

  if (!isPresent(creds.fullName)) {
    return { type: "error", message: "Your Name is required." };
  }

  if (!isPresent(creds.businessName)) {
    return { type: "error", message: "Business Name is required." };
  }

  if (!isPresent(creds.yourEmail)) {
    return { type: "error", message: "Your Email address is required." };
  }

  if (!isPresent(creds.businessEmail)) {
    return { type: "error", message: "Business Email address is required." };
  }

  if (!isPresent(creds.phoneNumber)) {
    return { type: "error", message: "Phone Number is required." };
  }

  if (!isPresent(creds.city)) {
    return { type: "error", message: "City is required." };
  }

  if (!isPresent(creds.postalCode)) {
    return { type: "error", message: "Postal Code is required." };
  }

  // Validates the fields

  if (!isFieldValid(RegExpList.email, creds.yourEmail)) {
    return { type: "error", message: "Please enter a valid email address for 'Your Email'." };
  }

  if (!isFieldValid(RegExpList.email, creds.businessEmail)) {
    return { type: "error", message: "Please enter a valid business email address." };
  }

  if (!isFieldValid(RegExpList.phone, creds.phoneNumber)) {
    return {
      type: "error",
      message: "Please enter a valid phone number.",
    };
  }

  if (!isFieldValid(RegExpList.city, creds.city)) {
    return { type: "error", message: "Invalid City." };
  }

  if (!isFieldValid(RegExpList.postal, creds.postalCode)) {
    return {
      type: "error",
      message: "Please enter a valid postal code (e.g. H1A 1A1).",
    };
  }

  // ── All validations passed ────────────────────────────────────────────────

  try {
    // TODO: API stuff
    return { type: "success", message: "Application Received!" };
  } catch {
    return { type: "error", message: "Something went wrong. Please try again." };
  }
}
