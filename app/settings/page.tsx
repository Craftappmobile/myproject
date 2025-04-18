import { Header } from "@/components/header"
import { SettingsPage } from "@/components/settings-page"

export default function Settings() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <SettingsPage />
    </main>
  )
}
