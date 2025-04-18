import { Header } from "@/components/header"
import { TwoFactorSuccess } from "@/components/two-factor-success"

export default function TwoFactorSuccessPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <TwoFactorSuccess />
    </main>
  )
}
