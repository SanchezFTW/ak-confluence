import {useEffect, useState} from 'react'

export function useClock(boundaries) {
  const [now, setNow] = useState(Date.now())
  const boundaryKey = boundaries.filter(Boolean).join('|')

  useEffect(() => {
    const next = boundaryKey.split('|').filter(Boolean)
      .map((value) => new Date(value).getTime())
      .filter((value) => Number.isFinite(value) && value > Date.now())
      .sort((a, b) => a - b)[0]
    if (!next) return undefined
    const timer = window.setTimeout(() => setNow(Date.now()), Math.min(next - Date.now() + 20, 2147483647))
    return () => window.clearTimeout(timer)
  }, [boundaryKey, now])

  return now
}