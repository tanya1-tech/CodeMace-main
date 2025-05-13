"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, ExternalLink, Calendar, Edit, Share2, MessageSquare, ThumbsUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // In a real app, you would fetch the project data based on the ID
  const project = {
    id: params.id,
    title: "Quick Sign",
    description: "An OAuth Provider for hassle free and secure signup across platforms.",
    longDescription: `
      Quick Sign is a comprehensive OAuth provider that simplifies the authentication process across multiple platforms. 
      It provides a secure, hassle-free signup and login experience for users while giving developers an easy-to-implement solution.
      
      The system supports various authentication methods including email/password, Google, GitHub, and more. It features token-based authentication, 
      refresh tokens, and comprehensive security measures to protect user data.
      
      Built with modern technologies, Quick Sign is designed to be lightweight, scalable, and easy to integrate into any application.
    `,
    image: "/placeholder.svg?height=400&width=800&text=QuickSign",
    repository: "https://github.com/anurag-327/QuickSign",
    repoOwner: "anurag-327",
    repoName: "QuickSign",
    demoUrl: "https://quicksign.demo.com",
    createdAt: "2023-09-15",
    updatedAt: "2024-03-22",
    technologies: [
      { name: "CSS", color: "bg-blue-500" },
      { name: "JavaScript", color: "bg-yellow-500" },
      { name: "HTML", color: "bg-orange-500" },
      { name: "Node.js", color: "bg-green-600" },
      { name: "Express", color: "bg-gray-600" },
      { name: "MongoDB", color: "bg-green-500" },
    ],
    features: [
      "Multi-platform OAuth authentication",
      "Secure token-based authentication",
      "Easy integration with any application",
      "Comprehensive user management",
      "Detailed analytics and logging",
    ],
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Created: {project.createdAt} • Updated: {project.updatedAt}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={project.repository} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> Repository
                </Link>
              </Button>
              {project.demoUrl && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src="/placeholder.svg?height=400&width=800&text=Project+Detail"
                    alt="Project detail"
                    width={800}
                    height={400}
                    className="w-full rounded-lg object-cover"
                  />
                </div>
              </Card>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4 space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
                      <p className="whitespace-pre-line text-muted-foreground">{project.longDescription}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="features" className="mt-4 space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                      <ul className="space-y-2">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="discussion" className="mt-4 space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Discussion</h2>
                        <Button size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" /> New Comment
                        </Button>
                      </div>
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No comments yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Be the first to start a discussion about this project
                        </p>
                        <Button>
                          <MessageSquare className="mr-2 h-4 w-4" /> Add Comment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Project Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Repository</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <Github className="h-4 w-4" />
                        <Link
                          href={project.repository}
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.repoOwner}/{project.repoName}
                        </Link>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className={`${tech.color} text-white text-xs px-2.5 py-0.5 rounded-full`}>
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Created By</h3>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium">
                          AU
                        </div>
                        <div>
                          <div className="font-medium">Anurag</div>
                          <div className="text-xs text-muted-foreground">@anurag-327</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Engagement</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <ThumbsUp className="h-6 w-6 text-primary mb-2" />
                      <span className="text-2xl font-bold">24</span>
                      <span className="text-xs text-muted-foreground">Likes</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-primary mb-2" />
                      <span className="text-2xl font-bold">0</span>
                      <span className="text-xs text-muted-foreground">Comments</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      <ThumbsUp className="mr-2 h-4 w-4" /> Like Project
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Similar Projects</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-md bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium">Auth Provider</h3>
                        <p className="text-xs text-muted-foreground">Simple authentication service</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-md bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium">OAuth Connect</h3>
                        <p className="text-xs text-muted-foreground">Multi-platform authentication</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
