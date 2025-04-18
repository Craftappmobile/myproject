"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
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

export function ChangeSubscriptionPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState("premium")
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const handleConfirmChange = () => {
    // In a real app, this would update the subscription plan
    setConfirmDialogOpen(false)
    router.push("/profile")
  }

  return (
    <>
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push("/profile")} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Змінити план підписки</h1>
        </div>

        <div className="space-y-6">
          <div className="p-4 border rounded-md bg-muted/50">
            <h2 className="font-medium">Поточний план:</h2>
            <p className="text-lg font-bold">Преміум (149 грн/місяць)</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-medium">Доступні плани:</h2>

            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
              <div className="flex items-start space-x-2 border rounded-md p-4">
                <RadioGroupItem value="basic" id="plan-basic" className="mt-1" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Label htmlFor="plan-basic" className="font-bold cursor-pointer">
                      Базовий
                    </Label>
                    <span>79 грн/місяць</span>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Базові калькулятори</li>
                    <li>• Обмежена бібліотека</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-2 border rounded-md p-4 bg-primary/5">
                <RadioGroupItem value="premium" id="plan-premium" className="mt-1" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Label htmlFor="plan-premium" className="font-bold cursor-pointer">
                      Преміум
                    </Label>
                    <span>149 грн/місяць</span>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Усі калькулятори</li>
                    <li>• Повна бібліотека</li>
                    <li>• Спільнота</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-2 border rounded-md p-4">
                <RadioGroupItem value="annual" id="plan-annual" className="mt-1" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Label htmlFor="plan-annual" className="font-bold cursor-pointer">
                      Річний Преміум
                    </Label>
                    <span>1490 грн/рік</span>
                  </div>
                  <p className="text-sm text-primary font-medium">(економія 25%)</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Усі функції Преміум</li>
                    <li>• Пріоритетна підтримка</li>
                  </ul>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="p-4 border rounded-md bg-muted/30 text-sm text-muted-foreground">
            Зміна плану набуде чинності після закінчення поточного періоду підписки.
          </div>

          <Button className="w-full" onClick={() => setConfirmDialogOpen(true)}>
            ПІДТВЕРДИТИ ЗМІНУ
          </Button>
        </div>
      </div>

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Підтвердження зміни плану</AlertDialogTitle>
            <AlertDialogDescription>
              Ви впевнені, що хочете змінити план підписки? Зміна набуде чинності після закінчення поточного періоду.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Скасувати</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmChange}>Підтвердити</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
