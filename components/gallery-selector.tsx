"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, X, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface GalleryPhoto {
  id: string
  url: string
  caption?: string
}

interface GallerySelectorProps {
  onSelect: (photos: GalleryPhoto[]) => void
  onCancel: () => void
  selectedIds?: string[]
  maxSelections?: number
}

export function GallerySelector({ onSelect, onCancel, selectedIds = [], maxSelections = 10 }: GallerySelectorProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPhotos, setSelectedPhotos] = useState<GalleryPhoto[]>([])
  const [allPhotos, setAllPhotos] = useState<GalleryPhoto[]>([])

  // Імітація завантаження фотографій з галереї користувача
  useEffect(() => {
    // В реальному додатку тут був би API запит для отримання фотографій
    const mockPhotos: GalleryPhoto[] = [
      {
        id: "photo1",
        url: "/cozy-knit-scarf.png",
        caption: "Процес в'язання светра",
      },
      {
        id: "photo2",
        url: "/cozy-knit-basket.png",
        caption: "Готовий виріб",
      },
      {
        id: "photo3",
        url: "/cozy-knit-corner.png",
        caption: "Деталь візерунка",
      },
      {
        id: "photo4",
        url: "/cozy-knit-hats.png",
        caption: "Шапка з помпоном",
      },
      {
        id: "photo5",
        url: "/cozy-knit-beanie.png",
        caption: "Шапка 'Сніжинка'",
      },
      {
        id: "photo6",
        url: "/textured-cable-knit.png",
        caption: "Візерунок 'Коси'",
      },
      {
        id: "photo7",
        url: "/delicate-knit-lace.png",
        caption: "Ажурний візерунок",
      },
      {
        id: "photo8",
        url: "/colorful-yarn-display.png",
        caption: "Пряжа для проєкту",
      },
    ]

    setAllPhotos(mockPhotos)

    // Встановлюємо вже вибрані фотографії
    if (selectedIds.length > 0) {
      const preselected = mockPhotos.filter((photo) => selectedIds.includes(photo.id))
      setSelectedPhotos(preselected)
    }
  }, [selectedIds])

  const handleToggleSelect = (photo: GalleryPhoto) => {
    if (selectedPhotos.some((p) => p.id === photo.id)) {
      // Якщо фото вже вибране, видаляємо його з вибраних
      setSelectedPhotos(selectedPhotos.filter((p) => p.id !== photo.id))
    } else {
      // Якщо фото ще не вибране, додаємо його до вибраних, якщо не перевищено ліміт
      if (selectedPhotos.length < maxSelections) {
        setSelectedPhotos([...selectedPhotos, photo])
      }
    }
  }

  const filteredPhotos = allPhotos.filter((photo) => {
    // Фільтрація за пошуковим запитом
    const matchesSearch =
      !searchQuery || (photo.caption && photo.caption.toLowerCase().includes(searchQuery.toLowerCase()))

    // Фільтрація за вкладкою
    if (activeTab === "all") return matchesSearch
    if (activeTab === "selected") return selectedPhotos.some((p) => p.id === photo.id) && matchesSearch

    return matchesSearch
  })

  const handleConfirm = () => {
    onSelect(selectedPhotos)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-4 border border-sage-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-sage-800">Вибір фото з галереї</h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Пошук фотографій..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">Всі фото</TabsTrigger>
          <TabsTrigger value="selected">Вибрані ({selectedPhotos.length})</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto p-1">
        {filteredPhotos.map((photo) => {
          const isSelected = selectedPhotos.some((p) => p.id === photo.id)
          return (
            <div
              key={photo.id}
              className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                isSelected ? "border-moss-500" : "border-transparent"
              }`}
              onClick={() => handleToggleSelect(photo)}
            >
              <img
                src={photo.url || "/placeholder.svg"}
                alt={photo.caption || ""}
                className="w-full h-full object-cover"
              />
              {isSelected && (
                <div className="absolute top-1 right-1 bg-moss-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Немає фотографій, що відповідають критеріям пошуку</p>
        </div>
      )}

      <div className="flex justify-between items-center pt-2">
        <div>
          {selectedPhotos.length > 0 ? (
            <Badge variant="outline" className="bg-sage-100">
              Вибрано: {selectedPhotos.length} {selectedPhotos.length === 1 ? "фото" : "фото"}
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground">Виберіть фотографії для додавання</span>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Скасувати
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={selectedPhotos.length === 0}
            className="bg-moss-400 hover:bg-moss-500"
          >
            Додати вибрані
          </Button>
        </div>
      </div>
    </div>
  )
}
