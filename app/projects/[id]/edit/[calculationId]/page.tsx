"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { EditCalculationForm } from "@/components/edit-calculation-form"
import { Skeleton } from "@/components/ui/skeleton"

export default function EditCalculationPage({
  params,
}: {
  params: { id: string; calculationId: string }
}) {
  const router = useRouter()
  const [calculation, setCalculation] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // В реальному додатку тут був би API запит для отримання даних розрахунку
    const fetchCalculation = async () => {
      try {
        // Імітація затримки мережі
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Мокові дані для демонстрації
        const mockCalculation = {
          id: params.calculationId,
          type: "Розрахунок горловини",
          date: "05.04.2025",
          inputs: [
            { id: "input-1", label: "Обхват шиї", value: "38", unit: "см" },
            { id: "input-2", label: "Додаткова свобода", value: "2", unit: "см" },
            { id: "input-3", label: "Щільність", value: "22", unit: "п. / 10 см" },
          ],
          results: [
            { id: "result-1", label: "Загальна ширина горловини", value: "40 см" },
            { id: "result-2", label: "Кількість петель", value: "88 п." },
            { id: "result-3", label: "Розподіл петель: Перед", value: "30 п." },
            { id: "result-4", label: "Розподіл петель: Спинка", value: "30 п." },
            { id: "result-5", label: "Розподіл петель: Плечі", value: "по 14 п." },
          ],
          notes:
            "Використовувати спиці 4.5 мм для набору петель. Перевірити щільність на зразку перед початком роботи.",
          photos: [
            {
              id: "photo1",
              url: "/cozy-knit-scarf.png",
              caption: "Процес в'язання",
            },
          ],
        }

        setCalculation(mockCalculation)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching calculation:", error)
        setLoading(false)
      }
    }

    fetchCalculation()
  }, [params.calculationId])

  const handleCancel = () => {
    router.push(`/projects/${params.id}`)
  }

  const handleSave = async (updatedData: any) => {
    try {
      // В реальному додатку тут був би API запит для збереження даних
      console.log("Saving updated calculation:", updatedData)

      // Імітація затримки мережі
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Перенаправлення на сторінку проєкту після збереження
      router.push(`/projects/${params.id}`)
    } catch (error) {
      console.error("Error saving calculation:", error)
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-sage-50">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-sage-800">Редагування розрахунку</h1>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : calculation ? (
          <EditCalculationForm
            projectId={params.id}
            calculationId={params.calculationId}
            initialData={calculation}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-sage-700">Розрахунок не знайдено</p>
            <Button onClick={handleCancel} className="mt-4">
              Повернутися до проєкту
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
