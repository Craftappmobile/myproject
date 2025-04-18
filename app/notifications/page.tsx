import { Header } from "@/components/header"
import { NotificationsPage } from "@/components/notifications-page"

export default function Notifications() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <NotificationsPage />
    </main>
  )
}
