"use client"

import { useState } from "react"
import { Menu, Search, Star, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SideNav } from "@/components/side-nav"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const router = useRouter()
  const [notificationCount, setNotificationCount] = useState(10) // Example notification count

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-sage-100/95 backdrop-blur supports-[backdrop-filter]:bg-sage-100/60">
      <div className="container flex h-14 items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setSideNavOpen(true)} aria-label="Меню">
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center justify-center">
          <span className="text-xl font-bold"></span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Пошук">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Обране" onClick={() => router.push("/favorites")}>
            <Star className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Сповіщення" onClick={() => router.push("/notifications")}>
            <div className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  variant="destructive"
                >
                  {notificationCount > 9 ? "9+" : notificationCount}
                </Badge>
              )}
            </div>
          </Button>
        </div>

        <SideNav open={sideNavOpen} onClose={() => setSideNavOpen(false)} />
      </div>
    </header>
  )
}
