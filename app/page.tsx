import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { BarChart3, Trophy, FileText, ArrowRight, Code, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-8 md:py-16 lg:py-24 overflow-hidden relative">
          <div className="absolute inset-0 gradient-hero opacity-10"></div>
          <div className="container mx-auto px-4 max-w-6xl relative">
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                    Your <span className="text-primary">All-in-One</span> Coding Portfolio
                  </h1>
                  <div className="mt-2 mb-4 inline-flex items-center bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-2 rounded-lg border border-primary/10 tagline-highlight">
                    <span className="text-lg md:text-xl font-semibold">
                      <span className="text-primary font-bold">T</span>race •
                      <span className="text-secondary font-bold">A</span>ssess •
                      <span className="text-accent font-bold">S</span>howcase
                    </span>
                  </div>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Track your coding journey, manage sheets, and monitor contests all in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link href="/profile-tracker">
                    <Button className="gradient-primary border-0 hover:opacity-90 w-full sm:w-auto">
                      Try Profile Tracker <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
                    >
                      Sign Up Free
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center mt-8 lg:mt-0">
                <div className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px]">
                  <div className="absolute inset-0 rounded-full bg-secondary/10 blur-3xl"></div>
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=Hero"
                    width={400}
                    height={400}
                    alt="Hero illustration"
                    className="mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-16 lg:py-24 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  All in One Coding Profile
                </h2>
                <div className="inline-flex items-center justify-center bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-lg border border-primary/10 mb-4 tagline-highlight">
                  <span className="text-base md:text-lg font-medium">
                    <span className="text-primary font-bold">T</span>race •
                    <span className="text-secondary font-bold">A</span>ssess •
                    <span className="text-accent font-bold">S</span>howcase
                  </span>
                </div>
                <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Showcase your complete coding portfolio, track all stats, and share your progress effortlessly in one
                  place.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 card-hover bg-gradient-to-br from-white to-primary/5 dark:from-gray-800 dark:to-primary/20">
                <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Track Progress</h3>
                <p className="text-center text-muted-foreground dark:text-gray-300">
                  Monitor your coding journey with detailed statistics and visualizations.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 card-hover bg-gradient-to-br from-white to-secondary/5 dark:from-gray-800 dark:to-secondary/20">
                <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-secondary">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Coding Sheets</h3>
                <p className="text-center text-muted-foreground dark:text-gray-300">
                  Organize questions, notes, and follow popular coding sheets in one place.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 card-hover bg-gradient-to-br from-white to-accent/5 dark:from-gray-800 dark:to-accent/20 sm:col-span-2 md:col-span-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-accent">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Contest Tracker</h3>
                <p className="text-center text-muted-foreground dark:text-gray-300">
                  Stay on top of coding contests by tracking schedules and setting reminders.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="flex justify-center order-2 lg:order-1 mt-8 lg:mt-0">
                <div className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px]">
                  <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl"></div>
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=Community"
                    width={400}
                    height={400}
                    alt="Community illustration"
                    className="mx-auto"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                    Join Our <span className="text-accent">Community</span>
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Connect with fellow coders, share your progress, and learn from others.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                      <Code className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <h3 className="font-bold">Collaborative Learning</h3>
                      <p className="text-sm text-muted-foreground">
                        Share solutions and learn different approaches to problems.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
                      <Users className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <h3 className="font-bold">Peer Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Get help from experienced developers in our community.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link href="/sign-up">
                    <Button className="gradient-accent border-0 hover:opacity-90 w-full sm:w-auto">
                      Join Community <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
