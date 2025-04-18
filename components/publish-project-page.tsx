"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, X, Home, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"

interface Project {
  id: string
  name: string
}

interface ProjectPhoto {
  id: string
  image: string
  title: string
  selected: boolean
}

interface PinterestIdea {
  id: string
  image: string
  title: string
  selected: boolean
}

export function PublishProjectPage() {
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [includePhoto, setIncludePhoto] = useState(true)
  const [includeInfo, setIncludeInfo] = useState(false)
  const [includeNotes, setIncludeNotes] = useState(true)
  const [includeYarn, setIncludeYarn] = useState(true)
  const [includeNeedles, setIncludeNeedles] = useState(false)
  const [includeCalculations, setIncludeCalculations] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [question, setQuestion] = useState("")
  const [tags, setTags] = useState<string[]>(["светр", "осінь", "вовна"])
  const [tagDialogOpen, setTagDialogOpen] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [publishSuccess, setPublishSuccess] = useState(false)
  const [photoSelectionOpen, setPhotoSelectionOpen] = useState(false)
  const [originalityStatus, setOriginalityStatus] = useState("original")
  const [applyWatermark, setApplyWatermark] = useState(true)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  // Mock projects data
  const projects: Project[] = [
    { id: "1", name: 'Светр "Осінь"' },
    { id: "2", name: 'Шапка "Сніжинка"' },
    { id: "3", name: "Шкарпетки" },
  ]

  // Mock project photos
  const [projectPhotos, setProjectPhotos] = useState<ProjectPhoto[]>([
    { id: "p1", image: "/cozy-knit-scarf.png", title: "Светр готовий", selected: true },
    { id: "p2", image: "/cozy-knit-basket.png", title: "Процес в'язання", selected: false },
    { id: "p3", image: "/cozy-knit-corner.png", title: "Схема візерунка", selected: true },
    {
      id: "p4",
      image: "/colorful-yarn-skeins.png",
      title: "Етикетка пряжі",
      selected: false,
    },
  ])

  // Mock Pinterest ideas
  const [pinterestIdeas, setPinterestIdeas] = useState<PinterestIdea[]>([
    {
      id: "pin1",
      image: "/warm-knit-texture.png",
      title: "Жовто-коричневий мотив 🌻",
      selected: true,
    },
    {
      id: "pin2",
      image: "/knitted-leaf-ornament.png",
      title: "Листяні орнаменти 🍁",
      selected: false,
    },
    {
      id: "pin3",
      image: "/floral-sleeve-detail.png",
      title: "Менші мотиви для рукавів",
      selected: true,
    },
  ])

  const popularTags = ["светр", "шапка", "шарф", "носки", "осінь", "зима", "весна", "літо", "вовна", "бавовна", "ажур"]

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleTagSelect = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const toggleProjectPhotoSelection = (id: string) => {
    setProjectPhotos(projectPhotos.map((photo) => (photo.id === id ? { ...photo, selected: !photo.selected } : photo)))
  }

  const togglePinterestIdeaSelection = (id: string) => {
    setPinterestIdeas(pinterestIdeas.map((idea) => (idea.id === id ? { ...idea, selected: !idea.selected } : idea)))
  }

  const handlePublish = () => {
    if (!acceptedTerms) return

    // In a real app, this would publish the project to the community
    setPublishSuccess(true)
    setTimeout(() => {
      router.push("/community")
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/community")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
          <Home className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Опублікувати проєкт</h1>
      </div>

      <Alert className="mb-6 bg-primary/10 border-primary/20">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Ви зберігаєте усі права на цю роботу. Ми лише показуємо її іншим користувачам у межах спільноти.
        </AlertDescription>
      </Alert>

      {publishSuccess ? (
        <div className="space-y-6 text-center py-12">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>
          </div>
          <h2 className="text-xl font-bold">Проєкт опубліковано!</h2>
          <p className="text-muted-foreground">Ваш проєкт успішно опубліковано у спільноті.</p>
          <p className="text-muted-foreground">Перенаправлення на сторінку спільноти...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-medium">Оберіть проєкт:</h2>
            <RadioGroup value={selectedProject || ""} onValueChange={setSelectedProject}>
              {projects.map((project) => (
                <div key={project.id} className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value={project.id} id={`project-${project.id}`} />
                  <Label htmlFor={`project-${project.id}`} className="flex-1 cursor-pointer">
                    {project.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3 border-t pt-4">
            <h2 className="text-lg font-medium">Статус оригінальності:</h2>
            <RadioGroup value={originalityStatus} onValueChange={setOriginalityStatus}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="original" id="original-work" />
                <Label htmlFor="original-work">Це моя власна робота</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="translation" id="translation-work" />
                <Label htmlFor="translation-work">Це переклад/адаптація з дозволу автора</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="repost" id="repost-work" />
                <Label htmlFor="repost-work">Це репост із дозволом автора</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3 border-t pt-4">
            <h2 className="text-lg font-medium">Що опублікувати:</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <Checkbox id="include-photo" checked={includePhoto} onCheckedChange={setIncludePhoto} />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="include-photo" className="cursor-pointer">
                    Фото проєкту
                  </Label>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="include-info" checked={includeInfo} onCheckedChange={setIncludeInfo} />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="include-info" className="cursor-pointer">
                    Основна інформація
                  </Label>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="include-notes" checked={includeNotes} onCheckedChange={setIncludeNotes} />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="include-notes" className="cursor-pointer">
                    Всі нотатки
                  </Label>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="include-yarn" checked={includeYarn} onCheckedChange={setIncludeYarn} />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="include-yarn" className="cursor-pointer">
                    Використана пряжа
                  </Label>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="include-needles" checked={includeNeedles} onCheckedChange={setIncludeNeedles} />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="include-needles" className="cursor-pointer">
                    Використані спиці
                  </Label>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="include-calculations"
                  checked={includeCalculations}
                  onCheckedChange={setIncludeCalculations}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="include-calculations" className="cursor-pointer">
                    Розрахунки
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="watermark" className="flex-1">
              Додати водяний знак для захисту фото
            </Label>
            <Switch id="watermark" checked={applyWatermark} onCheckedChange={setApplyWatermark} />
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Фотографії для публікації:</h2>
              <Button variant="outline" size="sm" onClick={() => setPhotoSelectionOpen(true)}>
                Обрати фото
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Основні фото проєкту:</h3>
                <div className="grid grid-cols-4 gap-2">
                  {projectPhotos
                    .filter((photo) => photo.selected)
                    .map((photo) => (
                      <div key={photo.id} className="relative aspect-square">
                        <img
                          src={photo.image || "/placeholder.svg"}
                          alt={photo.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                        {applyWatermark && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-white text-opacity-50 transform -rotate-45 text-xs font-bold">
                              © Ваше ім'я
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Moodboard натхнення:</h3>
                <div className="grid grid-cols-4 gap-2">
                  {pinterestIdeas
                    .filter((idea) => idea.selected)
                    .map((idea) => (
                      <div key={idea.id} className="relative aspect-square">
                        <img
                          src={idea.image || "/placeholder.svg"}
                          alt={idea.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <Badge className="absolute bottom-1 left-1 bg-white/80 text-black text-xs">Pinterest</Badge>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Назва публікації:</Label>
              <Input
                id="title"
                placeholder="Введіть назву публікації..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Опис:</Label>
              <Textarea
                id="description"
                placeholder="Розкажіть про свій проєкт..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="question">Додайте запитання:</Label>
              <Textarea
                id="question"
                placeholder="Поставте питання спільноті..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between items-center">
              <Label>Теги:</Label>
              <Button variant="outline" size="sm" onClick={() => setTagDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Додати теги
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} className="flex items-center gap-1">
                  #{tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(checked) => setAcceptedTerms(!!checked)} />
            <div>
              <Label htmlFor="terms" className="text-sm">
                Я підтверджую, що маю права на публікацію цього проєкту та погоджуюсь з{" "}
                <Button variant="link" className="h-auto p-0" onClick={() => router.push("/terms")}>
                  Умовами використання
                </Button>
              </Label>
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full" onClick={handlePublish} disabled={!selectedProject || !acceptedTerms}>
              ОПУБЛІКУВАТИ
            </Button>
          </div>
        </div>
      )}

      <Dialog open={tagDialogOpen} onOpenChange={setTagDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Виберіть теги</DialogTitle>
            <DialogDescription>Додайте теги для кращої видимості вашого проєкту</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Введіть новий тег"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddTag} disabled={!newTag || tags.includes(newTag)}>
                Додати
              </Button>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Популярні теги:</p>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTagSelect(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Ваші теги:</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} className="flex items-center gap-1">
                    #{tag}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setTagDialogOpen(false)}>Готово</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={photoSelectionOpen} onOpenChange={setPhotoSelectionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Обрати фото для галереї</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Основні фото проєкту:</h3>
              <div className="grid grid-cols-3 gap-2">
                {projectPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className={`relative aspect-square cursor-pointer border-2 rounded-md overflow-hidden ${
                      photo.selected ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => toggleProjectPhotoSelection(photo.id)}
                  >
                    <img
                      src={photo.image || "/placeholder.svg"}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    {photo.selected && (
                      <div className="absolute top-1 right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-2">Moodboard натхнення (Pinterest):</h3>
              <div className="grid grid-cols-3 gap-2">
                {pinterestIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className={`relative aspect-square cursor-pointer border-2 rounded-md overflow-hidden ${
                      idea.selected ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => togglePinterestIdeaSelection(idea.id)}
                  >
                    <img
                      src={idea.image || "/placeholder.svg"}
                      alt={idea.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute bottom-1 left-1 bg-white/80 text-black text-xs">Pinterest</Badge>
                    {idea.selected && (
                      <div className="absolute top-1 right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPhotoSelectionOpen(false)}>
              Скасувати
            </Button>
            <Button onClick={() => setPhotoSelectionOpen(false)}>Додати</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
