"use client"

import { useState } from "react"
import { ArrowLeft, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function TwoFactorAppSetup() {
  const router = useRouter()
  const [setupMethod, setSetupMethod] = useState<"qr" | "manual">("manual")
  const [copied, setCopied] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [showVerification, setShowVerification] = useState(false)

  const secretKey = "ABCD EFGH IJKL MNOP" // This would be generated in a real app

  const handleCopyKey = () => {
    navigator.clipboard.writeText(secretKey.replace(/\s/g, ""))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleContinue = () => {
    setShowVerification(true)
  }

  const handleVerify = () => {
    // In a real app, this would verify the code and enable 2FA
    router.push("/settings/security/2fa/success")
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/settings/security/2fa")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Налаштування додатку</h1>
      </div>

      {!showVerification ? (
        <div className="space-y-6">
          <p className="font-medium">Для налаштування додатку аутентифікації:</p>

          <ol className="list-decimal list-inside space-y-2">
            <li>Встановіть додаток:</li>
            <ul className="list-disc list-inside ml-6">
              <li>Google Authenticator</li>
              <li>Microsoft Authenticator</li>
              <li>Authy</li>
            </ul>
            <li>Виберіть метод:</li>
          </ol>

          <RadioGroup
            value={setupMethod}
            onValueChange={(value) => setSetupMethod(value as "qr" | "manual")}
            className="space-y-4"
          >
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="qr" id="method-qr" className="mt-1" />
              <div>
                <Label htmlFor="method-qr" className="cursor-pointer font-medium">
                  Сканувати QR-код
                </Label>
                <p className="text-sm text-muted-foreground">Потрібен інший пристрій</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="manual" id="method-manual" className="mt-1" />
              <div>
                <Label htmlFor="method-manual" className="cursor-pointer font-medium">
                  Ввести код вручну
                </Label>
                <p className="text-sm text-muted-foreground">Рекомендовано для мобільних пристроїв</p>
              </div>
            </div>
          </RadioGroup>

          <Button className="w-full" onClick={handleContinue}>
            ПРОДОВЖИТИ
          </Button>
        </div>
      ) : setupMethod === "manual" ? (
        <div className="space-y-6">
          <p className="font-medium">Виконайте ці кроки в додатку аутентифікації:</p>

          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Натисніть "+" або "Додати обліковий запис"</li>
            <li>Виберіть "Ввести ключ вручну"</li>
            <li>Введіть ці дані:</li>
          </ol>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Назва:</span>
              <span>Knitting App</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Ключ:</span>
              <div className="flex items-center">
                <span className="font-mono">{secretKey}</span>
                <Button variant="ghost" size="icon" onClick={handleCopyKey} className="ml-2">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="verification-code">Введіть код з додатку:</Label>
            <Input
              id="verification-code"
              placeholder="_ _ _ _ _ _"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
            />
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowVerification(false)}>
              НАЗАД
            </Button>
            <Button className="flex-1" onClick={handleVerify} disabled={verificationCode.length !== 6}>
              ПІДТВЕРДИТИ
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="font-medium">Відскануйте цей QR-код у додатку аутентифікації:</p>

          <div className="flex justify-center">
            <div className="h-48 w-48 bg-muted flex items-center justify-center">
              <span className="text-sm text-muted-foreground">QR-код</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="verification-code">Введіть код з додатку:</Label>
            <Input
              id="verification-code"
              placeholder="_ _ _ _ _ _"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
            />
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowVerification(false)}>
              НАЗАД
            </Button>
            <Button className="flex-1" onClick={handleVerify} disabled={verificationCode.length !== 6}>
              ПІДТВЕРДИТИ
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
