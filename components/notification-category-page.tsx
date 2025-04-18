"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MoreVertical, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Notification {
  id: string
  content: string
  time: string
  read: boolean
  username?: string
  groupId?: string
  groupName?: string
}

interface NotificationCategoryPageProps {
  category: string
}

export function NotificationCategoryPage({ category }: NotificationCategoryPageProps) {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading notifications
    setTimeout(() => {
      let categoryNotifications: Notification[] = []

      switch (category) {
        case "recommendations":
          categoryNotifications = [
            {
              id: "1",
              content: "Новий калькулятор для розрахунку пряжі доступний",
              time: "2 години тому",
              read: false,
            },
            { id: "2", content: "Перегляньте нові проєкти в категорії «Шапки»", time: "Вчора, 14:25", read: false },
            { id: "3", content: "Вам можуть сподобатися ці схеми для в'язання", time: "3 дні тому", read: true },
          ]
          break
        case "user-actions":
          categoryNotifications = [
            { id: "1", content: "Ірина поділилася вашим проєктом", time: "1 годину тому", read: false },
            { id: "2", content: "Олена підписалася на вас", time: "3 години тому", read: false },
            { id: "3", content: "Наталія згадала вас у коментарі", time: "Вчора, 18:30", read: false },
            { id: "4", content: "Тетяна додала ваш проєкт до обраного", time: "2 дні тому", read: true },
          ]
          break
        case "likes":
          categoryNotifications = [
            {
              id: "1",
              content: "Вашому проєкту «Шапка з помпоном» поставили вподобання",
              time: "30 хвилин тому",
              read: false,
            },
            { id: "2", content: "Вашому коментарю поставили вподобання", time: "5 годин тому", read: true },
          ]
          break
        case "comments":
          categoryNotifications = [
            { id: "1", content: "Новий коментар до вашого проєкту «Шарф»", time: "1 годину тому", read: false },
          ]
          break
        case "new-members":
          categoryNotifications = [
            {
              id: "1",
              content: "Марина приєдналася до спільноти",
              time: "2 години тому",
              read: false,
              username: "marina",
            },
            {
              id: "2",
              content: "Олександр приєднався до групи «В'язання спицями»",
              time: "Вчора, 15:40",
              read: false,
              username: "oleksandr",
              groupId: "knitting-needles",
              groupName: "В'язання спицями",
            },
          ]
          break
        case "system":
          categoryNotifications = [
            { id: "1", content: "Оновлення додатку до версії 2.1.0", time: "3 години тому", read: false },
            {
              id: "2",
              content: "Технічне обслуговування сервера заплановано на 25.04",
              time: "1 день тому",
              read: false,
            },
            { id: "3", content: "Ваш обліковий запис успішно верифіковано", time: "3 дні тому", read: true },
          ]
          break
        default:
          categoryNotifications = []
      }

      setNotifications(categoryNotifications)
      setLoading(false)
    }, 500)
  }, [category])

  const getCategoryName = () => {
    switch (category) {
      case "recommendations":
        return "Рекомендації"
      case "user-actions":
        return "Дії користувачів"
      case "likes":
        return "Вподобання"
      case "comments":
        return "Коментарі"
      case "new-members":
        return "Нові учасники"
      case "system":
        return "Системні"
      default:
        return "Повідомлення"
    }
  }

  const getCategoryIcon = () => {
    switch (category) {
      case "recommendations":
        return "🌟"
      case "user-actions":
        return "👤"
      case "likes":
        return "❤️"
      case "comments":
        return "💬"
      case "new-members":
        return "🎉"
      case "system":
        return "ℹ️"
      default:
        return "🔔"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const navigateToProfile = (username: string) => {
    router.push(`/users/${username}`)
  }

  const navigateToGroup = (groupId: string) => {
    router.push(`/community/groups/${groupId}`)
  }

  const renderNotificationContent = (notification: Notification) => {
    if (category === "new-members" && notification.username) {
      const contentParts = notification.content.split(" ")
      const username = contentParts[0]
      const restOfContent = contentParts.slice(1).join(" ")

      if (notification.groupId && notification.groupName) {
        return (
          <>
            <span
              className="font-medium text-primary hover:underline cursor-pointer"
              onClick={() => {
                markAsRead(notification.id)
                navigateToProfile(notification.username!)
              }}
            >
              {username}
            </span>
            {" приєднався до групи "}
            <span
              className="font-medium text-primary hover:underline cursor-pointer"
              onClick={() => {
                markAsRead(notification.id)
                navigateToGroup(notification.groupId!)
              }}
            >
              «{notification.groupName}»
            </span>
          </>
        )
      } else {
        return (
          <>
            <span
              className="font-medium text-primary hover:underline cursor-pointer"
              onClick={() => {
                markAsRead(notification.id)
                navigateToProfile(notification.username!)
              }}
            >
              {username}
            </span>
            {restOfContent}
          </>
        )
      }
    }

    return notification.content
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/" className="mr-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/notifications" className="mr-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center">
            <span className="text-xl mr-2">{getCategoryIcon()}</span>
            <h1 className="text-2xl font-bold">{getCategoryName()}</h1>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse">Завантаження...</div>
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-1">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${notification.read ? "bg-muted/30" : "bg-muted/50"}`}
            >
              <div className="flex items-start">
                <div
                  className={`w-2 h-2 rounded-full mt-2 mr-2 ${notification.read ? "bg-transparent" : "bg-primary"}`}
                ></div>
                <div className="flex-1">
                  <p className={notification.read ? "text-muted-foreground" : ""}>
                    {renderNotificationContent(notification)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-xl mb-2">Немає повідомлень у цій категорії</p>
          <p className="text-muted-foreground">Перевірте інші категорії або поверніться пізніше</p>
        </div>
      )}
    </div>
  )
}
