import { Header } from "@/components/header"
import { SavedProjectsPage } from "@/components/saved-projects-page"

export default function SavedProjects() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <SavedProjectsPage />
    </main>
  )
}
