import { Header } from "@/components/header"
import { GalleryPage } from "@/components/gallery-page"

export default function Gallery() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <GalleryPage />
    </main>
  )
}
