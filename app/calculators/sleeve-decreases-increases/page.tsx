"use client"

import { CalculatorTemplate } from "@/components/calculator-template"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SleeveDecreasesIncreasesPage() {
  const calculateSleeveChanges = (values: Record<string, any>) => {
    // Parse input values
    const startWidth = Number.parseFloat(values.startWidth) || 0
    const endWidth = Number.parseFloat(values.endWidth) || 0
    const length = Number.parseFloat(values.length) || 0
    const gauge = Number.parseFloat(values.gauge) || 0
    const rowGauge = Number.parseFloat(values.rowGauge) || 0

    // Calculate total stitches to increase/decrease
    const stitchDifference = Math.round(((endWidth - startWidth) * gauge) / 10)
    const isIncrease = stitchDifference > 0
    const totalChanges = Math.abs(stitchDifference)

    // Calculate total rows
    const totalRows = Math.round((length * rowGauge) / 10)

    // Calculate distribution
    const interval = Math.floor(totalRows / (totalChanges > 0 ? totalChanges : 1))

    return {
      "Загальна кількість змін": totalChanges,
      "Тип змін": isIncrease ? "Прибавки" : "Убавки",
      "Приблизна кількість рядів": totalRows,
      "Інтервал (кожні N рядів)": interval,
      "Рядів після останньої зміни": totalRows - interval * totalChanges,
    }
  }

  const helpInfo = {
    purpose: "Розрахунок прибавок або убавок для рукавів при в'язанні светрів, кардиганів та інших виробів.",
    steps: [
      { step: "1", description: "Введіть початкову ширину рукава (наприклад, в області зап'ястя)." },
      { step: "2", description: "Введіть кінцеву ширину рукава (наприклад, в області плеча)." },
      { step: "3", description: "Введіть бажану довжину рукава." },
      { step: "4", description: "Вкажіть щільність в'язання (петель та рядів на 10 см)." },
      { step: "5", description: "Натисніть 'Розрахувати'." },
    ],
    tips: [
      "Для рукава зверху вниз початкова ширина буде в області плеча, а кінцева - в області зап'ястя.",
      "Для рукава знизу вгору початкова ширина буде в області зап'ястя, а кінцева - в області плеча.",
      "Якщо отримуєте надто часті прибавки, спробуйте зменшити різницю в ширині або збільшити довжину.",
      "Для рівномірного розподілу змін можна чергувати інтервали (наприклад, 4 і 5 рядів).",
    ],
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <Button variant="outline" size="sm" className="mb-4" asChild>
          <Link href="/calculators" className="flex items-center text-sage-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад до калькуляторів
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold text-sage-800 mb-2">Прибавки/убавки рукава</h1>
        <p className="text-sage-600">Розрахуйте інтервали для прибавок або убавок при в'язанні рукава</p>
      </div>

      <CalculatorTemplate
        title="Прибавки/убавки рукава"
        fields={[
          {
            id: "startWidth",
            label: "Початкова ширина рукава",
            type: "number",
            placeholder: "Наприклад, 15",
            unit: "см",
          },
          {
            id: "endWidth",
            label: "Кінцева ширина рукава",
            type: "number",
            placeholder: "Наприклад, 30",
            unit: "см",
          },
          {
            id: "length",
            label: "Довжина рукава",
            type: "number",
            placeholder: "Наприклад, 45",
            unit: "см",
          },
          {
            id: "gauge",
            label: "Щільність в'язання (петлі)",
            type: "number",
            placeholder: "Наприклад, 22",
            unit: "петель/10 см",
          },
          {
            id: "rowGauge",
            label: "Щільність в'язання (ряди)",
            type: "number",
            placeholder: "Наприклад, 30",
            unit: "рядів/10 см",
          },
        ]}
        calculate={calculateSleeveChanges}
        helpInfo={helpInfo}
      />
    </div>
  )
}
