"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Camera, X, Home, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"

export function AddPhotoPage() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [uploading, setUploading] = useState(false)
  const [originalityStatus, setOriginalityStatus] = useState("original")
  const [applyWatermark, setApplyWatermark] = useState(true)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleUpload = () => {
    if (!selectedFile || !category || !acceptedTerms) return

    setUploading(true)

    // In a real app, this would upload the file to a server
    // For this demo, we'll simulate a successful upload after a delay
    setTimeout(() => {
      setUploading(false)
      router.push("/gallery")
    }, 1500)
  }

  const handleCancel = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    router.push("/gallery")
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/gallery")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
          <Home className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Додати фото</h1>
      </div>

      <Alert className="mb-6 bg-primary/10 border-primary/20">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Ви зберігаєте усі права на цю роботу. Ми лише показуємо її іншим користувачам у межах спільноти.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {!previewUrl ? (
          <div className="border-2 border-dashed rounded-md p-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                  <Upload className="mr-2 h-5 w-5" />
                  Завантажити фото
                </Button>
                <Button variant="outline">
                  <Camera className="mr-2 h-5 w-5" />
                  Зробити фото
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">або перетягніть файл сюди</p>
              <Input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="flex justify-center">
              <div className="relative max-w-full">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-80 object-contain rounded-md"
                />
                {applyWatermark && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-white text-opacity-50 transform -rotate-45 text-2xl font-bold">
                      © Ваше ім'я
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 rounded-full bg-background/80"
              onClick={() => {
                URL.revokeObjectURL(previewUrl)
                setPreviewUrl(null)
                setSelectedFile(null)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Опис:</Label>
            <Input
              id="title"
              placeholder="Введіть опис фото..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Категорія:</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Виберіть категорію" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sweaters">Светри</SelectItem>
                <SelectItem value="hats">Шапки</SelectItem>
                <SelectItem value="patterns">Візерунки</SelectItem>
                <SelectItem value="schemes">Схеми</SelectItem>
                <SelectItem value="yarn">Пряжа</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Статус оригінальності:</Label>
            <RadioGroup value={originalityStatus} onValueChange={setOriginalityStatus}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="original" id="original" />
                <Label htmlFor="original">Це моя власна робота</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="translation" id="translation" />
                <Label htmlFor="translation">Це переклад/адаптація з дозволу автора</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="repost" id="repost" />
                <Label htmlFor="repost">Це репост із дозволом автора</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="watermark" className="flex-1">
              Додати водяний знак для захисту
            </Label>
            <Switch id="watermark" checked={applyWatermark} onCheckedChange={setApplyWatermark} />
          </div>

          <div className="space-y-2">
            <Label>Теги:</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} className="flex items-center gap-1">
                  #{tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Додайте тег..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
              <Button onClick={handleAddTag} disabled={!newTag}>
                Додати
              </Button>
            </div>
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(checked) => setAcceptedTerms(!!checked)} />
            <div>
              <Label htmlFor="terms" className="text-sm">
                Я підтверджую, що маю права на публікацію цього фото та погоджуюсь з{" "}
                <Button variant="link" className="h-auto p-0" onClick={() => router.push("/terms")}>
                  Умовами використання
                </Button>
              </Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            Скасувати
          </Button>
          <Button onClick={handleUpload} disabled={!selectedFile || !category || !acceptedTerms || uploading}>
            {uploading ? "Завантаження..." : "Зберегти"}
          </Button>
        </div>
      </div>
    </div>
  )
}
