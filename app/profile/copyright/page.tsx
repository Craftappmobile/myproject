import { Header } from "@/components/header"
import { CopyrightManagementPage } from "@/components/copyright-management-page"

export default function CopyrightManagement() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <CopyrightManagementPage />
    </main>
  )
}
