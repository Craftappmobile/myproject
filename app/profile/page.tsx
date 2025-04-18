import { Header } from "@/components/header"
import { ProfilePage } from "@/components/profile-page"

export default function Profile() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <ProfilePage />
    </main>
  )
}
