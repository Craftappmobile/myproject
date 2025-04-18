"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface NotificationToastProps {
  title: string
  action?: string
  actionUrl?: string
  onClose: () => void
  autoClose?: boolean
  autoCloseTime?: number
  icon?: string
}

export function NotificationToast({
  title,
  action = "Відкрити",
  actionUrl,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
  icon = "🔔",
}: NotificationToastProps) {
  const router = useRouter()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onClose, 300) // Allow animation to complete
      }, autoCloseTime)

      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseTime, onClose])

  const handleAction = () => {
    if (actionUrl) {
      router.push(actionUrl)
    }
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 bg-background border rounded-lg shadow-lg p-4 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <span className="text-xl mr-2">{icon}</span>
          <div className="flex-1">
            <p className="font-medium">{title}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      {action && (
        <Button variant="outline" size="sm" className="mt-2 w-full" onClick={handleAction}>
          {action}
        </Button>
      )}
    </div>
  )
}
