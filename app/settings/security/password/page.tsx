import { Header } from "@/components/header"
import { PasswordSettings } from "@/components/password-settings"

export default function PasswordSettingsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <PasswordSettings />
    </main>
  )
}
