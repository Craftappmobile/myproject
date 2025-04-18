import { Header } from "@/components/header"
import { CalculatorCategory } from "@/components/calculator-category"
import { categories } from "@/lib/data"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-sage-50">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-6 max-w-3xl">
        <h1 className="text-2xl font-medium text-center mb-6 text-sage-900">Розрахуй і в&apos;яжи, петля в петлю!</h1>
        <div className="space-y-4">
          {categories.map((category) => (
            <CalculatorCategory key={category.id} category={category} />
          ))}
        </div>
      </div>
    </main>
  )
}
