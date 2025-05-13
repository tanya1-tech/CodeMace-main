"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import {
  FileText,
  Star,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  BookOpen,
  PlusCircle,
  Calendar,
  Search,
  Trophy,
  Target,
  AlertCircle,
  ChevronRight,
  Code,
  Timer,
  Users,
  ExternalLink,
  ThumbsUp,
  Eye,
  ArrowRight,
  Layers,
  GitBranch,
  Cpu,
  Database,
  Hash,
  Flame,
  Download,
} from "lucide-react"

export default function ProfileTracker() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sheetFilter, setSheetFilter] = useState("all")
  const [sheetSort, setSheetSort] = useState("progress")
  const [problemFilter, setProbFilter] = useState("all")
  const [problemSort, setProblemSort] = useState("recent")
  const [contestFilter, setContestFilter] = useState("all")

  // Mock data for sheets
  const sheets = [
    {
      id: "1",
      title: "Striver SDE Sheet",
      description: "A structured approach to DSA for interviews",
      totalProblems: 191,
      solvedProblems: 143,
      difficulty: "Advanced",
      category: "Interview Prep",
      lastUpdated: "2 days ago",
      image: "SDE",
      tags: ["DSA", "Algorithms", "Interview"],
      priority: "High",
      streak: 12,
    },
    {
      id: "2",
      title: "Blind 75",
      description: "Essential coding interview questions",
      totalProblems: 75,
      solvedProblems: 52,
      difficulty: "Intermediate",
      category: "Interview Prep",
      lastUpdated: "Yesterday",
      image: "B75",
      tags: ["LeetCode", "Algorithms", "Interview"],
      priority: "Medium",
      streak: 5,
    },
    {
      id: "3",
      title: "Dynamic Programming",
      description: "Comprehensive DP problem collection",
      totalProblems: 120,
      solvedProblems: 37,
      difficulty: "Hard",
      category: "Topic",
      lastUpdated: "1 week ago",
      image: "DP",
      tags: ["Dynamic Programming", "Algorithms"],
      priority: "Medium",
      streak: 0,
    },
    {
      id: "4",
      title: "Graph Algorithms",
      description: "Complete guide to graph algorithms",
      totalProblems: 85,
      solvedProblems: 28,
      difficulty: "Hard",
      category: "Topic",
      lastUpdated: "3 days ago",
      image: "GA",
      tags: ["Graphs", "Algorithms", "BFS", "DFS"],
      priority: "Low",
      streak: 3,
    },
  ]

  // Mock data for problems
  const problems = [
    {
      id: "1",
      title: "Two Sum",
      difficulty: "Easy",
      platform: "LeetCode",
      platformIcon: "LC",
      tags: ["Array", "Hash Table"],
      solvedDate: "Today",
      timeToSolve: "15 minutes",
      category: "Arrays",
      likes: 24,
      views: 156,
      url: "#",
      notes: true,
    },
    {
      id: "2",
      title: "Merge Two Sorted Lists",
      difficulty: "Easy",
      platform: "LeetCode",
      platformIcon: "LC",
      tags: ["Linked List", "Recursion"],
      solvedDate: "Yesterday",
      timeToSolve: "22 minutes",
      category: "Linked Lists",
      likes: 12,
      views: 89,
      url: "#",
      notes: false,
    },
    {
      id: "3",
      title: "Maximum Subarray",
      difficulty: "Medium",
      platform: "LeetCode",
      platformIcon: "LC",
      tags: ["Array", "Dynamic Programming", "Divide and Conquer"],
      solvedDate: "2 days ago",
      timeToSolve: "35 minutes",
      category: "Dynamic Programming",
      likes: 18,
      views: 124,
      url: "#",
      notes: true,
    },
    {
      id: "4",
      title: "Valid Parentheses",
      difficulty: "Easy",
      platform: "LeetCode",
      platformIcon: "LC",
      tags: ["String", "Stack"],
      solvedDate: "3 days ago",
      timeToSolve: "18 minutes",
      category: "Stacks",
      likes: 9,
      views: 76,
      url: "#",
      notes: false,
    },
    {
      id: "5",
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      platform: "LeetCode",
      platformIcon: "LC",
      tags: ["String", "Dynamic Programming"],
      solvedDate: "5 days ago",
      timeToSolve: "42 minutes",
      category: "Dynamic Programming",
      likes: 15,
      views: 103,
      url: "#",
      notes: true,
    },
    {
      id: "6",
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      platform: "LeetCode",
      platformIcon: "LC",
      tags: ["Tree", "BFS", "Binary Tree"],
      solvedDate: "1 week ago",
      timeToSolve: "28 minutes",
      category: "Trees",
      likes: 11,
      views: 92,
      url: "#",
      notes: true,
    },
  ]

  // Mock data for contests
  const contests = [
    {
      id: "1",
      title: "Weekly Contest 342",
      platform: "LeetCode",
      platformIcon: "LC",
      date: "Apr 28, 2025",
      time: "8:00 AM - 9:30 AM",
      status: "upcoming",
      registered: true,
      url: "#",
      problemCount: 4,
      difficulty: "Mixed",
    },
    {
      id: "2",
      title: "Codeforces Round #892 (Div. 2)",
      platform: "Codeforces",
      platformIcon: "CF",
      date: "May 2, 2025",
      time: "7:35 PM - 9:35 PM",
      status: "upcoming",
      registered: false,
      url: "#",
      problemCount: 6,
      difficulty: "Mixed",
    },
    {
      id: "3",
      title: "Weekly Contest 341",
      platform: "LeetCode",
      platformIcon: "LC",
      date: "Apr 21, 2025",
      time: "8:00 AM - 9:30 AM",
      status: "completed",
      rank: 1245,
      totalParticipants: 25678,
      problemsSolved: 3,
      totalProblems: 4,
      rating: "+15",
      url: "#",
    },
    {
      id: "4",
      title: "Codeforces Round #891 (Div. 3)",
      platform: "Codeforces",
      platformIcon: "CF",
      date: "Apr 17, 2025",
      time: "7:35 PM - 9:35 PM",
      status: "completed",
      rank: 876,
      totalParticipants: 18432,
      problemsSolved: 4,
      totalProblems: 6,
      rating: "+42",
      url: "#",
    },
    {
      id: "5",
      title: "Biweekly Contest 126",
      platform: "LeetCode",
      platformIcon: "LC",
      date: "Apr 15, 2025",
      time: "8:00 AM - 9:30 AM",
      status: "completed",
      rank: 2134,
      totalParticipants: 22567,
      problemsSolved: 2,
      totalProblems: 4,
      rating: "-5",
      url: "#",
    },
  ]

  // Filter sheets based on selected filter
  const filteredSheets = sheets.filter((sheet) => {
    if (sheetFilter === "all") return true
    if (sheetFilter === "high-progress") return sheet.solvedProblems / sheet.totalProblems > 0.7
    if (sheetFilter === "in-progress")
      return sheet.solvedProblems / sheet.totalProblems > 0 && sheet.solvedProblems / sheet.totalProblems < 0.7
    if (sheetFilter === "not-started") return sheet.solvedProblems === 0
    if (sheetFilter === "with-streak") return sheet.streak > 0
    return true
  })

  // Sort sheets based on selected sort option
  const sortedSheets = [...filteredSheets].sort((a, b) => {
    if (sheetSort === "progress") return b.solvedProblems / b.totalProblems - a.solvedProblems / a.totalProblems
    if (sheetSort === "recent") return a.lastUpdated.localeCompare(b.lastUpdated)
    if (sheetSort === "problems") return b.totalProblems - a.totalProblems
    if (sheetSort === "streak") return b.streak - a.streak
    return 0
  })

  // Filter problems based on selected filter
  const filteredProblems = problems.filter((problem) => {
    if (problemFilter === "all") return true
    if (problemFilter === "easy") return problem.difficulty === "Easy"
    if (problemFilter === "medium") return problem.difficulty === "Medium"
    if (problemFilter === "hard") return problem.difficulty === "Hard"
    if (problemFilter === "with-notes") return problem.notes
    return true
  })

  // Sort problems based on selected sort option
  const sortedProblems = [...filteredProblems].sort((a, b) => {
    if (problemSort === "recent") {
      // Simple string comparison for demo purposes
      return a.solvedDate.localeCompare(b.solvedDate)
    }
    if (problemSort === "difficulty") {
      const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 }
      return (
        difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
        difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
      )
    }
    if (problemSort === "popularity") return b.likes - a.likes
    return 0
  })

  // Filter contests based on selected filter
  const filteredContests = contests.filter((contest) => {
    if (contestFilter === "all") return true
    if (contestFilter === "upcoming") return contest.status === "upcoming"
    if (contestFilter === "completed") return contest.status === "completed"
    if (contestFilter === "registered") return contest.registered
    return true
  })

  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto max-w-full px-2 sm:px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Your <span className="text-primary">All-in-One</span> Coding Portfolio
              </h1>
              <p className="text-muted-foreground">Track your progress across multiple platforms</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="flex -space-x-2">
                <Image
                  src="/placeholder.svg?height=40&width=40&text=LC"
                  alt="LeetCode"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-background bg-white"
                />
                <Image
                  src="/placeholder.svg?height=40&width=40&text=CF"
                  alt="Codeforces"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-background bg-white"
                />
                <Image
                  src="/placeholder.svg?height=40&width=40&text=CC"
                  alt="CodeChef"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-background bg-white"
                />
              </div>
              <Link
                href="/profile-tracker/add-platform"
                className="text-primary hover:underline text-sm flex items-center"
              >
                <PlusCircle className="h-3.5 w-3.5 mr-1" /> Add Platform
              </Link>
            </div>
          </div>

          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sheets">Coding Sheets</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="contests">Contests</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
          </Tabs>

          {activeTab === "overview" && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">See cumulative questions solved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center p-4">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Total Questions</div>
                      <div className="text-5xl font-bold">1010</div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <Image
                          src="/placeholder.svg?height=40&width=40&text=LC"
                          alt="LeetCode"
                          width={40}
                          height={40}
                          className="mx-auto rounded-full bg-white"
                        />
                        <div className="mt-1 text-sm font-medium">LeetCode</div>
                        <div className="text-lg font-bold">450</div>
                      </div>
                      <div>
                        <Image
                          src="/placeholder.svg?height=40&width=40&text=CF"
                          alt="Codeforces"
                          width={40}
                          height={40}
                          className="mx-auto rounded-full bg-white"
                        />
                        <div className="mt-1 text-sm font-medium">Codeforces</div>
                        <div className="text-lg font-bold">320</div>
                      </div>
                      <div>
                        <Image
                          src="/placeholder.svg?height=40&width=40&text=CC"
                          alt="CodeChef"
                          width={40}
                          height={40}
                          className="mx-auto rounded-full bg-white"
                        />
                        <div className="mt-1 text-sm font-medium">CodeChef</div>
                        <div className="text-lg font-bold">240</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Track your streak across multiple platforms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">152 submissions in past 6 months</div>
                      <div className="flex gap-4">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Max.Streak</div>
                          <div className="font-medium">72</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Current.Streak</div>
                          <div className="font-medium">13</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-24 bg-muted rounded-md flex items-end justify-between px-2">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 rounded-t-sm ${Math.random() > 0.5 ? "bg-green-500" : Math.random() > 0.7 ? "bg-green-300" : "bg-green-100"
                            }`}
                          style={{
                            height: `${Math.max(10, Math.random() * 100)}%`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div>Jul</div>
                      <div>Aug</div>
                      <div>Sep</div>
                      <div>Oct</div>
                      <div>Nov</div>
                      <div>Dec</div>
                      <div>Jan</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "sheets" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Coding Sheets</h2>
                  <p className="text-muted-foreground">Track your progress on popular coding sheets</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center gap-2">
                    <Select value={sheetFilter} onValueChange={setSheetFilter}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter sheets" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sheets</SelectItem>
                        <SelectItem value="high-progress">High Progress ({">"}70%)</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="not-started">Not Started</SelectItem>
                        <SelectItem value="with-streak">With Active Streak</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sheetSort} onValueChange={setSheetSort}>
                      <SelectTrigger className="w-[180px]">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="progress">Progress</SelectItem>
                        <SelectItem value="recent">Recently Updated</SelectItem>
                        <SelectItem value="problems">Problem Count</SelectItem>
                        <SelectItem value="streak">Streak</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Sheet
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedSheets.map((sheet) => {
                  const progressPercent = Math.round((sheet.solvedProblems / sheet.totalProblems) * 100)
                  const progressColor =
                    progressPercent >= 80
                      ? "bg-green-500"
                      : progressPercent >= 50
                        ? "bg-blue-500"
                        : progressPercent >= 25
                          ? "bg-amber-500"
                          : progressPercent > 0
                            ? "bg-orange-500"
                            : "bg-gray-300"

                  return (
                    <Card key={sheet.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2 flex flex-row justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-white flex items-center justify-center">
                            <Image
                              src={`/placeholder.svg?height=40&width=40&text=${sheet.image}`}
                              alt={sheet.title}
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{sheet.title}</CardTitle>
                            <CardDescription className="line-clamp-1">{sheet.description}</CardDescription>
                          </div>
                        </div>
                        {sheet.streak > 0 && (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 bg-amber-100 text-amber-800 border-amber-200"
                          >
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            <span>{sheet.streak} day streak</span>
                          </Badge>
                        )}
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">{progressPercent}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${progressColor} rounded-full`}
                                style={{ width: `${progressPercent}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span>
                                {sheet.solvedProblems} / {sheet.totalProblems} solved
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{sheet.lastUpdated}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {sheet.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            <Badge variant="outline" className="text-xs">
                              {sheet.difficulty}
                            </Badge>
                          </div>

                          <div className="flex justify-between pt-2">
                            <Button variant="outline" size="sm" className="text-xs h-8">
                              <BookOpen className="h-3.5 w-3.5 mr-1" /> View Sheet
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs h-8">
                              <TrendingUp className="h-3.5 w-3.5 mr-1" /> Continue
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {sortedSheets.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No sheets found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    No coding sheets match your current filters. Try changing your filter settings or add a new sheet.
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Sheet
                  </Button>
                </div>
              )}

              <div className="mt-8 p-6 border border-dashed rounded-lg bg-muted/50">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <Award className="h-12 w-12 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-1">Sheet Completion Challenge</h3>
                    <p className="text-muted-foreground mb-2">
                      Complete at least 75% of any sheet to earn a special badge on your profile. Your current highest
                      completion is Striver SDE Sheet at 74.9%.
                    </p>
                    <Progress value={74.9} className="h-2 w-full" />
                  </div>
                  <div className="flex-shrink-0">
                    <Button variant="outline">View Badges</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "problems" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Problems</h2>
                  <p className="text-muted-foreground">Track your solved problems across platforms</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search problems" className="pl-8 w-full sm:w-[200px]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={problemFilter} onValueChange={setProbFilter}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter problems" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Problems</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="with-notes">With Notes</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={problemSort} onValueChange={setProblemSort}>
                      <SelectTrigger className="w-[180px]">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Recently Solved</SelectItem>
                        <SelectItem value="difficulty">Difficulty</SelectItem>
                        <SelectItem value="popularity">Popularity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Recently Solved Problems</CardTitle>
                      <CardDescription>Your recent problem-solving activity</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {sortedProblems.map((problem) => {
                          const difficultyColor =
                            problem.difficulty === "Easy"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : problem.difficulty === "Medium"
                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                : "bg-red-100 text-red-800 border-red-200"

                          return (
                            <div key={problem.id} className="p-4 hover:bg-muted/50 transition-colors">
                              <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-md bg-white flex-shrink-0 flex items-center justify-center">
                                  <Image
                                    src={`/placeholder.svg?height=40&width=40&text=${problem.platformIcon}`}
                                    alt={problem.platform}
                                    width={40}
                                    height={40}
                                    className="rounded-md"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-medium">{problem.title}</h3>
                                      <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="outline" className={difficultyColor}>
                                          {problem.difficulty}
                                        </Badge>
                                        {problem.tags.map((tag, index) => (
                                          <Badge key={index} variant="secondary" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      {problem.notes && (
                                        <Button size="sm" variant="outline" className="h-7 text-xs">
                                          <BookOpen className="h-3 w-3 mr-1" /> Notes
                                        </Button>
                                      )}
                                      <Button size="sm" variant="outline" className="h-7 text-xs">
                                        <Code className="h-3 w-3 mr-1" /> Solution
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-4">
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> Solved {problem.solvedDate}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Timer className="h-3 w-3" /> {problem.timeToSolve}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className="flex items-center gap-1">
                                        <ThumbsUp className="h-3 w-3" /> {problem.likes}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" /> {problem.views}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center p-4 border-t">
                      <Button variant="outline" className="w-full sm:w-auto">
                        View All Problems <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Problem Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Difficulty Breakdown</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span>Easy</span>
                              </div>
                              <span>245 (42%)</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: "42%" }}></div>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <span>Medium</span>
                              </div>
                              <span>312 (53%)</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: "53%" }}></div>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span>Hard</span>
                              </div>
                              <span>28 (5%)</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 rounded-full" style={{ width: "5%" }}></div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Top Categories</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>Arrays</span>
                              <span>187</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Dynamic Programming</span>
                              <span>124</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Strings</span>
                              <span>98</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Trees</span>
                              <span>76</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Graphs</span>
                              <span>52</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Recommended Problems</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        <div className="p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                              Medium
                            </Badge>
                            <h4 className="font-medium text-sm">Longest Substring Without Repeating Characters</h4>
                          </div>
                          <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                            <span>String, Sliding Window</span>
                            <Button size="sm" variant="ghost" className="h-6 text-xs p-0">
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 text-xs">
                              Hard
                            </Badge>
                            <h4 className="font-medium text-sm">Median of Two Sorted Arrays</h4>
                          </div>
                          <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                            <span>Array, Binary Search</span>
                            <Button size="sm" variant="ghost" className="h-6 text-xs p-0">
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-xs">
                              Easy
                            </Badge>
                            <h4 className="font-medium text-sm">Balanced Binary Tree</h4>
                          </div>
                          <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                            <span>Tree, DFS</span>
                            <Button size="sm" variant="ghost" className="h-6 text-xs p-0">
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 border-t">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        View More Recommendations
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              <div className="mt-8 p-6 border border-dashed rounded-lg bg-muted/50">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <Target className="h-12 w-12 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-1">Daily Problem Challenge</h3>
                    <p className="text-muted-foreground mb-2">
                      Solve one problem every day to maintain your streak. You've solved 13 problems in a row!
                    </p>
                    <div className="flex gap-1 mt-3">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-full ${i < 6 ? "bg-green-500" : "bg-gray-200"}`}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button>Today's Problem</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "contests" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Contests</h2>
                  <p className="text-muted-foreground">Track upcoming and past coding contests</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={contestFilter} onValueChange={setContestFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter contests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Contests</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="registered">Registered</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Calendar className="h-4 w-4 mr-2" /> Calendar View
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Upcoming Contests</CardTitle>
                      <CardDescription>Contests scheduled in the next 7 days</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {filteredContests
                          .filter((contest) => contest.status === "upcoming")
                          .map((contest) => (
                            <div key={contest.id} className="p-4 hover:bg-muted/50 transition-colors">
                              <div className="flex items-start gap-3">
                                <div className="h-12 w-12 rounded-md bg-white flex-shrink-0 flex items-center justify-center">
                                  <Image
                                    src={`/placeholder.svg?height=48&width=48&text=${contest.platformIcon}`}
                                    alt={contest.platform}
                                    width={48}
                                    height={48}
                                    className="rounded-md"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-medium">{contest.title}</h3>
                                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                          <Calendar className="h-3.5 w-3.5" /> {contest.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Clock className="h-3.5 w-3.5" /> {contest.time}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant={contest.registered ? "default" : "outline"}
                                        className={`h-8 text-xs ${contest.registered ? "bg-green-600 hover:bg-green-700" : ""}`}
                                      >
                                        {contest.registered ? (
                                          <>
                                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Registered
                                          </>
                                        ) : (
                                          "Register"
                                        )}
                                      </Button>
                                      <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                                        <Link href={contest.url} target="_blank">
                                          <ExternalLink className="h-3.5 w-3.5" />
                                        </Link>
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 mt-2">
                                    <Badge variant="outline" className="text-xs">
                                      {contest.problemCount} Problems
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {contest.difficulty}
                                    </Badge>
                                    {contest.registered && (
                                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                                        <Calendar className="h-3 w-3 mr-1" /> Added to Calendar
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Past Contests</CardTitle>
                      <CardDescription>Your recent contest performance</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {filteredContests
                          .filter((contest) => contest.status === "completed")
                          .map((contest) => (
                            <div key={contest.id} className="p-4 hover:bg-muted/50 transition-colors">
                              <div className="flex items-start gap-3">
                                <div className="h-12 w-12 rounded-md bg-white flex-shrink-0 flex items-center justify-center">
                                  <Image
                                    src={`/placeholder.svg?height=48&width=48&text=${contest.platformIcon}`}
                                    alt={contest.platform}
                                    width={48}
                                    height={48}
                                    className="rounded-md"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-medium">{contest.title}</h3>
                                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                          <Calendar className="h-3.5 w-3.5" /> {contest.date}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button size="sm" variant="outline" className="h-8 text-xs">
                                        <BookOpen className="h-3.5 w-3.5 mr-1" /> Solutions
                                      </Button>
                                      <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                                        <Link href={contest.url} target="_blank">
                                          <ExternalLink className="h-3.5 w-3.5" />
                                        </Link>
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
                                    <div className="bg-muted rounded-md p-2 text-center">
                                      <div className="text-xs text-muted-foreground">Rank</div>
                                      <div className="font-medium">
                                        {contest.rank}/{contest.totalParticipants}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        Top {Math.round((contest.rank / contest.totalParticipants) * 100)}%
                                      </div>
                                    </div>
                                    <div className="bg-muted rounded-md p-2 text-center">
                                      <div className="text-xs text-muted-foreground">Problems</div>
                                      <div className="font-medium">
                                        {contest.problemsSolved}/{contest.totalProblems}
                                      </div>
                                      <div className="text-xs text-muted-foreground">Solved</div>
                                    </div>
                                    <div className="bg-muted rounded-md p-2 text-center">
                                      <div className="text-xs text-muted-foreground">Rating</div>
                                      <div
                                        className={`font-medium ${contest.rating.startsWith("+")
                                          ? "text-green-600"
                                          : contest.rating.startsWith("-")
                                            ? "text-red-600"
                                            : ""
                                          }`}
                                      >
                                        {contest.rating}
                                      </div>
                                      <div className="text-xs text-muted-foreground">Change</div>
                                    </div>
                                    <div className="bg-muted rounded-md p-2 text-center">
                                      <div className="text-xs text-muted-foreground">Performance</div>
                                      <div className="font-medium">
                                        {Math.round((contest.problemsSolved / contest.totalProblems) * 100)}%
                                      </div>
                                      <div className="text-xs text-muted-foreground">Accuracy</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center p-4 border-t">
                      <Button variant="outline" className="w-full sm:w-auto">
                        View All Contests <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Contest Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="text-center p-4 border rounded-lg bg-muted/30">
                          <div className="text-sm text-muted-foreground">Current Rating</div>
                          <div className="text-3xl font-bold text-primary">1842</div>
                          <Badge className="mt-1 bg-blue-100 text-blue-800 border-blue-200">Expert</Badge>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Rating History</h4>
                          <div className="h-32 bg-muted/30 rounded-md flex items-end justify-between px-2 pt-4">
                            {Array.from({ length: 10 }).map((_, i) => {
                              const height = 30 + Math.random() * 70
                              return (
                                <div
                                  key={i}
                                  className="w-4 bg-primary/80 rounded-t-sm relative group"
                                  style={{ height: `${height}%` }}
                                >
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background shadow rounded px-2 py-1 text-xs pointer-events-none whitespace-nowrap">
                                    Contest #{i + 1}: 1842
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="text-sm">Total Contests</div>
                            <div className="font-medium">24</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm">Highest Rank</div>
                            <div className="font-medium">342</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm">Average Rank</div>
                            <div className="font-medium">1,245</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm">Highest Rating</div>
                            <div className="font-medium">1,924</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Recommended Contests</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        <div className="p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-white flex-shrink-0 flex items-center justify-center">
                              <Image
                                src="/placeholder.svg?height=32&width=32&text=AT"
                                alt="AtCoder"
                                width={32}
                                height={32}
                                className="rounded-md"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">AtCoder Beginner Contest 345</h4>
                              <div className="text-xs text-muted-foreground">May 5, 2025 • 7:00 AM</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-white flex-shrink-0 flex items-center justify-center">
                              <Image
                                src="/placeholder.svg?height=32&width=32&text=HR"
                                alt="HackerRank"
                                width={32}
                                height={32}
                                className="rounded-md"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">HackerRank Weekly Challenge</h4>
                              <div className="text-xs text-muted-foreground">May 7, 2025 • 9:00 PM</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-white flex-shrink-0 flex items-center justify-center">
                              <Image
                                src="/placeholder.svg?height=32&width=32&text=CC"
                                alt="CodeChef"
                                width={32}
                                height={32}
                                className="rounded-md"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">CodeChef Long Challenge</h4>
                              <div className="text-xs text-muted-foreground">May 12, 2025 • 3:00 PM</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 border-t">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        View Contest Calendar
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Analytics</h2>
                  <p className="text-muted-foreground">Insights and statistics about your coding journey</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select defaultValue="6months">
                    <SelectTrigger className="w-[180px]">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="3months">Last 3 Months</SelectItem>
                      <SelectItem value="6months">Last 6 Months</SelectItem>
                      <SelectItem value="1year">Last Year</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Export Data
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-2">
                        <Code className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold">1,010</div>
                      <div className="text-sm text-muted-foreground">Total Problems Solved</div>
                      <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                        <TrendingUp className="h-3 w-3 mr-1" /> +42 this month
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-2">
                        <Trophy className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold">24</div>
                      <div className="text-sm text-muted-foreground">Contests Participated</div>
                      <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                        <TrendingUp className="h-3 w-3 mr-1" /> +3 this month
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-2">
                        <Flame className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold">13</div>
                      <div className="text-sm text-muted-foreground">Current Streak</div>
                      <div className="mt-2 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-green-600">Active today</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-2">
                        <Award className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold">1842</div>
                      <div className="text-sm text-muted-foreground">Current Rating</div>
                      <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200">Expert</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Problem Solving Trends</CardTitle>
                    <CardDescription>Your problem-solving activity over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-muted/30 rounded-md flex items-end justify-between px-2 pt-4 relative">
                      {/* Simulated chart */}
                      <div className="absolute inset-0 flex flex-col justify-between p-4">
                        <div className="w-full border-b border-dashed border-gray-300 dark:border-gray-700"></div>
                        <div className="w-full border-b border-dashed border-gray-300 dark:border-gray-700"></div>
                        <div className="w-full border-b border-dashed border-gray-300 dark:border-gray-700"></div>
                        <div className="w-full border-b border-dashed border-gray-300 dark:border-gray-700"></div>
                      </div>
                      {Array.from({ length: 12 }).map((_, i) => {
                        const height = 20 + Math.random() * 60
                        return (
                          <div key={i} className="relative flex-1 mx-1 group">
                            <div className="w-full bg-primary/80 rounded-t-sm" style={{ height: `${height}%` }}></div>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background shadow rounded px-2 py-1 text-xs pointer-events-none whitespace-nowrap">
                              {i + 1} month ago: {Math.floor(height)} problems
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skill Distribution</CardTitle>
                    <CardDescription>Your strengths and areas for improvement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium flex items-center">
                            <Layers className="h-4 w-4 mr-2 text-blue-500" /> Arrays & Strings
                          </div>
                          <div className="text-sm">92%</div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium flex items-center">
                            <Hash className="h-4 w-4 mr-2 text-purple-500" /> Hash Tables & Sets
                          </div>
                          <div className="text-sm">85%</div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium flex items-center">
                            <GitBranch className="h-4 w-4 mr-2 text-green-500" /> Trees & Graphs
                          </div>
                          <div className="text-sm">78%</div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium flex items-center">
                            <Cpu className="h-4 w-4 mr-2 text-amber-500" /> Dynamic Programming
                          </div>
                          <div className="text-sm">65%</div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium flex items-center">
                            <Database className="h-4 w-4 mr-2 text-red-500" /> System Design
                          </div>
                          <div className="text-sm">42%</div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: "42%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Performance Comparison</CardTitle>
                    <CardDescription>How you compare to other coders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-center">
                        <div className="relative h-48 w-48">
                          <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                          <div
                            className="absolute inset-0 rounded-full border-8 border-transparent border-t-primary"
                            style={{ transform: "rotate(45deg)" }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <div className="text-3xl font-bold">76%</div>
                            <div className="text-sm text-muted-foreground">Percentile</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-muted rounded-md p-3 text-center">
                          <div className="text-sm text-muted-foreground">Problem Solving</div>
                          <div className="font-medium">82%</div>
                          <div className="text-xs text-green-600">Above average</div>
                        </div>
                        <div className="bg-muted rounded-md p-3 text-center">
                          <div className="text-sm text-muted-foreground">Contest Rating</div>
                          <div className="font-medium">68%</div>
                          <div className="text-xs text-green-600">Above average</div>
                        </div>
                        <div className="bg-muted rounded-md p-3 text-center">
                          <div className="text-sm text-muted-foreground">Consistency</div>
                          <div className="font-medium">91%</div>
                          <div className="text-xs text-green-600">Top performer</div>
                        </div>
                        <div className="bg-muted rounded-md p-3 text-center">
                          <div className="text-sm text-muted-foreground">Hard Problems</div>
                          <div className="font-medium">45%</div>
                          <div className="text-xs text-amber-600">Average</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>Personalized suggestions to improve</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      <div className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="h-4 w-4 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Focus on Dynamic Programming</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Your DP skills are below your other areas. Try solving 5 DP problems this week.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Trophy className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Participate in Weekly Contests</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Regular contest participation will help improve your problem-solving speed.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Join Study Groups</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Collaborating with others can help you learn new approaches to problem-solving.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 border-t">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Recommendations
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
