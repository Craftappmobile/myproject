"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { yarns } from "@/lib/data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface EditYarnPageProps {
  id: string
}

export function EditYarnPage({ id }: EditYarnPageProps) {
  const router = useRouter()
  const [brand, setBrand] = useState("")
  const [name, setName] = useState("")
  const [color, setColor] = useState("")
  const [colorCode, setColorCode] = useState("")
  const [weight, setWeight] = useState("")
  const [length, setLength] = useState("")
  const [perWeight, setPerWeight] = useState("")
  const [quantity, setQuantity] = useState("")
  const [fibers, setFibers] = useState("")
  const [batchNumber, setBatchNumber] = useState("")
  const [storage, setStorage] = useState("")
  const [notes, setNotes] = useState("")
  const [labelPhoto, setLabelPhoto] = useState<string | null>(null)
  const [yarnPhoto, setYarnPhoto] = useState<string | null>(null)
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false)
  const [photoType, setPhotoType] = useState<"label" | "yarn">("label")

  useEffect(() => {
    // Find the yarn with the given id
    const yarn = yarns.find((y) => y.id === id)

    if (yarn) {
      setBrand(yarn.brand)
      setName(yarn.name)
      setColor(yarn.color)
      setColorCode(yarn.colorCode || "")
      setWeight(yarn.weight.toString())
      setLength(yarn.length.toString())
      setPerWeight(yarn.perWeight.toString())
      setQuantity(yarn.quantity.toString())

      // Convert fibers array to string
      const fiberString = yarn.fibers.map((fiber) => `${fiber.percentage}% ${fiber.type}`).join(", ")
      setFibers(fiberString)

      setBatchNumber(yarn.batchNumber || "")
      setStorage(yarn.storage || "")
      setNotes(yarn.notes || "")
      setLabelPhoto(yarn.labelImage || null)
      setYarnPhoto(yarn.yarnImage || null)
    }
  }, [id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would normally update the data in your backend
    // For now, we'll just redirect back to the yarn detail page
    router.push(`/yarn-inventory/${id}`)
  }

  const openPhotoDialog = (type: "label" | "yarn") => {
    setPhotoType(type)
    setPhotoDialogOpen(true)
  }

  const handleTakePhoto = () => {
    // Simulate taking a photo
    const mockPhotoUrl = "/colorful-yarn-skeins.png"

    if (photoType === "label") {
      setLabelPhoto(mockPhotoUrl)
    } else {
      setYarnPhoto(mockPhotoUrl)
    }

    setPhotoDialogOpen(false)
  }

  const handleSelectFromGallery = () => {
    // Simulate selecting from gallery
    const mockPhotoUrl = "/colorful-yarn-skeins.png"

    if (photoType === "label") {
      setLabelPhoto(mockPhotoUrl)
    } else {
      setYarnPhoto(mockPhotoUrl)
    }

    setPhotoDialogOpen(false)
  }

  return (
    <div className="flex-1 container mx-auto px-4 py-6 max-w-3xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <h1 className="text-2xl font-medium mb-6 text-sage-900">Редагувати пряжу</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brand" required>
              Бренд:
            </Label>
            <Input
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Наприклад: Rowan"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" required>
              Назва пряжі:
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Наприклад: Felted Tweed"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color" required>
                Колір:
              </Label>
              <Input
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Наприклад: Seafarer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="colorCode">Код кольору:</Label>
              <Input
                id="colorCode"
                value={colorCode}
                onChange={(e) => setColorCode(e.target.value)}
                placeholder="Наприклад: 158"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight" required>
                Вага:
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="weight"
                  type="number"
                  min="1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
                <span>г</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="length" required>
                Метраж:
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="length"
                  type="number"
                  min="1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  required
                />
                <span>м</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="perWeight">у вазі:</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="perWeight"
                  type="number"
                  min="1"
                  value={perWeight || weight}
                  onChange={(e) => setPerWeight(e.target.value)}
                />
                <span>г</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" required>
              Кількість:
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <span>шт</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fibers" required>
              Склад:
            </Label>
            <Input
              id="fibers"
              value={fibers}
              onChange={(e) => setFibers(e.target.value)}
              placeholder="Наприклад: 50% Вовна, 25% Альпака, 25% Віскоза"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Button
                type="button"
                variant="outline"
                className="w-full h-32 flex flex-col items-center justify-center"
                onClick={() => openPhotoDialog("label")}
              >
                {labelPhoto ? (
                  <div className="relative w-full h-full">
                    <img
                      src={labelPhoto || "/placeholder.svg"}
                      alt="Фото етикетки"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <>
                    <Camera className="h-8 w-8 mb-2" />
                    <span>+ ДОДАТИ ФОТО ЕТИКЕТКИ</span>
                  </>
                )}
              </Button>
            </div>

            <div>
              <Button
                type="button"
                variant="outline"
                className="w-full h-32 flex flex-col items-center justify-center"
                onClick={() => openPhotoDialog("yarn")}
              >
                {yarnPhoto ? (
                  <div className="relative w-full h-full">
                    <img
                      src={yarnPhoto || "/placeholder.svg"}
                      alt="Фото пряжі"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <>
                    <Camera className="h-8 w-8 mb-2" />
                    <span>+ ДОДАТИ ФОТО ПРЯЖІ</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batchNumber">Партія:</Label>
              <Input
                id="batchNumber"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                placeholder="Наприклад: H2056"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storage">Зберігання:</Label>
              <Input
                id="storage"
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
                placeholder="Наприклад: Верхня шухляда"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Нотатки:</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Додаткова інформація про пряжу"
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Скасувати
          </Button>
          <Button type="submit">Зберегти</Button>
        </div>
      </form>

      <Dialog open={photoDialogOpen} onOpenChange={setPhotoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{photoType === "label" ? "Додати фото етикетки" : "Додати фото пряжі"}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col space-y-4 py-4">
            <Button onClick={handleTakePhoto} className="flex items-center">
              <Camera className="mr-2 h-4 w-4" />
              Зробити фото
            </Button>

            <Button onClick={handleSelectFromGallery} className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Вибрати з галереї
            </Button>

            <Button variant="outline" onClick={() => setPhotoDialogOpen(false)}>
              Скасувати
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
