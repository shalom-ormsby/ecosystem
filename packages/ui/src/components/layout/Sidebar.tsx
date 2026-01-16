"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Slot } from "@radix-ui/react-slot"

const Sidebar = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { isOpen?: boolean }
>(({ className, children, isOpen = true, ...props }, ref) => (
    <aside
        ref={ref}
        className={cn(
            "fixed top-0 left-0 h-screen w-[280px] bg-background border-r border-border z-40 transition-transform duration-300 transform",
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            className
        )}
        {...props}
    >
        <div className="flex flex-col h-full">{children}</div>
    </aside>
))
Sidebar.displayName = "Sidebar"

const SidebarOverlay = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { isOpen?: boolean; onDismiss?: () => void }
>(({ className, isOpen, onDismiss, ...props }, ref) => {
    if (!isOpen) return null

    return (
        <div
            ref={ref}
            className={cn(
                "fixed inset-0 bg-black/50 z-40 lg:hidden",
                className
            )}
            onClick={onDismiss}
            {...props}
        />
    )
})
SidebarOverlay.displayName = "SidebarOverlay"

const SidebarHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center justify-between px-4 py-4 border-b border-border", className)}
        {...props}
    />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex-1 min-h-0 overflow-y-auto py-4 px-3", className)}
        {...props}
    />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("px-4 py-4 space-y-3", className)}
        {...props}
    />
))
SidebarFooter.displayName = "SidebarFooter"

interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean
    icon?: React.ReactNode
    showIcon?: boolean
    depth?: number
    hasChildren?: boolean
    isExpanded?: boolean
    asChild?: boolean
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
    ({
        className,
        isActive,
        icon,
        showIcon = true,
        depth = 0,
        hasChildren,
        isExpanded,
        children,
        asChild = false,
        ...props
    }, ref) => {
        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                ref={ref}
                className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-md",
                    isActive
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    depth === 0 && !isActive ? "font-medium text-foreground" : "",
                    className
                )}
                style={{ paddingLeft: `${12 + depth * 16}px` }}
                {...props}
            >
                {hasChildren && (
                    <svg
                        className={cn(
                            "w-4 h-4 flex-shrink-0 transition-transform",
                            isExpanded ? "rotate-90" : ""
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                )}
                {!hasChildren && depth > 0 && <span className="w-4 flex-shrink-0" />}
                {showIcon && icon && <span className="flex-shrink-0">{icon}</span>}
                <span className="flex-1 text-left truncate">{children}</span>
            </Comp>
        )
    }
)
SidebarItem.displayName = "SidebarItem"

export {
    Sidebar,
    SidebarOverlay,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarItem,
}
