"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { generateGoogleCalendarUrl } from "@/lib/google-calendar"
import { deleteEvent } from "@/app/actions/event-actions"
import { useToast } from "@/hooks/use-toast"
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

interface EventCardProps {
  event: {
    _id: string
    title: string
    platform: string
    startTime: string | Date
    endTime: string | Date
    url: string
  }
}

export function EventCard({ event }: EventCardProps) {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const startTime = new Date(event.startTime)
  const endTime = new Date(event.endTime)

  const formattedDate = startTime.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const formattedStartTime = startTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  const formattedEndTime = endTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  const googleCalendarUrl = generateGoogleCalendarUrl({
    title: event.title,
    startTime,
    endTime,
    description: `Coding contest on ${event.platform}. Visit: ${event.url}`,
  })

  async function handleDelete() {
    setIsDeleting(true)
    try {
      const result = await deleteEvent(event._id)
      if (result.success) {
        toast({
          title: "Event deleted",
          description: "The event has been deleted successfully.",
        })
      } else {
        toast({
          title: "Failed to delete event",
          description: result.error || "Something went wrong.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  // Get platform logo
  const getPlatformLogo = (platform: string) => {
    const platformMap: Record<string, string> = {
      codeforces: "CF",
      codechef: "CC",
      leetcode: "LC",
      hackerrank: "HR",
      atcoder: "AT",
      other: "OT",
    }

    return platformMap[platform.toLowerCase()] || "OT"
  }

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Image
              src={`/placeholder.svg?height=40&width=40&text=${getPlatformLogo(event.platform)}`}
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
              <Link href={googleCalendarUrl} target="_blank" className="hover:underline">
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
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete this event.</AlertDialogDescription>
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
