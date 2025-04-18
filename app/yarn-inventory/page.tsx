import { Header } from "@/components/header"
import { YarnInventoryPage } from "@/components/yarn-inventory-page"

export default function YarnInventory() {
  return (
    <main className="min-h-screen flex flex-col bg-sage-50">
      <Header />
      <YarnInventoryPage />
    </main>
  )
}
