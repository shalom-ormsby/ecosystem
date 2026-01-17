'use client';

import { Card } from '@sds/ui';

function PlaceholderPage({ title, description }: { title: string; description: string }) {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                    {title}
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
                    {description}
                </p>
            </div>
            <Card className="p-12 text-center text-[var(--color-text-muted)]">
                Coming Soon
            </Card>
        </div>
    );
}

export function DurationPage() {
    return <PlaceholderPage title="Duration" description="Core duration tokens for the design system." />;
}

export function EasingPage() {
    return <PlaceholderPage title="Easing" description="Standard easing curves for natural motion." />;
}

export function TypewriterPage() {
    return <PlaceholderPage title="Typewriter Effect" description="Animated text revealing character by character." />;
}

export function VariableWeightPage() {
    return <PlaceholderPage title="Variable Weight" description="Smooth font-weight transitions using variable fonts." />;
}

export function TargetCursorPage() {
    return <PlaceholderPage title="Target Cursor" description="A cursor that follows the mouse with a lag." />;
}

export function SplashCursorPage() {
    return <PlaceholderPage title="Splash Cursor" description="Liquid splash effects on click." />;
}

export function MagneticPage() {
    return <PlaceholderPage title="Magnetic" description="Elements that stick to the cursor." />;
}
