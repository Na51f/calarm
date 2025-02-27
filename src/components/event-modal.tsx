import { Clock, MapPin, X } from "lucide-react"
import { Button } from "~/components/ui/button"
import type { Event } from "~/lib/types"

interface EventModalProps {
  event: Event
  onClose: () => void
}

export function EventModal({ event, onClose }: EventModalProps) {
  const startTime = new Date(event.start)
  const endTime = new Date(event.end)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-4 border-b flex justify-between items-start" style={{ backgroundColor: `${event.color}20` }}>
          <h2 className="text-xl font-semibold" style={{ color: event.color }}>
            {event.title}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-start">
            <Clock className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
            <div>
              <div>{formatDate(startTime)}</div>
              <div className="text-sm text-muted-foreground">
                {formatTime(startTime)} – {formatTime(endTime)}
              </div>
            </div>
          </div>

          {event.location && (
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
              <div>{event.location}</div>
            </div>
          )}

          {event.description && (
            <div className="pt-2 border-t">
              <p className="text-sm">{event.description}</p>
            </div>
          )}
        </div>
        <div className="p-4 border-t flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Edit</Button>
        </div>
      </div>
    </div>
  )
}

