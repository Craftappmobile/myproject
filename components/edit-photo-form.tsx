"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface GalleryItem {
  id: string
  image: string
  title?: string
  source?: "pinterest" | "user"
  originalUrl?: string
  tags?: string[]
}

interface EditPhotoFormProps {
  photo: GalleryItem
  onSave: (updatedPhoto: GalleryItem) => void
}

export function EditPhotoForm({ photo, onSave }: EditPhotoFormProps) {
  const [title, setTitle] = useState(photo.title || "")
  const [tags, setTags] = useState<string[]>(photo.tags || [])
  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSave = () => {
    const updatedPhoto: GalleryItem = {
      ...photo,
      title,
      tags,
    }
    onSave(updatedPhoto)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="photo-title">Опис:</Label>
        <Input id="photo-title" value={title} onChange={(e) => setTitle(e.target.value)} />
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
            placeholder="Новий тег..."
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
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={() => onSave(photo)}>
          Скасувати
        </Button>
        <Button onClick={handleSave}>Зберегти</Button>
      </div>
    </div>
  )
}
