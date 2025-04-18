"use client"

import { ArrowLeft, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SettingsPage() {
  const router = useRouter()

  const settingsOptions = [
    {
      id: "language",
      name: "Мова",
      path: "/settings/language",
    },
    {
      id: "security",
      name: "Безпека",
      path: "/settings/security",
    },
    {
      id: "about",
      name: "Про додаток",
      path: "/settings/about",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
          <Home className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Налаштування</h1>
      </div>

      <div className="space-y-4">
        {settingsOptions.map((option) => (
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
