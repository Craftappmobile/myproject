"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function OfflineSupport() {
  const [isOnline, setIsOnline] = useState(true)
  const [isInstalled, setIsInstalled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Listen for beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Show install prompt dialog
      setShowInstallPrompt(true)
    })

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null)
    setShowInstallPrompt(false)

    if (outcome === "accepted") {
      setIsInstalled(true)
    }
  }

  return (
    <>
      {!isOnline && (
        <div className="fixed bottom-0 left-0 right-0 bg-destructive text-destructive-foreground p-2 text-center">
          Ви зараз офлайн. Деякі функції можуть бути недоступні.
        </div>
      )}

      <Dialog open={showInstallPrompt} onOpenChange={setShowInstallPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Встановити додаток</DialogTitle>
            <DialogDescription>
              Встановіть "Розрахуй і в'яжи" на свій пристрій для швидкого доступу та роботи офлайн.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInstallPrompt(false)}>
              Пізніше
            </Button>
            <Button onClick={handleInstall}>Встановити</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
