"use client"

import { CalculatorTemplate } from "@/components/calculator-template"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function HatCalculatorPage() {
  const calculateHat = (values: Record<string, any>) => {
    // Parse input values
    const headCircumference = Number.parseFloat(values.headCircumference) || 0
    const hatHeight = Number.parseFloat(values.hatHeight) || 0
    const gauge = Number.parseFloat(values.gauge) || 0
    const rowGauge = Number.parseFloat(values.rowGauge) || 0
    const ease = Number.parseFloat(values.ease) || 0

    // Add ease to head circumference
    const hatCircumference = headCircumference * (1 - ease / 100)

    // Calculate stitches and rows
    const totalStitches = Math.round((hatCircumference * gauge) / 10)
    const totalRows = Math.round((hatHeight * rowGauge) / 10)

    // Calculate crown decreases (8 sections typical for hat crown)
    const decreaseRows = Math.round(totalRows / 4) // Typically last 1/4 of hat is crown
    const decreasesPerSection = Math.ceil(totalStitches / 8 / decreaseRows)

    return {
      "Кількість петель": totalStitches,
      "Кількість рядів": totalRows,
      "Петель для набору": totalStitches - (totalStitches % 8), // Make divisible by 8 for crown
      "Висота до зменшень": `${Math.round(((totalRows - decreaseRows) / rowGauge) * 10)} см`,
      "Зменшення корони": `8 секцій по ${decreasesPerSection} петлі`,
    }
  }

  const helpInfo = {
    purpose: "Розрахунок параметрів для в'язання шапки за розмірами голови та бажаною висотою.",
    steps: [
      { step: "1", description: "Введіть обхват голови в сантиметрах." },
      { step: "2", description: "Вкажіть бажану висоту шапки." },
      { step: "3", description: "Вкажіть щільність в'язання (петлі та ряди на 10 см)." },
      { step: "4", description: "Виберіть відсоток зменшення об'єму (від'ємна щільність)." },
      { step: "5", description: "Натисніть 'Розрахувати'." },
    ],
    tips: [
      "Для щільного прилягання шапки рекомендована від'ємна щільність 10-15%.",
      "Для вільнішої шапки використовуйте 5-10% від'ємної щільності.",
      "Висота шапки зазвичай становить 20-25 см для дорослих.",
      "Для шапок з відворотом додайте 5-7 см до загальної висоти.",
      "Корона шапки зазвичай формується за рахунок 8 ліній зменшень для рівномірного закруглення.",
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
        <h1 className="text-2xl font-semibold text-sage-800 mb-2">Калькулятор шапки</h1>
        <p className="text-sage-600">Розрахуйте параметри для в'язання шапки</p>
      </div>

      <CalculatorTemplate
        title="Шапка"
        fields={[
          {
            id: "headCircumference",
            label: "Обхват голови",
            type: "number",
            placeholder: "Наприклад, 56",
            unit: "см",
          },
          {
            id: "hatHeight",
            label: "Висота шапки",
            type: "number",
            placeholder: "Наприклад, 23",
            unit: "см",
          },
          {
            id: "gauge",
            label: "Щільність в'язання (петлі)",
            type: "number",
            placeholder: "Наприклад, 20",
            unit: "петель/10 см",
          },
          {
            id: "rowGauge",
            label: "Щільність в'язання (ряди)",
            type: "number",
            placeholder: "Наприклад, 28",
            unit: "рядів/10 см",
          },
          {
            id: "ease",
            label: "Від'ємна щільність",
            type: "number",
            placeholder: "Наприклад, 10",
            unit: "%",
          },
        ]}
        calculate={calculateHat}
        helpInfo={helpInfo}
      />
    </div>
  )
}
