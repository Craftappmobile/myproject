"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, ExternalLink, Home } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PinterestLinkForm } from "@/components/pinterest-link-form"
import { GalleryCategory } from "@/components/gallery-category"
import { GalleryPhotoViewer } from "@/components/gallery-photo-viewer"

interface GalleryItem {
  id: string
  image: string
  title?: string
  source?: "pinterest" | "user"
  originalUrl?: string
  tags?: string[]
}

interface Category {
  id: string
  name: string
  items: GalleryItem[]
}

export function GalleryPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>("all")
  const [showPinterestDialog, setShowPinterestDialog] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null)
  const [showPhotoViewer, setShowPhotoViewer] = useState(false)

  // Mock data for gallery categories
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "sweaters",
      name: "СВЕТРИ",
      items: [
        { id: "s1", image: "/cozy-knit-scarf.png", title: "Светр 'Осінь'", source: "user", tags: ["светр", "осінь"] },
        { id: "s2", image: "/cozy-knit-basket.png", title: "Светр з косами", source: "user", tags: ["светр", "коси"] },
        {
          id: "s3",
          image: "/cozy-knit-corner.png",
          title: "Светр 'Зима'",
          source: "user",
          tags: ["светр", "зима", "білий"],
        },
        {
          id: "s4",
          image: "/cozy-cable-knit.png",
          title: "Ажурний светр",
          source: "user",
          tags: ["светр", "ажур"],
        },
      ],
    },
    {
      id: "hats",
      name: "ШАПКИ",
      items: [
        {
          id: "h1",
          image: "/cozy-knit-hats.png",
          title: "Шапка з помпоном",
          source: "user",
          tags: ["шапка", "помпон"],
        },
        {
          id: "h2",
          image: "/cozy-knit-beanie.png",
          title: "Шапка 'Сніжинка'",
          source: "user",
          tags: ["шапка", "зима"],
        },
      ],
    },
    {
      id: "patterns",
      name: "ВІЗЕРУНКИ",
      items: [
        {
          id: "p1",
          image: "/textured-cable-knit.png",
          title: "Візерунок 'Коси'",
          source: "user",
          tags: ["візерунок", "коси"],
        },
        {
          id: "p2",
          image: "/delicate-knit-lace.png",
          title: "Ажурний візерунок",
          source: "user",
          tags: ["візерунок", "ажур"],
        },
      ],
    },
    {
      id: "schemes",
      name: "СХЕМИ",
      items: [
        {
          id: "sc1",
          image: "/colorful-knit-diagram.png",
          title: "Схема для светра",
          source: "user",
          tags: ["схема", "светр"],
        },
      ],
    },
    {
      id: "yarn",
      name: "ПРЯЖА",
      items: [
        {
          id: "y1",
          image: "/colorful-yarn-display.png",
          title: "Меринос",
          source: "user",
          tags: ["пряжа", "вовна"],
        },
      ],
    },
    {
      id: "pinterest",
      name: "ІДЕЇ (з Pinterest)",
      items: [
        {
          id: "pin1",
          image: "/textured-floral-close-up.png",
          title: "Вишивка на в'язанні",
          source: "pinterest",
          originalUrl: "https://pinterest.com/example1",
          tags: ["вишивка"],
        },
        {
          id: "pin2",
          image: "/cozy-knit-heart.png",
          title: "Орнамент",
          source: "pinterest",
          originalUrl: "https://pinterest.com/example2",
          tags: ["орнамент"],
        },
        {
          id: "pin3",
          image: "/cozy-cable-knit.png",
          title: "Мотив",
          source: "pinterest",
          originalUrl: "https://pinterest.com/example3",
          tags: ["мотив"],
        },
      ],
    },
  ])

  const handleAddPinterestIdea = (item: GalleryItem) => {
    setCategories(
      categories.map((category) => {
        if (category.id === "pinterest") {
          return {
            ...category,
            items: [item, ...category.items],
          }
        }
        return category
      }),
    )
    setShowPinterestDialog(false)
  }

  const handlePhotoClick = (item: GalleryItem) => {
    setSelectedPhoto(item)
    setShowPhotoViewer(true)
  }

  const handleDeletePhoto = (categoryId: string, photoId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.filter((item) => item.id !== photoId),
          }
        }
        return category
      }),
    )
    setShowPhotoViewer(false)
  }

  // Check if there are any photos in the gallery
  const hasPhotos = categories.some((category) => category.items.length > 0)

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
            <Home className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Галерея</h1>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="all">Всі</TabsTrigger>
            <TabsTrigger value="my">Мої</TabsTrigger>
            <TabsTrigger value="pinterest">Pinterest</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4 mb-6">
        <Button className="w-full" onClick={() => router.push("/gallery/add")}>
          <Plus className="mr-2 h-5 w-5" />
          ДОДАТИ ФОТО
        </Button>

        <div className="relative">
          <h3 className="text-center font-medium mb-2">СКОПІЮВАТИ З PINTEREST</h3>
          <div className="flex gap-2">
            <Input placeholder="Вставте посилання..." className="flex-1" />
            <Button onClick={() => setShowPinterestDialog(true)}>ЗБЕРЕГТИ ІДЕЮ</Button>
          </div>
        </div>
      </div>

      {hasPhotos ? (
        <div className="space-y-8">
          {categories
            .filter((category) => {
              if (activeTab === "all") return true
              if (activeTab === "my") return category.id !== "pinterest"
              if (activeTab === "pinterest") return category.id === "pinterest"
              return true
            })
            .map((category) => (
              <GalleryCategory
                key={category.id}
                category={category}
                onPhotoClick={handlePhotoClick}
                showControls={category.items.length > 6}
              />
            ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg font-medium mb-4">Ще немає жодного фото!</p>
          <Button onClick={() => router.push("/gallery/add")} className="mb-4">
            <Plus className="mr-2 h-5 w-5" />
            ДОДАТИ ПЕРШЕ ФОТО
          </Button>
          <p className="text-muted-foreground">або</p>
          <Button variant="outline" onClick={() => setShowPinterestDialog(true)} className="mt-4">
            Вставте посилання з Pinterest
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      <Dialog open={showPinterestDialog} onOpenChange={setShowPinterestDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Зберегти ідею з Pinterest</DialogTitle>
          </DialogHeader>
          <PinterestLinkForm onSave={handleAddPinterestIdea} />
        </DialogContent>
      </Dialog>

      {selectedPhoto && (
        <GalleryPhotoViewer
          photo={selectedPhoto}
          open={showPhotoViewer}
          onOpenChange={setShowPhotoViewer}
          onDelete={(photoId) => {
            const categoryId = categories.find((category) => category.items.some((item) => item.id === photoId))?.id
            if (categoryId) {
              handleDeletePhoto(categoryId, photoId)
            }
          }}
        />
      )}
    </div>
  )
}
