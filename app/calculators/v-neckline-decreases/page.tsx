"use client"

import { CalculatorTemplate } from "@/components/calculator-template"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function VNecklineDecreasesPage() {
  const calculateVNeckline = (values: Record<string, any>) => {
    // Parse input values
    const necklineWidth = Number.parseFloat(values.necklineWidth) || 0
    const necklineDepth = Number.parseFloat(values.necklineDepth) || 0
    const gauge = Number.parseFloat(values.gauge) || 0
    const rowGauge = Number.parseFloat(values.rowGauge) || 0

    // Calculate total stitches to decrease
    const stitchesToDecrease = Math.round((necklineWidth * gauge) / 10)

    // Calculate total rows for neckline
    const totalRows = Math.round((necklineDepth * rowGauge) / 10)

    // Calculate decrease intervals
    const decreaseEveryNRows = Math.floor((totalRows / stitchesToDecrease) * 2)

    // Calculate center stitches for V-neck
    const centerStitches = Math.round(stitchesToDecrease / 5)

    return {
      "Загальна кількість петель для убавок": stitchesToDecrease,
      "Кількість рядів горловини": totalRows,
      "Убавки через кожні N рядів": decreaseEveryNRows > 0 ? decreaseEveryNRows : 1,
      "Центральні петлі V-подібної горловини": centerStitches,
    }
  }

  const helpInfo = {
    purpose: "Розрахунок убавок для створення V-подібної горловини у в'язаних виробах.",
    steps: [
      { step: "1", description: "Введіть бажану ширину горловини у верхній частині." },
      { step: "2", description: "Введіть бажану глибину горловини (від початку до найнижчої точки V)." },
      { step: "3", description: "Вкажіть щільність в'язання (петлі та ряди на 10 см)." },
      { step: "4", description: "Натисніть 'Розрахувати'." },
      { step: "5", description: "Отримайте кількість убавок та інтервали між ними." },
    ],
    tips: [
      "Для більш плавної горловини, виконуйте убавки на певній відстані від краю (зазвичай через 1-2 петлі).",
      "V-подібна горловина зазвичай має центральні петлі, які формують нижню точку 'V'.",
      "Для більш крутого V-подібного вирізу, зменшіть інтервал між убавками.",
      "Для симетрії, виконуйте убавки однаково з обох сторін від центру.",
      "Завжди виконуйте убавки з лицьової сторони роботи для кращого вигляду.",
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
        <h1 className="text-2xl font-semibold text-sage-800 mb-2">V-подібна горловина</h1>
        <p className="text-sage-600">Розрахуйте убавки для V-подібної горловини</p>
      </div>

      <CalculatorTemplate
        title="V-подібна горловина"
        fields={[
          {
            id: "necklineWidth",
            label: "Ширина горловини",
            type: "number",
            placeholder: "Наприклад, 20",
            unit: "см",
          },
          {
            id: "necklineDepth",
            label: "Глибина горловини",
            type: "number",
            placeholder: "Наприклад, 15",
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
        calculate={calculateVNeckline}
        helpInfo={helpInfo}
      />
    </div>
  )
}
