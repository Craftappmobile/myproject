"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Users, MessageCircle, Heart, Share2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface Group {
  id: string
  name: string
  description: string
  members: number
  posts: number
  created: string
  isJoined: boolean
  image: string
}

interface Post {
  id: string
  title: string
  content: string
  author: {
    username: string
    displayName: string
    avatar: string
  }
  likes: number
  comments: number
  date: string
}

export function GroupPage({ groupId }: { groupId: string }) {
  const router = useRouter()
  const [group, setGroup] = useState<Group | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This would normally fetch from an API
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Generate group based on groupId
      const mockGroups: Record<string, Group> = {
        "knitting-needles": {
          id: "knitting-needles",
          name: "В'язання спицями",
          description: "Група для обговорення технік в'язання спицями, обміну візерунками та порадами.",
          members: 342,
          posts: 87,
          created: "Січень 2022",
          isJoined: false,
          image: "/cozy-knit-scarf.png",
        },
        default: {
          id: groupId,
          name: "Група в'язальників",
          description: "Обговорення технік в'язання та обмін досвідом.",
          members: Math.floor(Math.random() * 500),
          posts: Math.floor(Math.random() * 100),
          created: "2022",
          isJoined: false,
          image: "/cozy-knit-corner.png",
        },
      }

      // Get group or use default
      const groupData = mockGroups[groupId] || mockGroups.default
      setGroup(groupData)

      // Generate mock posts
      const mockPosts: Post[] = []
      const postTitles = [
        "Як в'язати шкарпетки п'ятьма спицями",
        "Поділіться візерунком для дитячої шапки",
        "Проблема з лицьовими петлями",
        "Мій перший светр - потрібна порада",
        "Техніка в'язання без швів",
      ]
      const postContents = [
        "Хочу поділитися своїм досвідом в'язання шкарпеток на п'яти спицях...",
        "Шукаю гарний візерунок для дитячої шапки на 2 роки...",
        "Не можу зрозуміти, чому мої лицьові петлі виглядають нерівними...",
        "Почала в'язати свій перший светр і маю питання щодо розрахунку петель...",
        "Хочу поділитися технікою в'язання без швів, яку нещодавно освоїла...",
      ]
      const authors = [
        {
          username: "marina",
          displayName: "Марина Ковальчук",
          avatar: "/contemplative-artist.png",
        },
        {
          username: "oleksandr",
          displayName: "Олександр Петренко",
          avatar: "/thoughtful-reader.png",
        },
        {
          username: "iryna",
          displayName: "Ірина Мельник",
          avatar: "/cozy-knitter.png",
        },
      ]

      for (let i = 0; i < 5; i++) {
        mockPosts.push({
          id: `post-${i}`,
          title: postTitles[i],
          content: postContents[i],
          author: authors[i % authors.length],
          likes: Math.floor(Math.random() * 50),
          comments: Math.floor(Math.random() * 20),
          date: `${Math.floor(Math.random() * 30) + 1} днів тому`,
        })
      }

      setPosts(mockPosts)
      setLoading(false)
    }, 500)
  }, [groupId])

  const toggleJoin = () => {
    if (group) {
      setGroup({
        ...group,
        isJoined: !group.isJoined,
        members: group.isJoined ? group.members - 1 : group.members + 1,
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
          <h1 className="text-2xl font-bold">Група</h1>
        </div>
        <div className="animate-pulse">
          <div className="h-40 bg-muted rounded mb-6"></div>
          <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="h-24 bg-muted rounded"></div>
            <div className="h-24 bg-muted rounded"></div>
            <div className="h-24 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Група</h1>
        </div>
        <p>Групу не знайдено</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Група</h1>
      </div>

      <div className="mb-6">
        <div className="h-40 rounded-lg overflow-hidden mb-4">
          <img src={group.image || "/placeholder.svg"} alt={group.name} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold">{group.name}</h2>
        <p className="text-muted-foreground mb-2">Створено: {group.created}</p>
        <p className="mb-4">{group.description}</p>

        <div className="flex justify-between mb-6">
          <Button variant={group.isJoined ? "outline" : "default"} className="flex-1 mr-2" onClick={toggleJoin}>
            {group.isJoined ? "Вийти з групи" : "Приєднатися"}
          </Button>
          <Button variant="outline" className="flex-1 ml-2">
            <Share2 className="mr-2 h-4 w-4" />
            Поділитися
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="font-bold">{group.members}</p>
            <p className="text-sm text-muted-foreground">Учасники</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="font-bold">{group.posts}</p>
            <p className="text-sm text-muted-foreground">Дописи</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <Users className="h-5 w-5 mb-1" />
              <p className="text-sm">Переглянути</p>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Останні обговорення</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Створити допис
        </Button>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start mb-3">
                  <Link href={`/users/${post.author.username}`} className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div>
                    <Link href={`/users/${post.author.username}`} className="font-medium hover:underline">
                      {post.author.displayName}
                    </Link>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </div>
                </div>
                <h4 className="font-bold mb-2">{post.title}</h4>
                <p className="mb-3 line-clamp-2">{post.content}</p>
                <Separator className="my-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {post.likes}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.comments}
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
          <p>Немає дописів для відображення</p>
        </div>
      )}
    </div>
  )
}
