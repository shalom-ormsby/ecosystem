'use client';

import { Button } from '@sds/ui';
import { LocalUniversalButton } from '../components/LocalUniversalButton';

export default function UniversalPage() {
    return (
        <div className="p-10 space-y-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Universal Component Test (Phase 2)</h1>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Variants</h2>
                <div className="flex gap-4 items-center">
                    <Button onPress={() => alert('Standard Pressed')}>
                        Default Button
                    </Button>
                    <Button variant="destructive" onPress={() => alert('Destructive Pressed')}>
                        Destructive
                    </Button>
                    <Button variant="outline" onPress={() => alert('Outline Pressed')}>
                        Outline
                    </Button>
                    <Button variant="ghost" onPress={() => alert('Ghost Pressed')}>
                        Ghost
                    </Button>
                    <Button variant="link" onPress={() => alert('Link Pressed')}>
                        Link
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Sizes</h2>
                <div className="flex gap-4 items-center">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Local Copy (Internal to App)</h2>
                <div className="flex gap-4 items-center">
                    <LocalUniversalButton>Local Button</LocalUniversalButton>
                    <LocalUniversalButton variant="destructive">Local Destructive</LocalUniversalButton>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Debug Probe (Standard HTML)</h2>
                <div className="flex gap-4">
                    <button className="bg-red-500 text-white p-4 rounded hover:bg-red-700">
                        Tailwind HTML Button
                    </button>
                    <div className="bg-blue-500 text-white p-4 rounded">
                        Tailwind Div
                    </div>
                </div>
            </div>
        </div>
    );
}
