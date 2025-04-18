"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { NotificationToast } from "@/components/notification-toast"

export default function NotificationDemoPage() {
  const [notifications, setNotifications] = useState<
    Array<{
      id: string
      title: string
      action: string
      actionUrl: string
      icon: string
    }>
  >([])

  const addNotification = (type: string) => {
    const id = Date.now().toString()

    let notification = {
      id,
      title: "",
      action: "Відкрити",
      actionUrl: "/",
      icon: "🔔",
    }

    switch (type) {
      case "recommendation":
        notification = {
          ...notification,
          title: "Новий майстер-клас з в'язання шкарпеток",
          actionUrl: "/calculators",
          icon: "🌟",
        }
        break
      case "like":
        notification = {
          ...notification,
          title: "Ірина вподобала ваш проєкт «Шапка»",
          actionUrl: "/projects",
          icon: "❤️",
        }
        break
      case "comment":
        notification = {
          ...notification,
          title: "Новий коментар до вашого проєкту «Светр»",
          actionUrl: "/community",
          icon: "💬",
        }
        break
      case "new-member":
        notification = {
          ...notification,
          title: "Марина приєдналася до спільноти",
          actionUrl: "/community",
          icon: "🎉",
        }
        break
      case "system":
        notification = {
          ...notification,
          title: "Оновлення додатку до версії 2.1.0",
          actionUrl: "/settings",
          icon: "ℹ️",
        }
        break
      default:
        notification = {
          ...notification,
          title: "Нове повідомлення",
          actionUrl: "/notifications",
        }
    }

    setNotifications([...notifications, notification])
  }

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Демо сповіщень</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Button onClick={() => addNotification("recommendation")}>
          <span className="mr-2">🌟</span> Рекомендація
        </Button>
        <Button onClick={() => addNotification("like")}>
          <span className="mr-2">❤️</span> Вподобання
        </Button>
        <Button onClick={() => addNotification("comment")}>
          <span className="mr-2">💬</span> Коментар
        </Button>
        <Button onClick={() => addNotification("new-member")}>
          <span className="mr-2">🎉</span> Новий учасник
        </Button>
        <Button onClick={() => addNotification("system")}>
          <span className="mr-2">ℹ️</span> Системне
        </Button>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-2">Інформація</h2>
        <p className="text-muted-foreground">
          Натисніть на кнопки вище, щоб побачити різні типи сповіщень. Сповіщення автоматично зникнуть через 5 секунд.
        </p>
      </div>

      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          title={notification.title}
          action={notification.action}
          actionUrl={notification.actionUrl}
          icon={notification.icon}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}
