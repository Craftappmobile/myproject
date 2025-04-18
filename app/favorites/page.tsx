import { Header } from "@/components/header"
import { FavoritesPage } from "@/components/favorites-page"

export default function Favorites() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <FavoritesPage />
    </main>
  )
}
