import { Header } from "@/components/header"
import { AddPhotoPage } from "@/components/add-photo-page"

export default function AddPhoto() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <AddPhotoPage />
    </main>
  )
}
