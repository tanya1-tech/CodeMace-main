"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LinkIcon, AlertCircle, X, Check, ExternalLink, Search } from "lucide-react"
import Image from "next/image"

interface Platform {
  id: string
  name: string
  icon: string
  description: string
  popular: boolean
  url: string
}

interface AddPlatformSectionProps {
  onAddPlatform: (platformId: string, username: string) => void
  className?: string
}

export function AddPlatformSection({ onAddPlatform, className = "" }: AddPlatformSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [apiToken, setApiToken] = useState("")
  const [authMethod, setAuthMethod] = useState<"credentials" | "token">("credentials")

  const platforms: Platform[] = [
    {
      id: "leetcode",
      name: "LeetCode",
      icon: "LC",
      description: "Popular platform with a wide range of algorithmic challenges",
      popular: true,
      url: "https://leetcode.com",
    },
    {
      id: "codeforces",
      name: "Codeforces",
      icon: "CF",
      description: "Competitive programming platform with regular contests",
      popular: true,
      url: "https://codeforces.com",
    },
    {
      id: "codechef",
      name: "CodeChef",
      icon: "CC",
      description: "Competitive programming platform with monthly contests",
      popular: true,
      url: "https://codechef.com",
    },
    {
      id: "hackerrank",
      name: "HackerRank",
      icon: "HR",
      description: "Practice coding, prepare for interviews, and get hired",
      popular: true,
      url: "https://hackerrank.com",
    },
    {
      id: "atcoder",
      name: "AtCoder",
      icon: "AC",
      description: "Programming contests platform from Japan",
      popular: false,
      url: "https://atcoder.jp",
    },
    {
      id: "hackerearth",
      name: "HackerEarth",
      icon: "HE",
      description: "Coding challenges and hackathons platform",
      popular: false,
      url: "https://hackerearth.com",
    },
    {
      id: "spoj",
      name: "SPOJ",
      icon: "SP",
      description: "Sphere Online Judge with thousands of problems",
      popular: false,
      url: "https://spoj.com",
    },
    {
      id: "topcoder",
      name: "TopCoder",
      icon: "TC",
      description: "Competitive programming and crowdsourcing platform",
      popular: false,
      url: "https://topcoder.com",
    },
    {
      id: "geeksforgeeks",
      name: "GeeksforGeeks",
      icon: "GFG",
      description: "Computer science portal with coding practice",
      popular: false,
      url: "https://geeksforgeeks.org",
    },
  ]

  const filteredPlatforms = platforms.filter((platform) =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleConnect = (platform: Platform) => {
    setSelectedPlatform(platform)
    setUsername("")
    setPassword("")
    setApiToken("")
  }

  const handleSubmit = () => {
    if (selectedPlatform && (username || apiToken)) {
      onAddPlatform(selectedPlatform.id, username || apiToken)
      setSelectedPlatform(null)
      setUsername("")
      setPassword("")
      setApiToken("")
    }
  }

  return (
    <div className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Add Coding Platform</h2>
        <p className="text-muted-foreground">Connect your coding profiles to track all your progress in one place</p>
      </div>

      {!selectedPlatform ? (
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search platforms..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">All Platforms</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="other">Others</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPlatforms.map((platform) => (
                  <PlatformCard key={platform.id} platform={platform} onConnect={handleConnect} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-0">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPlatforms
                  .filter((platform) => platform.popular)
                  .map((platform) => (
                    <PlatformCard key={platform.id} platform={platform} onConnect={handleConnect} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="other" className="mt-0">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPlatforms
                  .filter((platform) => !platform.popular)
                  .map((platform) => (
                    <PlatformCard key={platform.id} platform={platform} onConnect={handleConnect} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Image
                    src={`/placeholder.svg?height=40&width=40&text=${selectedPlatform.icon.substring(selectedPlatform.icon.lastIndexOf("/") + 1, selectedPlatform.icon.lastIndexOf("."))}`}
                    alt={selectedPlatform.name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <CardTitle>{selectedPlatform.name}</CardTitle>
                  <CardDescription>{selectedPlatform.description}</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedPlatform(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="credentials" onValueChange={(value) => setAuthMethod(value as "credentials" | "token")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="credentials">Username & Password</TabsTrigger>
                <TabsTrigger value="token">API Token</TabsTrigger>
              </TabsList>

              <TabsContent value="credentials" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={`Enter your ${selectedPlatform.name} username`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Your credentials are only used to fetch your data and are not stored on our servers. We use secure
                    methods to connect to {selectedPlatform.name}.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="token" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-token">API Token</Label>
                  <Input
                    id="api-token"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    placeholder={`Enter your ${selectedPlatform.name} API token`}
                  />
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">How to get your API token:</h4>
                  <ol className="text-sm text-muted-foreground space-y-2 ml-4 list-decimal">
                    <li>Log in to your {selectedPlatform.name} account</li>
                    <li>Go to your account settings or profile page</li>
                    <li>Look for API tokens or developer settings</li>
                    <li>Generate a new token with read access</li>
                    <li>Copy and paste the token here</li>
                  </ol>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="text-xs h-8" asChild>
                      <a href={selectedPlatform.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5 mr-1" /> Visit {selectedPlatform.name}
                      </a>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" onClick={() => setSelectedPlatform(null)}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleSubmit}
              disabled={authMethod === "credentials" ? !username : !apiToken}
            >
              <LinkIcon className="h-4 w-4 mr-2" /> Connect Platform
            </Button>
          </CardFooter>
        </Card>
      )}

      {!selectedPlatform && (
        <div className="mt-8 p-6 border border-dashed rounded-lg bg-muted/50">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-lg font-semibold mb-1">Benefits of Connecting Platforms</h3>
              <p className="text-muted-foreground">
                Track all your coding progress in one place, get insights across platforms, and showcase your skills
                with a unified profile.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface PlatformCardProps {
  platform: Platform
  onConnect: (platform: Platform) => void
}

function PlatformCard({ platform, onConnect }: PlatformCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Image
              src={`/placeholder.svg?height=40&width=40&text=${platform.icon.substring(platform.icon.lastIndexOf("/") + 1, platform.icon.lastIndexOf("."))}`}
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
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{platform.description}</p>
              </div>
              {platform.popular && <Badge className="bg-blue-100 text-blue-800 border-blue-200">Popular</Badge>}
            </div>
            <div className="mt-4">
              <Button size="sm" className="bg-primary hover:bg-primary/90 w-full" onClick={() => onConnect(platform)}>
                <LinkIcon className="h-3.5 w-3.5 mr-1" /> Connect
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
