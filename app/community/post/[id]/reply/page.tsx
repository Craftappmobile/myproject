import { Header } from "@/components/header"
import { ReplyToPostPage } from "@/components/reply-to-post-page"

export default function ReplyToPost({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <ReplyToPostPage postId={params.id} />
    </main>
  )
}
