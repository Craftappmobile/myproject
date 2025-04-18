"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LoginSettings() {
  const router = useRouter()
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [rememberDevice, setRememberDevice] = useState(true)
  const [autoLogin, setAutoLogin] = useState(false)
  const [sessionDuration, setSessionDuration] = useState("30")

  const handleSave = () => {
    // In a real app, this would save the settings
    router.push("/settings/security")
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/settings/security")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Налаштування входу</h1>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="biometric" className="font-medium">
                Біометрична аутентифікація
              </Label>
              <p className="text-sm text-muted-foreground">Використовувати Face ID або Touch ID для входу в додаток</p>
            </div>
            <Switch id="biometric" checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="remember-device" className="font-medium">
                Запам'ятати пристрій
              </Label>
              <p className="text-sm text-muted-foreground">Зберігати інформацію про вхід на цьому пристрої</p>
            </div>
            <Switch id="remember-device" checked={rememberDevice} onCheckedChange={setRememberDevice} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-login" className="font-medium">
                Автоматичний вхід
              </Label>
              <p className="text-sm text-muted-foreground">Автоматично входити в додаток при запуску</p>
            </div>
            <Switch id="auto-login" checked={autoLogin} onCheckedChange={setAutoLogin} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="session-duration" className="font-medium">
              Тривалість сесії
            </Label>
            <p className="text-sm text-muted-foreground">Час, після якого потрібно буде повторно увійти в додаток</p>
            <Select value={sessionDuration} onValueChange={setSessionDuration}>
              <SelectTrigger id="session-duration">
                <SelectValue placeholder="Оберіть тривалість" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 хвилин</SelectItem>
                <SelectItem value="30">30 хвилин</SelectItem>
                <SelectItem value="60">1 година</SelectItem>
                <SelectItem value="240">4 години</SelectItem>
                <SelectItem value="720">12 годин</SelectItem>
                <SelectItem value="1440">1 день</SelectItem>
                <SelectItem value="10080">7 днів</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="w-full" onClick={handleSave}>
          ЗБЕРЕГТИ
        </Button>
      </div>
    </div>
  )
}
