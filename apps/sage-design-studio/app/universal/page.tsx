'use client';

import {
    Button,
    Input,
    Label,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Badge,
    Switch,
    Checkbox,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Separator,
    ScrollArea,
    Skeleton,
    useToast,
} from '@sds/ui';

export default function UniversalPage() {
    const { toast } = useToast();

    return (
        <div className="p-10 space-y-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Universal Component Test (Phase 2 - Complete) ✅</h1>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Cards</h2>
                <div className="grid grid-cols-2 gap-4">
                    {/* Default Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to SDS</CardTitle>
                            <CardDescription>A web-first component library.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>This is a standard card component migrated to @sds/ui. It supports all the nice things like hover effects and proper theming.</p>
                        </CardContent>
                        <CardFooter>
                            <Button>Get Started</Button>
                        </CardFooter>
                    </Card>

                    {/* Glass Card */}
                    <Card variant="glass">
                        <CardHeader>
                            <CardTitle>Glassmorphism</CardTitle>
                            <CardDescription>Premium visual effects.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>This card uses the "glass" variant which applies a backdrop blur and semi-transparent background.</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline">Learn More</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Form Controls</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label htmlFor="airplane-mode">Airplane Mode</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Accept terms and conditions</Label>
                    </div>
                    <div className="w-[180px]">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Scroll Area & Separator</h2>
                <div className="border rounded-md p-4 max-w-sm">
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
                        <p className="text-sm text-gray-500">
                            An open-source UI component library.
                        </p>
                    </div>
                    <Separator className="my-4" />
                    <ScrollArea className="h-24 w-full rounded-md border p-4">
                        <div className="space-y-2">
                            <p>Item 1</p>
                            <Separator />
                            <p>Item 2</p>
                            <Separator />
                            <p>Item 3</p>
                            <Separator />
                            <p>Item 4</p>
                            <Separator />
                            <p>Item 5 (Scroll to see me)</p>
                        </div>
                    </ScrollArea>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Inputs & Labels</h2>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email" />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Badges</h2>
                <div className="flex gap-4 items-center flex-wrap">
                    <Badge variant="default" className="" dot={false} size="md">Default</Badge>
                    <Badge variant="secondary" className="" dot={false} size="md">Secondary</Badge>
                    <Badge variant="destructive" className="" dot={false} size="md">Destructive</Badge>
                    <Badge variant="outline" className="" dot={false} size="md">Outline</Badge>
                    <Badge variant="success" className="" dot={false} size="md">Success</Badge>
                    <Badge variant="warning" className="" dot={false} size="md">Warning</Badge>
                    <Badge variant="error" className="" dot={true} size="md">Error + Dot</Badge>
                    <Badge variant="info" size="sm" className="" dot={false}>Info Small</Badge>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Variants</h2>
                <div className="flex gap-4 items-center">
                    <Button onClick={() => alert('Standard Clicked')}>
                        Default Button
                    </Button>
                    <Button variant="destructive" onClick={() => alert('Destructive Clicked')}>
                        Destructive
                    </Button>
                    <Button variant="outline" onClick={() => alert('Outline Clicked')}>
                        Outline
                    </Button>
                    <Button variant="ghost" onClick={() => alert('Ghost Clicked')}>
                        Ghost
                    </Button>
                    <Button variant="link" onClick={() => alert('Link Clicked')}>
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
                <h2 className="text-lg font-semibold">Skeleton (Loading States)</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Skeleton</CardTitle>
                            <CardDescription>Loading placeholder for cards</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Skeleton className="h-12 w-12 rounded-full" width={48} height={48} style={{}} />
                            <Skeleton className="h-4 w-[250px]" width={250} height={16} style={{}} />
                            <Skeleton className="h-4 w-[200px]" width={200} height={16} style={{}} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>List Skeleton</CardTitle>
                            <CardDescription>Loading placeholder for lists</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-center space-x-4">
                                    <Skeleton className="h-12 w-12 rounded-full" width={48} height={48} style={{}} />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[200px]" width={200} height={16} style={{}} />
                                        <Skeleton className="h-4 w-[150px]" width={150} height={16} style={{}} />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Toast Notifications</h2>
                <div className="flex gap-4 items-center flex-wrap">
                    <Button onClick={() => toast('This is a default toast', 'info')}>
                        Show Info Toast
                    </Button>
                    <Button onClick={() => toast('Success! Everything worked.', 'success')} variant="default">
                        Show Success Toast
                    </Button>
                    <Button onClick={() => toast('Warning: Please check this.', 'warning')} variant="outline">
                        Show Warning Toast
                    </Button>
                    <Button onClick={() => toast('Error: Something went wrong.', 'error')} variant="destructive">
                        Show Error Toast
                    </Button>
                </div>
            </div>
        </div>
    );
}
