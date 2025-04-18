import { Header } from "@/components/header"
import { PublishProjectPage } from "@/components/publish-project-page"

export default function PublishProject() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <PublishProjectPage />
    </main>
  )
}
