"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createEvent } from "@/app/actions/event-actions"
import { useToast } from "@/hooks/use-toast"

interface AddEventModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddEventModal({ isOpen, onClose }: AddEventModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [platform, setPlatform] = useState("codeforces")

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      // Get form values
      const title = formData.get("title") as string
      const platform = formData.get("platform") as string
      const startDate = formData.get("startDate") as string
      const startTime = formData.get("startTime") as string
      const endDate = formData.get("endDate") as string
      const endTime = formData.get("endTime") as string
      const url = formData.get("url") as string

      // Validate form values
      if (!title || !platform || !startDate || !startTime || !endDate || !endTime || !url) {
        toast({
          title: "Missing fields",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Create start and end times
      const startDateTime = new Date(`${startDate}T${startTime}:00`)
      const endDateTime = new Date(`${endDate}T${endTime}:00`)

      // Validate dates
      if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        toast({
          title: "Invalid date/time",
          description: "Please enter valid date and time values",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      if (endDateTime <= startDateTime) {
        toast({
          title: "Invalid time range",
          description: "End time must be after start time",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Create event
      const result = await createEvent({
        title,
        platform,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        url,
      })

      if (result.success) {
        toast({
          title: "Event created",
          description: "Your event has been created successfully",
        })
        onClose()
      } else {
        toast({
          title: "Failed to create event",
          description: result.error || "Something went wrong",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating event:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Contest Event</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Contest Title</Label>
            <Input id="title" name="title" placeholder="e.g. Codeforces Round 1020" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select name="platform" value={platform} onValueChange={setPlatform} required>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="codeforces">Codeforces</SelectItem>
                <SelectItem value="codechef">CodeChef</SelectItem>
                <SelectItem value="leetcode">LeetCode</SelectItem>
                <SelectItem value="hackerrank">HackerRank</SelectItem>
                <SelectItem value="atcoder">AtCoder</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" name="startDate" type="date" min={today} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" name="startTime" type="time" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" name="endDate" type="date" min={today} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" name="endTime" type="time" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Contest URL</Label>
            <Input id="url" name="url" type="url" placeholder="https://codeforces.com/contests/..." required />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
