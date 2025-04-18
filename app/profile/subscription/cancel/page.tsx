import { Header } from "@/components/header"
import { CancelSubscriptionPage } from "@/components/cancel-subscription-page"

export default function CancelSubscription() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <CancelSubscriptionPage />
    </main>
  )
}
