"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Maximize } from "lucide-react"
import Image from "next/image"

type Photo = {
  url: string
  alt: string
}

interface YarnGalleryDialogProps {
  photos: Photo[]
}

export function YarnGalleryDialog({ photos }: YarnGalleryDialogProps) {
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Maximize className="h-4 w-4 mr-2" />
          Переглянути всі фото
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <div className="relative h-full flex flex-col">
          <div className="absolute top-2 right-2 z-10">
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={photos[currentIndex].url || "/placeholder.svg"}
                alt={photos[currentIndex].alt}
                fill
                className="object-contain"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="p-4 bg-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                {currentIndex + 1} / {photos.length}
              </span>
              <span className="text-sm">{photos[currentIndex].alt}</span>
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className={`relative w-16 h-16 rounded-md overflow-hidden cursor-pointer ${
                    index === currentIndex ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <Image src={photo.url || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
