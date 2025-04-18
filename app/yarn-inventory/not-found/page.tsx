import { Header } from "@/components/header"
import { YarnNotFound } from "@/components/yarn-not-found"

export default function YarnNotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col bg-sage-50">
      <Header />
      <YarnNotFound />
    </main>
  )
}
