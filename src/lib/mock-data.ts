import type { Event } from "./types"

// Get current date
const today = new Date()
const year = today.getFullYear()
const month = today.getMonth()
const date = today.getDate()

// Create a date object for today at a specific hour
const createDate = (dayOffset: number, hour: number, minute = 0) => {
  return new Date(year, month, date + dayOffset, hour, minute).toISOString()
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    start: createDate(0, 10, 0),
    end: createDate(0, 11, 30),
    color: "#1a73e8",
    description: "Weekly team sync to discuss project progress and blockers.",
    location: "Conference Room A",
  },
  {
    id: "2",
    title: "Lunch with Sarah",
    start: createDate(0, 12, 30),
    end: createDate(0, 13, 30),
    color: "#16a765",
    description: "Catch up over lunch at the new Italian place.",
    location: "Pasta Palace",
  },
  {
    id: "3",
    title: "Product Review",
    start: createDate(0, 14, 0),
    end: createDate(0, 15, 0),
    color: "#7986cb",
    description: "Review the latest product designs with the design team.",
  },
  {
    id: "4",
    title: "Dentist Appointment",
    start: createDate(1, 9, 0),
    end: createDate(1, 10, 0),
    color: "#e67c73",
    location: "Smile Dental Clinic",
  },
  {
    id: "5",
    title: "Client Call",
    start: createDate(1, 11, 0),
    end: createDate(1, 12, 0),
    color: "#f4511e",
    description: "Quarterly review call with ABC Corp.",
  },
  {
    id: "6",
    title: "Project Deadline",
    start: createDate(2, 17, 0),
    end: createDate(2, 18, 0),
    color: "#e67c73",
    description: "Final submission deadline for the marketing campaign.",
  },
  {
    id: "7",
    title: "Gym",
    start: createDate(2, 7, 0),
    end: createDate(2, 8, 30),
    color: "#16a765",
    location: "Fitness Center",
  },
  {
    id: "8",
    title: "Team Lunch",
    start: createDate(3, 12, 0),
    end: createDate(3, 13, 30),
    color: "#16a765",
    description: "Monthly team lunch to celebrate achievements.",
    location: "Burger Joint",
  },
  {
    id: "9",
    title: "Code Review",
    start: createDate(3, 15, 0),
    end: createDate(3, 16, 30),
    color: "#1a73e8",
    description: "Review pull requests and discuss implementation details.",
  },
  {
    id: "10",
    title: "Birthday Party",
    start: createDate(4, 18, 0),
    end: createDate(4, 21, 0),
    color: "#f4511e",
    description: "Mike's surprise birthday party. Don't forget the gift!",
    location: "Mike's House",
  },
  {
    id: "11",
    title: "Conference Call",
    start: createDate(4, 9, 0),
    end: createDate(4, 10, 30),
    color: "#7986cb",
    description: "International conference call with partners.",
  },
  {
    id: "12",
    title: "Doctor's Appointment",
    start: createDate(5, 14, 0),
    end: createDate(5, 15, 0),
    color: "#e67c73",
    location: "Medical Center",
  },
  {
    id: "13",
    title: "Project Kickoff",
    start: createDate(5, 11, 0),
    end: createDate(5, 12, 30),
    color: "#1a73e8",
    description: "Kickoff meeting for the new marketing initiative.",
    location: "Conference Room B",
  },
  {
    id: "14",
    title: "Dinner with Friends",
    start: createDate(6, 19, 0),
    end: createDate(6, 21, 0),
    color: "#16a765",
    description: "Catching up with college friends.",
    location: "Steakhouse",
  },
  {
    id: "15",
    title: "Presentation Prep",
    start: createDate(-1, 13, 0),
    end: createDate(-1, 15, 0),
    color: "#7986cb",
    description: "Prepare slides for the quarterly review.",
  },
]

export const mockAlarms = [
  {
    id: "1",
    time: "6:30 AM",
    label: "Wake up",
    enabled: true,
    repeat: [1, 2, 3, 4, 5], // Monday to Friday
  },
  {
    id: "2",
    time: "7:00 AM",
    label: "Morning run",
    enabled: true,
    repeat: [1, 3, 5], // Monday, Wednesday, Friday
  },
  {
    id: "3",
    time: "8:30 AM",
    label: "Team standup",
    enabled: true,
    repeat: [1, 2, 3, 4, 5], // Monday to Friday
  },
  {
    id: "4",
    time: "10:00 PM",
    label: "Evening meditation",
    enabled: false,
    repeat: [0, 1, 2, 3, 4, 5, 6], // Every day
  },
]

