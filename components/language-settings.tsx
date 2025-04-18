"use client"

import { useState } from "react"
import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function LanguageSettings() {
  const router = useRouter()
  const [language, setLanguage] = useState("uk") // Default to Ukrainian

  const languages = [
    { code: "uk", name: "Українська" },
    { code: "en", name: "English" },
    { code: "pl", name: "Polska" },
    { code: "de", name: "Deutsch" },
    { code: "fr", name: "Français" },
  ]

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    // In a real app, this would update the app's language
    // and possibly save the preference to the user's profile
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
        <h1 className="text-2xl font-bold">Мова</h1>
      </div>

      <div className="p-4">
        <p className="mb-4">Виберіть мову інтерфейсу:</p>

        <RadioGroup value={language} onValueChange={handleLanguageChange} className="space-y-4">
          {languages.map((lang) => (
            <div key={lang.code} className="flex items-center space-x-2">
              <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
              <Label htmlFor={`lang-${lang.code}`} className="cursor-pointer">
                {lang.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
