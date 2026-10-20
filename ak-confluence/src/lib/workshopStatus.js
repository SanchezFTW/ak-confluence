export function getWorkshopState(workshop, now = Date.now()) {
  const sessions = workshop?.sessions || []
  const futureSessions = sessions.filter((session) => new Date(session.end).getTime() > now)
  const deadline = workshop?.registrationDeadline ? new Date(workshop.registrationDeadline).getTime() : null
  const registrationClosed = deadline != null && deadline <= now
  const canRegister = workshop?.status === 'open'
    && !registrationClosed
    && futureSessions.length > 0
    && Boolean(workshop.registrationUrl)

  const label = workshop?.status === 'canceled' ? 'Canceled'
    : workshop?.status === 'full' ? 'Full'
      : workshop?.status === 'closed' || registrationClosed ? 'Registration closed'
        : futureSessions.length ? workshop?.status === 'open' ? 'Registration open' : 'Upcoming'
          : sessions.length ? 'Past workshop' : 'Dates coming soon'

  return {futureSessions, registrationClosed, canRegister, label}
}