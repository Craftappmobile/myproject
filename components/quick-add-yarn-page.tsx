"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"

export function QuickAddYarnPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    brand: "",
    name: "",
    color: "",
    colorCode: "",
    weight: "50",
    length: "",
    quantity: "1",
    composition: "",
    storage: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the data to the database
    console.log(formData)

    // Show success message
    alert("Пряжу додано")

    // Reset form
    setFormData({
      brand: "",
      name: "",
      color: "",
      colorCode: "",
      weight: "50",
      length: "",
      quantity: "1",
      composition: "",
      storage: "",
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.push("/yarn-inventory")}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Швидке додавання пряжі</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Бренд</Label>
                <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="name">Назва</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="color">Колір</Label>
                <Input id="color" name="color" value={formData.color} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="colorCode">Код кольору</Label>
                <Input id="colorCode" name="colorCode" value={formData.colorCode} onChange={handleChange} />
              </div>

              <div>
                <Label htmlFor="weight">Вага (г)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  min="1"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="length">Довжина (м)</Label>
                <Input
                  id="length"
                  name="length"
                  type="number"
                  min="1"
                  value={formData.length}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="quantity">Кількість (шт)</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="composition">Склад</Label>
                <Input
                  id="composition"
                  name="composition"
                  value={formData.composition}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="storage">Місце зберігання</Label>
                <Input id="storage" name="storage" value={formData.storage} onChange={handleChange} />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.push("/yarn-inventory")}>
                Скасувати
              </Button>
              <Button type="submit">Додати</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
