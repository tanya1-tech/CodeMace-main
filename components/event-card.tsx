"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { deleteEvent } from "@/app/actions/event-actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Event {
  _id: string
  title: string
  platform: string
  startTime: string
  endTime: string
  url: string
}

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Format dates
  const startTime = new Date(event.startTime)
  const endTime = new Date(event.endTime)

  const formattedStartTime = startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const formattedEndTime = endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const formattedDate = startTime.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" })

  // Platform logo
  const getPlatformLogo = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "codeforces":
        return "/placeholder.svg?height=40&width=40&text=CF"
      case "codechef":
        return "/placeholder.svg?height=40&width=40&text=CC"
      case "leetcode":
        return "/placeholder.svg?height=40&width=40&text=LC"
      case "hackerrank":
        return "/placeholder.svg?height=40&width=40&text=HR"
      case "atcoder":
        return "/placeholder.svg?height=40&width=40&text=AT"
      default:
        return "/placeholder.svg?height=40&width=40&text=OT"
    }
  }

  // Google Calendar link
  const getGoogleCalendarLink = () => {
    const startTimeISO = startTime.toISOString().replace(/-|:|\.\d+/g, "")
    const endTimeISO = endTime.toISOString().replace(/-|:|\.\d+/g, "")

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startTimeISO}/${endTimeISO}&details=${encodeURIComponent(`Contest URL: ${event.url}`)}&location=${encodeURIComponent(event.url)}`
  }

  // Handle delete
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteEvent(event._id)

      if (result.success) {
        toast({
          title: "Event deleted",
          description: "The event has been deleted successfully",
        })
      } else {
        toast({
          title: "Failed to delete event",
          description: result.error || "Something went wrong",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Image
              src={getPlatformLogo(event.platform) || "/placeholder.svg"}
              alt={event.platform}
              width={40}
              height={40}
              className="rounded-md"
            />
            <div>
              <div className="font-medium">{event.title}</div>
              <div className="text-xs text-muted-foreground">
                {formattedDate} {formattedStartTime} - {formattedEndTime}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-primary">
              <Calendar className="h-4 w-4" />
              <Link href={getGoogleCalendarLink()} target="_blank" className="hover:underline">
                Add to Calendar
              </Link>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-7 text-xs" asChild>
                <Link href={event.url} target="_blank">
                  <ExternalLink className="h-3 w-3 mr-1" /> Visit
                </Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs text-red-500 hover:text-red-700"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the event "{event.title}".</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
