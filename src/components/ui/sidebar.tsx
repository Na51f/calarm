"use client"

import type * as React from "react"
import { createContext, useContext, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const SidebarContext = createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
  open: true,
  setOpen: (value) => {
    console.warn("SidebarContext.setOpen was called before being initialized by SidebarProvider");
    // This is a placeholder implementation that will be replaced
    // when the actual context provider is used
    return typeof value === "function" ? value(true) : value;
  },
})

export function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <div className="flex h-full">{children}</div>
    </SidebarContext.Provider>
  )
}

const sidebarVariants = cva("h-full overflow-y-auto flex flex-col border-r bg-background transition-all duration-300", {
  variants: {
    open: {
      true: "w-64",
      false: "w-0",
    },
  },
  defaultVariants: {
    open: true,
  },
})

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const { open } = useContext(SidebarContext)

  return <div className={cn(sidebarVariants({ open }), className)} {...props} />
}

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("shrink-0", className)} {...props} />
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-auto", className)} {...props} />
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("shrink-0", className)} {...props} />
}

export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 py-1", className)} {...props} />
}

export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 py-1", className)} {...props} />
}

export function SidebarMenuButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent", className)}
      {...props}
    />
  )
}

export function SidebarSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-2 my-2 h-px bg-border", className)} {...props} />
}

export function SidebarRail({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("absolute left-0 top-0 h-full w-1 bg-transparent transition-colors hover:bg-border", className)}
      {...props}
    />
  )
}

export function SidebarInset({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useContext(SidebarContext)

  return (
    <div
      className={cn(
        "flex h-full flex-1 flex-col overflow-auto transition-all duration-300",
        open ? "ml-64" : "ml-0",
        className,
      )}
      {...props}
    />
  )
}

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useContext(SidebarContext)

  return (
    <button
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="9" x2="9" y1="3" y2="21" />
      </svg>
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
}

