import type React from "react"
;('"use client')

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddYarnPage() {
  const router = useRouter()
  const [brand, setBrand] = useState("")
  const [name, setName] = useState("")
  const [color, setColor] = useState("")
  const [weight, setWeight] = useState("")
  const [length, setLength] = useState("")
  const [quantity, setQuantity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the data to the database
    console.log({ brand, name, color, weight, length, quantity })
    router.push("/yarn-inventory")
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <h1 className="text-2xl font-medium mb-6">Додати нову пряжу</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="brand">Бренд</Label>
          <Input
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Наприклад: Drops"
            required
          />
        </div>

        <div>
          <Label htmlFor="name">Назва</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Наприклад: Alpaca"
            required
          />
        </div>

        <div>
          <Label htmlFor="color">Колір</Label>
          <Input
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Наприклад: Сірий"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weight">Вага (г)</Label>
            <Input
              id="weight"
              type="number"
              min="1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="length">Довжина (м)</Label>
            <Input
              id="length"
              type="number"
              min="1"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              required
            />
          </div>
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

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Скасувати
          </Button>
          <Button type="submit">Додати</Button>
        </div>
      </form>
    </div>
  )
}
