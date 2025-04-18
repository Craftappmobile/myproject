"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export function TwoFactorSuccess() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-center">Двофакторну аутентифікацію увімкнено!</h1>

        <p className="text-center text-muted-foreground max-w-md">
          Тепер ваш обліковий запис захищено додатковим рівнем безпеки. При вході вам потрібно буде ввести пароль та
          одноразовий код.
        </p>

        <Button onClick={() => router.push("/settings/security")}>ГОТОВО</Button>
      </div>
    </div>
  )
}
