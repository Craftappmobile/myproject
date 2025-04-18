"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export function YarnNotFound() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-[60vh]">
      <Button variant="ghost" size="sm" className="self-start mb-4" onClick={() => router.push("/yarn-inventory")}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Пряжу не знайдено</h1>
        <p className="text-gray-500 mb-6">Пряжу, яку ви шукаєте, не знайдено або вона була видалена.</p>
        <Button onClick={() => router.push("/yarn-inventory")}>Повернутися до списку</Button>
      </div>
    </div>
  )
}
