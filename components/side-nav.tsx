"use client"

import type React from "react"

import { X, User, BookOpen, Users, ImageIcon, Settings, Home, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface SideNavProps {
  open: boolean
  onClose: () => void
}

export function SideNav({ open, onClose }: SideNavProps) {
  const router = useRouter()
  const [yarnInventoryOpen, setYarnInventoryOpen] = useState(false)

  const menuItems = [
    { icon: <Home className="mr-2 h-5 w-5" />, label: "На головну", onClick: () => router.push("/") },
    { icon: <User className="mr-2 h-5 w-5" />, label: "Профіль", onClick: () => router.push("/profile") },
    { icon: <BookOpen className="mr-2 h-5 w-5" />, label: "Мої проєкти", onClick: () => router.push("/projects") },
  ]

  const afterYarnItems = [
    { icon: <Users className="mr-2 h-5 w-5" />, label: "Спільнота", onClick: () => router.push("/community") },
    { icon: <ImageIcon className="mr-2 h-5 w-5" />, label: "Галерея", onClick: () => router.push("/gallery") },
    { icon: <Settings className="mr-2 h-5 w-5" />, label: "Налаштування", onClick: () => router.push("/settings") },
  ]

  const yarnSubItems = [
    { label: "Весь склад", onClick: () => router.push("/yarn-inventory") },
    { label: "За проєктами", onClick: () => router.push("/yarn-inventory/by-project") },
    { label: "За зберіганням", onClick: () => router.push("/yarn-inventory/by-storage") },
    { label: "Швидке додавання", onClick: () => router.push("/yarn-inventory/quick-add") },
  ]

  const toggleYarnInventory = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setYarnInventoryOpen(!yarnInventoryOpen)
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader className="flex justify-end">
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Закрити">
            <X className="h-5 w-5" />
          </Button>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-lg"
              onClick={() => {
                if (item.onClick) {
                  item.onClick()
                  onClose()
                }
              }}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}

          {/* Yarn Inventory with manual dropdown */}
          <div className="w-full">
            <Button variant="ghost" className="w-full justify-start text-lg" onClick={toggleYarnInventory}>
              <Package className="mr-2 h-5 w-5" />
              <span>Склад пряжі</span>
              {yarnInventoryOpen ? (
                <ChevronDown className="ml-auto h-5 w-5" />
              ) : (
                <ChevronRight className="ml-auto h-5 w-5" />
              )}
            </Button>

            {yarnInventoryOpen && (
              <div className="pl-9 space-y-2 mt-2">
                {yarnSubItems.map((subItem, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-base"
                    onClick={() => {
                      if (subItem.onClick) {
                        subItem.onClick()
                        onClose()
                      }
                    }}
                  >
                    {subItem.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {afterYarnItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-lg"
              onClick={() => {
                if (item.onClick) {
                  item.onClick()
                  onClose()
                }
              }}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
