"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

interface GalleryCategoryProps {
  category: Category
  onPhotoClick: (item: GalleryItem) => void
  showControls?: boolean
}

export function GalleryCategory({ category, onPhotoClick, showControls = false }: GalleryCategoryProps) {
  const [expanded, setExpanded] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scrollAmount = container.clientWidth * 0.8
    const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })

    setScrollPosition(newPosition)
  }

  const isPinterestCategory = category.id === "pinterest"

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <h2 className="font-bold text-lg">{category.name}</h2>
        {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </div>

      {expanded && (
        <div className="relative">
          <div
            ref={containerRef}
            className="grid grid-flow-col auto-cols-max gap-3 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {category.items.map((item) => (
              <div key={item.id} className="w-32 h-32 relative cursor-pointer group" onClick={() => onPhotoClick(item)}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-md" />
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title || "Gallery image"}
                  className="w-full h-full object-cover rounded-md"
                />
                {isPinterestCategory && (
                  <Badge className="absolute bottom-1 left-1 bg-white/80 text-black text-xs">Pinterest</Badge>
                )}
              </div>
            ))}
          </div>

          {showControls && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
                onClick={(e) => {
                  e.stopPropagation()
                  handleScroll("left")
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
                onClick={(e) => {
                  e.stopPropagation()
                  handleScroll("right")
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
