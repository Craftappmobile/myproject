"use client"
import { X, ChevronDown } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface HelpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  purpose: string
  steps: { step: string; description: string }[]
  tips?: string[]
  videoUrl?: string
}

export function HelpModal({ open, onOpenChange, title, purpose, steps, tips, videoUrl }: HelpModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto bg-white p-0 max-h-[90vh] overflow-auto">
        <DialogHeader className="p-4 bg-sage-50 sticky top-0 z-10 border-b border-sage-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sage-800">Допомога: {title}</DialogTitle>
            <DialogClose className="h-6 w-6 rounded-full opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-sage-950 focus:ring-offset-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Закрити</span>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="p-4 space-y-6">
          <div>
            <h3 className="flex items-center text-sage-800 font-medium mb-2">
              <span className="mr-2">📋</span>
              Призначення:
            </h3>
            <p className="text-sage-700 ml-6">{purpose}</p>
          </div>

          <div>
            <h3 className="flex items-center text-sage-800 font-medium mb-2">
              <span className="mr-2">🔢</span>
              Як користуватися:
            </h3>
            <ul className="ml-6 space-y-2">
              {steps.map((step, index) => (
                <li key={index} className="text-sage-700">
                  <span className="font-medium">[{index + 1}]</span> {step.description}
                </li>
              ))}
            </ul>
          </div>

          {tips && tips.length > 0 && (
            <Collapsible className="border rounded-md border-sage-200">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-3 font-medium text-sage-800 hover:bg-sage-50">
                <div className="flex items-center">
                  <span className="mr-2">💡</span>
                  Підказки
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 pt-0 border-t border-sage-200">
                <ul className="space-y-2">
                  {tips.map((tip, index) => (
                    <li key={index} className="text-sage-700 ml-6">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          )}

          {videoUrl && (
            <div className="mt-4">
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full p-2 bg-moss-400 hover:bg-moss-500 text-white rounded-md transition-colors"
              >
                Подивитись відео-інструкцію
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
