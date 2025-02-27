"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Menu, Plus } from "lucide-react"
import { Button } from "~/components/ui/button"
import { CalendarGrid } from "~/components/calendar-grid"
import { CalendarSidebar } from "~/components/calendar-sidebar"
import { EventModal } from "~/components/event-modal"
import { mockEvents } from "~/lib/mock-data"
import type { Event } from "~/lib/types"

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [view, setView] = useState<"day" | "week" | "month">("week")

  const handlePrevious = () => {
    const newDate = new Date(currentDate)
    if (view === "day") {
      newDate.setDate(newDate.getDate() - 1)
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setMonth(newDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(currentDate)
    if (view === "day") {
      newDate.setDate(newDate.getDate() + 1)
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const formatDateRange = () => {
    const options: Intl.DateTimeFormatOptions = { month: "long" }
    const month = currentDate.toLocaleDateString("en-US", options)
    const year = currentDate.getFullYear()

    if (view === "month") {
      return `${month} ${year}`
    } else if (view === "week") {
      const startOfWeek = new Date(currentDate)
      const day = currentDate.getDay()
      startOfWeek.setDate(currentDate.getDate() - day)

      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${month} ${startOfWeek.getDate()} – ${endOfWeek.getDate()}, ${year}`
      } else {
        const endMonth = endOfWeek.toLocaleDateString("en-US", options)
        return `${month} ${startOfWeek.getDate()} – ${endMonth} ${endOfWeek.getDate()}, ${year}`
      }
    } else {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 items-center border-b px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-4 flex items-center">
            <Calendar className="mr-2 h-6 w-6 text-red-500" />
            <h1 className="text-xl font-semibold">Calendar</h1>
          </div>
        </div>
        <div className="ml-8 flex items-center">
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <div className="ml-4 flex items-center">
            <Button variant="ghost" size="icon" onClick={handlePrevious}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNext}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <h2 className="ml-4 text-lg font-medium min-w-40">{formatDateRange()}</h2>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <div className="flex border rounded-md">
            <Button
              variant={view === "day" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setView("day")}
            >
              Day
            </Button>
            <Button
              variant={view === "week" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setView("week")}
            >
              Week
            </Button>
            <Button
              variant={view === "month" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setView("month")}
            >
              Month
            </Button>
          </div>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
            <Plus className="mr-1 h-4 w-4" />
            Create
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <CalendarSidebar currentDate={currentDate} />}
        <main className="flex-1 overflow-auto">
          <CalendarGrid currentDate={currentDate} events={mockEvents} view={view} onEventClick={setSelectedEvent} />
        </main>
      </div>

      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  )
}

