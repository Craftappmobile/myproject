"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function RenewSubscriptionPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [renewSuccess, setRenewSuccess] = useState(false)

  const handleRenew = () => {
    // In a real app, this would process the payment and renew the subscription
    setRenewSuccess(true)
    setTimeout(() => {
      router.push("/profile")
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/profile")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Оновити підписку</h1>
      </div>

      {renewSuccess ? (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-lg font-medium">Підписку оновлено!</p>
            <p>Ваш преміум-доступ продовжено до 15 травня 2026</p>
            <p className="text-sm text-muted-foreground">Дякуємо за підтримку нашого сервісу</p>
          </div>

          <p className="text-center text-muted-foreground">Перенаправлення на сторінку профілю...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 border rounded-md bg-muted/50 space-y-2">
            <h2 className="font-medium">Інформація про підписку:</h2>
            <div className="flex justify-between">
              <span>Поточний план:</span>
              <span className="font-medium">Преміум</span>
            </div>
            <div className="flex justify-between">
              <span>Вартість:</span>
              <span className="font-medium">149 грн/місяць</span>
            </div>
            <div className="flex justify-between">
              <span>Дійсний до:</span>
              <span>15 травня 2025</span>
            </div>
            <div className="flex justify-between">
              <span>Нова дата закінчення:</span>
              <span className="font-medium">15 травня 2026</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-medium">Спосіб оплати:</h2>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="card" id="payment-card" />
                <Label htmlFor="payment-card" className="flex items-center cursor-pointer">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Банківська карта
                </Label>
              </div>

              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="apple" id="payment-apple" />
                <Label htmlFor="payment-apple" className="flex items-center cursor-pointer">
                  <span className="mr-2">🍎</span>
                  Apple Pay
                </Label>
              </div>

              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="google" id="payment-google" />
                <Label htmlFor="payment-google" className="flex items-center cursor-pointer">
                  <span className="mr-2">🔍</span>
                  Google Pay
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="p-4 border rounded-md bg-muted/30 text-sm text-muted-foreground">
            Натискаючи кнопку "Оплатити", ви погоджуєтесь з умовами використання та політикою конфіденційності.
          </div>

          <div className="space-y-3 pt-4">
            <Button className="w-full" onClick={handleRenew}>
              ОПЛАТИТИ 149 ГРН
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push("/profile")}>
              Скасувати
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
