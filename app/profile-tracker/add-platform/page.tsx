"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { AddPlatformSection } from "@/components/add-platform-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AddPlatformPage() {
  const router = useRouter()
  const [isSuccess, setIsSuccess] = useState(false)
  const [addedPlatform, setAddedPlatform] = useState("")

  const handleAddPlatform = (platformId: string, username: string) => {
    // In a real app, this would connect to your backend
    console.log(`Adding platform ${platformId} with username ${username}`)

    // Simulate success
    setAddedPlatform(getPlatformName(platformId))
    setIsSuccess(true)

    // Redirect after a delay
    setTimeout(() => {
      router.push("/profile-tracker")
    }, 3000)
  }

  const getPlatformName = (id: string): string => {
    const platforms: Record<string, string> = {
      leetcode: "LeetCode",
      codeforces: "Codeforces",
      codechef: "CodeChef",
      hackerrank: "HackerRank",
      atcoder: "AtCoder",
      hackerearth: "HackerEarth",
      spoj: "SPOJ",
      topcoder: "TopCoder",
      geeksforgeeks: "GeeksforGeeks",
    }

    return platforms[id] || id
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/profile-tracker">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Profile
              </Link>
            </Button>
          </div>

          {isSuccess ? (
            <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Platform Connected Successfully!</h2>
                  <p className="text-muted-foreground mb-4">
                    Your {addedPlatform} account has been successfully connected to your CodeMace profile.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Redirecting you back to your profile... If you're not redirected automatically,{" "}
                    <Link href="/profile-tracker" className="text-primary hover:underline">
                      click here
                    </Link>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <AddPlatformSection onAddPlatform={handleAddPlatform} />
          )}
        </div>
      </main>
    </div>
  )
}
