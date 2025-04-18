import { Header } from "@/components/header"
import { TwoFactorEmailSetup } from "@/components/two-factor-email-setup"

export default function TwoFactorEmailPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <TwoFactorEmailSetup />
    </main>
  )
}
