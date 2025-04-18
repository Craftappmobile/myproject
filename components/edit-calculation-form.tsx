"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GallerySelector } from "@/components/gallery-selector"
import { X, Plus, Save, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface CalculationInput {
  id: string
  label: string
  value: string
  unit?: string
}

interface CalculationResult {
  id: string
  label: string
  value: string
}

interface CalculationPhoto {
  id: string
  url: string
  caption?: string
}

interface EditCalculationFormProps {
  projectId: string
  calculationId: string
  initialData?: {
    type: string
    date: string
    inputs: CalculationInput[]
    results: CalculationResult[]
    notes?: string
    photos?: CalculationPhoto[]
  }
  onCancel: () => void
  onSave: (data: any) => void
}

export function EditCalculationForm({
  projectId,
  calculationId,
  initialData,
  onCancel,
  onSave,
}: EditCalculationFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [calculationType, setCalculationType] = useState(initialData?.type || "")
  const [inputs, setInputs] = useState<CalculationInput[]>(initialData?.inputs || [])
  const [results, setResults] = useState<CalculationResult[]>(initialData?.results || [])
  const [notes, setNotes] = useState(initialData?.notes || "")
  const [photos, setPhotos] = useState<CalculationPhoto[]>(initialData?.photos || [])
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (id: string, value: string) => {
    setInputs(inputs.map((input) => (input.id === id ? { ...input, value } : input)))
  }

  const handleResultChange = (id: string, value: string) => {
    setResults(results.map((result) => (result.id === id ? { ...result, value } : result)))
  }

  const handleAddInput = () => {
    const newId = `input-${inputs.length + 1}`
    setInputs([...inputs, { id: newId, label: "", value: "", unit: "" }])
  }

  const handleRemoveInput = (id: string) => {
    setInputs(inputs.filter((input) => input.id !== id))
  }

  const handleAddResult = () => {
    const newId = `result-${results.length + 1}`
    setResults([...results, { id: newId, label: "", value: "" }])
  }

  const handleRemoveResult = (id: string) => {
    setResults(results.filter((result) => result.id !== id))
  }

  const handleAddPhotos = (selectedPhotos: CalculationPhoto[]) => {
    // Додаємо тільки нові фото, які ще не були додані
    const newPhotos = selectedPhotos.filter((selectedPhoto) => !photos.some((photo) => photo.id === selectedPhoto.id))
    setPhotos([...photos, ...newPhotos])
    setGalleryOpen(false)
  }

  const handleRemovePhoto = (id: string) => {
    setPhotos(photos.filter((photo) => photo.id !== id))
  }

  const handleUpdatePhotoCaption = (id: string, caption: string) => {
    setPhotos(photos.map((photo) => (photo.id === id ? { ...photo, caption } : photo)))
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Підготовка даних для збереження
    const calculationData = {
      id: calculationId,
      type: calculationType,
      inputs: inputs.filter((input) => input.label.trim() !== ""),
      results: results.filter((result) => result.label.trim() !== ""),
      notes,
      photos,
      date: initialData?.date || new Date().toISOString(),
    }

    try {
      // В реальному додатку тут був би API запит для збереження даних
      await new Promise((resolve) => setTimeout(resolve, 500)) // Імітація затримки мережі
      onSave(calculationData)
    } catch (error) {
      console.error("Error saving calculation:", error)
      // Тут можна додати обробку помилок, наприклад, показати повідомлення користувачу
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onCancel} className="p-0 h-auto">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Назад
        </Button>
        <Button onClick={handleSave} disabled={isSaving} className="bg-moss-400 hover:bg-moss-500">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Збереження..." : "Зберегти зміни"}
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-sage-100">
          <CardTitle className="text-sage-800">
            <Input
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value)}
              placeholder="Назва розрахунку"
              className="text-xl font-bold border-none bg-transparent p-0 focus-visible:ring-0"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Деталі</TabsTrigger>
              <TabsTrigger value="photos">Фото</TabsTrigger>
              <TabsTrigger value="notes">Нотатки</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="p-4 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Вхідні дані:</h3>
                  <Button variant="outline" size="sm" onClick={handleAddInput}>
                    <Plus className="h-4 w-4 mr-1" />
                    Додати поле
                  </Button>
                </div>

                {inputs.map((input) => (
                  <div key={input.id} className="flex items-start space-x-2">
                    <div className="flex-1 space-y-1">
                      <div className="flex space-x-2">
                        <Input
                          value={input.label}
                          onChange={(e) => handleInputChange(input.id, e.target.value)}
                          placeholder="Назва параметру"
                          className="flex-1"
                        />
                        <Input
                          value={input.unit || ""}
                          onChange={(e) => {
                            const updatedInputs = inputs.map((i) =>
                              i.id === input.id ? { ...i, unit: e.target.value } : i,
                            )
                            setInputs(updatedInputs)
                          }}
                          placeholder="Одиниці"
                          className="w-20"
                        />
                      </div>
                      <Input
                        value={input.value}
                        onChange={(e) => {
                          const updatedInputs = inputs.map((i) =>
                            i.id === input.id ? { ...i, value: e.target.value } : i,
                          )
                          setInputs(updatedInputs)
                        }}
                        placeholder="Значення"
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveInput(input.id)} className="mt-1">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4">
                  <h3 className="font-medium">Результати:</h3>
                  <Button variant="outline" size="sm" onClick={handleAddResult}>
                    <Plus className="h-4 w-4 mr-1" />
                    Додати результат
                  </Button>
                </div>

                {results.map((result) => (
                  <div key={result.id} className="flex items-start space-x-2">
                    <div className="flex-1 space-y-1">
                      <Input
                        value={result.label}
                        onChange={(e) => {
                          const updatedResults = results.map((r) =>
                            r.id === result.id ? { ...r, label: e.target.value } : r,
                          )
                          setResults(updatedResults)
                        }}
                        placeholder="Назва результату"
                      />
                      <Input
                        value={result.value}
                        onChange={(e) => handleResultChange(result.id, e.target.value)}
                        placeholder="Значення"
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveResult(result.id)} className="mt-1">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="photos" className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Фотографії проєкту:</h3>
                <Button variant="outline" onClick={() => setGalleryOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Додати фото
                </Button>
              </div>

              {photos.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {photos.map((photo) => (
                    <div key={photo.id} className="border rounded-md p-2 space-y-2">
                      <div className="relative aspect-square bg-sage-50 rounded-md overflow-hidden">
                        <img
                          src={photo.url || "/placeholder.svg"}
                          alt={photo.caption || "Фото проєкту"}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => handleRemovePhoto(photo.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <Input
                        value={photo.caption || ""}
                        onChange={(e) => handleUpdatePhotoCaption(photo.id, e.target.value)}
                        placeholder="Підпис до фото"
                        className="text-sm"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-sage-50 rounded-md">
                  <p className="text-sage-600 mb-2">Немає доданих фотографій</p>
                  <Button variant="outline" onClick={() => setGalleryOpen(true)}>
                    Додати фото з галереї
                  </Button>
                </div>
              )}

              {galleryOpen && (
                <GallerySelector
                  onSelect={handleAddPhotos}
                  onCancel={() => setGalleryOpen(false)}
                  selectedIds={photos.map((p) => p.id)}
                />
              )}
            </TabsContent>

            <TabsContent value="notes" className="p-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Нотатки до розрахунку:</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Додайте нотатки, коментарі або додаткову інформацію..."
                  rows={8}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
