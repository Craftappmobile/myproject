"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Heart, MessageSquare, Eye, Clock, Bookmark, Share2, Flag } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

interface Author {
  name: string
  username: string
  avatar: string
}

interface PostDetails {
  yarn?: string
  needles?: string
}

interface CommunityPost {
  id: string
  author: Author
  title: string
  description: string
  image: string
  details: PostDetails
  question?: string
  likes: number
  comments: number
  views: number
  timeAgo: string
  tags: string[]
  originalityStatus?: "original" | "translation" | "repost"
}

interface CommunityPostCardProps {
  post: CommunityPost
}

export function CommunityPostCard({ post }: CommunityPostCardProps) {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportReason, setReportReason] = useState("copyright")
  const [reportDetails, setReportDetails] = useState("")
  const [originalUrl, setOriginalUrl] = useState("")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [postUrl, setPostUrl] = useState("")

  // Set the post URL once the component mounts
  useEffect(() => {
    setPostUrl(`${window.location.origin}/community/post/${post.id}`)
  }, [post.id])

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSaved(!saved)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    // Always show the dialog for now to ensure it works
    setShareDialogOpen(true)

    // Uncomment this if you want to try the Web Share API
    /*
    // Check if Web Share API is available
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.description,
          url: postUrl,
        })
        .catch((error) => {
          console.log("Помилка поширення:", error)
          setShareDialogOpen(true)
        })
    } else {
      // Fallback for browsers that don't support Web Share API
      setShareDialogOpen(true)
    }
    */
  }

  const handleReply = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/community/post/${post.id}/reply`)
  }

  const handleCardClick = () => {
    router.push(`/community/post/${post.id}`)
  }

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/users/${post.author.username}`)
  }

  const handleReport = (e: React.MouseEvent) => {
    e.stopPropagation()
    setReportDialogOpen(true)
  }

  const submitReport = () => {
    // In a real app, this would submit the report to the server
    console.log("Report submitted:", {
      postId: post.id,
      reason: reportReason,
      details: reportDetails,
      originalUrl: originalUrl || undefined,
    })
    setReportDialogOpen(false)
    // Show success message or notification
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Посилання скопійовано",
      description: "Посилання на публікацію скопійовано в буфер обміну",
    })
    setShareDialogOpen(false)
  }

  // Get badge text based on originality status
  const getOriginalityBadge = () => {
    switch (post.originalityStatus) {
      case "original":
        return "Авторська робота"
      case "translation":
        return "Переклад/адаптація"
      case "repost":
        return "Репост із дозволом"
      default:
        return null
    }
  }

  const originalityBadge = getOriginalityBadge()

  return (
    <>
      <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={handleCardClick}>
        <CardContent className="p-0">
          <div className="p-4">
            <div className="flex items-center mb-3" onClick={handleAuthorClick}>
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">@{post.author.username}</p>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-2">{post.title}</h3>
            <p className="text-sm mb-3 line-clamp-3">{post.description}</p>

            <div className="relative aspect-video mb-3 bg-muted rounded-md overflow-hidden">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              {originalityBadge && <Badge className="absolute top-2 right-2 bg-primary/80">{originalityBadge}</Badge>}
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="space-y-1 text-sm mb-3">
              {post.details.yarn && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Пряжа:</span>
                  <span>{post.details.yarn}</span>
                </div>
              )}
              {post.details.needles && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Спиці:</span>
                  <span>{post.details.needles}</span>
                </div>
              )}
            </div>

            {post.question && (
              <div className="bg-muted/50 p-3 rounded-md mb-3">
                <p className="font-medium text-sm">Запитання:</p>
                <p className="text-sm">{post.question}</p>
                <Button variant="link" size="sm" className="p-0 h-auto mt-1" onClick={handleReply}>
                  Відповісти
                </Button>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between p-3 bg-muted/30 text-sm">
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="h-8 px-2" onClick={handleLike}>
              <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-destructive text-destructive" : ""}`} />
              <span>{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{post.comments}</span>
            </Button>
            <div className="flex items-center text-muted-foreground">
              <Eye className="h-4 w-4 mr-1" />
              <span>{post.views}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.timeAgo}</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSave}>
              <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleReport}>
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Поскаржитись на публікацію</DialogTitle>
            <DialogDescription>
              Повідомте нам про порушення авторських прав або інші проблеми з цією публікацією
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <RadioGroup value={reportReason} onValueChange={setReportReason}>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="copyright" id="copyright" className="mt-1" />
                <div>
                  <Label htmlFor="copyright" className="font-medium">
                    Я автор цього фото чи схеми, і воно вкрадено
                  </Label>
                  <p className="text-sm text-muted-foreground">Використання моєї роботи без дозволу</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="not-mine" id="not-mine" className="mt-1" />
                <div>
                  <Label htmlFor="not-mine" className="font-medium">
                    Чужа робота, не хочу, щоб тут була
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Публікація містить роботу, яка не належить користувачу
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="other" id="other" className="mt-1" />
                <div>
                  <Label htmlFor="other" className="font-medium">
                    Інша причина
                  </Label>
                  <p className="text-sm text-muted-foreground">Спам, образливий вміст, тощо</p>
                </div>
              </div>
            </RadioGroup>

            {reportReason === "copyright" && (
              <div className="space-y-2">
                <Label htmlFor="original-url">Посилання на оригінал (якщо є):</Label>
                <Input
                  id="original-url"
                  placeholder="https://..."
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="report-details">Деталі скарги:</Label>
              <Textarea
                id="report-details"
                placeholder="Опишіть проблему детальніше..."
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
              Скасувати
            </Button>
            <Button onClick={submitReport} disabled={!reportDetails.trim()}>
              Надіслати скаргу
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Поширити публікацію</DialogTitle>
            <DialogDescription>Оберіть спосіб поширення цієї публікації</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-4">
            <Button
              variant="outline"
              className="flex flex-col items-center p-3 h-auto"
              onClick={() => {
                window.open(
                  `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`,
                  "_blank",
                )
                setShareDialogOpen(false)
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              <span className="text-xs">Telegram</span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col items-center p-3 h-auto"
              onClick={() => {
                window.open(`viber://forward?text=${encodeURIComponent(post.title + " " + postUrl)}`, "_blank")
                setShareDialogOpen(false)
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2"
              >
                <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                <path d="m2 22 3.64-3.64A9 9 0 0 1 2 13" />
                <circle cx="8.5" cy="14.5" r=".5" />
                <circle cx="12.5" cy="14.5" r=".5" />
                <circle cx="16.5" cy="14.5" r=".5" />
              </svg>
              <span className="text-xs">Viber</span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col items-center p-3 h-auto"
              onClick={() => {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, "_blank")
                setShareDialogOpen(false)
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="text-xs">Facebook</span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col items-center p-3 h-auto"
              onClick={() => copyToClipboard(postUrl)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span className="text-xs">Копіювати</span>
            </Button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Закрити
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
