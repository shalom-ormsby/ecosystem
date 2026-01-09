'use client';

import { useEffect } from 'react';
import { Button } from '@sds/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <div className="max-w-md w-full py-12 text-center">
        <div className="space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-[var(--color-error)] bg-opacity-10 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[var(--color-error)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">
              Something went wrong
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              An unexpected error occurred while loading this page. Please try again.
            </p>
            {error.message && (
              <details className="mt-4 text-left">
                <summary className="text-sm text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text-secondary)]">
                  Technical details
                </summary>
                <pre className="mt-2 p-3 bg-[var(--color-surface)] rounded text-xs overflow-x-auto text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                  {error.message}
                </pre>
              </details>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button variant="default" size="lg" onClick={reset}>
              Try Again
            </Button>
            <a href="/#overview">
              <Button variant="outline" size="lg">
                Go to Homepage
              </Button>
            </a>
          </div>

          {/* Help Text */}
          <p className="text-sm text-[var(--color-text-muted)] pt-4">
            If this problem persists, please{' '}
            <a
              href="https://github.com/shalom-ormsby/ecosystem/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] hover:underline"
            >
              report an issue
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
