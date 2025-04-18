import { Header } from "@/components/header"
import { ValidateWorkPage } from "@/components/validate-work-page"

export default function ValidateWork() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <ValidateWorkPage />
    </main>
  )
}
