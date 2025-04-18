import { Header } from "@/components/header"
import { YarnDetailPage } from "@/components/yarn-detail-page"

export default function YarnDetail({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen flex flex-col bg-sage-50">
      <Header />
      <YarnDetailPage id={params.id} />
    </main>
  )
}
