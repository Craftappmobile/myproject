import { Header } from "@/components/header"
import { TwoFactorAppSetup } from "@/components/two-factor-app-setup"

export default function TwoFactorAppPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <TwoFactorAppSetup />
    </main>
  )
}
