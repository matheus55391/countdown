"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const targetDateEnv = process.env.NEXT_PUBLIC_TARGET_DATE as string
  const targetDate = new Date(targetDateEnv)
  const [timeRemaining, setTimeRemaining] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isTimeUp, setIsTimeUp] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        clearInterval(interval)
        setIsTimeUp(true)
      } else {
        const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365))
        const months = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
        const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        setTimeRemaining({ years, months, days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const formatTime = () => {
    const { years, months, days, hours, minutes, seconds } = timeRemaining
    let formattedTime = ""
    if (years > 0) formattedTime += `${years}y `
    if (months > 0) formattedTime += `${months}m `
    if (days > 0) formattedTime += `${days}d `
    if (hours > 0) formattedTime += `${hours}h `
    if (minutes > 0) formattedTime += `${minutes}m `
    if (seconds > 0) formattedTime += `${seconds}s`
    return formattedTime.trim()
  }

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-6xl font-bold text-primary-foreground">
        {isTimeUp ? "O tempo chegou!" : formatTime()}
      </div>
    </div>
  )
}
