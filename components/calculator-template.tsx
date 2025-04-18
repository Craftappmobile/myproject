"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { HelpModal } from "./help-modal"

interface CalculatorTemplateProps {
  title: string
  description?: string
  fields: {
    id: string
    label: string
    type: "text" | "number" | "select"
    options?: { value: string; label: string }[]
    placeholder?: string
    unit?: string
  }[]
  calculate: (values: Record<string, any>) => Record<string, any>
  helpInfo?: {
    purpose: string
    steps: { step: string; description: string }[]
    tips?: string[]
    videoUrl?: string
  }
}

export function CalculatorTemplate({ title, description, fields, calculate, helpInfo }: CalculatorTemplateProps) {
  const [values, setValues] = useState<Record<string, any>>({})
  const [results, setResults] = useState<Record<string, any> | null>(null)
  const [projectDialogOpen, setProjectDialogOpen] = useState(false)
  const [projectOption, setProjectOption] = useState<"existing" | "new">("existing")
  const [newProjectName, setNewProjectName] = useState("")
  const [selectedProject, setSelectedProject] = useState("")
  const [helpModalOpen, setHelpModalOpen] = useState(false)

  const handleInputChange = (id: string, value: string | number) => {
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  const handleCalculate = () => {
    const calculationResults = calculate(values)
    setResults(calculationResults)
  }

  const handleSaveToProject = () => {
    // Here would be the logic to save to a project
    // For now, we'll just close the dialog
    if (projectOption === "new" && newProjectName.trim() === "") {
      return // Don't save if no name is provided for a new project
    }

    // In a real app, save the calculation to the selected or new project
    console.log("Saving to project:", projectOption === "new" ? newProjectName : selectedProject)
    console.log("Calculation data:", {
      title,
      inputValues: values,
      results,
      date: new Date().toISOString(),
    })

    setProjectDialogOpen(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-md">
      <CardHeader className="bg-sage-100 rounded-t-md">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sage-800">{title}</CardTitle>
          {helpInfo && (
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setHelpModalOpen(true)}>
              <HelpCircle className="h-5 w-5 text-sage-600" />
              <span className="sr-only">Допомога</span>
            </Button>
          )}
        </div>
        {description && <p className="text-sm text-sage-600">{description}</p>}
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sage-700">
              {field.label}
              {field.unit && <span className="ml-1 text-sage-500">({field.unit})</span>}
            </Label>
            {field.type === "select" ? (
              <Select onValueChange={(value) => handleInputChange(field.id, value)} value={values[field.id] || ""}>
                <SelectTrigger id={field.id} className="border-sage-300 focus:ring-moss-500">
                  <SelectValue placeholder={field.placeholder || "Оберіть..."} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={values[field.id] || ""}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="border-sage-300 focus:ring-moss-500"
              />
            )}
          </div>
        ))}

        <Button onClick={handleCalculate} className="w-full bg-moss-400 hover:bg-moss-500">
          Розрахувати
        </Button>

        {results && (
          <div className="mt-6 p-4 border rounded-md bg-sage-50 border-sage-200">
            <h3 className="font-medium text-sage-800 mb-2">Результати:</h3>
            <div className="space-y-2">
              {Object.entries(results).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-sage-700">{key}:</span>
                  <span className="font-medium text-sage-900">{value}</span>
                </div>
              ))}
            </div>
            <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full mt-4 border-moss-300 text-moss-600 hover:bg-moss-50">
                  Зберегти до проєкту
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Зберегти результат</DialogTitle>
                  <DialogDescription>
                    Оберіть проєкт, до якого хочете зберегти результати розрахунків.
                  </DialogDescription>
                </DialogHeader>

                <RadioGroup
                  value={projectOption}
                  onValueChange={(value) => setProjectOption(value as "existing" | "new")}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="new" id="new-project" />
                    <Label htmlFor="new-project">Створити новий проєкт</Label>
                  </div>

                  {projectOption === "new" && (
                    <div className="mb-4 ml-6">
                      <Label htmlFor="new-project-name">Назва:</Label>
                      <Input
                        id="new-project-name"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        placeholder="Введіть назву проєкту"
                        className="mt-1 border-sage-300"
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="existing" id="existing-project" />
                    <Label htmlFor="existing-project">Вибрати існуючий:</Label>
                  </div>

                  {projectOption === "existing" && (
                    <div className="ml-6">
                      <Select value={selectedProject} onValueChange={setSelectedProject}>
                        <SelectTrigger className="border-sage-300">
                          <SelectValue placeholder="Оберіть проєкт..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="project1">Мій светр "Весна"</SelectItem>
                          <SelectItem value="project2">Шарф бабусі</SelectItem>
                          <SelectItem value="project3">Шапка "Сніжинка"</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </RadioGroup>

                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setProjectDialogOpen(false)} className="border-sage-300">
                    Скасувати
                  </Button>
                  <Button onClick={handleSaveToProject} className="bg-moss-400 hover:bg-moss-500">
                    Зберегти
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>

      {/* Help Modal */}
      {helpInfo && (
        <HelpModal
          open={helpModalOpen}
          onOpenChange={setHelpModalOpen}
          title={title}
          purpose={helpInfo.purpose}
          steps={helpInfo.steps}
          tips={helpInfo.tips}
          videoUrl={helpInfo.videoUrl}
        />
      )}
    </Card>
  )
}
