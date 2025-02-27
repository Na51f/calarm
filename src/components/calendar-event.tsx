import type { Event } from "~/lib/types"

interface CalendarEventProps {
  event: Event
  onClick: () => void
  view: "day" | "week" | "month"
}

export function CalendarEvent({ event, onClick, view }: CalendarEventProps) {
  const startTime = new Date(event.start)
  const endTime = new Date(event.end)

  const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60) // duration in minutes
  const height = Math.max(duration, 30) // minimum height of 30px

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
  }

  if (view === "month") {
    return (
      <div
        className="text-xs p-1 rounded truncate cursor-pointer"
        style={{ backgroundColor: `${event.color}30`, color: event.color }}
        onClick={onClick}
      >
        {event.title}
      </div>
    )
  }

  const width = view === "day" ? "calc(100% - 8px)" : "calc(100% - 4px)"

  return (
    <div
      className="absolute rounded-md p-2 overflow-hidden cursor-pointer left-0 shadow-sm border"
      style={{
        backgroundColor: `${event.color}20`,
        borderLeft: `3px solid ${event.color}`,
        top: `${(startTime.getMinutes() / 60) * 100}%`,
        height: `${(height / 60) * 100}%`,
        width,
        maxHeight: "calc(100% - 2px)",
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <div className="font-medium text-xs" style={{ color: event.color }}>
        {event.title}
      </div>
      <div className="text-xs text-muted-foreground">
        {formatTime(startTime)} - {formatTime(endTime)}
      </div>
    </div>
  )
}

