"use server"

import { getServerSession } from "next-auth/next"
import { revalidatePath } from "next/cache"
import Event from "@/models/event"
import dbConnect from "@/lib/mongodb"

// Get all events for the current user
export async function getEvents() {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return { success: false, error: "Not authenticated" }
    }

    await dbConnect()

    const events = await Event.find({ userId: session.user.email }).sort({ startTime: 1 })

    return { success: true, data: JSON.parse(JSON.stringify(events)) }
  } catch (error) {
    console.error("Error fetching events:", error)
    return { success: false, error: "Failed to fetch events" }
  }
}

// Create a new event
export async function createEvent(eventData: {
  title: string
  platform: string
  startTime: string
  endTime: string
  url: string
}) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return { success: false, error: "Not authenticated" }
    }

    await dbConnect()

    console.log("Creating event with data:", {
      ...eventData,
      userId: session.user.email,
    })

    const newEvent = new Event({
      ...eventData,
      userId: session.user.email,
    })

    await newEvent.save()
    console.log("Event created successfully:", newEvent)

    revalidatePath("/event-tracker")

    return { success: true, data: JSON.parse(JSON.stringify(newEvent)) }
  } catch (error) {
    console.error("Error creating event:", error)
    return { success: false, error: "Failed to create event" }
  }
}

// Delete an event
export async function deleteEvent(eventId: string) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return { success: false, error: "Not authenticated" }
    }

    await dbConnect()

    // Find the event and ensure it belongs to the current user
    const event = await Event.findOne({ _id: eventId, userId: session.user.email })

    if (!event) {
      return { success: false, error: "Event not found or you don't have permission" }
    }

    await Event.deleteOne({ _id: eventId })

    revalidatePath("/event-tracker")

    return { success: true }
  } catch (error) {
    console.error("Error deleting event:", error)
    return { success: false, error: "Failed to delete event" }
  }
}

// Add sample events for demonstration
export async function addSampleEvents() {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return { success: false, error: "Not authenticated" }
    }

    await dbConnect()

    // Check if user already has events
    const existingEvents = await Event.countDocuments({ userId: session.user.email })

    if (existingEvents > 0) {
      return { success: true, message: "Sample events already exist" }
    }

    // Current date
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // Sample events
    const sampleEvents = [
      {
        title: "Codeforces Round 1020 (Div. 3)",
        platform: "codeforces",
        startTime: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000 + 19 * 60 * 60 * 1000), // Tomorrow at 7 PM
        endTime: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000 + 22 * 60 * 60 * 1000), // Tomorrow at 10 PM
        url: "https://codeforces.com/contests",
        userId: session.user.email,
      },
      {
        title: "LeetCode Weekly Contest 390",
        platform: "leetcode",
        startTime: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000), // 3 days from now at 10 AM
        endTime: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000), // 3 days from now at 12 PM
        url: "https://leetcode.com/contest/",
        userId: session.user.email,
      },
      {
        title: "AtCoder Beginner Contest 300",
        platform: "atcoder",
        startTime: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000), // 5 days from now at 2 PM
        endTime: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000), // 5 days from now at 4 PM
        url: "https://atcoder.jp/contests/abc300",
        userId: session.user.email,
      },
      {
        title: "CodeChef Starters 100",
        platform: "codechef",
        startTime: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000), // 7 days from now at 4 PM
        endTime: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000 + 19 * 60 * 60 * 1000), // 7 days from now at 7 PM
        url: "https://www.codechef.com/START100",
        userId: session.user.email,
      },
    ]

    await Event.insertMany(sampleEvents)

    revalidatePath("/event-tracker")

    return { success: true, message: "Sample events added successfully" }
  } catch (error) {
    console.error("Error adding sample events:", error)
    return { success: false, error: "Failed to add sample events" }
  }
}
