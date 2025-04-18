"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CommunityPostCard } from "@/components/community-post-card"
import { PlusCircle, Filter, Home } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CommunityFilters } from "@/components/community-filters"

export function CommunityPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Mock data for community posts
  const posts = [
    {
      id: "1",
      author: {
        name: "Олена К.",
        username: "olena_k",
        avatar: "/diverse-group-city.png",
      },
      title: "Светр 'Осінні барви'",
      description:
        "Нарешті закінчила свій перший светр з косами! Дуже задоволена результатом. Пряжа вийшла дуже м'якою і приємною на дотик.",
      image: "/cozy-knit-scarf.png",
      details: {
        yarn: "Merino Wool",
        needles: "4.5 мм",
      },
      question: "Як краще блокувати виріб?",
      likes: 24,
      comments: 8,
      views: 58,
      timeAgo: "5 днів тому",
      tags: ["светр", "осінь", "вовна"],
    },
    {
      id: "2",
      author: {
        name: "Марія Т.",
        username: "maria_t",
        avatar: "/contemplative-artist.png",
      },
      title: "Шапка 'Зимовий настрій'",
      description: "Зв'язала шапку за вихідні. Дуже сподобався візерунок з ажуром :)",
      image: "/cozy-knit-basket.png",
      details: {
        yarn: "Alpaca Blend",
        needles: "5.0 мм",
      },
      likes: 18,
      comments: 3,
      views: 47,
      timeAgo: "2 дні тому",
      tags: ["шапка", "зима", "ажур"],
    },
    {
      id: "3",
      author: {
        name: "Наталія В.",
        username: "natalia_v",
        avatar: "/cozy-knitter.png",
      },
      title: "Шарф 'Весняний'",
      description: "Легкий шарф для весняних прогулянок. Використала бавовняну пряжу.",
      image: "/cozy-knit-corner.png",
      details: {
        yarn: "Cotton Premium",
        needles: "3.5 мм",
      },
      question: "Чи варто додати китиці на кінцях?",
      likes: 32,
      comments: 12,
      views: 76,
      timeAgo: "1 тиждень тому",
      tags: ["шарф", "весна", "бавовна"],
    },
  ]

  const popularTags = ["светр", "шапка", "шарф", "носки", "дитяче", "ажур"]

  const handleTagClick = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag))
    } else {
      setActiveTags([...activeTags, tag])
    }
  }

  const filteredPosts = posts.filter((post) => {
    if (activeTags.length === 0) return true
    return post.tags.some((tag) => activeTags.includes(tag))
  })

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
            <Home className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Спільнота</h1>
        </div>
        <Button variant="outline" size="icon" onClick={() => setShowFilters(true)}>
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      <Button className="w-full mb-6" onClick={() => router.push("/community/publish")}>
        <PlusCircle className="mr-2 h-5 w-5" />
        ОПУБЛІКУВАТИ ПРОЄКТ
      </Button>

      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Всі</TabsTrigger>
            <TabsTrigger value="popular">Популярне</TabsTrigger>
            <TabsTrigger value="subscriptions">Підписки</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {popularTags.map((tag) => (
          <Badge
            key={tag}
            variant={activeTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleTagClick(tag)}
          >
            #{tag}
          </Badge>
        ))}
      </div>

      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <CommunityPostCard key={post.id} post={post} />)
        ) : (
          <div className="text-center py-12">
            <p className="text-lg font-medium mb-2">У вас поки що немає цікавих публікацій.</p>
            <p className="text-muted-foreground mb-6">Підпишіться на авторів, або додайте публікацію!</p>
            <Button onClick={() => router.push("/community/publish")}>
              <PlusCircle className="mr-2 h-5 w-5" />
              ОПУБЛІКУВАТИ ПРОЄКТ
            </Button>
          </div>
        )}
      </div>

      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Фільтрація</DialogTitle>
            <DialogDescription>Налаштуйте параметри відображення публікацій</DialogDescription>
          </DialogHeader>
          <CommunityFilters onClose={() => setShowFilters(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
