import { Header } from "@/components/header"
import { SessionsSettings } from "@/components/sessions-settings"

export default function SessionsSettingsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <SessionsSettings />
    </main>
  )
}
