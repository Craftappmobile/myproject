"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Star, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface FavoriteItem {
  id: string
  name: string
  type: "category" | "subcategory"
  path?: string
  parentName?: string
}

export function FavoritesPage() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  // In a real app, this would load from localStorage or a database
  useEffect(() => {
    // Mock data for demonstration
    setFavorites([
      { id: "yarn", name: "Калькулятор пряжі", type: "category" },
      {
        id: "adaptation-mk",
        name: "Адаптація МК",
        type: "subcategory",
        path: "/calculators/adaptation-mk",
        parentName: "Адаптація МК",
      },
      {
        id: "sleeve-decreases-increases",
        name: "Калькулятор убавок і прибавок рукава",
        type: "subcategory",
        path: "/calculators/sleeve-decreases-increases",
        parentName: "Калькулятор убавок і прибавок рукава",
      },
    ])
  }, [])

  const handleRemoveFromFavorites = (id: string) => {
    setFavorites(favorites.filter((item) => item.id !== id))
  }

  const handleNavigate = (path?: string) => {
    if (path) {
      router.push(path)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
          <Home className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Вибране</h1>
      </div>

      <p className="mb-4">Ваші вибрані калькулятори:</p>

      <div className="space-y-4">
        {favorites.map((item) => (
          <Card key={item.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex justify-between items-center" onClick={() => handleNavigate(item.path)}>
              <div>
                <p className="font-medium">{item.name}</p>
                {item.parentName && item.type === "subcategory" && (
                  <p className="text-sm text-muted-foreground">{item.parentName}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFromFavorites(item.id)
                }}
              >
                <Star className="h-5 w-5 fill-primary text-primary" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">У вас ще немає вибраних калькуляторів</p>
          <p className="text-sm mt-2">
            Додайте калькулятори до вибраного, натиснувши на зірочку ☆ поруч з назвою калькулятора
          </p>
        </div>
      )}
    </div>
  )
}
