"use client"

import { useEffect, useState } from "react"
import type { Event } from "~/lib/types"
import { CalendarEvent } from "~/components/calendar-event"

interface CalendarGridProps {
  currentDate: Date
  events: Event[]
  view: "day" | "week" | "month"
  onEventClick: (event: Event) => void
}

export function CalendarGrid({ currentDate, events, view, onEventClick }: CalendarGridProps) {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])

  useEffect(() => {
    // Filter events based on the current view and date
    const filtered = events.filter((event) => {
      const eventDate = new Date(event.start)

      if (view === "day") {
        return eventDate.toDateString() === currentDate.toDateString()
      } else if (view === "week") {
        const startOfWeek = new Date(currentDate)
        const day = currentDate.getDay()
        startOfWeek.setDate(currentDate.getDate() - day)

        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)
        endOfWeek.setHours(23, 59, 59, 999)

        return eventDate >= startOfWeek && eventDate <= endOfWeek
      } else {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        return eventDate.getFullYear() === year && eventDate.getMonth() === month
      }
    })

    setFilteredEvents(filtered)
  }, [currentDate, events, view])

  if (view === "month") {
    return <MonthView currentDate={currentDate} events={filteredEvents} onEventClick={onEventClick} />
  } else if (view === "week") {
    return <WeekView currentDate={currentDate} events={filteredEvents} onEventClick={onEventClick} />
  } else {
    return <DayView currentDate={currentDate} events={filteredEvents} onEventClick={onEventClick} />
  }
}

function DayView({
  currentDate,
  events,
  onEventClick,
}: { currentDate: Date; events: Event[]; onEventClick: (event: Event) => void }) {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getEventsForHour = (hour: number) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start)
      return eventStart.getHours() === hour
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-background border-b py-2 px-4">
        <div className="text-center font-medium">
          {currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {hours.map((hour) => (
          <div key={hour} className="flex border-b min-h-[60px] relative">
            <div className="w-16 py-2 px-2 text-xs text-muted-foreground text-right sticky left-0 bg-background">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>
            <div className="flex-1 relative">
              {getEventsForHour(hour).map((event) => (
                <CalendarEvent key={event.id} event={event} onClick={() => onEventClick(event)} view="day" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WeekView({
  currentDate,
  events,
  onEventClick,
}: { currentDate: Date; events: Event[]; onEventClick: (event: Event) => void }) {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate)
    const day = currentDate.getDay()
    date.setDate(currentDate.getDate() - day + i)
    return date
  })

  const getEventsForDayAndHour = (date: Date, hour: number) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start)
      return eventStart.toDateString() === date.toDateString() && eventStart.getHours() === hour
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex">
          <div className="w-16 border-r"></div>
          {days.map((date, index) => (
            <div
              key={index}
              className={`flex-1 text-center py-2 font-medium ${date.toDateString() === new Date().toDateString() ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
            >
              <div className="text-sm">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
              <div
                className={`text-xl mt-1 ${date.toDateString() === new Date().toDateString() ? "h-8 w-8 rounded-full bg-blue-500 text-white mx-auto flex items-center justify-center" : ""}`}
              >
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {hours.map((hour) => (
          <div key={hour} className="flex border-b min-h-[60px]">
            <div className="w-16 py-2 px-2 text-xs text-muted-foreground text-right sticky left-0 bg-background border-r">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>
            {days.map((date, index) => (
              <div
                key={index}
                className={`flex-1 border-r relative ${date.toDateString() === new Date().toDateString() ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
              >
                {getEventsForDayAndHour(date, hour).map((event) => (
                  <CalendarEvent key={event.id} event={event} onClick={() => onEventClick(event)} view="week" />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function MonthView({
  currentDate,
  events,
  onEventClick,
}: { currentDate: Date; events: Event[]; onEventClick: (event: Event) => void }) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const startingDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const weeks = Math.ceil((startingDayOfWeek + daysInMonth) / 7)

  const days = Array.from({ length: weeks * 7 }, (_, i) => {
    const day = i - startingDayOfWeek + 1
    const date = new Date(year, month, day)
    return { date, inMonth: day > 0 && day <= daysInMonth }
  })

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start)
      return eventStart.toDateString() === date.toDateString()
    })
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="grid grid-cols-7 text-center py-2 border-b sticky top-0 bg-background z-10">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 h-full">
        {days.map((day, i) => (
          <div
            key={i}
            className={`border-b border-r min-h-[100px] p-1 ${!day.inMonth ? "bg-muted/30 text-muted-foreground" : ""} ${day.date.toDateString() === new Date().toDateString() ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
          >
            <div
              className={`text-right p-1 ${day.date.toDateString() === new Date().toDateString() ? "font-bold text-blue-500" : ""}`}
            >
              {day.date.getDate()}
            </div>
            <div className="space-y-1 max-h-[80px] overflow-y-auto">
              {getEventsForDay(day.date)
                .slice(0, 3)
                .map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded truncate cursor-pointer`}
                    style={{ backgroundColor: `${event.color}30`, color: event.color }}
                    onClick={() => onEventClick(event)}
                  >
                    {event.title}
                  </div>
                ))}
              {getEventsForDay(day.date).length > 3 && (
                <div className="text-xs text-muted-foreground px-1">+{getEventsForDay(day.date).length - 3} more</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

