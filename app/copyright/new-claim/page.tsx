import { Header } from "@/components/header"
import { NewCopyrightClaimPage } from "@/components/new-copyright-claim-page"

export default function NewCopyrightClaim() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <NewCopyrightClaimPage />
    </main>
  )
}
