"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Plus, Filter, Search } from "lucide-react"
import { YarnCard } from "@/components/yarn-card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function YarnInventoryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("brand")

  // Mock data for yarn inventory
  const yarns = [
    {
      id: "1",
      brand: "Drops",
      name: "Baby Merino",
      color: "Світло-сірий",
      colorCode: "22",
      weight: "50г",
      length: "175м",
      quantity: 8,
      composition: "100% Мериносова вовна",
      imageUrl: "/colorful-yarn-skeins.png",
    },
    {
      id: "2",
      brand: "Rowan",
      name: "Felted Tweed",
      color: "Seafarer",
      colorCode: "158",
      weight: "50г",
      length: "175м",
      quantity: 25,
      composition: "50% Вовна, 25% Альпака, 25% Віскоза",
      imageUrl: "/colorful-yarn-skeins.png",
    },
    {
      id: "3",
      brand: "Schachenmayr",
      name: "Catania",
      color: "Джинс",
      colorCode: "164",
      weight: "50г",
      length: "125м",
      quantity: 10,
      composition: "100% Бавовна",
      imageUrl: "/colorful-yarn-skeins.png",
    },
  ]

  // Filter yarns based on search query
  const filteredYarns = yarns.filter((yarn) => {
    const searchString = `${yarn.brand} ${yarn.name} ${yarn.color} ${yarn.colorCode} ${yarn.composition}`.toLowerCase()
    return searchString.includes(searchQuery.toLowerCase())
  })

  // Sort yarns based on sort criteria
  const sortedYarns = [...filteredYarns].sort((a, b) => {
    if (sortBy === "brand") {
      return a.brand.localeCompare(b.brand)
    } else if (sortBy === "color") {
      return a.color.localeCompare(b.color)
    } else if (sortBy === "quantity") {
      return b.quantity - a.quantity
    }
    return 0
  })

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.back()}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">Склад пряжі</h1>

        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Фільтр
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("brand")}>За брендом</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("color")}>За кольором</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("quantity")}>За кількістю</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={() => router.push("/yarn-inventory/add")}>
            <Plus className="mr-2 h-4 w-4" />
            Додати
          </Button>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Пошук пряжі..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {sortedYarns.length > 0 ? (
          sortedYarns.map((yarn) => (
            <YarnCard key={yarn.id} yarn={yarn} onClick={() => router.push(`/yarn-inventory/${yarn.id}`)} />
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-500 mb-4">Пряжу не знайдено</p>
              <Button onClick={() => setSearchQuery("")}>Очистити пошук</Button>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">Всього: {sortedYarns.length} записи</div>
    </div>
  )
}
