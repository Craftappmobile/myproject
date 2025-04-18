"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TwoFactorEmailSetup() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [codeSent, setCodeSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const handleSendCode = () => {
    // In a real app, this would send an email with a verification code
    setCodeSent(true)
  }

  const handleVerifyCode = () => {
    // In a real app, this would verify the code and enable 2FA
    router.push("/settings/security/2fa/success")
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/settings/security/2fa")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Налаштування Email</h1>
      </div>

      <div className="space-y-6">
        {!codeSent ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="email">Введіть email для отримання кодів:</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <p className="text-sm text-muted-foreground">
              На цю адресу буде надіслано лист з кодом підтвердження при кожному вході в обліковий запис.
            </p>

            <Button className="w-full" onClick={handleSendCode} disabled={!email}>
              НАДІСЛАТИ КОД
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="verification-code">Введіть код підтвердження:</Label>
              <Input
                id="verification-code"
                placeholder="_ _ _ _ _ _"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </div>

            <p className="text-sm text-muted-foreground">
              Ми надіслали 6-значний код на адресу {email}. Введіть його для підтвердження.
            </p>

            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1" onClick={() => setCodeSent(false)}>
                НАЗАД
              </Button>
              <Button className="flex-1" onClick={handleVerifyCode} disabled={verificationCode.length !== 6}>
                ПІДТВЕРДИТИ
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
