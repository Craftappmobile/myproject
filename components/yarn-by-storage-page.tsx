"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

export function YarnByStoragePage() {
  const router = useRouter()

  // Mock data for storage locations and their yarns
  const storageLocations = [
    {
      id: "1",
      name: "Основна шафа, полиця 1",
      yarns: [
        {
          id: "yarn2",
          brand: "Rowan",
          name: "Felted Tweed",
          color: "Seafarer",
          colorCode: "158",
          quantity: 25,
          imageUrl: "/colorful-yarn-skeins.png",
        },
        {
          id: "yarn3",
          brand: "Schachenmayr",
          name: "Catania",
          color: "Джинс",
          colorCode: "164",
          quantity: 10,
          imageUrl: "/colorful-yarn-skeins.png",
        },
      ],
    },
    {
      id: "2",
      name: "Основна шафа, полиця 2",
      yarns: [
        {
          id: "yarn1",
          brand: "Drops",
          name: "Baby Merino",
          color: "Світло-сірий",
          colorCode: "22",
          quantity: 8,
          imageUrl: "/colorful-yarn-skeins.png",
        },
      ],
    },
    {
      id: "3",
      name: "Коробка для проєктів",
      yarns: [
        {
          id: "yarn4",
          brand: "Drops",
          name: "Alpaca",
          color: "Темно-синій",
          colorCode: "5575",
          quantity: 4,
          imageUrl: "/colorful-yarn-skeins.png",
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.push("/yarn-inventory")}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <h1 className="text-2xl font-bold mb-6">Пряжа за місцем зберігання</h1>

      <div className="space-y-4">
        {storageLocations.map((location) => (
          <Accordion key={location.id} type="single" collapsible className="w-full">
            <AccordionItem value={location.id}>
              <Card>
                <CardHeader className="p-0">
                  <AccordionTrigger className="px-6 py-4">
                    <CardTitle className="flex justify-between items-center w-full">
                      <span>{location.name}</span>
                      <span className="text-sm font-normal">{location.yarns.length} типів пряжі</span>
                    </CardTitle>
                  </AccordionTrigger>
                </CardHeader>
                <AccordionContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {location.yarns.map((yarn) => (
                        <div
                          key={`${location.id}-${yarn.id}`}
                          className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                          onClick={() => router.push(`/yarn-inventory/${yarn.id}`)}
                        >
                          <div className="relative w-16 h-16 rounded-md overflow-hidden">
                            <Image
                              src={yarn.imageUrl || "/placeholder.svg"}
                              alt={`${yarn.brand} ${yarn.name} ${yarn.color}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">
                              {yarn.brand} {yarn.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Колір: {yarn.color} {yarn.colorCode}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{yarn.quantity} шт</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  )
}
