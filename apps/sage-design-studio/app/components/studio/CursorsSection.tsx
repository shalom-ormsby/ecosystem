'use client';

import { Card } from '@sds/ui';

export function CursorsSection() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    Cursor Effects
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)]">
                    Custom cursor effects to add flair and follow feedback.
                </p>
            </div>
            <Card className="p-12 text-center text-[var(--color-text-muted)]">
                Coming Soon
            </Card>
        </div>
    );
}
