"use client"

import { useState } from "react"
import { ArrowLeft, Smartphone, Laptop, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Session {
  id: string
  device: "mobile" | "desktop"
  name: string
  location: string
  lastActive: string
  current: boolean
}

export function SessionsSettings() {
  const router = useRouter()
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      device: "mobile",
      name: "iPhone 13",
      location: "Київ, Україна",
      lastActive: "Зараз",
      current: true,
    },
    {
      id: "2",
      device: "desktop",
      name: "Chrome на Windows",
      location: "Львів, Україна",
      lastActive: "2 години тому",
      current: false,
    },
    {
      id: "3",
      device: "mobile",
      name: "Samsung Galaxy S21",
      location: "Одеса, Україна",
      lastActive: "1 день тому",
      current: false,
    },
  ])

  const [sessionToLogout, setSessionToLogout] = useState<Session | null>(null)
  const [showLogoutAllDialog, setShowLogoutAllDialog] = useState(false)

  const handleLogout = (session: Session) => {
    if (session.current) {
      // In a real app, this would log out the current session
      router.push("/login")
    } else {
      setSessionToLogout(session)
    }
  }

  const confirmLogout = () => {
    if (sessionToLogout) {
      // In a real app, this would terminate the session
      setSessions(sessions.filter((s) => s.id !== sessionToLogout.id))
      setSessionToLogout(null)
    }
  }

  const handleLogoutAll = () => {
    setShowLogoutAllDialog(true)
  }

  const confirmLogoutAll = () => {
    // In a real app, this would terminate all sessions except the current one
    setSessions(sessions.filter((s) => s.current))
    setShowLogoutAllDialog(false)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/settings/security")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Активні сесії</h1>
      </div>

      <div className="space-y-6">
        <p className="text-muted-foreground">
          Нижче наведено список пристроїв, на яких ви увійшли в свій обліковий запис. Ви можете вийти з будь-якого
          пристрою, якщо не впізнаєте його.
        </p>

        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">
                      {session.device === "mobile" ? (
                        <Smartphone className="h-6 w-6 text-muted-foreground" />
                      ) : (
                        <Laptop className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {session.name} {session.current && <span className="text-primary">(Поточний пристрій)</span>}
                      </p>
                      <p className="text-sm text-muted-foreground">{session.location}</p>
                      <p className="text-sm text-muted-foreground">Остання активність: {session.lastActive}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleLogout(session)}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Вийти
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sessions.length > 1 && (
          <Button variant="outline" className="w-full" onClick={handleLogoutAll}>
            Вийти з усіх інших пристроїв
          </Button>
        )}

        <AlertDialog open={!!sessionToLogout} onOpenChange={() => setSessionToLogout(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Вийти з пристрою</AlertDialogTitle>
              <AlertDialogDescription>
                Ви впевнені, що хочете вийти з пристрою "{sessionToLogout?.name}"? Для повторного входу потрібно буде
                ввести логін та пароль.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Скасувати</AlertDialogCancel>
              <AlertDialogAction onClick={confirmLogout}>Вийти</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showLogoutAllDialog} onOpenChange={setShowLogoutAllDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Вийти з усіх інших пристроїв</AlertDialogTitle>
              <AlertDialogDescription>
                Ви впевнені, що хочете вийти з усіх інших пристроїв? Для повторного входу на них потрібно буде ввести
                логін та пароль.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Скасувати</AlertDialogCancel>
              <AlertDialogAction onClick={confirmLogoutAll}>Вийти з усіх</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
