"use client"

import { useState } from "react"
import { Pencil, Trash2, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { EditPhotoForm } from "@/components/edit-photo-form"

interface GalleryItem {
  id: string
  image: string
  title?: string
  source?: "pinterest" | "user"
  originalUrl?: string
  tags?: string[]
}

interface GalleryPhotoViewerProps {
  photo: GalleryItem
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: (photoId: string) => void
}

export function GalleryPhotoViewer({ photo, open, onOpenChange, onDelete }: GalleryPhotoViewerProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const isPinterestPhoto = photo.source === "pinterest"

  const handleDelete = () => {
    onDelete(photo.id)
    setShowDeleteDialog(false)
  }

  const handleOpenOriginal = () => {
    if (photo.originalUrl) {
      window.open(photo.originalUrl, "_blank")
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{photo.title || "Фото"}</DialogTitle>
            {isPinterestPhoto && <DialogDescription>Джерело: Pinterest</DialogDescription>}
          </DialogHeader>

          <div className="flex justify-center py-4">
            <img
              src={photo.image || "/placeholder.svg"}
              alt={photo.title || "Gallery image"}
              className="max-h-[60vh] object-contain rounded-md"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {photo.tags?.map((tag) => (
              <span key={tag} className="text-sm text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            {isPinterestPhoto && photo.originalUrl && (
              <Button className="w-full sm:w-auto" onClick={handleOpenOriginal}>
                Відкрити оригінал
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            )}
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" className="flex-1" onClick={() => setShowEditDialog(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Редагувати опис
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Поділитися
              </Button>
              <Button
                variant="outline"
                className="flex-1 text-destructive hover:text-destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Видалити
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Видалити фото?</AlertDialogTitle>
            <AlertDialogDescription>
              Ви впевнені, що хочете видалити це фото? Цю дію неможливо скасувати.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Скасувати</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Видалити
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редагувати фото</DialogTitle>
          </DialogHeader>
          <EditPhotoForm
            photo={photo}
            onSave={(updatedPhoto) => {
              // In a real app, this would update the photo in the database
              setShowEditDialog(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
