"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"

export function ThemeSettings() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/settings")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
          <Home className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Тема інтерфейсу</h1>
      </div>

      <div className="p-4">
        <p className="mb-4">Виберіть тему:</p>

        <RadioGroup value={theme} onValueChange={setTheme} className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="theme-light" />
            <Label htmlFor="theme-light" className="cursor-pointer">
              Світла
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="theme-dark" />
            <Label htmlFor="theme-dark" className="cursor-pointer">
              Темна
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" id="theme-system" />
            <Label htmlFor="theme-system" className="cursor-pointer">
              Системна (автоматично)
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
