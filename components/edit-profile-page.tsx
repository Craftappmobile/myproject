"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Check, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SocialMedia {
  id: string
  platform: string
  username: string
}

export function EditProfilePage() {
  const router = useRouter()
  const [name, setName] = useState("Олена Петренко")
  const [nickname, setNickname] = useState("olena_knits")
  const [bio, setBio] = useState("В'яжу вже 5 років. Викладаю створювати светри та шалі. Викладач в'язання.")
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([
    { id: "1", platform: "Instagram", username: "olena_knits" },
    { id: "2", platform: "YouTube", username: "" },
    { id: "3", platform: "Facebook", username: "" },
  ])
  const [showProfile, setShowProfile] = useState(true)
  const [showSocialMedia, setShowSocialMedia] = useState(true)
  const [showStats, setShowStats] = useState(true)

  const [photoDialogOpen, setPhotoDialogOpen] = useState(false)
  const [cropDialogOpen, setCropDialogOpen] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleAddSocialMedia = () => {
    const newId = (socialMedia.length + 1).toString()
    setSocialMedia([...socialMedia, { id: newId, platform: "", username: "" }])
  }

  const handleRemoveSocialMedia = (id: string) => {
    setSocialMedia(socialMedia.filter((item) => item.id !== id))
  }

  const handleUpdateSocialMedia = (id: string, field: "platform" | "username", value: string) => {
    setSocialMedia(socialMedia.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleSave = () => {
    // In a real app, this would save the profile data to the server
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
      router.push("/profile")
    }, 1500)
  }

  const handlePhotoOption = (option: string) => {
    setPhotoDialogOpen(false)
    if (option === "take" || option === "gallery") {
      setCropDialogOpen(true)
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push("/profile")}>
            <X className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-medium">Редагувати профіль</h1>
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Check className="h-5 w-5" />
          </Button>
        </div>

        {saveSuccess && (
          <div className="mb-4 p-3 bg-primary/10 text-primary rounded-md text-center">Зміни збережено успішно!</div>
        )}

        <div className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src="/diverse-group-city.png" alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button variant="link" className="text-primary" onClick={() => setPhotoDialogOpen(true)}>
              Змінити фото
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ім'я користувача:</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname">Нікнейм:</Label>
              <div className="flex">
                <span className="flex items-center bg-muted px-3 rounded-l-md border border-r-0">@</span>
                <Input
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="rounded-l-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Про мене:</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h3 className="font-medium">Соціальні мережі:</h3>

              {socialMedia.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Input
                    placeholder="Платформа"
                    value={item.platform}
                    onChange={(e) => handleUpdateSocialMedia(item.id, "platform", e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Ім'я користувача"
                    value={item.username}
                    onChange={(e) => handleUpdateSocialMedia(item.id, "username", e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveSocialMedia(item.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" size="sm" className="mt-2" onClick={handleAddSocialMedia}>
                <Plus className="h-4 w-4 mr-2" />
                Додати ще соцмережу
              </Button>
            </div>

            {/* Privacy Settings */}
            <div className="space-y-3 pt-2">
              <h3 className="font-medium">Налаштування приватності:</h3>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-profile" className="cursor-pointer">
                  Показувати мій профіль у спільноті
                </Label>
                <Switch id="show-profile" checked={showProfile} onCheckedChange={setShowProfile} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-social" className="cursor-pointer">
                  Показувати соцмережі
                </Label>
                <Switch id="show-social" checked={showSocialMedia} onCheckedChange={setShowSocialMedia} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-stats" className="cursor-pointer">
                  Показувати статистику проєктів
                </Label>
                <Switch id="show-stats" checked={showStats} onCheckedChange={setShowStats} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Selection Dialog */}
      <Dialog open={photoDialogOpen} onOpenChange={setPhotoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Змінити фото</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-2 pt-4">
            <Button variant="outline" className="justify-start text-left" onClick={() => handlePhotoOption("take")}>
              Зробити фото
            </Button>
            <Button variant="outline" className="justify-start text-left" onClick={() => handlePhotoOption("gallery")}>
              Вибрати з галереї
            </Button>
            <Button variant="outline" className="justify-start text-left" onClick={() => handlePhotoOption("delete")}>
              Видалити фото
            </Button>
            <Button
              variant="outline"
              className="justify-start text-left text-destructive"
              onClick={() => setPhotoDialogOpen(false)}
            >
              Скасувати
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Crop Dialog */}
      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Обрізати фото</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="h-64 w-64 bg-muted rounded-md flex items-center justify-center border-2 border-dashed border-muted-foreground">
              <span className="text-muted-foreground">Область для обрізки фото</span>
            </div>
            <p className="text-sm text-muted-foreground">Перетягніть та змініть розмір області для обрізки</p>
            <div className="flex space-x-2 w-full">
              <Button variant="outline" className="flex-1" onClick={() => setCropDialogOpen(false)}>
                Скасувати
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setCropDialogOpen(false)
                  // In a real app, this would save the cropped photo
                }}
              >
                Зберегти
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
