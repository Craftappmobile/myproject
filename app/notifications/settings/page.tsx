import { Header } from "@/components/header"
import { NotificationSettingsPage } from "@/components/notification-settings-page"

export default function NotificationSettings() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <NotificationSettingsPage />
    </main>
  )
}
