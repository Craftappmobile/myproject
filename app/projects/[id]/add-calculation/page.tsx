"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { EditCalculationForm } from "@/components/edit-calculation-form"

export default function AddCalculationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCancel = () => {
    router.push(`/projects/${params.id}`)
  }

  const handleSave = async (calculationData: any) => {
    setLoading(true)
    try {
      // В реальному додатку тут був би API запит для збереження даних
      console.log("Saving new calculation:", calculationData)

      // Імітація затримки мережі
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Перенаправлення на сторінку проєкту після збереження
      router.push(`/projects/${params.id}`)
    } catch (error) {
      console.error("Error saving calculation:", error)
    } finally {
      setLoading(false)
    }
  }

  // Створюємо порожній шаблон для нового розрахунку
  const emptyCalculation = {
    type: "",
    date: new Date().toLocaleDateString("uk-UA"),
    inputs: [{ id: "input-1", label: "", value: "", unit: "" }],
    results: [{ id: "result-1", label: "", value: "" }],
    notes: "",
    photos: [],
  }

  return (
    <main className="min-h-screen flex flex-col bg-sage-50">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-sage-800">Новий розрахунок</h1>

        <EditCalculationForm
          projectId={params.id}
          calculationId="new"
          initialData={emptyCalculation}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      </div>
    </main>
  )
}
