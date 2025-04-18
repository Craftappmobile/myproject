"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Bookmark, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface SavedProject {
  id: string
  title: string
  author: {
    name: string
    username: string
  }
  image: string
  savedAt: string
  views?: number
}

export function SavedProjectsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for saved projects
  const savedProjects: SavedProject[] = [
    {
      id: "1",
      title: "Светр 'Осінні барви'",
      author: {
        name: "Олена К.",
        username: "olena_k",
      },
      image: "/cozy-knit-scarf.png",
      savedAt: "сьогодні",
    },
    {
      id: "2",
      title: "Шапка 'Зимовий настрій'",
      author: {
        name: "Марія Т.",
        username: "maria_t",
      },
      image: "/cozy-knit-basket.png",
      savedAt: "08.04.2025",
      views: 10420,
    },
    {
      id: "3",
      title: "Шкарпетки 'Сніжинки'",
      author: {
        name: "Анна С.",
        username: "anna_s",
      },
      image: "/cozy-knit-corner.png",
      savedAt: "05.04.2025",
    },
  ]

  const filteredProjects = savedProjects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/community")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Збережені проєкти</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Пошук збережених проєктів..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">Всі</TabsTrigger>
          <TabsTrigger value="collections">Колекції</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(`/community/post/${project.id}`)}
            >
              <CardContent className="p-0">
                <div className="flex items-start p-4">
                  <div className="h-20 w-20 bg-muted rounded-md overflow-hidden mr-4 flex-shrink-0">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">@{project.author.username}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <div className="flex items-center mr-3">
                        <Bookmark className="h-3 w-3 mr-1" />
                        <span>Збережено: {project.savedAt}</span>
                      </div>
                      {project.views && (
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          <span>Переглядів: {project.views.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Немає збережених проєктів</p>
            <p className="text-muted-foreground mb-6">
              Зберігайте цікаві проєкти, натискаючи на іконку закладки в публікаціях
            </p>
            <Button onClick={() => router.push("/community")}>Перейти до спільноти</Button>
          </div>
        )}
      </div>
    </div>
  )
}
