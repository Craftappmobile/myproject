import { Header } from "@/components/header"
import { LanguageSettings } from "@/components/language-settings"

export default function LanguageSettingsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <LanguageSettings />
    </main>
  )
}
