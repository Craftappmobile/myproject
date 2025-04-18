import { Header } from "@/components/header"
import { SecuritySettings } from "@/components/security-settings"

export default function SecuritySettingsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <SecuritySettings />
    </main>
  )
}
