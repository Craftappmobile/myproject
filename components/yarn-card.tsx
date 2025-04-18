"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface YarnCardProps {
  yarn: {
    id: string
    brand: string
    name: string
    color: string
    colorCode: string
    weight: number
    length: number
    quantity: number
    composition: string
    image?: string
  }
  onClick?: () => void
}

export function YarnCard({ yarn, onClick }: YarnCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer w-full" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {yarn.image && (
            <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              <Image
                src={yarn.image || "/placeholder.svg"}
                alt={`${yarn.brand} ${yarn.name}`}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          )}
          {!yarn.image && (
            <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              <span className="text-xl">🧶</span>
            </div>
          )}
          <div className="flex-grow">
            <h3 className="font-medium">
              {yarn.brand} {yarn.name}
            </h3>
            <p className="text-sm text-gray-600">
              Колір: {yarn.color} {yarn.colorCode && `${yarn.colorCode}`}
            </p>
            <p className="text-sm text-gray-600">
              {yarn.weight}г • {yarn.length}м • {yarn.quantity} шт
            </p>
            <p className="text-sm text-gray-600 truncate">Склад: {yarn.composition}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
