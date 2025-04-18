"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { MoreVertical, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface NotificationCategory {
  id: string
  icon: string
  name: string
  count: number
}

export function NotificationsPage() {
  const router = useRouter()
  const [pushEnabled, setPushEnabled] = useState(true)
  const [categories, setCategories] = useState<NotificationCategory[]>([
    { id: "recommendations", icon: "🌟", name: "Рекомендації", count: 3 },
    { id: "user-actions", icon: "👤", name: "Дії користувачів", count: 4 },
    { id: "likes", icon: "❤️", name: "Вподобання", count: 2 },
    { id: "comments", icon: "💬", name: "Коментарі", count: 1 },
    { id: "new-members", icon: "🎉", name: "Нові учасники", count: 2 },
    { id: "system", icon: "ℹ️", name: "Системні", count: 3 },
  ])

  const hasNotifications = categories.some((category) => category.count > 0)

  const handleTogglePush = () => {
    setPushEnabled(!pushEnabled)
  }

  const navigateToCategory = (categoryId: string) => {
    router.push(`/notifications/${categoryId}`)
  }

  const navigateToSettings = () => {
    router.push("/notifications/settings")
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/" className="mr-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Повідомлення</h1>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {hasNotifications ? (
        <>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              {pushEnabled ? <span className="text-xl mr-2">🔔</span> : <span className="text-xl mr-2">🔕</span>}
              <span>Всі повідомлення</span>
            </div>
            <Switch checked={pushEnabled} onCheckedChange={handleTogglePush} />
          </div>

          <div className="divide-y">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                onClick={() => navigateToCategory(category.id)}
              >
                <div className="flex items-center">
                  <span className="text-xl mr-3">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
                <div className="font-medium">{pushEnabled ? category.count : "-"}</div>
              </div>
            ))}
          </div>

          <Button variant="ghost" className="w-full mt-4" onClick={navigateToSettings}>
            Налаштування повідомлень
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-xl mb-2">Немає нових сповіщень</p>
          <p className="text-muted-foreground">Перевірте трохи пізніше!</p>
        </div>
      )}
    </div>
  )
}
