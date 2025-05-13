"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, BookOpen, Code, Tag } from "lucide-react"
import Image from "next/image"

export default function QuestionTracker() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Track Coding Sheets in One Place</h1>
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Striver SDE",
                  followers: "2937 Followers",
                  questions: "191 questions",
                  progress: "0%",
                  image: "SDE",
                },
                {
                  title: "Love Babbar DSA",
                  followers: "1576 Followers",
                  questions: "430 questions",
                  progress: "0%",
                  image: "DSA",
                },
                {
                  title: "Top Interview 150",
                  followers: "1130 Followers",
                  questions: "150 questions",
                  progress: "0%",
                  image: "TOP",
                },
                {
                  title: "Neetcode 150",
                  followers: "945 Followers",
                  questions: "150 questions",
                  progress: "0%",
                  image: "NC",
                },
              ].map((sheet, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-1 bg-gray-200">
                    <div className="h-1 bg-green-500" style={{ width: sheet.progress }}></div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Image
                        src={`/placeholder.svg?height=40&width=40&text=${sheet.image}`}
                        alt={sheet.title}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <div>
                        <div className="font-medium">{sheet.title}</div>
                        <div className="text-xs text-muted-foreground">{sheet.followers}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
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

          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Recently Added Questions</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Image
                          src="/placeholder.svg?height=32&width=32&text=LC"
                          alt="LeetCode"
                          width={32}
                          height={32}
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Merge Two Sorted Lists</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full flex items-center gap-1">
                                <Tag className="h-3 w-3" /> Linked List
                              </span>
                              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Easy</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              <BookOpen className="h-3 w-3 mr-1" /> Notes
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              <Code className="h-3 w-3 mr-1" /> Solution
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Merge two sorted linked lists and return it as a sorted list.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
