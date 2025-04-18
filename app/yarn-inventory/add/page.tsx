import { Header } from "@/components/header"
import { AddYarnPage } from "@/components/add-yarn-page"

export default function AddYarn() {
  return (
    <main className="min-h-screen flex flex-col bg-sage-50">
      <Header />
      <AddYarnPage />
    </main>
  )
}
