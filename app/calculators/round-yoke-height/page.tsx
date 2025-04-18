"use client"

import { CalculatorTemplate } from "@/components/calculator-template"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function RoundYokeHeightPage() {
  const calculateYokeHeight = (values: Record<string, any>) => {
    // Example calculation
    const neckCircumference = Number.parseFloat(values.neckCircumference) || 0
    const shoulderWidth = Number.parseFloat(values.shoulderWidth) || 0
    const gauge = Number.parseFloat(values.gauge) || 0

    // Basic calculation formula (simplified example)
    const yokeHeight = (shoulderWidth - neckCircumference / 2) * 0.8
    const stitchesToDecrease = shoulderWidth * 2 - neckCircumference
    const rows = Math.ceil((yokeHeight * gauge) / 2.54)

    // For demonstration, we'll return fixed format results
    return {
      "Висота кокетки": `${yokeHeight.toFixed(1)} см`,
      "Кількість петель для зменшення": Math.round(stitchesToDecrease),
      "Приблизна кількість рядів": rows,
    }
  }

  const helpInfo = {
    purpose: "Розрахунок висоти круглої кокетки для светрів та кардиганів за розмірами шиї та плечей.",
    steps: [
      { step: "1", description: "Введіть обхват шиї у сантиметрах." },
      { step: "2", description: "Введіть ширину плечей у сантиметрах." },
      { step: "3", description: "Вкажіть щільність в'язання (петель на 10 см)." },
      { step: "4", description: "Натисніть 'Розрахувати'." },
      { step: "5", description: "Отримайте результат з висотою кокетки та кількістю петель для зменшення." },
    ],
    tips: [
      "Для точнішого результату виміряйте обхват шиї на рівні, де буде починатися кокетка.",
      "Ширину плечей вимірюйте від крайньої точки лівого плеча до крайньої точки правого плеча.",
      "Для створення більш вільної кокетки, додайте 2-3 см до розрахованої висоти.",
      "Якщо розміри між стандартними, оберіть більший розмір і зробіть додаткові примірки.",
    ],
    videoUrl: "#", // В реальному додатку тут буде URL до відео-інструкції
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
        <h1 className="text-2xl font-semibold text-sage-800 mb-2">Висота круглої кокетки</h1>
        <p className="text-sage-600">Розрахуйте оптимальну висоту круглої кокетки для в'язаного виробу</p>
      </div>

      <CalculatorTemplate
        title="Висота круглої кокетки"
        fields={[
          {
            id: "neckCircumference",
            label: "Обхват шиї",
            type: "number",
            placeholder: "Наприклад, 40",
            unit: "см",
          },
          {
            id: "shoulderWidth",
            label: "Ширина плечей",
            type: "number",
            placeholder: "Наприклад, 42",
            unit: "см",
          },
          {
            id: "gauge",
            label: "Щільність в'язання",
            type: "number",
            placeholder: "Наприклад, 22",
            unit: "петель/10 см",
          },
        ]}
        calculate={calculateYokeHeight}
        helpInfo={helpInfo}
      />
    </div>
  )
}
