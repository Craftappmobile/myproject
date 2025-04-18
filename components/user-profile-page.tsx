"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MessageCircle, Heart, Share2, Users, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface UserProfile {
  username: string
  displayName: string
  bio: string
  avatar: string
  followers: number
  following: number
  projects: number
  joined: string
  isFollowing: boolean
}

interface Project {
  id: string
  title: string
  image: string
  likes: number
  comments: number
  date: string
}

export function UserProfilePage({ username }: { username: string }) {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This would normally fetch from an API
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Generate profile based on username
      const mockProfiles: Record<string, UserProfile> = {
        marina: {
          username: "marina",
          displayName: "Марина Ковальчук",
          bio: "Люблю в'язати шкарпетки та шапки. Завжди шукаю нові візерунки та техніки.",
          avatar: "/contemplative-artist.png",
          followers: 124,
          following: 87,
          projects: 15,
          joined: "Березень 2023",
          isFollowing: false,
        },
        oleksandr: {
          username: "oleksandr",
          displayName: "Олександр Петренко",
          bio: "Початківець у в'язанні спицями. Зараз працюю над першим светром.",
          avatar: "/thoughtful-reader.png",
          followers: 45,
          following: 102,
          projects: 3,
          joined: "Січень 2024",
          isFollowing: false,
        },
        default: {
          username: username,
          displayName: username.charAt(0).toUpperCase() + username.slice(1),
          bio: "Учасник спільноти в'язальників",
          avatar: "/cozy-knitter.png",
          followers: Math.floor(Math.random() * 200),
          following: Math.floor(Math.random() * 150),
          projects: Math.floor(Math.random() * 20),
          joined: "2023",
          isFollowing: false,
        },
      }

      // Get profile or use default
      const userProfile = mockProfiles[username] || mockProfiles.default
      setProfile(userProfile)

      // Generate mock projects
      const mockProjects: Project[] = []
      const projectTitles = ["Шапка", "Шкарпетки", "Светр", "Шарф", "Рукавички"]
      const projectImages = [
        "/cozy-knit-beanie.png",
        "/cozy-knit-scarf.png",
        "/cozy-cable-knit.png",
        "/textured-cable-knit.png",
        "/delicate-knit-lace.png",
      ]

      for (let i = 0; i < userProfile.projects; i++) {
        mockProjects.push({
          id: `project-${i}`,
          title: projectTitles[i % projectTitles.length],
          image: projectImages[i % projectImages.length],
          likes: Math.floor(Math.random() * 50),
          comments: Math.floor(Math.random() * 20),
          date: `${Math.floor(Math.random() * 30) + 1} днів тому`,
        })
      }

      setProjects(mockProjects)
      setLoading(false)
    }, 500)
  }, [username])

  const toggleFollow = () => {
    if (profile) {
      setProfile({
        ...profile,
        isFollowing: !profile.isFollowing,
        followers: profile.isFollowing ? profile.followers - 1 : profile.followers + 1,
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Профіль користувача</h1>
        </div>
        <div className="animate-pulse">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-muted mr-4"></div>
            <div className="flex-1">
              <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
          <div className="h-20 bg-muted rounded mb-6"></div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="h-24 bg-muted rounded"></div>
            <div className="h-24 bg-muted rounded"></div>
            <div className="h-24 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Профіль користувача</h1>
        </div>
        <p>Користувача не знайдено</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Профіль користувача</h1>
      </div>

      <div className="flex items-start mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden mr-4 flex-shrink-0">
          <img
            src={profile.avatar || "/placeholder.svg"}
            alt={profile.displayName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{profile.displayName}</h2>
          <p className="text-muted-foreground">@{profile.username}</p>
          <p className="mt-2">{profile.bio}</p>
          <p className="text-sm text-muted-foreground mt-1">Приєднався: {profile.joined}</p>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <Button variant={profile.isFollowing ? "outline" : "default"} className="flex-1 mr-2" onClick={toggleFollow}>
          {profile.isFollowing ? "Відписатися" : "Підписатися"}
        </Button>
        <Button variant="outline" className="flex-1 ml-2">
          <MessageCircle className="mr-2 h-4 w-4" />
          Написати
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="p-3 bg-muted/30 rounded-lg">
          <p className="font-bold">{profile.projects}</p>
          <p className="text-sm text-muted-foreground">Проєкти</p>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg">
          <p className="font-bold">{profile.followers}</p>
          <p className="text-sm text-muted-foreground">Підписники</p>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg">
          <p className="font-bold">{profile.following}</p>
          <p className="text-sm text-muted-foreground">Підписки</p>
        </div>
      </div>

      <Tabs defaultValue="projects">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="projects" className="flex-1">
            Проєкти
          </TabsTrigger>
          <TabsTrigger value="gallery" className="flex-1">
            Галерея
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex-1">
            Групи
          </TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold">{project.title}</h3>
                      <Badge variant="outline">{project.date}</Badge>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {project.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {project.comments}
                      </div>
                      <div className="flex items-center">
                        <Share2 className="h-4 w-4 mr-1" />
                        Поділитися
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p>Немає проєктів для відображення</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="gallery">
          <div className="text-center py-8">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p>Галерея порожня</p>
          </div>
        </TabsContent>
        <TabsContent value="groups">
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p>Немає груп для відображення</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
