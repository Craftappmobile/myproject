"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ReplyToPostPage({ postId }: { postId: string }) {
  const router = useRouter()
  const [reply, setReply] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock post data based on ID
  const post = {
    id: postId,
    title: "Светр 'Осінні барви'",
    question: "Як краще блокувати виріб?",
  }

  const handleSubmit = () => {
    if (!reply.trim()) return

    setIsSubmitting(true)
    // In a real app, this would submit the reply to the server
    setTimeout(() => {
      router.push(`/community/post/${postId}`)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push(`/community/post/${postId}`)} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Відповідь</h1>
      </div>

      <div className="space-y-6">
        <div className="p-4 border rounded-md bg-muted/30">
          <p className="font-medium mb-2">До проєкту: {post.title}</p>
          {post.question && (
            <div className="bg-primary/5 p-3 rounded-md border border-primary/20">
              <p className="text-sm font-medium">Запитання:</p>
              <p className="text-sm">{post.question}</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="reply" className="font-medium">
            Ваш коментар:
          </label>
          <Textarea
            id="reply"
            placeholder="Напишіть вашу відповідь..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={6}
          />
        </div>

        <Button className="w-full" onClick={handleSubmit} disabled={!reply.trim() || isSubmitting}>
          {isSubmitting ? "Надсилання..." : "Надіслати"}
        </Button>
      </div>
    </div>
  )
}
