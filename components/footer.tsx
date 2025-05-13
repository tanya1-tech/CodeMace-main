import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">
              Code<span className="text-primary">Mace</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Track your coding journey, manage sheets, and monitor contests all in one place.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-accent hover:text-accent/80 hover:bg-accent/10"
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary hover:text-primary/80 hover:bg-primary/10"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-secondary hover:text-secondary/80 hover:bg-secondary/10"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link href="mailto:contact@codemace.com">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                >
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/profile-tracker"
                  className="text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary"
                >
                  Profile Tracker
                </Link>
              </li>
              <li>
                <Link
                  href="/question-tracker"
                  className="text-muted-foreground hover:text-secondary dark:text-muted-foreground dark:hover:text-secondary"
                >
                  Question Tracker
                </Link>
              </li>
              <li>
                <Link
                  href="/event-tracker"
                  className="text-muted-foreground hover:text-accent dark:text-muted-foreground dark:hover:text-accent"
                >
                  Event Tracker
                </Link>
              </li>
              <li>
                <Link
                  href="/sheets"
                  className="text-muted-foreground hover:text-success dark:text-muted-foreground dark:hover:text-success"
                >
                  Coding Sheets
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-muted-foreground hover:text-secondary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-accent">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-success">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input type="email" placeholder="Enter your email" className="h-9" />
              <Button className="h-9 gradient-primary border-0 hover:opacity-90">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CodeMace. All rights reserved.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="text-primary font-medium">T</span>race •
              <span className="text-secondary font-medium">A</span>ssess •
              <span className="text-accent font-medium">S</span>howcase
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-secondary">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-accent">
                Cookie Policy
              </Link>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
            <p>Made with</p>
            <Heart className="mx-1 h-4 w-4 text-destructive" />
            <p>for developers</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
