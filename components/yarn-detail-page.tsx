"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Edit, Trash, Share2, PlusCircle, Camera, X } from "lucide-react"
import Image from "next/image"
import { AddYarnToProjectForm } from "@/components/add-yarn-to-project-form"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export function YarnDetailPage({ id }: { id: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const [showAddToProject, setShowAddToProject] = useState(false)
  const [showAddPhoto, setShowAddPhoto] = useState(false)
  const [photos, setPhotos] = useState([{ url: "/colorful-yarn-skeins.png", alt: "Пряжа Drops Baby Merino" }])

  // Mock data for the yarn detail
  const yarn = {
    id,
    brand: "Drops",
    name: "Baby Merino",
    color: "Світло-сірий",
    colorCode: "22",
    weight: "50г",
    length: "175м",
    quantity: 8,
    composition: "100% Мериносова вовна",
    storage: "Основна шафа, полиця 2",
    notes: "Дуже м'яка пряжа, підходить для дитячих речей",
    projects: [
      { id: "1", name: "Шапка з помпоном", used: 2 },
      { id: "2", name: "Шарф у смужку", used: 1 },
    ],
  }

  const handleDelete = () => {
    // In a real app, this would delete the yarn from the database
    alert("Пряжу видалено")
    router.push("/yarn-inventory")
  }

  const handleAddPhoto = () => {
    // В реальному додатку тут буде логіка додавання фото
    toast({
      title: "Фото додано",
      description: "Нове фото було успішно додано до галереї",
    })

    // Додаємо нове фото до списку (в реальному додатку тут буде завантаження)
    setPhotos([...photos, { url: "/colorful-yarn-skeins.png", alt: "Нове фото пряжі" }])
    setShowAddPhoto(false)
  }

  const handleRemovePhoto = (index: number) => {
    // Видаляємо фото за індексом
    const newPhotos = [...photos]
    newPhotos.splice(index, 1)
    setPhotos(newPhotos)

    toast({
      title: "Фото видалено",
      description: "Фото було успішно видалено з галереї",
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.push("/yarn-inventory")}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <div className="flex flex-col space-y-6">
        {/* Фото пряжі */}
        <Card>
          <CardHeader>
            <CardTitle>Фото пряжі</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative h-40 rounded-md overflow-hidden group">
                  <Image src={photo.url || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" className="w-full" onClick={() => setShowAddPhoto(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Додати фото
            </Button>

            <Dialog open={showAddPhoto} onOpenChange={setShowAddPhoto}>
              <DialogContent>
                <div className="space-y-4 p-4">
                  <h3 className="text-lg font-medium">Додати фото пряжі</h3>
                  <div className="flex flex-col space-y-4">
                    <Button variant="outline" className="w-full">
                      <Camera className="h-4 w-4 mr-2" />
                      Зробити фото
                    </Button>
                    <Button variant="outline" className="w-full">
                      Вибрати з галереї
                    </Button>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowAddPhoto(false)}>
                      Скасувати
                    </Button>
                    <Button onClick={handleAddPhoto}>Додати</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Інформація про пряжу */}
        <Card>
          <CardHeader>
            <CardTitle>
              {yarn.brand} {yarn.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Колір</p>
              <p>
                {yarn.color} {yarn.colorCode}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Вага / Довжина</p>
              <p>
                {yarn.weight} • {yarn.length} • {yarn.quantity} шт
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Склад</p>
              <p>{yarn.composition}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Місце зберігання</p>
              <p>{yarn.storage}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Нотатки</p>
              <p>{yarn.notes}</p>
            </div>
          </CardContent>
        </Card>

        {/* Проєкти */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Проєкти</span>
              <Dialog open={showAddToProject} onOpenChange={setShowAddToProject}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Додати до проєкту
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <AddYarnToProjectForm yarnId={id} onSuccess={() => setShowAddToProject(false)} />
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {yarn.projects.length > 0 ? (
              <ul className="space-y-2">
                {yarn.projects.map((project) => (
                  <li key={project.id} className="flex justify-between items-center">
                    <span>{project.name}</span>
                    <span className="text-sm text-gray-500">Використано: {project.used} шт</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Ця пряжа ще не використовується в проєктах</p>
            )}
          </CardContent>
        </Card>

        {/* Кнопки дій */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/yarn-inventory/${id}/edit`)}
            className="flex items-center"
          >
            <Edit className="mr-2 h-4 w-4" />
            Редагувати
          </Button>
          <Button variant="outline" onClick={handleDelete}>
            <Trash className="mr-2 h-4 w-4" />
            Видалити
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Поділитися
          </Button>
        </div>
      </div>
    </div>
  )
}
