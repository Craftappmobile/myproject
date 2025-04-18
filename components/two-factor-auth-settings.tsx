"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function TwoFactorAuthSettings() {
  const router = useRouter()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showMethodSelection, setShowMethodSelection] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const handleToggle2FA = () => {
    if (!twoFactorEnabled) {
      setShowMethodSelection(true)
    } else {
      setTwoFactorEnabled(false)
      setShowMethodSelection(false)
      setSelectedMethod(null)
    }
  }

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method)
  }

  const handleSetup = () => {
    if (selectedMethod) {
      router.push(`/settings/security/2fa/${selectedMethod}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/settings/security")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Двофакторна аутентифікація</h1>
      </div>

      {!showMethodSelection ? (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <span className="text-3xl">🔒</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Двофакторна аутентифікація:</span>
            <Switch checked={twoFactorEnabled} onCheckedChange={handleToggle2FA} />
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>Підвищіть безпеку вашого облікового запису, увімкнувши двофакторну аутентифікацію.</p>
            <p>При вході вам потрібно буде ввести:</p>
            <ol className="list-decimal list-inside">
              <li>Пароль</li>
              <li>Одноразовий код</li>
            </ol>
          </div>

          {!twoFactorEnabled && (
            <Button className="w-full" onClick={handleToggle2FA}>
              УВІМКНУТИ
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <span className="text-3xl">🔒</span>
            </div>
          </div>

          <p className="font-medium">Виберіть спосіб отримання коду:</p>

          <RadioGroup value={selectedMethod || ""} onValueChange={handleMethodSelect} className="space-y-4">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="sms" id="method-sms" className="mt-1" />
              <div>
                <Label htmlFor="method-sms" className="cursor-pointer font-medium">
                  SMS на телефон
                </Label>
                <p className="text-sm text-muted-foreground">Рекомендовано для мобільних пристроїв</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="email" id="method-email" className="mt-1" />
              <div>
                <Label htmlFor="method-email" className="cursor-pointer font-medium">
                  Email
                </Label>
                <p className="text-sm text-muted-foreground">Отримання коду на електронну пошту</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="app" id="method-app" className="mt-1" />
              <div>
                <Label htmlFor="method-app" className="cursor-pointer font-medium">
                  Додаток аутентифікації
                </Label>
                <p className="text-sm text-muted-foreground">Рекомендовано для декількох пристроїв</p>
              </div>
            </div>
          </RadioGroup>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowMethodSelection(false)}>
              НАЗАД
            </Button>
            <Button className="flex-1" disabled={!selectedMethod} onClick={handleSetup}>
              НАЛАШТУВАТИ
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
