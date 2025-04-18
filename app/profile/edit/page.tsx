import { Header } from "@/components/header"
import { EditProfilePage } from "@/components/edit-profile-page"

export default function EditProfile() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <EditProfilePage />
    </main>
  )
}
