"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Search, Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import { getEvents, addSampleEvents } from "@/app/actions/event-actions"
import { EventCard } from "@/components/event-card"
import { AddEventModal } from "@/components/add-event-modal"
import { useToast } from "@/hooks/use-toast"

interface Event {
  _id: string
  title: string
  platform: string
  startTime: string
  endTime: string
  url: string
  userId: string
}

export default function EventTracker() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [isAddingSamples, setIsAddingSamples] = useState(false)

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  // Fetch events
  useEffect(() => {
    async function fetchEvents() {
      if (!session) return

      try {
        setIsLoading(true)
        const result = await getEvents()

        if (result.success) {
          setEvents(result.data)
        } else {
          toast({
            title: "Failed to load events",
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
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [session, toast])

  // Add sample events
  const handleAddSampleEvents = async () => {
    if (!session) return

    try {
      setIsAddingSamples(true)
      const result = await addSampleEvents()

      if (result.success) {
        toast({
          title: "Sample events added",
          description: "Sample events have been added to your calendar.",
        })

        // Refresh events
        const eventsResult = await getEvents()
        if (eventsResult.success) {
          setEvents(eventsResult.data)
        }
      } else {
        toast({
          title: "Failed to add sample events",
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
      setIsAddingSamples(false)
    }
  }

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlatform = platformFilter === "all" || event.platform.toLowerCase() === platformFilter.toLowerCase()
    return matchesSearch && matchesPlatform
  })

  // Group events by date
  const groupedEvents: Record<string, Event[]> = {}

  filteredEvents.forEach((event) => {
    const date = new Date(event.startTime).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })

    if (!groupedEvents[date]) {
      groupedEvents[date] = []
    }

    groupedEvents[date].push(event)
  })

  // Generate calendar days
  const generateCalendarDays = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const calendarDays = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push({ day: null, events: [] })
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateString = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })

      calendarDays.push({
        day,
        events: groupedEvents[dateString] || [],
      })
    }

    // Fill remaining cells to complete the grid
    const remainingCells = 42 - calendarDays.length
    for (let i = 0; i < remainingCells; i++) {
      calendarDays.push({ day: null, events: [] })
    }

    return calendarDays
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search Contests"
                  className="w-full pl-8 bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Platforms Selected" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="codeforces">Codeforces</SelectItem>
                <SelectItem value="codechef">CodeChef</SelectItem>
                <SelectItem value="leetcode">LeetCode</SelectItem>
                <SelectItem value="hackerrank">HackerRank</SelectItem>
                <SelectItem value="atcoder">AtCoder</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Upcoming Contests</h2>
                  <p className="text-muted-foreground text-sm">Don't miss scheduled events</p>
                </div>
                <Button size="sm" onClick={() => setShowAddModal(true)} className="h-8">
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : Object.keys(groupedEvents).length > 0 ? (
                  Object.entries(groupedEvents).map(([date, dateEvents]) => (
                    <div key={date}>
                      <div className="text-sm text-muted-foreground mb-2">{date}</div>
                      <div className="space-y-3">
                        {dateEvents.map((event) => (
                          <EventCard key={event._id} event={event} />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    {searchQuery || platformFilter !== "all" ? (
                      <p>No events match your search criteria.</p>
                    ) : (
                      <div className="space-y-4">
                        <p className="mb-2">No upcoming contests found.</p>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm" onClick={() => setShowAddModal(true)}>
                            <Plus className="h-4 w-4 mr-1" /> Add Your First Event
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleAddSampleEvents}
                            disabled={isAddingSamples}
                          >
                            {isAddingSamples ? "Adding..." : "Add Sample Events"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{currentMonth}</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-7 border-b">
                  {days.map((day) => (
                    <div key={day} className="p-3 text-center font-medium border-r last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7">
                  {calendarDays.map((calendarDay, i) => (
                    <div
                      key={i}
                      className={`min-h-[100px] p-2 border-r border-b last:border-r-0 ${!calendarDay.day ? "bg-muted/50" : ""
                        }`}
                    >
                      {calendarDay.day && (
                        <>
                          <div className="text-sm mb-1">{calendarDay.day}</div>
                          {calendarDay.events.map((event) => (
                            <div
                              key={event._id}
                              className="text-xs p-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded mb-1 truncate"
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AddEventModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  )
}
