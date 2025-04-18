"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Home } from "lucide-react"

export default function CalculatorsPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-sage-800">Калькулятори</h1>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-sage-700 border-sage-300 hover:bg-sage-50"
          asChild
        >
          <Link href="/">
            <Home className="h-4 w-4" />
            На головну
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-sage-50 rounded-t-md">
            <CardTitle className="text-sage-800">Висота круглої кокетки</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sage-600 mb-4">Розрахунок висоти круглої кокетки для светрів та кардиганів</p>
            <Button asChild className="w-full bg-moss-400 hover:bg-moss-500">
              <Link href="/calculators/round-yoke-height">Відкрити</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-sage-50 rounded-t-md">
            <CardTitle className="text-sage-800">Прибавки/убавки рукава</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sage-600 mb-4">Розрахунок прибавок або убавок для рукавів</p>
            <Button asChild className="w-full bg-moss-400 hover:bg-moss-500">
              <Link href="/calculators/sleeve-decreases-increases">Відкрити</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-sage-50 rounded-t-md">
            <CardTitle className="text-sage-800">V-подібна горловина</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sage-600 mb-4">Розрахунок убавок для V-подібної горловини</p>
            <Button asChild className="w-full bg-moss-400 hover:bg-moss-500">
              <Link href="/calculators/v-neckline-decreases">Відкрити</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-sage-50 rounded-t-md">
            <CardTitle className="text-sage-800">Шапка</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sage-600 mb-4">Розрахунок параметрів для в'язання шапки</p>
            <Button asChild className="w-full bg-moss-400 hover:bg-moss-500">
              <Link href="/calculators/hat">Відкрити</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-sage-50 rounded-t-md">
            <CardTitle className="text-sage-800">Витрата пряжі</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sage-600 mb-4">Розрахунок необхідної кількості пряжі для виробу</p>
            <Button asChild className="w-full bg-moss-400 hover:bg-moss-500">
              <Link href="/calculators/yarn-consumption">Відкрити</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
