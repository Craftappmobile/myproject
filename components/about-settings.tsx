"use client"

import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"

export function AboutSettings() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/settings")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Про додаток</h1>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <span className="text-4xl">🧶</span>
          </div>
          <h2 className="text-xl font-bold">Розрахуй і в'яжи</h2>
          <p className="text-muted-foreground">Версія 1.0.0</p>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Розробник</h3>
            <p className="text-muted-foreground">Knitting App Team</p>
          </div>

          <div>
            <h3 className="font-medium">Контакти</h3>
            <p className="text-muted-foreground">support@knittingapp.com</p>
          </div>

          <div>
            <h3 className="font-medium">Веб-сайт</h3>
            <a
              href="https://knittingapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary flex items-center"
            >
              knittingapp.com
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Button variant="outline" className="w-full" onClick={() => window.open("/privacy", "_blank")}>
            Політика конфіденційності
          </Button>
          <Button variant="outline" className="w-full" onClick={() => window.open("/terms", "_blank")}>
            Умови використання
          </Button>
          <Button variant="outline" className="w-full" onClick={() => window.open("/licenses", "_blank")}>
            Ліцензії відкритого коду
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground pt-4">
          <p>© 2025 Knitting App. Всі права захищено.</p>
        </div>
      </div>
    </div>
  )
}
