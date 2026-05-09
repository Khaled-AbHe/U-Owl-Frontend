// Returns true if the string isnt empty.
export function isPresent(value: FormDataEntryValue | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// Returns true if its valid based on a regex
export function isFieldValid(regex: RegExp, field: string): boolean {
  return regex.test(field.trim());
}

export const RegExpList = {
  phone: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, // Source https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Source: https://medium.com/@python-javascript-php-html-css/the-best-regular-expression-for-email-address-verification-42bf83ba2885
  postal: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i, // Source: https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
  city: /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/, // Source: https://stackoverflow.com/questions/11757013/regular-expressions-for-city-name
  lp: /^[A-NP-Z0-9]{3} [A-NP-Z0-9]{3}$/,
};
