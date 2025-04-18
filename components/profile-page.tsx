"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Settings, Shield } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function ProfilePage() {
  const router = useRouter()
  const [subscriptionExpanded, setSubscriptionExpanded] = useState(true)

  const toggleSubscription = () => {
    setSubscriptionExpanded(!subscriptionExpanded)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Профіль</h1>
        <Button variant="ghost" size="icon" onClick={() => router.push("/profile/edit")}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* User Info Section */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="/diverse-group-city.png" alt="Олена Петренко" />
            <AvatarFallback>ОП</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">Олена Петренко</h2>
          <p className="text-muted-foreground">@olena_knits</p>
          <div className="flex items-center mt-1">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm">Онлайн</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Поточний пристрій: iPhone 13</p>
          <div className="flex space-x-2 mt-2">
            <Button variant="link" className="h-auto p-0" onClick={() => router.push("/settings/security/login")}>
              Налаштування входу
            </Button>
            <span className="text-muted-foreground">•</span>
            <Button variant="link" className="h-auto p-0" onClick={() => router.push("/profile/copyright")}>
              <Shield className="h-4 w-4 mr-1" />
              Авторські права
            </Button>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="border rounded-md overflow-hidden">
          <div
            className="flex items-center justify-between p-4 cursor-pointer bg-muted/50"
            onClick={toggleSubscription}
          >
            <span className="font-medium">Статус підписки</span>
            {subscriptionExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>

          {subscriptionExpanded && (
            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Поточний план:</span>
                  <span className="font-medium">Преміум</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Дійсний до:</span>
                  <span>15 травня 2025</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" onClick={() => router.push("/profile/subscription/renew")}>
                  ОНОВИТИ ПІДПИСКУ
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/profile/subscription/change")}
                >
                  ЗМІНИТИ ПЛАН
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => router.push("/profile/subscription/cancel")}
                >
                  СКАСУВАТИ ПІДПИСКУ
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="border rounded-md p-4">
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Проєктів</p>
          </div>
          <div className="border rounded-md p-4">
            <p className="text-2xl font-bold">45</p>
            <p className="text-sm text-muted-foreground">Підписників</p>
          </div>
          <div className="border rounded-md p-4">
            <p className="text-2xl font-bold">28</p>
            <p className="text-sm text-muted-foreground">Підписок</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-medium mb-3">Остання активність</h3>
          <div className="space-y-3">
            <div className="border rounded-md p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Створено новий проєкт</p>
                  <p className="text-sm text-muted-foreground">Светр "Осінь"</p>
                </div>
                <Badge variant="outline">Сьогодні</Badge>
              </div>
            </div>
            <div className="border rounded-md p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Розрахунок горловини</p>
                  <p className="text-sm text-muted-foreground">Для проєкту "Шапка з помпоном"</p>
                </div>
                <Badge variant="outline">Вчора</Badge>
              </div>
            </div>
            <div className="border rounded-md p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Додано до вибраного</p>
                  <p className="text-sm text-muted-foreground">Калькулятор пряжі</p>
                </div>
                <Badge variant="outline">3 дні тому</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
