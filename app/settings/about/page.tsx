import { Header } from "@/components/header"
import { AboutSettings } from "@/components/about-settings"

export default function AboutSettingsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <AboutSettings />
    </main>
  )
}
