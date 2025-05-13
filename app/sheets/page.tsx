"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Laptop, BookOpen, BarChart, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Sheets() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
          <div className="grid md:grid-cols-[240px_1fr] gap-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Laptop className="h-5 w-5" />
                <h2 className="font-semibold">My Workspace</h2>
              </div>

              <div className="space-y-1">
                <Link
                  href="/sheets"
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-primary"
                >
                  <FileText className="h-4 w-4" />
                  <span>Explore Sheets</span>
                </Link>
                <Link
                  href="/my-sheets"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted"
                >
                  <FileText className="h-4 w-4" />
                  <span>My Sheets</span>
                  <Lock className="h-3 w-3 ml-auto" />
                </Link>
                <Link
                  href="/notes"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Notes</span>
                  <Lock className="h-3 w-3 ml-auto" />
                </Link>
                <Link
                  href="/analysis"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted"
                >
                  <BarChart className="h-4 w-4" />
                  <span>Analysis</span>
                  <Lock className="h-3 w-3 ml-auto" />
                </Link>
              </div>

              <div className="p-4 border rounded-md bg-orange-50 border-orange-200">
                <div className="flex items-center gap-2 text-orange-800 font-medium mb-2">
                  <FileText className="h-4 w-4" />
                  Try CodeMace Extension
                </div>
                <p className="text-xs text-orange-700">With Single Click you can add to my workspace</p>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Track Coding Sheets in One Place</h1>
                <p className="text-muted-foreground">Choose from 30+ structured coding paths</p>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search any coding sheet" className="w-full pl-8 bg-background" />
              </div>

              <Tabs defaultValue="popular" className="mb-8">
                <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto">
                  <TabsTrigger value="all" className="py-2">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="popular" className="py-2">
                    Popular
                  </TabsTrigger>
                  <TabsTrigger value="quick" className="py-2">
                    Quick Revision
                  </TabsTrigger>
                  <TabsTrigger value="dsa" className="py-2">
                    Complete DSA
                  </TabsTrigger>
                  <TabsTrigger value="topic" className="py-2">
                    Topic Specific
                  </TabsTrigger>
                  <TabsTrigger value="competitive" className="py-2">
                    Competitive
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div>
                <h2 className="text-xl font-semibold mb-4">Popular Sheets</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                  {[
                    {
                      title: "Striver SDE Sheet",
                      followers: "2937 Followers",
                      questions: "191 questions",
                      progress: "0%",
                      description:
                        "Striver SDE Sheet contains very handily crafted and picked top coding interview questions.",
                      image: "SDE",
                    },
                    {
                      title: "Love Babbar DSA Sheet",
                      followers: "1576 Followers",
                      questions: "430 questions",
                      progress: "0%",
                      description:
                        "The DSA sheet by Love Babbar is designed to cover almost every concept required for coding interviews.",
                      image: "DSA",
                    },
                    {
                      title: "Top Interview 150",
                      followers: "1130 Followers",
                      questions: "150 questions",
                      progress: "0%",
                      description:
                        "The Top 150 sheet, curated by LeetCode, features the most frequently asked questions in technical interviews.",
                      image: "TOP",
                    },
                    {
                      title: "Neetcode 150",
                      followers: "945 Followers",
                      questions: "150 questions",
                      progress: "0%",
                      description:
                        "The Neetcode 150 sheet, curated by Navdeep Singh, is a popular collection of LeetCode problems.",
                      image: "NC",
                    },
                  ].map((sheet, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="h-1 bg-gray-200">
                        <div className="h-1 bg-green-500" style={{ width: sheet.progress }}></div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Image
                            src={`/placeholder.svg?height=48&width=48&text=${sheet.image}`}
                            alt={sheet.title}
                            width={48}
                            height={48}
                            className="rounded-md"
                          />
                          <div>
                            <div className="font-medium">{sheet.title}</div>
                            <div className="text-xs text-muted-foreground">{sheet.followers}</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{sheet.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {sheet.questions}
                          </div>
                          <Button size="sm" variant="outline" className="h-7 text-xs rounded-full">
                            Follow
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
