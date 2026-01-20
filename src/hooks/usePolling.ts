import { useEffect, useRef, useState } from 'react'

export function usePolling<T>(
  fetchFn: () => Promise<T>,
  interval: number = 30000, // 30 seconds
  enabled: boolean = true
) {
  const [data, setData] = useState<T | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const result = await fetchFn()
      setData(result)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!enabled) return

    fetchData()

    intervalRef.current = setInterval(fetchData, interval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [enabled, interval])

  const refresh = () => {
    fetchData()
  }

  return { data, lastUpdated, isLoading, error, refresh }
}