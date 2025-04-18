import { Header } from "@/components/header"
import { YarnByStoragePage } from "@/components/yarn-by-storage-page"

export default function YarnByStorage() {
  return (
    <main className="min-h-screen flex flex-col bg-sage-50">
      <Header />
      <YarnByStoragePage />
    </main>
  )
}
