"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, ExternalLink, Github, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  image: string
  repository: string
  repoOwner: string
  repoName: string
  demoUrl?: string
  technologies: {
    name: string
    color: string
  }[]
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Quick Sign",
      description: "An OAuth Provider for hassle free and secure signup across platforms.",
      image: "/placeholder.svg?height=400&width=600&text=QuickSign",
      repository: "https://github.com/anurag-327/QuickSign",
      repoOwner: "anurag-327",
      repoName: "QuickSign",
      demoUrl: "https://quicksign.demo.com",
      technologies: [
        { name: "CSS", color: "bg-blue-500" },
        { name: "JavaScript", color: "bg-yellow-500" },
        { name: "HTML", color: "bg-orange-500" },
      ],
    },
    {
      id: "2",
      title: "Codemon",
      description:
        "Web based cpp compiler and coding platform where you can solve problems and keep track of your score",
      image: "/placeholder.svg?height=400&width=600&text=Codemon",
      repository: "https://github.com/anurag-327/Codemon",
      repoOwner: "anurag-327",
      repoName: "Codemon",
      demoUrl: "https://codemon.demo.com",
      technologies: [
        { name: "TypeScript", color: "bg-blue-600" },
        { name: "Dockerfile", color: "bg-red-500" },
        { name: "C++", color: "bg-pink-500" },
        { name: "CSS", color: "bg-blue-500" },
        { name: "JavaScript", color: "bg-yellow-500" },
      ],
    },
    {
      id: "3",
      title: "Portfolio Generator",
      description:
        "Create beautiful developer portfolios with just a few clicks. Customize templates and showcase your work.",
      image: "/placeholder.svg?height=400&width=600&text=Portfolio+Generator",
      repository: "https://github.com/anurag-327/portfolio-generator",
      repoOwner: "anurag-327",
      repoName: "portfolio-generator",
      technologies: [
        { name: "React", color: "bg-cyan-500" },
        { name: "Next.js", color: "bg-gray-800" },
        { name: "Tailwind", color: "bg-teal-500" },
      ],
    },
  ])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-2 sm:px-4 md:px-6">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Showcase Your Projects and Share with Peers – Inspire Collaboration and Growth
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto md:mx-0">
              Build your coding portfolio by adding projects you've worked on. Share your work with the community and
              get feedback.
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Projects</h2>
            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-primary/90">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Project
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
              >
                <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src="/placeholder.svg?height=200&width=350&text=Project"
                    alt={project.title}
                    width={350}
                    height={200}
                    className="w-full object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader className="p-4 pb-0 flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={project.repository} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-5 w-5" />
                      <span className="sr-only">Open project</span>
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                      <Github className="h-3.5 w-3.5 mr-1" />
                      <span>
                        {project.repoOwner}/{project.repoName}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className={`${tech.color} text-white text-xs px-2.5 py-0.5 rounded-full`}>
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center p-8 mb-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 w-full max-w-3xl">
              <div className="flex flex-col items-center">
                <PlusCircle className="h-10 w-10 text-gray-400 mb-2" />
                <h3 className="text-lg font-medium mb-1">Add a New Project</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md">
                  Showcase your work by adding projects you've built. Import directly from GitHub or add manually.
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
