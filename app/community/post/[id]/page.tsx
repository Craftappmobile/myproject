import { Header } from "@/components/header"
import { CommunityPostDetail } from "@/components/community-post-detail"

export default function PostDetail({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <CommunityPostDetail postId={params.id} />
    </main>
  )
}
