"use client"

import { ArrowLeft, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SecuritySettings() {
  const router = useRouter()

  const securityOptions = [
    {
      id: "password",
      name: "Змінити пароль",
      path: "/settings/security/password",
    },
    {
      id: "2fa",
      name: "Двофакторна аутентифікація",
      path: "/settings/security/2fa",
    },
    {
      id: "login",
      name: "Налаштування входу",
      path: "/settings/security/login",
    },
    {
      id: "sessions",
      name: "Активні сесії",
      path: "/settings/security/sessions",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/settings")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
          <Home className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Безпека</h1>
      </div>

      <div className="space-y-4">
        {securityOptions.map((option) => (
          <div
            key={option.id}
            className="border rounded-md p-4 flex justify-between items-center cursor-pointer hover:bg-muted/50"
            onClick={() => router.push(option.path)}
          >
            <span className="font-medium">{option.name}</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  )
}
