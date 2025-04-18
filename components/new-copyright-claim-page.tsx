"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, Upload, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

export function NewCopyrightClaimPage() {
  const router = useRouter()
  const [postUrl, setPostUrl] = useState("")
  const [claimType, setClaimType] = useState("my-work")
  const [originalUrl, setOriginalUrl] = useState("")
  const [description, setDescription] = useState("")
  const [evidence, setEvidence] = useState<File | null>(null)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeToTerms) return

    setSubmitting(true)

    // In a real app, this would submit the claim to the server
    setTimeout(() => {
      router.push("/profile/copyright?success=true")
    }, 1500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvidence(e.target.files[0])
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/profile/copyright")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
          <Home className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Нова скарга на порушення авторських прав</h1>
      </div>

      <Alert className="mb-6 bg-primary/10 border-primary/20">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Будь ласка, надайте точну інформацію про порушення ваших авторських прав. Неправдиві скарги можуть призвести
          до обмеження доступу до функцій платформи.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="post-url">Посилання на публікацію, що порушує права:</Label>
          <Input
            id="post-url"
            placeholder="https://..."
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Тип скарги:</Label>
          <RadioGroup value={claimType} onValueChange={setClaimType}>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="my-work" id="my-work" className="mt-1" />
              <div>
                <Label htmlFor="my-work" className="font-medium">
                  Це моя робота, опублікована без мого дозволу
                </Label>
                <p className="text-sm text-muted-foreground">
                  Я є автором цієї роботи і не надавав дозволу на її публікацію
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="not-original" id="not-original" className="mt-1" />
              <div>
                <Label htmlFor="not-original" className="font-medium">
                  Публікація видає чужу роботу за власну
                </Label>
                <p className="text-sm text-muted-foreground">Користувач неправдиво заявляє, що є автором роботи</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="commercial" id="commercial" className="mt-1" />
              <div>
                <Label htmlFor="commercial" className="font-medium">
                  Комерційне використання без дозволу
                </Label>
                <p className="text-sm text-muted-foreground">
                  Моя робота використовується в комерційних цілях без мого дозволу
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="original-url">Посилання на оригінал (якщо є):</Label>
          <Input
            id="original-url"
            placeholder="https://..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Надайте посилання на оригінальну публікацію, якщо вона доступна онлайн
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Опис порушення:</Label>
          <Textarea
            id="description"
            placeholder="Опишіть, як саме порушуються ваші авторські права..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="evidence">Докази авторства (опціонально):</Label>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={() => document.getElementById("evidence-upload")?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Завантажити файл
            </Button>
            <span className="text-sm text-muted-foreground">{evidence ? evidence.name : "Файл не вибрано"}</span>
            <Input
              id="evidence-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Завантажте фото оригіналу, скріншоти, документи або інші докази вашого авторства
          </p>
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={(checked) => setAgreeToTerms(!!checked)} />
          <div>
            <Label htmlFor="terms" className="text-sm">
              Я підтверджую, що надана мною інформація є правдивою та точною. Я розумію, що неправдиві скарги можуть
              призвести до обмеження доступу до платформи.
            </Label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={!agreeToTerms || submitting}>
          {submitting ? "Надсилання..." : "Надіслати скаргу"}
        </Button>
      </form>
    </div>
  )
}
