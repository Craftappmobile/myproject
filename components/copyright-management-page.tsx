"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, Shield, AlertTriangle, CheckCircle, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CopyrightClaim {
  id: string
  postId: string
  postTitle: string
  dateSubmitted: string
  status: "pending" | "approved" | "rejected"
  reason: string
  originalUrl?: string
  response?: string
}

export function CopyrightManagementPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("claims")
  const [selectedClaim, setSelectedClaim] = useState<CopyrightClaim | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  // Mock data for copyright claims
  const [claims, setClaims] = useState<CopyrightClaim[]>([
    {
      id: "1",
      postId: "post123",
      postTitle: "Схема візерунку 'Зимова казка'",
      dateSubmitted: "15 квітня 2025",
      status: "pending",
      reason: "Я автор цієї схеми, вона опублікована без мого дозволу",
      originalUrl: "https://myknittingblog.com/winter-pattern",
    },
    {
      id: "2",
      postId: "post456",
      postTitle: "Фото светра з косами",
      dateSubmitted: "10 квітня 2025",
      status: "approved",
      reason: "Моя робота використана без дозволу",
      response: "Публікацію видалено. Дякуємо за звернення.",
    },
    {
      id: "3",
      postId: "post789",
      postTitle: "Майстер-клас з в'язання шапки",
      dateSubmitted: "5 квітня 2025",
      status: "rejected",
      reason: "Ця робота порушує мої авторські права",
      response:
        "Після перевірки ми не знайшли доказів порушення авторських прав. Користувач надав підтвердження авторства.",
    },
  ])

  // Mock data for validated works
  const validatedWorks = [
    {
      id: "1",
      title: "Схема светра 'Осінній листопад'",
      dateAdded: "20 березня 2025",
      type: "pattern",
    },
    {
      id: "2",
      title: "Колекція шапок 'Зимовий настрій'",
      dateAdded: "15 лютого 2025",
      type: "collection",
    },
  ]

  const handleViewDetails = (claim: CopyrightClaim) => {
    setSelectedClaim(claim)
    setDetailsOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center">
            <Clock className="h-3 w-3 mr-1" /> Розглядається
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="default" className="bg-green-600 flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" /> Підтверджено
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive" className="flex items-center">
            <X className="h-3 w-3 mr-1" /> Відхилено
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/profile")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
          <Home className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Управління авторськими правами</h1>
      </div>

      <div className="flex items-center mb-6 bg-primary/10 p-4 rounded-md">
        <Shield className="h-10 w-10 text-primary mr-4" />
        <div>
          <h2 className="font-medium">Захист ваших авторських прав</h2>
          <p className="text-sm text-muted-foreground">
            Керуйте своїми авторськими роботами, відстежуйте скарги та підтверджуйте авторство
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="claims">Мої скарги</TabsTrigger>
          <TabsTrigger value="works">Підтверджені роботи</TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "claims" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Скарги на порушення авторських прав</h2>
            <Button variant="outline" size="sm" onClick={() => router.push("/copyright/new-claim")}>
              Нова скарга
            </Button>
          </div>

          {claims.length > 0 ? (
            <div className="space-y-4">
              {claims.map((claim) => (
                <Card
                  key={claim.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleViewDetails(claim)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{claim.postTitle}</h3>
                        <p className="text-sm text-muted-foreground">Подано: {claim.dateSubmitted}</p>
                        <p className="text-sm mt-1 line-clamp-1">{claim.reason}</p>
                      </div>
                      <div>{getStatusBadge(claim.status)}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">У вас немає активних скарг</p>
              <p className="text-muted-foreground mb-6">
                Якщо ви виявили порушення ваших авторських прав, ви можете подати скаргу
              </p>
              <Button onClick={() => router.push("/copyright/new-claim")}>Подати скаргу</Button>
            </div>
          )}
        </div>
      )}

      {activeTab === "works" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Підтверджені авторські роботи</h2>
            <Button variant="outline" size="sm" onClick={() => router.push("/copyright/validate-work")}>
              Додати роботу
            </Button>
          </div>

          {validatedWorks.length > 0 ? (
            <div className="space-y-4">
              {validatedWorks.map((work) => (
                <Card key={work.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{work.title}</h3>
                        <p className="text-sm text-muted-foreground">Додано: {work.dateAdded}</p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {work.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">У вас немає підтверджених робіт</p>
              <p className="text-muted-foreground mb-6">
                Додайте свої роботи для легкого підтвердження авторства у випадку суперечок
              </p>
              <Button onClick={() => router.push("/copyright/validate-work")}>Додати роботу</Button>
            </div>
          )}
        </div>
      )}

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Деталі скарги</DialogTitle>
            <DialogDescription>Інформація про вашу скаргу на порушення авторських прав</DialogDescription>
          </DialogHeader>

          {selectedClaim && (
            <div className="space-y-4 py-2">
              <div>
                <h3 className="font-medium">Публікація:</h3>
                <p>{selectedClaim.postTitle}</p>
              </div>

              <div>
                <h3 className="font-medium">Дата подання:</h3>
                <p>{selectedClaim.dateSubmitted}</p>
              </div>

              <div>
                <h3 className="font-medium">Статус:</h3>
                <div className="mt-1">{getStatusBadge(selectedClaim.status)}</div>
              </div>

              <div>
                <h3 className="font-medium">Причина скарги:</h3>
                <p>{selectedClaim.reason}</p>
              </div>

              {selectedClaim.originalUrl && (
                <div>
                  <h3 className="font-medium">Посилання на оригінал:</h3>
                  <a
                    href={selectedClaim.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    {selectedClaim.originalUrl}
                  </a>
                </div>
              )}

              {selectedClaim.response && (
                <div>
                  <Separator className="my-2" />
                  <h3 className="font-medium">Відповідь модератора:</h3>
                  <p className="text-sm mt-1">{selectedClaim.response}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setDetailsOpen(false)}>Закрити</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
