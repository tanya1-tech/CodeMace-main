"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, MessageSquare, Bug, Lightbulb, ThumbsUp, Star, RefreshCw } from 'lucide-react'
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { submitFeedback } from "@/app/actions/feedback-actions"

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackType, setFeedbackType] = useState("general")
  const [rating, setRating] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prevent multiple submissions
    if (isSubmitting) return

    // Get form data
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    // Add rating to form data if selected
    if (rating) {
      formData.append("rating", rating)
    }

    // Submit feedback
    try {
      setIsSubmitting(true)

      // Show immediate feedback to user
      toast({
        title: "Processing...",
        description: "Submitting your feedback. Please wait.",
        variant: "default",
      })

      const result = await submitFeedback(formData)

      if (result.success) {
        // Set submitted state to true to show success message
        setSubmitted(true)

        toast({
          title: "Success!",
          description: "Your feedback has been submitted successfully.",
          variant: "default",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to submit feedback. Please try again.",
          variant: "destructive",
        })
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const handleNewFeedback = () => {
    setSubmitted(false)
    setIsSubmitting(false)
    setFeedbackType("general")
    setRating(null)
  }

  const handleContactSupport = () => {
    // Gmail compose URL with recipient email and subject pre-filled
    const gmailComposeUrl =
      "https://mail.google.com/mail/?view=cm&fs=1&to=wspace192@gmail.com&su=CodeMace Support Request"

    // Open Gmail in a new tab
    window.open(gmailComposeUrl, "_blank")
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
              <span className="font-medium">We Value Your Input</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              We Value Your <span className="text-primary">Feedback</span>
            </h1>
            <p className="mt-4 max-w-[700px] text-muted-foreground text-base md:text-xl">
              Help us improve CodeMace by sharing your thoughts, reporting bugs, or suggesting new features.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8 md:mb-12 max-w-4xl mx-auto">
            <Card className="flex flex-col items-center text-center p-4 sm:p-6 card-hover bg-gradient-to-br from-pink-50 to-red-100 border-t-4 border-destructive">
              <Bug className="h-10 w-10 md:h-12 md:w-12 text-destructive mb-3 md:mb-4" />
              <CardTitle className="text-lg md:text-xl mb-2">Report a Bug</CardTitle>
              <CardDescription>
                Found something that doesn't work as expected? Let us know so we can fix it.
              </CardDescription>
            </Card>
            <Card className="flex flex-col items-center text-center p-4 sm:p-6 card-hover bg-gradient-to-br from-amber-50 to-yellow-100 border-t-4 border-warning">
              <Lightbulb className="h-10 w-10 md:h-12 md:w-12 text-warning mb-3 md:mb-4" />
              <CardTitle className="text-lg md:text-xl mb-2">Suggest a Feature</CardTitle>
              <CardDescription>Have an idea that would make CodeMace better? We'd love to hear it!</CardDescription>
            </Card>
            <Card className="flex flex-col items-center text-center p-4 sm:p-6 card-hover bg-gradient-to-br from-green-50 to-emerald-100 border-t-4 border-success sm:col-span-2 md:col-span-1">
              <ThumbsUp className="h-10 w-10 md:h-12 md:w-12 text-success mb-3 md:mb-4" />
              <CardTitle className="text-lg md:text-xl mb-2">General Feedback</CardTitle>
              <CardDescription>Share your overall experience with CodeMace and how we can improve.</CardDescription>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_350px] max-w-5xl mx-auto">
            <div>
              <Card className="border-t-4 border-primary bg-gradient-to-br from-orange-50 to-amber-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <CardHeader>
                  <CardTitle>Submit Your Feedback</CardTitle>
                  <CardDescription>Fill out the form below to share your thoughts with our team.</CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-16 h-16 rounded-full gradient-success flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                      <p className="text-muted-foreground mb-6">
                        Your feedback has been submitted successfully. We appreciate your input!
                      </p>
                      <Button
                        onClick={handleNewFeedback}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Submit Another Feedback
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="Your email address" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feedback-type">Feedback Type</Label>
                        <Select
                          defaultValue="general"
                          name="feedback-type"
                          onValueChange={(value) => setFeedbackType(value)}
                        >
                          <SelectTrigger id="feedback-type">
                            <SelectValue placeholder="Select feedback type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bug" className="text-destructive">
                              Bug Report
                            </SelectItem>
                            <SelectItem value="feature" className="text-warning">
                              Feature Request
                            </SelectItem>
                            <SelectItem value="general" className="text-success">
                              General Feedback
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {feedbackType === "bug" && (
                        <div className="space-y-2 p-4 border border-destructive/20 bg-red-50 rounded-lg">
                          <Label htmlFor="bug-details" className="text-destructive">
                            Bug Details
                          </Label>
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="page">Where did you encounter the bug?</Label>
                              <Input id="page" name="page" placeholder="e.g., Profile Tracker, Question Tracker" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="steps">Steps to Reproduce</Label>
                              <Textarea
                                id="steps"
                                name="steps"
                                placeholder="Please describe the steps to reproduce the bug"
                                className="min-h-[100px]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {feedbackType === "feature" && (
                        <div className="space-y-2 p-4 border border-warning/20 bg-amber-50 rounded-lg">
                          <Label htmlFor="feature-details" className="text-warning">
                            Feature Details
                          </Label>
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="feature-title">Feature Title</Label>
                              <Input
                                id="feature-title"
                                name="feature-title"
                                placeholder="A short title for your feature idea"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="feature-benefit">How would this feature benefit users?</Label>
                              <Textarea
                                id="feature-benefit"
                                name="feature-benefit"
                                placeholder="Please explain how this feature would improve the user experience"
                                className="min-h-[100px]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label>How would you rate your experience with CodeMace?</Label>
                        <div className="flex gap-2 pt-2 justify-center">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <Button
                              key={value}
                              type="button"
                              variant={rating === value.toString() ? "default" : "outline"}
                              className={`h-10 w-10 p-0 rounded-full ${rating === value.toString() ? "gradient-primary border-0" : ""}`}
                              onClick={() => setRating(value.toString())}
                            >
                              <Star
                                className={`h-5 w-5 ${rating === value.toString() ? "text-white fill-white" : ""}`}
                              />
                              <span className="sr-only">{value} stars</span>
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please share your detailed feedback here"
                          className="min-h-[120px] md:min-h-[150px]"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full gradient-primary border-0 hover:opacity-90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          "Submit Feedback"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-t-4 border-secondary bg-gradient-to-br from-cyan-50 to-teal-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <CardHeader>
                  <CardTitle>What Users Say</CardTitle>
                  <CardDescription>Feedback from our community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "Alex Johnson",
                      role: "Software Engineer",
                      message:
                        "CodeMace has completely transformed how I track my coding progress. The profile tracker is incredibly useful!",
                      avatar: "AJ",
                      color: "primary",
                      bgColor: "bg-orange-100 dark:bg-orange-900/50",
                      textColor: "text-primary dark:text-primary",
                    },
                    {
                      name: "Sarah Chen",
                      role: "CS Student",
                      message:
                        "The question tracker helped me organize my LeetCode practice. I love how I can follow different sheets.",
                      avatar: "SC",
                      color: "secondary",
                      bgColor: "bg-teal-100 dark:bg-teal-900/50",
                      textColor: "text-secondary dark:text-secondary",
                    },
                    {
                      name: "Michael Rodriguez",
                      role: "Web Developer",
                      message:
                        "Never miss a coding contest again! The event tracker feature is a game-changer for competitive programmers.",
                      avatar: "MR",
                      color: "accent",
                      bgColor: "bg-purple-100 dark:bg-purple-900/50",
                      textColor: "text-accent dark:text-accent",
                    },
                  ].map((testimonial, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <Image
                        src="/placeholder.svg?height=40&width=40&text=Avatar"
                        alt="User avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground mb-1">{testimonial.role}</div>
                        <p className="text-sm text-muted-foreground">{testimonial.message}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-t-4 border-accent bg-gradient-to-br from-violet-50 to-purple-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                  <CardDescription>Need direct assistance?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-accent" />
                    <span className="text-sm">wspace192@gmail.com</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Our support team is available Monday through Friday, 9am to 5pm EST.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-accent text-accent hover:bg-accent/10"
                    onClick={handleContactSupport}
                  >
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 md:mt-16 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">Frequently Asked Questions</h2>
            <Tabs defaultValue="general" className="max-w-3xl mx-auto">
              <TabsList className="grid grid-cols-3 mb-6 md:mb-8 w-full">
                <TabsTrigger
                  value="general"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="data-[state=active]:bg-secondary/10 data-[state=active]:text-secondary"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="technical"
                  className="data-[state=active]:bg-accent/10 data-[state=active]:text-accent"
                >
                  Technical
                </TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-4">
                <Card className="border-l-4 border-primary bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-800 dark:border-primary">
                  <CardHeader>
                    <CardTitle>What is CodeMace?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="dark:text-gray-300">
                      CodeMace is an all-in-one platform for tracking your coding journey, managing coding sheets, and
                      monitoring coding contests. It helps developers organize their learning and stay on top of their
                      progress.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-primary bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-800 dark:border-primary">
                  <CardHeader>
                    <CardTitle>Is CodeMace free to use?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="dark:text-gray-300">
                      Yes, CodeMace offers a free tier with essential features. We also offer premium plans with
                      advanced features for more serious coders and teams.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="features" className="space-y-4">
                <Card className="border-l-4 border-secondary bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 dark:border-secondary">
                  <CardHeader>
                    <CardTitle>What platforms does CodeMace support?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="dark:text-gray-300">
                      CodeMace supports all major coding platforms including LeetCode, Codeforces, CodeChef, HackerRank,
                      and more. You can track your progress across all these platforms in one place.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-secondary bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 dark:border-secondary">
                  <CardHeader>
                    <CardTitle>Can I create my own coding sheets?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="dark:text-gray-300">
                      Yes, you can create custom coding sheets tailored to your learning goals. You can also follow
                      popular sheets created by the community.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="technical" className="space-y-4">
                <Card className="border-l-4 border-accent bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 dark:border-accent">
                  <CardHeader>
                    <CardTitle>How do I connect my coding profiles?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="dark:text-gray-300">
                      Go to the Profile Tracker page and click on "Add Platform". You'll be guided through the process
                      of connecting your accounts from various coding platforms.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-accent bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 dark:border-accent">
                  <CardHeader>
                    <CardTitle>Is my data secure?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="dark:text-gray-300">
                      Yes, we take data security seriously. All your data is encrypted and stored securely. We never
                      share your personal information with third parties without your consent.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
