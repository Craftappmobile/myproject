"use client"

import type React from "react"

import { useState } from "react"
import { Star, ChevronDown, ChevronRight, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import type { Category } from "@/lib/types"
import { HelpModal } from "./help-modal"

interface CalculatorCategoryProps {
  category: Category
}

export function CalculatorCategory({ category }: CalculatorCategoryProps) {
  const router = useRouter()
  const [favorites, setFavorites] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [currentSubcategory, setCurrentSubcategory] = useState<{ id: string; name: string } | null>(null)

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const navigateToCalculator = (path: string) => {
    router.push(path)
  }

  const openHelp = (e: React.MouseEvent, subcategory: { id: string; name: string }) => {
    e.stopPropagation()
    setCurrentSubcategory(subcategory)
    setHelpOpen(true)
  }

  return (
    <div className="border rounded-md bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 cursor-pointer flex items-center" onClick={() => setIsExpanded(!isExpanded)}>
          <span className="text-base font-medium text-sage-800">{category.name}</span>
          {isExpanded ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => toggleFavorite(category.id, e)}
          aria-label={favorites.includes(category.id) ? "Видалити з обраного" : "Додати до обраного"}
        >
          <Star
            className={cn(
              "h-5 w-5",
              favorites.includes(category.id) ? "fill-moss-400 text-moss-400" : "text-muted-foreground",
            )}
          />
        </Button>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-2">
          {category.subcategories.map((subcategory) => (
            <div
              key={subcategory.id}
              className="flex items-center justify-between py-2 px-4 hover:bg-sage-50 rounded-md cursor-pointer"
              onClick={() => navigateToCalculator(subcategory.path)}
            >
              <div className="flex items-center">
                <span className="text-sage-700">• {subcategory.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-2"
                  onClick={(e) => openHelp(e, subcategory)}
                  aria-label="Допомога"
                >
                  <HelpCircle className="h-4 w-4 text-sage-500" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => toggleFavorite(subcategory.id, e)}
                aria-label={favorites.includes(subcategory.id) ? "Видалити з обраного" : "Додати до обраного"}
              >
                <Star
                  className={cn(
                    "h-5 w-5",
                    favorites.includes(subcategory.id) ? "fill-moss-400 text-moss-400" : "text-muted-foreground",
                  )}
                />
              </Button>
            </div>
          ))}
        </div>
      )}
      {currentSubcategory && (
        <HelpModal
          open={helpOpen}
          onOpenChange={setHelpOpen}
          title={currentSubcategory.name}
          purpose={`Калькулятор "${currentSubcategory.name}" допомагає розрахувати необхідні параметри для в'язання.`}
          steps={[
            { step: "Крок 1", description: "Введіть необхідні вимірювання." },
            { step: "Крок 2", description: "Натисніть кнопку 'Розрахувати'." },
            { step: "Крок 3", description: "Отримайте результат розрахунку." },
          ]}
          tips={[
            "Завжди перевіряйте свої вимірювання перед розрахунком.",
            "Зробіть зразок перед початком роботи.",
            "Зберігайте результати розрахунків для майбутнього використання.",
          ]}
        />
      )}
    </div>
  )
}
