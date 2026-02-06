"use client";
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "../../lib/utils"

const ScrollArea = (
    {
        ref,
        className,
        children,
        ...props
    }: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
        ref?: React.Ref<React.ElementRef<typeof ScrollAreaPrimitive.Root>>;
    }
) => (<ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
</ScrollAreaPrimitive.Root>)

const ScrollBar = (
    {
        ref,
        className,
        orientation = "vertical",
        ...props
    }: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar> & {
        ref?: React.Ref<React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>>;
    }
) => (<ScrollAreaPrimitive.Scrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
    )}
    {...props}
>
    <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border" />
</ScrollAreaPrimitive.Scrollbar>)

export { ScrollArea, ScrollBar }
