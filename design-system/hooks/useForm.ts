'use client';

import { useState, useCallback } from 'react';
import type { FieldValidation, FormErrors } from '../utils/validation';
import { validateField, validateForm } from '../utils/validation';

export interface UseFormOptions<T> {
  /**
   * Initial form values
   */
  initialValues: T;

  /**
   * Validation rules for each field
   */
  validations?: Partial<Record<keyof T, FieldValidation>>;

  /**
   * Callback fired when form is submitted and valid
   */
  onSubmit?: (values: T) => void | Promise<void>;

  /**
   * When to validate fields
   * @default 'onBlur'
   */
  validateOn?: 'onChange' | 'onBlur' | 'onSubmit';
}

export interface UseFormReturn<T> {
  /**
   * Current form values
   */
  values: T;

  /**
   * Current form errors
   */
  errors: FormErrors;

  /**
   * Whether the form is currently submitting
   */
  isSubmitting: boolean;

  /**
   * Whether the form has been touched/modified
   */
  isDirty: boolean;

  /**
   * Set value for a specific field
   */
  setValue: (name: keyof T, value: any) => void;

  /**
   * Set error for a specific field
   */
  setError: (name: keyof T, error: string | undefined) => void;

  /**
   * Handle input change event
   */
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;

  /**
   * Handle input blur event
   */
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;

  /**
   * Handle form submit
   */
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;

  /**
   * Reset form to initial values
   */
  reset: () => void;

  /**
   * Manually validate all fields
   */
  validate: () => boolean;

  /**
   * Get props for a field (value, onChange, onBlur, error)
   */
  getFieldProps: (name: keyof T) => {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    error: boolean;
  };
}

/**
 * useForm Hook
 *
 * A lightweight form state management hook with built-in validation.
 *
 * Features:
 * - Field-level validation
 * - Configurable validation timing (onChange, onBlur, onSubmit)
 * - Dirty state tracking
 * - Submit handling with loading state
 * - Helper functions for common patterns
 *
 * Example:
 * ```tsx
 * const form = useForm({
 *   initialValues: { email: '', password: '' },
 *   validations: {
 *     email: { required: true, pattern: patterns.email },
 *     password: { required: true, minLength: { value: 8, message: 'Min 8 chars' } }
 *   },
 *   onSubmit: async (values) => {
 *     await login(values);
 *   }
 * });
 *
 * return (
 *   <form onSubmit={form.handleSubmit}>
 *     <FormField label="Email" error={form.errors.email}>
 *       <TextField {...form.getFieldProps('email')} />
 *     </FormField>
 *     <Button type="submit" loading={form.isSubmitting}>Submit</Button>
 *   </form>
 * );
 * ```
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  validations = {},
  onSubmit,
  validateOn = 'onBlur',
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  }, []);

  const setError = useCallback((name: keyof T, error: string | undefined) => {
    setErrors((prev) => ({ ...prev, [name as string]: error }));
  }, []);

  const validateFieldByName = useCallback(
    (name: keyof T) => {
      const fieldRules = validations[name];
      if (!fieldRules) return;

      const error = validateField(values[name], fieldRules);
      setError(name, error);
      return !error;
    },
    [values, validations, setError]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

      setValue(name as keyof T, fieldValue);

      if (validateOn === 'onChange') {
        validateFieldByName(name as keyof T);
      }
    },
    [setValue, validateOn, validateFieldByName]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;

      if (validateOn === 'onBlur') {
        validateFieldByName(name as keyof T);
      }
    },
    [validateOn, validateFieldByName]
  );

  const validate = useCallback(() => {
    const formErrors = validateForm(values, validations as any);
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }, [values, validations]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();

      const isValid = validate();
      if (!isValid) return;

      if (onSubmit) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [validate, onSubmit, values]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsDirty(false);
    setIsSubmitting(false);
  }, [initialValues]);

  const getFieldProps = useCallback(
    (name: keyof T) => ({
      name: name as string,
      value: values[name] ?? '',
      onChange: handleChange,
      onBlur: handleBlur,
      error: !!errors[name as string],
    }),
    [values, errors, handleChange, handleBlur]
  );

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    setValue,
    setError,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    validate,
    getFieldProps,
  };
}
