'use client';

import Link from 'next/link';
import { Button } from '@sds/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <div className="max-w-md w-full px-6 py-12 text-center">
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
            <h1 className="text-6xl font-bold text-[var(--color-text-primary)]">404</h1>
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
              Page Not Found
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button variant="default" size="lg" asChild>
              <Link href="/">
                Go to Homepage
              </Link>
            </Button>
            <Link href="/#actions">
              <Button variant="outline" size="lg">
                Browse Components
              </Button>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="pt-8 border-t border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-muted)] mb-3">
              Popular sections:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/#tokens"
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                Design Tokens
              </Link>
              <span className="text-[var(--color-text-muted)]">•</span>
              <Link
                href="/#atoms"
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                Atoms
              </Link>
              <span className="text-[var(--color-text-muted)]">•</span>
              <Link
                href="/#molecules"
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                Molecules
              </Link>
              <span className="text-[var(--color-text-muted)]">•</span>
              <Link
                href="/#motion"
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                Motion System
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
