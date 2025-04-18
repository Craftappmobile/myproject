import { Header } from "@/components/header"
import { YarnByProjectPage } from "@/components/yarn-by-project-page"

export default function YarnByProject() {
  return (
    <main className="min-h-screen flex flex-col bg-sage-50">
      <Header />
      <YarnByProjectPage />
    </main>
  )
}
