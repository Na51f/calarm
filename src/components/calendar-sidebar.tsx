"use client"

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Plus } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { Switch } from "~/components/ui/switch"
import { useState } from "react"
import { mockAlarms } from "~/lib/mock-data"

interface CalendarSidebarProps {
  currentDate: Date
}

export function CalendarSidebar({ currentDate }: CalendarSidebarProps) {
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

  const calendarCategories = [
    { id: 1, name: "My Calendar", color: "#1a73e8" },
    { id: 2, name: "Work", color: "#16a765" },
    { id: 3, name: "Personal", color: "#7986cb" },
    { id: 4, name: "Birthdays", color: "#f4511e" },
    { id: 5, name: "Holidays", color: "#e67c73" },
  ]

  const [alarmsExpanded, setAlarmsExpanded] = useState(true)

  return (
    <div className="w-64 border-r p-4 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">{currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h3>
          <div className="flex">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 text-center text-xs text-muted-foreground">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div key={i}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center mt-1">
          {days.map((day, i) => (
            <div
              key={i}
              className={`text-xs p-1 ${!day.inMonth ? "text-muted-foreground" : ""} ${day.date.toDateString() === new Date().toDateString() ? "bg-blue-500 text-white rounded-full" : ""}`}
            >
              {day.date.getDate()}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">My calendars</h3>
        <div className="space-y-2">
          {calendarCategories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Checkbox id={`calendar-${category.id}`} defaultChecked />
              <div className="ml-2 flex items-center">
                <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                <label htmlFor={`calendar-${category.id}`} className="text-sm cursor-pointer">
                  {category.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div
          className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
          onClick={() => setAlarmsExpanded(!alarmsExpanded)}
        >
          <h3 className="font-medium text-sm">Alarms</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
            {alarmsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {alarmsExpanded && (
          <div className="p-2">
            <div className="space-y-3">
              {mockAlarms.map((alarm) => (
                <div key={alarm.id} className="border rounded-md p-2">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">{alarm.time}</div>
                    <Switch checked={alarm.enabled} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{alarm.label}</div>
                  {alarm.repeat && (
                    <div className="flex gap-1 mt-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                        <div
                          key={index}
                          className={`text-xs w-5 h-5 flex items-center justify-center rounded-full ${
                            alarm.repeat.includes(index) ? "bg-blue-500 text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button variant="ghost" size="sm" className="w-full mt-2 text-blue-500">
              <Plus className="h-4 w-4 mr-1" />
              Add alarm
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

