/**
 * Generates a Google Calendar event URL
 *
 * @param title - Event title
 * @param startTime - Event start time (Date object or ISO string)
 * @param endTime - Event end time (Date object or ISO string)
 * @param description - Event description
 * @param location - Event location
 * @returns Google Calendar URL
 */
export function generateGoogleCalendarUrl(
  title: string,
  startTime: Date | string,
  endTime: Date | string,
  description = "",
  location = "",
): string {
  // Convert to Date objects if strings
  const start = typeof startTime === "string" ? new Date(startTime) : startTime
  const end = typeof endTime === "string" ? new Date(endTime) : endTime

  // Format dates for Google Calendar
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/-|:|\.\d+/g, "")
  }

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatDate(start)}/${formatDate(end)}`,
    details: description,
    location: location,
  })

  return `https://www.google.com/calendar/render?${params.toString()}`
}
