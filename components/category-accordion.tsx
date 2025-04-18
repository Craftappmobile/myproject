"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Star, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import type { Category } from "@/lib/types"

interface CategoryAccordionProps {
  category: Category
}

export function CategoryAccordion({ category }: CategoryAccordionProps) {
  const router = useRouter()
  const [favorites, setFavorites] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  // In a real app, this would load from localStorage or a database
  useEffect(() => {
    // Mock data for demonstration
    setFavorites(["yarn", "adaptation-mk", "sleeve-decreases-increases"])
  }, [])

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const navigateToCalculator = (path: string) => {
    router.push(path)
  }

  return (
    <div className="border rounded-md bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 cursor-pointer flex items-center" onClick={() => setIsExpanded(!isExpanded)}>
          <span className="text-base font-medium text-sage-800">{category.name}</span>
          {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
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
              <span className="text-sage-700">• {subcategory.name}</span>
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
    </div>
  )
}
