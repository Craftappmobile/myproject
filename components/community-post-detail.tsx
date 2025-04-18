"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, MessageSquare, Eye, Bookmark, Share2, MoreVertical, Send, Home, Flag } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

interface Comment {
  id: string
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  timeAgo: string
}

export function CommunityPostDetail({ postId }: { postId: string }) {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(24)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: {
        name: "Наталія В.",
        username: "natalia_v",
        avatar: "/cozy-knitter.png",
      },
      content: "Дуже гарний светр! Мені подобається поєднання кольорів.",
      timeAgo: "1 год. тому",
    },
    {
      id: "2",
      author: {
        name: "Ірина К.",
        username: "irina_k",
        avatar: "/thoughtful-reader.png",
      },
      content:
        "Для блокування светра з вовни найкраще використовувати спеціальні блокувальні мати і шпильки. Змочіть виріб у теплій воді з кондиціонером для вовни, обережно віджміть і розкладіть на маті, закріпивши шпильками потрібну форму.",
      timeAgo: "2 год. тому",
    },
  ])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportReason, setReportReason] = useState("copyright")
  const [reportDetails, setReportDetails] = useState("")
  const [originalUrl, setOriginalUrl] = useState("")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [postUrl, setPostUrl] = useState("")

  // Set the post URL once the component mounts
  useEffect(() => {
    setPostUrl(`${window.location.origin}/community/post/${postId}`)
  }, [postId])

  // Mock post data based on ID
  const post = {
    id: postId,
    author: {
      name: "Олена К.",
      username: "olena_k",
      avatar: "/diverse-group-city.png",
    },
    title: "Светр 'Осінні барви'",
    description:
      "Нарешті закінчила свій перший светр з косами! Дуже задоволена результатом. Пряжа вийшла дуже м'якою і приємною на дотик. Використала техніку в'язання кіс, яку вивчила на майстер-класі минулого місяця. Процес зайняв близько трьох тижнів, але результат того вартий.",
    images: ["/cozy-knit-scarf.png", "/cozy-knit-basket.png"],
    details: {
      yarn: "Merino Wool",
      needles: "4.5 мм",
      gauge: "22 петлі на 10 см",
      size: "M (44-46)",
    },
    question: "Як краще блокувати виріб?",
    likes: 24,
    comments: comments.length,
    views: 58,
    timeAgo: "5 днів тому",
    tags: ["светр", "осінь", "вовна", "коси"],
    originalityStatus: "original" as const,
  }

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleSave = () => {
    setSaved(!saved)
  }

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: (comments.length + 1).toString(),
      author: {
        name: "Ви",
        username: "your_username",
        avatar: "/diverse-group-city.png",
      },
      content: newComment,
      timeAgo: "щойно",
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const handleDeletePost = () => {
    // In a real app, this would delete the post
    setDeleteDialogOpen(false)
    router.push("/community")
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

  const handleShare = (e: React.MouseEvent) => {
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
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/community")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
          <Home className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">{post.title}</h1>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>@{post.author.username}</span>
                <span className="mx-1">•</span>
                <span>{post.timeAgo}</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/community/post/${post.id}/edit`)}>
                Редагувати
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setReportDialogOpen(true)}>
                <Flag className="h-4 w-4 mr-2" />
                Поскаржитися на порушення
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Видалити
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-base">{post.description}</p>

        <div className="grid grid-cols-1 gap-4">
          {post.images.map((image, index) => (
            <div key={index} className="relative aspect-video bg-muted rounded-md overflow-hidden">
              <img
                src={image || "/placeholder.svg"}
                alt={`${post.title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === 0 && originalityBadge && (
                <Badge className="absolute top-2 right-2 bg-primary/80">{originalityBadge}</Badge>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="bg-muted/30 p-4 rounded-md space-y-2">
          <h3 className="font-medium">Деталі проєкту:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(post.details).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground capitalize">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {post.question && (
          <div className="bg-primary/5 p-4 rounded-md space-y-2 border border-primary/20">
            <div className="flex items-center">
              <Badge variant="outline" className="mr-2">
                Запитання
              </Badge>
              <h3 className="font-medium">{post.question}</h3>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center py-2">
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="h-8 px-2" onClick={handleLike}>
              <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-destructive text-destructive" : ""}`} />
              <span>{likeCount}</span>
            </Button>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{comments.length}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Eye className="h-4 w-4 mr-1" />
              <span>{post.views}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSave}>
              <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setReportDialogOpen(true)}>
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Коментарі ({comments.length})</h3>

          {comments.map((comment) => (
            <div key={comment.id} className="space-y-2">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{comment.author.name}</p>
                  <p className="text-xs text-muted-foreground">{comment.timeAgo}</p>
                </div>
              </div>
              <p className="text-sm pl-10">{comment.content}</p>
            </div>
          ))}

          <div className="flex items-end gap-2 pt-4">
            <Textarea
              placeholder="Напишіть коментар..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 min-h-[80px]"
            />
            <Button size="icon" onClick={handleSubmitComment} disabled={!newComment.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Видалити цю публікацію?</AlertDialogTitle>
            <AlertDialogDescription>Цю дію не можна скасувати.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Відмінити</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost} className="bg-destructive text-destructive-foreground">
              Видалити
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
    </div>
  )
}
