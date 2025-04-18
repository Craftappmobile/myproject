import { Header } from "@/components/header"
import { NotificationCategoryPage } from "@/components/notification-category-page"

export default function NotificationCategory({ params }: { params: { category: string } }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <NotificationCategoryPage category={params.category} />
    </main>
  )
}
