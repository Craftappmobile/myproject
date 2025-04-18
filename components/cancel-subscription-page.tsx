"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function CancelSubscriptionPage() {
  const router = useRouter()
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const handleConfirmCancel = () => {
    // In a real app, this would cancel the subscription
    setConfirmDialogOpen(false)
    setCancelled(true)
  }

  return (
    <>
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push("/profile")} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{cancelled ? "Підписку скасовано" : "Скасувати підписку"}</h1>
        </div>

        {cancelled ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">✓</span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-lg font-medium">Підписку скасовано</p>
              <p>Ваш преміум-доступ залишається активним до 15 травня 2025</p>
              <p className="text-sm text-muted-foreground">
                Ви можете відновити підписку в будь-який момент у розділі профілю
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Button className="w-full" onClick={() => router.push("/profile")}>
                Повернутися до профілю
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCancelled(false)
                  router.push("/profile/subscription/change")
                }}
              >
                Відновити підписку
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <span className="text-3xl">⚠️</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg font-medium text-center">Ви впевнені, що бажаєте скасувати підписку?</p>

              <div className="p-4 border rounded-md bg-muted/30 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Поточний план:</span>
                  <span>Преміум</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Дійсний до:</span>
                  <span>15 травня 2025</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Після скасування:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>Ви зможете користуватися преміум-функціями до закінчення оплаченого періоду</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>Після 15 травня 2025 доступ до преміум-функцій буде обмежено</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>Ваші збережені проекти та налаштування залишаться доступними</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button variant="destructive" className="w-full" onClick={() => setConfirmDialogOpen(true)}>
                СКАСУВАТИ ПІДПИСКУ
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push("/profile")}>
                Повернутися до профілю
              </Button>
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Підтвердження скасування</AlertDialogTitle>
            <AlertDialogDescription>
              Ви дійсно хочете скасувати підписку? Ви зможете користуватися преміум-функціями до 15 травня 2025, після
              чого доступ буде обмежено.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Відмінити</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCancel}>Скасувати підписку</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
