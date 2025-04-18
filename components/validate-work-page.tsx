"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, Upload, Info, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export function ValidateWorkPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [workType, setWorkType] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !workType || files.length === 0) return

    setSubmitting(true)

    // In a real app, this would submit the work to the server
    setTimeout(() => {
      router.push("/profile/copyright?validated=true")
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/profile/copyright")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
          <Home className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Підтвердження авторської роботи</h1>
      </div>

      <Alert className="mb-6 bg-primary/10 border-primary/20">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Додайте свою роботу до бази даних підтверджених авторських робіт. Це допоможе швидше вирішувати суперечки щодо
          авторських прав.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Назва роботи:</Label>
          <Input
            id="title"
            placeholder="Введіть назву вашої роботи..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="work-type">Тип роботи:</Label>
          <Select value={workType} onValueChange={setWorkType} required>
            <SelectTrigger id="work-type">
              <SelectValue placeholder="Виберіть тип роботи" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pattern">Схема в'язання</SelectItem>
              <SelectItem value="tutorial">Майстер-клас</SelectItem>
              <SelectItem value="design">Дизайн виробу</SelectItem>
              <SelectItem value="photo">Фотографія</SelectItem>
              <SelectItem value="collection">Колекція</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Опис роботи:</Label>
          <Textarea
            id="description"
            placeholder="Опишіть вашу роботу..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
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
            <Button type="button" onClick={handleAddTag} disabled={!newTag}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Файли роботи:</Label>
          <div className="border-2 border-dashed rounded-md p-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Button type="button" variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Завантажити файли
              </Button>
              <p className="text-sm text-muted-foreground">
                Завантажте схеми, фотографії, документи або інші файли, що підтверджують ваше авторство
              </p>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                multiple
                accept="image/*,.pdf,.doc,.docx"
              />
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Завантажені файли:</p>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                      <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={!title || !workType || files.length === 0 || submitting}>
          {submitting ? "Надсилання..." : "Підтвердити авторство"}
        </Button>
      </form>
    </div>
  )
}
