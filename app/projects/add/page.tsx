"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Github, Upload, Plus, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AddProjectPage() {
  const [technologies, setTechnologies] = useState<string[]>([])
  const [newTech, setNewTech] = useState("")

  const addTechnology = () => {
    if (newTech && !technologies.includes(newTech)) {
      setTechnologies([...technologies, newTech])
      setNewTech("")
    }
  }

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Add New Project</h1>
            <p className="text-muted-foreground">Showcase your work by adding a new project to your portfolio.</p>
          </div>

          <Tabs defaultValue="github" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="github">Import from GitHub</TabsTrigger>
              <TabsTrigger value="manual">Add Manually</TabsTrigger>
            </TabsList>
            <TabsContent value="github" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Import from GitHub</CardTitle>
                  <CardDescription>
                    Select a repository to import as a project. We'll automatically fetch the details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Github className="h-8 w-8" />
                    <div>
                      <h3 className="font-medium">Connect GitHub</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect your GitHub account to import repositories
                      </p>
                    </div>
                    <Button className="ml-auto">Connect</Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="repo-url">Repository URL</Label>
                      <Input id="repo-url" placeholder="https://github.com/username/repository" />
                    </div>
                    <Button className="w-full">Import Repository</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="manual" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Project Manually</CardTitle>
                  <CardDescription>Enter the details of your project to add it to your portfolio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="project-title">Project Title</Label>
                    <Input id="project-title" placeholder="My Awesome Project" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                      id="project-description"
                      placeholder="A brief description of your project"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-repo">Repository URL (Optional)</Label>
                    <Input id="project-repo" placeholder="https://github.com/username/repository" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-demo">Demo URL (Optional)</Label>
                    <Input id="project-demo" placeholder="https://myproject.com" />
                  </div>

                  <div className="space-y-2">
                    <Label>Project Screenshot</Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop an image, or click to browse</p>
                      <Button variant="outline" size="sm">
                        Upload Image
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Technologies Used</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {technologies.map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm"
                        >
                          {tech}
                          <button onClick={() => removeTechnology(tech)}>
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add technology (e.g., React, Node.js)"
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTechnology()
                          }
                        }}
                      />
                      <Button type="button" onClick={addTechnology} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full">Add Project</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
