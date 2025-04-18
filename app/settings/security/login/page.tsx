import { Header } from "@/components/header"
import { LoginSettings } from "@/components/login-settings"

export default function LoginSettingsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <LoginSettings />
    </main>
  )
}
