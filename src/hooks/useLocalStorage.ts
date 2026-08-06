import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setAndPersist: Dispatch<SetStateAction<T>> = (next) => {
    setValue((prev) => {
      const resolved = next instanceof Function ? next(prev) : next
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved))
      } catch {
        // localStorage unavailable (private mode, quota) — keep in-memory value only
      }
      return resolved
    })
  }

  return [value, setAndPersist]
}
