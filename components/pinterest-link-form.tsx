"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface GalleryItem {
  id: string
  image: string
  title?: string
  source?: "pinterest" | "user"
  originalUrl?: string
  tags?: string[]
}

interface PinterestLinkFormProps {
  onSave: (item: GalleryItem) => void
}

export function PinterestLinkForm({ onSave }: PinterestLinkFormProps) {
  const [pinterestLink, setPinterestLink] = useState("")
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFetchPreview = () => {
    if (!pinterestLink) {
      setError("Будь ласка, введіть посилання")
      return
    }

    setLoading(true)
    setError(null)

    // In a real app, this would fetch the preview from the Pinterest link
    // For this demo, we'll simulate a successful fetch after a delay
    setTimeout(() => {
      // Generate a random placeholder image for the demo
      const randomImage = `/placeholder.svg?height=300&width=300&query=pinterest%20knit%20${Math.floor(
        Math.random() * 100,
      )}`
      setPreviewImage(randomImage)
      setLoading(false)
    }, 1000)
  }

  const handleSave = () => {
    if (!previewImage) {
      setError("Спочатку отримайте попередній перегляд зображення")
      return
    }

    const newItem: GalleryItem = {
      id: `pin-${Date.now()}`,
      image: previewImage,
      title: title || "Ідея з Pinterest",
      source: "pinterest",
      originalUrl: pinterestLink,
      tags: ["pinterest"],
    }

    onSave(newItem)
    setPinterestLink("")
    setTitle("")
    setPreviewImage(null)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pinterest-link">Посилання:</Label>
        <div className="flex gap-2">
          <Input
            id="pinterest-link"
            placeholder="https://pin.it/..."
            value={pinterestLink}
            onChange={(e) => setPinterestLink(e.target.value)}
          />
          <Button onClick={handleFetchPreview} disabled={loading}>
            {loading ? "Завантаження..." : "Перегляд"}
          </Button>
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>

      {previewImage && (
        <>
          <div className="space-y-2">
            <Label>Попередній перегляд:</Label>
            <div className="flex justify-center">
              <img
                src={previewImage || "/placeholder.svg"}
                alt="Preview"
                className="max-h-48 object-contain rounded-md border border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Назва (опційно):</Label>
            <Input id="title" placeholder="Назва ідеї" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={() => setPreviewImage(null)}>
              Скасувати
            </Button>
            <Button onClick={handleSave}>Зберегти</Button>
          </div>
        </>
      )}
    </div>
  )
}
