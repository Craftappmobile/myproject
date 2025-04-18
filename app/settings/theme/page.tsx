import { Header } from "@/components/header"
import { ThemeSettings } from "@/components/theme-settings"

export default function ThemeSettingsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <ThemeSettings />
    </main>
  )
}
