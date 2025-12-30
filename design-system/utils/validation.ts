/**
 * Form Validation Utilities
 *
 * Simple validation helpers for form fields.
 * Works seamlessly with FormField and other form components.
 */

export type ValidationRule = {
  validate: (value: any) => boolean;
  message: string;
};

export type FieldValidation = {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  custom?: ValidationRule[];
};

export type FormErrors = Record<string, string | undefined>;

/**
 * Common validation patterns
 */
export const patterns = {
  email: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address',
  },
  url: {
    value: /^https?:\/\/.+\..+/,
    message: 'Invalid URL',
  },
  phone: {
    value: /^[\d\s\-\+\(\)]+$/,
    message: 'Invalid phone number',
  },
  alphanumeric: {
    value: /^[a-zA-Z0-9]+$/,
    message: 'Only letters and numbers allowed',
  },
  noSpaces: {
    value: /^\S+$/,
    message: 'Spaces are not allowed',
  },
};

/**
 * Validate a single field value against validation rules
 *
 * @param value - The field value to validate
 * @param rules - Validation rules to apply
 * @returns Error message if validation fails, undefined if valid
 *
 * @example
 * ```tsx
 * const error = validateField(email, {
 *   required: true,
 *   pattern: patterns.email
 * });
 * ```
 */
export function validateField(
  value: any,
  rules: FieldValidation
): string | undefined {
  // Required check
  if (rules.required) {
    const isEmpty =
      value === undefined ||
      value === null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0);

    if (isEmpty) {
      return typeof rules.required === 'string'
        ? rules.required
        : 'This field is required';
    }
  }

  // Skip other validations if value is empty and not required
  if (!value && !rules.required) {
    return undefined;
  }

  // Min length check
  if (rules.minLength && value.length < rules.minLength.value) {
    return rules.minLength.message;
  }

  // Max length check
  if (rules.maxLength && value.length > rules.maxLength.value) {
    return rules.maxLength.message;
  }

  // Pattern check
  if (rules.pattern && !rules.pattern.value.test(value)) {
    return rules.pattern.message;
  }

  // Custom validations
  if (rules.custom) {
    for (const rule of rules.custom) {
      if (!rule.validate(value)) {
        return rule.message;
      }
    }
  }

  return undefined;
}

/**
 * Validate all fields in a form
 *
 * @param values - Object containing all form field values
 * @param validations - Object containing validation rules for each field
 * @returns Object containing errors for each field
 *
 * @example
 * ```tsx
 * const errors = validateForm(
 *   { email: 'test', password: '123' },
 *   {
 *     email: { required: true, pattern: patterns.email },
 *     password: { required: true, minLength: { value: 8, message: 'Min 8 chars' } }
 *   }
 * );
 * // errors = { email: 'Invalid email address', password: 'Min 8 chars' }
 * ```
 */
export function validateForm(
  values: Record<string, any>,
  validations: Record<string, FieldValidation>
): FormErrors {
  const errors: FormErrors = {};

  for (const [field, rules] of Object.entries(validations)) {
    const error = validateField(values[field], rules);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}

/**
 * Check if form has any errors
 *
 * @param errors - Form errors object
 * @returns true if there are any errors
 *
 * @example
 * ```tsx
 * if (hasErrors(errors)) {
 *   console.log('Form has errors');
 * }
 * ```
 */
export function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((error) => error !== undefined);
}

/**
 * Common validation rule builders
 */
export const rules = {
  required: (message = 'This field is required'): FieldValidation => ({
    required: message,
  }),

  email: (message = 'Invalid email address'): FieldValidation => ({
    pattern: { value: patterns.email.value, message },
  }),

  minLength: (length: number, message?: string): FieldValidation => ({
    minLength: {
      value: length,
      message: message || `Minimum ${length} characters required`,
    },
  }),

  maxLength: (length: number, message?: string): FieldValidation => ({
    maxLength: {
      value: length,
      message: message || `Maximum ${length} characters allowed`,
    },
  }),

  match: (
    otherValue: any,
    message = 'Values do not match'
  ): FieldValidation => ({
    custom: [
      {
        validate: (value) => value === otherValue,
        message,
      },
    ],
  }),
};
