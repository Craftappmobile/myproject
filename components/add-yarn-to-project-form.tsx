"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AddYarnToProjectForm({
  yarnId,
  onSuccess,
}: {
  yarnId: string
  onSuccess: () => void
}) {
  const [projectId, setProjectId] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [isPlanned, setIsPlanned] = useState(true)

  // Mock projects data
  const projects = [
    { id: "1", name: "Шапка з помпоном" },
    { id: "2", name: "Шарф у смужку" },
    { id: "3", name: "Светр оверсайз" },
    { id: "4", name: "Шкарпетки" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the data to the database
    console.log({
      yarnId,
      projectId,
      quantity: Number.parseInt(quantity),
      isPlanned,
    })

    // Show success message
    alert("Пряжу додано до проєкту")

    // Call the success callback
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="project">Проєкт</Label>
        <Select value={projectId} onValueChange={setProjectId} required>
          <SelectTrigger id="project">
            <SelectValue placeholder="Виберіть проєкт" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="quantity">Кількість (шт)</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="planned"
          type="checkbox"
          checked={isPlanned}
          onChange={(e) => setIsPlanned(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="planned" className="text-sm font-normal">
          Планується використати (не використано)
        </Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Скасувати
        </Button>
        <Button type="submit">Додати</Button>
      </div>
    </form>
  )
}
