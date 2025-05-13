"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PlusCircle,
  LinkIcon,
  RefreshCw,
  Settings,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Clock,
  BarChart3,
  Trophy,
  FileText,
  Trash2,
  Lock,
  Info,
  HelpCircle,
} from "lucide-react"
import Image from "next/image"

interface Platform {
  id: string
  name: string
  icon: string
  username: string
  connected: boolean
  lastSync: string
  autoSync: boolean
  private: boolean
  stats: {
    solved: number
    total: number
    easy: number
    medium: number
    hard: number
    ranking?: number
    rating?: number
    contests?: number
  }
}

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: "leetcode",
      name: "LeetCode",
      icon: "LC",
      username: "codemacer",
      connected: true,
      lastSync: "2 hours ago",
      autoSync: true,
      private: false,
      stats: {
        solved: 450,
        total: 2435,
        easy: 210,
        medium: 195,
        hard: 45,
        ranking: 24563,
        rating: 1842,
        contests: 18,
      },
    },
    {
      id: "codeforces",
      name: "Codeforces",
      icon: "CF",
      username: "codemacer",
      connected: true,
      lastSync: "1 day ago",
      autoSync: true,
      private: false,
      stats: {
        solved: 320,
        total: 7845,
        easy: 145,
        medium: 132,
        hard: 43,
        ranking: 12458,
        rating: 1624,
        contests: 24,
      },
    },
    {
      id: "codechef",
      name: "CodeChef",
      icon: "CC",
      username: "codemacer",
      connected: true,
      lastSync: "3 days ago",
      autoSync: false,
      private: false,
      stats: {
        solved: 240,
        total: 4532,
        easy: 120,
        medium: 95,
        hard: 25,
        ranking: 8765,
        rating: 1765,
        contests: 12,
      },
    },
  ])

  const [availablePlatforms, setAvailablePlatforms] = useState([
    {
      id: "hackerrank",
      name: "HackerRank",
      icon: "HR",
      description: "Practice coding, prepare for interviews, and get hired.",
      popular: true,
    },
    {
      id: "atcoder",
      name: "AtCoder",
      icon: "AT",
      description: "Programming contests platform from Japan.",
      popular: true,
    },
    {
      id: "hackerearth",
      name: "HackerEarth",
      icon: "HE",
      description: "Coding challenges and hackathons platform.",
      popular: false,
    },
    {
      id: "spoj",
      name: "SPOJ",
      icon: "SP",
      description: "Sphere Online Judge with thousands of problems.",
      popular: false,
    },
    {
      id: "topcoder",
      name: "TopCoder",
      icon: "TC",
      description: "Competitive programming and crowdsourcing platform.",
      popular: false,
    },
    {
      id: "geeksforgeeks",
      name: "GeeksforGeeks",
      icon: "GG",
      description: "Computer science portal with coding practice.",
      popular: true,
    },
  ])

  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectUsername, setConnectUsername] = useState("")
  const [connectPassword, setConnectPassword] = useState("")
  const [connectPlatformId, setConnectPlatformId] = useState("")

  const handleConnect = (platformId: string) => {
    setConnectPlatformId(platformId)
    setConnectUsername("")
    setConnectPassword("")
    setIsConnecting(true)
  }

  const handleSubmitConnect = () => {
    // In a real app, this would connect to the platform's API
    const platform = availablePlatforms.find((p) => p.id === connectPlatformId)
    if (platform && connectUsername) {
      const newPlatform: Platform = {
        id: platform.id,
        name: platform.name,
        icon: platform.icon,
        username: connectUsername,
        connected: true,
        lastSync: "Just now",
        autoSync: true,
        private: false,
        stats: {
          solved: 0,
          total: 0,
          easy: 0,
          medium: 0,
          hard: 0,
        },
      }
      setPlatforms([...platforms, newPlatform])
      setIsConnecting(false)
      setConnectPlatformId("")
    }
  }

  const handleDisconnect = (platformId: string) => {
    setPlatforms(platforms.filter((p) => p.id !== platformId))
  }

  const handleToggleAutoSync = (platformId: string, value: boolean) => {
    setPlatforms(platforms.map((p) => (p.id === platformId ? { ...p, autoSync: value } : p)))
  }

  const handleTogglePrivate = (platformId: string, value: boolean) => {
    setPlatforms(platforms.map((p) => (p.id === platformId ? { ...p, private: value } : p)))
  }

  const handleSync = (platformId: string) => {
    setPlatforms(platforms.map((p) => (p.id === platformId ? { ...p, lastSync: "Just now" } : p)))
  }

  const handleViewDetails = (platform: Platform) => {
    setSelectedPlatform(platform)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto max-w-full px-2 sm:px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Platform <span className="text-primary">Connections</span>
              </h1>
              <p className="text-muted-foreground">
                Connect and manage your coding platforms to track your progress in one place
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsConnecting(true)}>
                <PlusCircle className="h-4 w-4 mr-2" /> Add Platform
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {platforms.map((platform) => (
              <Card key={platform.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 flex flex-row justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Image
                        src={`/placeholder.svg?height=40&width=40&text=${platform.icon}`}
                        alt={platform.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                      <CardDescription>@{platform.username}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-green-100 text-green-800 border-green-200"
                  >
                    <Check className="h-3 w-3" />
                    <span>Connected</span>
                  </Badge>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Problems Solved</span>
                        <span className="font-medium">
                          {platform.stats.solved} / {platform.stats.total}
                        </span>
                      </div>
                      <Progress value={(platform.stats.solved / platform.stats.total) * 100} className="h-2 w-full" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-md p-2">
                        <div className="text-xs text-muted-foreground">Easy</div>
                        <div className="font-medium text-green-600 dark:text-green-400">{platform.stats.easy}</div>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-md p-2">
                        <div className="text-xs text-muted-foreground">Medium</div>
                        <div className="font-medium text-amber-600 dark:text-amber-400">{platform.stats.medium}</div>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-md p-2">
                        <div className="text-xs text-muted-foreground">Hard</div>
                        <div className="font-medium text-red-600 dark:text-red-400">{platform.stats.hard}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Last synced {platform.lastSync}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handleSync(platform.id)}>
                        <RefreshCw className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    <div className="flex justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => handleViewDetails(platform)}
                      >
                        <Settings className="h-3.5 w-3.5 mr-1" /> Settings
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => handleViewDetails(platform)}
                      >
                        View Details <ChevronRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <PlusCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Add a New Platform</h3>
                <p className="text-muted-foreground mb-4 max-w-xs">
                  Connect more coding platforms to track all your progress in one place
                </p>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsConnecting(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Platform
                </Button>
              </CardContent>
            </Card>
          </div>

          {platforms.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Platform Insights</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-2">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold">1,010</div>
                      <div className="text-sm text-muted-foreground">Total Problems Solved</div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                        <Badge className="bg-green-100 text-green-800 border-green-200">+42 this month</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-2">
                        <Trophy className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold">54</div>
                      <div className="text-sm text-muted-foreground">Contests Participated</div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                        <Badge className="bg-green-100 text-green-800 border-green-200">+3 this month</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-2">
                        <BarChart3 className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold">1842</div>
                      <div className="text-sm text-muted-foreground">Highest Rating</div>
                      <div className="flex items-center gap-1 mt-2 text-xs">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">LeetCode</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-2">
                        <LinkIcon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold">3</div>
                      <div className="text-sm text-muted-foreground">Connected Platforms</div>
                      <div className="flex items-center gap-1 mt-2">
                        <div className="flex -space-x-2">
                          <Image
                            src="/placeholder.svg?height=24&width=24&text=LC"
                            alt="LeetCode"
                            width={24}
                            height={24}
                            className="rounded-full border-2 border-background"
                          />
                          <Image
                            src="/placeholder.svg?height=24&width=24&text=CF"
                            alt="Codeforces"
                            width={24}
                            height={24}
                            className="rounded-full border-2 border-background"
                          />
                          <Image
                            src="/placeholder.svg?height=24&width=24&text=CC"
                            alt="CodeChef"
                            width={24}
                            height={24}
                            className="rounded-full border-2 border-background"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Available Platforms</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {availablePlatforms
                .filter((p) => !platforms.some((connected) => connected.id === p.id))
                .map((platform) => (
                  <Card key={platform.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Image
                            src={`/placeholder.svg?height=40&width=40&text=${platform.icon}`}
                            alt={platform.name}
                            width={40}
                            height={40}
                            className="rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{platform.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{platform.description}</p>
                            </div>
                            {platform.popular && (
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Popular</Badge>
                            )}
                          </div>
                          <div className="mt-4">
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90 w-full"
                              onClick={() => handleConnect(platform.id)}
                            >
                              <LinkIcon className="h-3.5 w-3.5 mr-1" /> Connect
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Platform Connection Modal */}
          {isConnecting && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Connect Platform</CardTitle>
                      <CardDescription>Enter your credentials to connect your coding platform account</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsConnecting(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {!connectPlatformId ? (
                      <div className="space-y-4">
                        <Label>Select Platform</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {availablePlatforms
                            .filter((p) => !platforms.some((connected) => connected.id === p.id))
                            .map((platform) => (
                              <Button
                                key={platform.id}
                                variant="outline"
                                className="h-auto py-3 justify-start"
                                onClick={() => setConnectPlatformId(platform.id)}
                              >
                                <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                                    <Image
                                      src={`/placeholder.svg?height=32&width=32&text=${platform.icon}`}
                                      alt={platform.name}
                                      width={32}
                                      height={32}
                                      className="rounded-md"
                                    />
                                  </div>
                                  <span>{platform.name}</span>
                                </div>
                              </Button>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 pb-4 border-b">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            <Image
                              src={`/placeholder.svg?height=40&width=40&text=${
                                availablePlatforms.find((p) => p.id === connectPlatformId)?.icon
                              }`}
                              alt={availablePlatforms.find((p) => p.id === connectPlatformId)?.name || "Platform"}
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {availablePlatforms.find((p) => p.id === connectPlatformId)?.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">Enter your account credentials</p>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              value={connectUsername}
                              onChange={(e) => setConnectUsername(e.target.value)}
                              placeholder="Enter your username"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              value={connectPassword}
                              onChange={(e) => setConnectPassword(e.target.value)}
                              placeholder="Enter your password"
                            />
                          </div>

                          <div className="flex items-start space-x-2 pt-2">
                            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                            <p className="text-xs text-muted-foreground">
                              Your credentials are only used to fetch your data and are not stored on our servers.
                              Alternatively, you can use API tokens if the platform supports them.
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setIsConnecting(false)}>
                    Cancel
                  </Button>
                  {connectPlatformId && (
                    <Button
                      className="bg-primary hover:bg-primary/90"
                      onClick={handleSubmitConnect}
                      disabled={!connectUsername}
                    >
                      Connect Platform
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Platform Details Modal */}
          {selectedPlatform && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Image
                          src={`/placeholder.svg?height=40&width=40&text=${selectedPlatform.icon}`}
                          alt={selectedPlatform.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                      </div>
                      <div>
                        <CardTitle>{selectedPlatform.name}</CardTitle>
                        <CardDescription>@{selectedPlatform.username}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedPlatform(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-6 pt-6">
                      <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                              <div className="mb-2">
                                <FileText className="h-8 w-8 text-primary" />
                              </div>
                              <div className="text-3xl font-bold">{selectedPlatform.stats.solved}</div>
                              <div className="text-sm text-muted-foreground">Problems Solved</div>
                            </div>
                          </CardContent>
                        </Card>

                        {selectedPlatform.stats.rating && (
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex flex-col items-center text-center">
                                <div className="mb-2">
                                  <BarChart3 className="h-8 w-8 text-primary" />
                                </div>
                                <div className="text-3xl font-bold">{selectedPlatform.stats.rating}</div>
                                <div className="text-sm text-muted-foreground">Current Rating</div>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {selectedPlatform.stats.contests && (
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex flex-col items-center text-center">
                                <div className="mb-2">
                                  <Trophy className="h-8 w-8 text-primary" />
                                </div>
                                <div className="text-3xl font-bold">{selectedPlatform.stats.contests}</div>
                                <div className="text-sm text-muted-foreground">Contests Participated</div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Problem Breakdown</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Total Progress</span>
                            <span className="font-medium">
                              {selectedPlatform.stats.solved} / {selectedPlatform.stats.total}
                            </span>
                          </div>
                          <Progress
                            value={(selectedPlatform.stats.solved / selectedPlatform.stats.total) * 100}
                            className="h-2 w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span>Easy</span>
                            </div>
                            <span className="font-medium">
                              {selectedPlatform.stats.easy} (
                              {Math.round((selectedPlatform.stats.easy / selectedPlatform.stats.solved) * 100)}
                              %)
                            </span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{
                                width: `${(selectedPlatform.stats.easy / selectedPlatform.stats.solved) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                              <span>Medium</span>
                            </div>
                            <span className="font-medium">
                              {selectedPlatform.stats.medium} (
                              {Math.round((selectedPlatform.stats.medium / selectedPlatform.stats.solved) * 100)}
                              %)
                            </span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-500 rounded-full"
                              style={{
                                width: `${(selectedPlatform.stats.medium / selectedPlatform.stats.solved) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <span>Hard</span>
                            </div>
                            <span className="font-medium">
                              {selectedPlatform.stats.hard} (
                              {Math.round((selectedPlatform.stats.hard / selectedPlatform.stats.solved) * 100)}
                              %)
                            </span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500 rounded-full"
                              style={{
                                width: `${(selectedPlatform.stats.hard / selectedPlatform.stats.solved) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">Recent Activity</h3>
                          <Button variant="outline" size="sm">
                            View All
                          </Button>
                        </div>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Solved "Two Sum"</h4>
                              <p className="text-xs text-muted-foreground">2 hours ago</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Solved "Valid Parentheses"</h4>
                              <p className="text-xs text-muted-foreground">Yesterday</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <Trophy className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Participated in Weekly Contest 341</h4>
                              <p className="text-xs text-muted-foreground">3 days ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6 pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b">
                          <div>
                            <h3 className="font-medium">Auto Sync</h3>
                            <p className="text-sm text-muted-foreground">
                              Automatically sync your data from this platform
                            </p>
                          </div>
                          <Switch
                            checked={selectedPlatform.autoSync}
                            onCheckedChange={(value) => handleToggleAutoSync(selectedPlatform.id, value)}
                          />
                        </div>

                        <div className="flex justify-between items-center pb-4 border-b">
                          <div>
                            <h3 className="font-medium">Private Profile</h3>
                            <p className="text-sm text-muted-foreground">
                              Hide this platform data from your public profile
                            </p>
                          </div>
                          <Switch
                            checked={selectedPlatform.private}
                            onCheckedChange={(value) => handleTogglePrivate(selectedPlatform.id, value)}
                          />
                        </div>

                        <div className="flex justify-between items-center pb-4 border-b">
                          <div>
                            <h3 className="font-medium">Sync Frequency</h3>
                            <p className="text-sm text-muted-foreground">How often to sync data from this platform</p>
                          </div>
                          <Select defaultValue="daily">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="manual">Manual Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-between items-center pb-4 border-b">
                          <div>
                            <h3 className="font-medium">Notification Settings</h3>
                            <p className="text-sm text-muted-foreground">Configure notifications for this platform</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-red-600">Disconnect Platform</h3>
                            <p className="text-sm text-muted-foreground">Remove this platform from your account</p>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              handleDisconnect(selectedPlatform.id)
                              setSelectedPlatform(null)
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Disconnect
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced" className="space-y-6 pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b">
                          <div>
                            <h3 className="font-medium">API Token</h3>
                            <p className="text-sm text-muted-foreground">Use API token instead of username/password</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Lock className="h-4 w-4 mr-1" /> Configure
                          </Button>
                        </div>

                        <div className="flex justify-between items-center pb-4 border-b">
                          <div>
                            <h3 className="font-medium">Data Import/Export</h3>
                            <p className="text-sm text-muted-foreground">
                              Import or export your data from this platform
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Import
                            </Button>
                            <Button variant="outline" size="sm">
                              Export
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pb-4 border-b">
                          <div>
                            <h3 className="font-medium">Sync Logs</h3>
                            <p className="text-sm text-muted-foreground">
                              View logs of recent synchronization activities
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Logs
                          </Button>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Debug Mode</h3>
                            <p className="text-sm text-muted-foreground">Enable detailed logging for troubleshooting</p>
                          </div>
                          <Switch defaultChecked={false} />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between border-t">
                  <Button variant="outline" onClick={() => setSelectedPlatform(null)}>
                    Close
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => {
                      handleSync(selectedPlatform.id)
                      setSelectedPlatform(null)
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" /> Sync Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          <div className="mt-12 p-6 border border-dashed rounded-lg bg-muted/50">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <HelpCircle className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-1">Need Help Connecting Platforms?</h3>
                <p className="text-muted-foreground mb-2">
                  If you're having trouble connecting your coding platforms, check out our guide or contact support.
                </p>
              </div>
              <div className="flex-shrink-0 flex gap-2">
                <Button variant="outline">
                  <Info className="h-4 w-4 mr-1" /> View Guide
                </Button>
                <Button variant="outline">Contact Support</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
