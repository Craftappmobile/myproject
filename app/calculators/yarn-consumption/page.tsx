"use client"

import { CalculatorTemplate } from "@/components/calculator-template"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function YarnConsumptionPage() {
  const calculateYarnConsumption = (values: Record<string, any>) => {
    // Parse input values
    const width = Number.parseFloat(values.width) || 0
    const height = Number.parseFloat(values.height) || 0
    const gauge = Number.parseFloat(values.gauge) || 0
    const rowGauge = Number.parseFloat(values.rowGauge) || 0
    const yarnWeight = Number.parseFloat(values.yarnWeight) || 0
    const pattern = values.pattern || "plain"

    // Calculate area in square centimeters
    const area = width * height

    // Pattern complexity multiplier
    let patternMultiplier = 1.0
    if (pattern === "cables") patternMultiplier = 1.3
    else if (pattern === "colorwork") patternMultiplier = 1.2
    else if (pattern === "lace") patternMultiplier = 1.1

    // Calculate yarn needed
    // Basic formula: area * yarn weight * pattern multiplier / (gauge * rowGauge)
    const yarnNeeded = (area * yarnWeight * patternMultiplier) / ((100 * gauge * rowGauge) / 100)
    const ballsNeeded = Math.ceil(yarnNeeded / 50) // Assuming 50g balls

    return {
      "Площа виробу": `${area} см²`,
      "Приблизна вага пряжі": `${Math.round(yarnNeeded)} г`,
      "Кількість мотків по 50г": ballsNeeded,
      "З урахуванням запасу": `${Math.ceil(ballsNeeded * 1.1)} мотків`,
    }
  }

  const helpInfo = {
    purpose: "Розрахунок необхідної кількості пряжі для в'язання виробу певного розміру та складності.",
    steps: [
      { step: "1", description: "Введіть ширину та висоту виробу в сантиметрах." },
      { step: "2", description: "Вкажіть щільність в'язання (петлі та ряди на 10 см)." },
      { step: "3", description: "Введіть вагу пряжі на квадратний метр." },
      { step: "4", description: "Виберіть тип візерунка." },
      { step: "5", description: "Натисніть 'Розрахувати'." },
    ],
    tips: [
      "Для точнішого розрахунку завжди в'яжіть та зважуйте зразок перед початком проєкту.",
      "Додавайте 10-20% запасу пряжі, особливо для складних візерунків.",
      "Для великих проєктів краще придбати пряжу з однієї партії (dye lot).",
      "Вага пряжі на м² залежить від товщини ниток: тонка пряжа ~150-200г/м², середня ~250-350г/м², товста ~400-500г/м².",
      "Для багатокольорових робіт розраховуйте кожен колір окремо, залежно від пропорцій у дизайні.",
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
        <h1 className="text-2xl font-semibold text-sage-800 mb-2">Витрата пряжі</h1>
        <p className="text-sage-600">Розрахуйте кількість пряжі для вашого проєкту</p>
      </div>

      <CalculatorTemplate
        title="Витрата пряжі"
        fields={[
          {
            id: "width",
            label: "Ширина виробу",
            type: "number",
            placeholder: "Наприклад, 50",
            unit: "см",
          },
          {
            id: "height",
            label: "Висота виробу",
            type: "number",
            placeholder: "Наприклад, 70",
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
            id: "yarnWeight",
            label: "Вага пряжі",
            type: "number",
            placeholder: "Наприклад, 300",
            unit: "г/м²",
          },
          {
            id: "pattern",
            label: "Тип візерунка",
            type: "select",
            options: [
              { value: "plain", label: "Проста в'язка (платочна, панчішна)" },
              { value: "cables", label: "Аранські візерунки (коси)" },
              { value: "colorwork", label: "Жакардові візерунки" },
              { value: "lace", label: "Ажурні візерунки" },
            ],
          },
        ]}
        calculate={calculateYarnConsumption}
        helpInfo={helpInfo}
      />
    </div>
  )
}
