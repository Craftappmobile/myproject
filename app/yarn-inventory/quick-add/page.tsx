import { Header } from "@/components/header"
import { QuickAddYarnPage } from "@/components/quick-add-yarn-page"

export default function QuickAddYarn() {
  return (
    <main className="min-h-screen flex flex-col bg-sage-50">
      <Header />
      <QuickAddYarnPage />
    </main>
  )
}
