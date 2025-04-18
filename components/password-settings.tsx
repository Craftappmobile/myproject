"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PasswordSettings() {
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Будь ласка, заповніть всі поля")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Новий пароль та підтвердження не співпадають")
      return
    }

    if (newPassword.length < 8) {
      setError("Новий пароль повинен містити щонайменше 8 символів")
      return
    }

    // In a real app, this would send a request to change the password
    setSuccess(true)
    setTimeout(() => {
      router.push("/settings/security")
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/settings/security")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Змінити пароль</h1>
      </div>

      {success ? (
        <div className="p-4 bg-primary/10 rounded-md text-center">
          <p className="font-medium text-primary">Пароль успішно змінено!</p>
          <p className="text-sm text-muted-foreground mt-2">Перенаправлення...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-destructive">{error}</p>}

          <div className="space-y-2">
            <Label htmlFor="current-password">Поточний пароль</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">Новий пароль</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Пароль повинен містити щонайменше 8 символів</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Підтвердіть новий пароль</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            ЗБЕРЕГТИ НОВИЙ ПАРОЛЬ
          </Button>
        </form>
      )}
    </div>
  )
}
