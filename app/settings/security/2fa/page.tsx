import { Header } from "@/components/header"
import { TwoFactorAuthSettings } from "@/components/two-factor-auth-settings"

export default function TwoFactorAuthPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <TwoFactorAuthSettings />
    </main>
  )
}
