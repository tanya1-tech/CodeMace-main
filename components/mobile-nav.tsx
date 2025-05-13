"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "./logo"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Profile Tracker", path: "/profile-tracker" },
    { name: "Question Tracker", path: "/question-tracker" },
    { name: "Event Tracker", path: "/event-tracker" },
    { name: "Sheets", path: "/sheets" },
    { name: "Feedback", path: "/feedback" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] pr-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b py-4">
            <Logo />
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="mr-2">
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-4 py-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setOpen(false)}
                className={`px-6 py-3 text-base font-medium transition-colors ${
                  pathname === item.path
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t py-6 px-6">
            <div className="flex flex-col gap-4">
              <Link href="/sign-in" onClick={() => setOpen(false)}>
                <Button className="w-full gradient-primary border-0 hover:opacity-90">Login</Button>
              </Link>
              <Link href="/sign-up" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
