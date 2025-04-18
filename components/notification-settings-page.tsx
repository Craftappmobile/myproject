"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"

interface NotificationSetting {
  id: string
  icon: string
  name: string
  enabled: boolean
}

export function NotificationSettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<NotificationSetting[]>([
    { id: "recommendations", icon: "🌟", name: "Рекомендації", enabled: true },
    { id: "user-actions", icon: "👤", name: "Дії користувачів", enabled: true },
    { id: "likes", icon: "❤️", name: "Вподобання", enabled: true },
    { id: "comments", icon: "💬", name: "Коментарі", enabled: true },
    { id: "new-members", icon: "🎉", name: "Нові учасники", enabled: true },
    { id: "system", icon: "ℹ️", name: "Системні", enabled: true },
  ])

  const [pushEnabled, setPushEnabled] = useState(true)
  const [emailEnabled, setEmailEnabled] = useState(true)

  const toggleSetting = (id: string) => {
    setSettings(settings.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)))
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/notifications")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Налаштування повідомлень</h1>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Канали повідомлень</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <span className="text-xl mr-3">📱</span>
                <span>Push-повідомлення</span>
              </div>
              <Switch checked={pushEnabled} onCheckedChange={() => setPushEnabled(!pushEnabled)} />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <span className="text-xl mr-3">📧</span>
                <span>Email-повідомлення</span>
              </div>
              <Switch checked={emailEnabled} onCheckedChange={() => setEmailEnabled(!emailEnabled)} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Типи повідомлень</h2>
          <div className="space-y-2">
            {settings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <span className="text-xl mr-3">{setting.icon}</span>
                  <span>{setting.name}</span>
                </div>
                <Switch checked={setting.enabled} onCheckedChange={() => toggleSetting(setting.id)} />
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full" onClick={() => router.push("/notifications")}>
          Зберегти налаштування
        </Button>
      </div>
    </div>
  )
}
