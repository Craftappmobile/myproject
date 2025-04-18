import { Header } from "@/components/header"
import { TwoFactorSmsSetup } from "@/components/two-factor-sms-setup"

export default function TwoFactorSmsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <TwoFactorSmsSetup />
    </main>
  )
}
