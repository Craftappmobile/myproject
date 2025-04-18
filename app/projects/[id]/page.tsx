"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronDown, ChevronUp, Home, Plus, Trash2, PenSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Calculation {
  id: string
  type: string
  date: string
  inputs: Record<string, any>
  results: Record<string, any>
  expanded?: boolean
  photos?: { id: string; url: string; caption?: string }[]
  notes?: string
  calculatorPath: string
}

interface Note {
  id: string
  title: string
  content: string
  date: string
}

interface RowNote {
  id: string
  rowNumber: number
  text: string
  showReminder: boolean
}

interface CounterHistoryEntry {
  id: string
  timestamp: Date
  change: number
  value: number
}

interface Counter {
  id: string
  name: string
  currentValue: number
  targetValue: number | null
  step: number
  stage: string
  displayMode: "standard" | "compact" | "extended"
  showReminders: boolean
  reminderInterval: number | null
  notes: RowNote[]
  history: CounterHistoryEntry[]
  saveHistory: boolean
  vibration: boolean
  sound: boolean
  autoSave: boolean
  autoSaveInterval: number
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("notes")

  const [calculations, setCalculations] = useState<Calculation[]>([
    {
      id: "calc1",
      type: "Розрахунок горловини",
      date: "05.04.2025",
      inputs: {
        "Обхват шиї": "38 см",
        "Додаткова свобода": "2 см",
        Щільність: "22 п. / 10 см",
      },
      results: {
        "Загальна ширина горловини": "40 см",
        "Кількість петель": "88 п.",
        "Розподіл петель": {
          Перед: "30 п.",
          Спинка: "30 п.",
          Плечі: "по 14 п.",
        },
      },
      expanded: true,
      photos: [
        {
          id: "photo1",
          url: "/cozy-knit-scarf.png",
          caption: "Процес в'язання",
        },
      ],
      notes: "Використовувати спиці 4.5 мм для набору петель. Перевірити щільність на зразку перед початком роботи.",
      calculatorPath: "/calculators/v-neckline-decreases",
    },
    {
      id: "calc2",
      type: "Розрахунок пряжі",
      date: "01.04.2025",
      inputs: {
        "Ширина виробу": "50 см",
        "Висота виробу": "70 см",
        Щільність: "20 п. / 10 см",
      },
      results: {
        "Загальна кількість пряжі": "450 г",
        "Приблизна довжина нитки": "900 м",
      },
      calculatorPath: "/calculators/yarn-consumption",
    },
  ])

  // Стан для нотаток
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "note1",
      title: "Вибір пряжі",
      content:
        "Для цього проєкту краще використовувати пряжу з вмістом вовни не менше 50%. Розглянути варіанти від Drops та Katia.",
      date: "01.04.2025",
    },
    {
      id: "note2",
      title: "Ідеї для оздоблення",
      content:
        "Додати вишивку на манжетах. Використати контрастну нитку для обв'язки горловини. Можливо додати кишені з аплікацією.",
      date: "03.04.2025",
    },
  ])

  // Стан для лічильників
  const [counters, setCounters] = useState<Counter[]>([
    {
      id: "counter1",
      name: "Основний лічильник",
      currentValue: 48,
      targetValue: 86,
      step: 1,
      stage: "Рукава",
      displayMode: "standard",
      showReminders: true,
      reminderInterval: null,
      notes: [
        { id: "note1", rowNumber: 12, text: "Початок зменшень під рукав", showReminder: true },
        { id: "note2", rowNumber: 24, text: "Зміна візерунка, див. схему 2", showReminder: true },
        { id: "note3", rowNumber: 50, text: "Початок манжета, перейти на спиці 2.5мм", showReminder: true }
      ],
      history: [
        { id: "hist1", timestamp: new Date(Date.now() - 12 * 60000), change: 2, value: 48 },
        { id: "hist2", timestamp: new Date(Date.now() - 24 * 60000), change: 6, value: 46 },
        { id: "hist3", timestamp: new Date(Date.now() - 24 * 60 * 60000), change: 12, value: 40 }
      ],
      saveHistory: true,
      vibration: true,
      sound: false,
      autoSave: false,
      autoSaveInterval: 5
    },
    {
      id: "counter2",
      name: "Повторення візерунка",
      currentValue: 3,
      targetValue: 12,
      step: 1,
      stage: "Рукава",
      displayMode: "standard",
      showReminders: false,
      reminderInterval: null,
      notes: [],
      history: [],
      saveHistory: true,
      vibration: true,
      sound: false,
      autoSave: false,
      autoSaveInterval: 5
    }
  ])

  // Стан для діалогів лічильника
  const [counterDialogOpen, setCounterDialogOpen] = useState(false)
  const [counterDetailDialogOpen, setCounterDetailDialogOpen] = useState(false)
  const [counterSettingsDialogOpen, setCounterSettingsDialogOpen] = useState(false)
  const [rowNoteDialogOpen, setRowNoteDialogOpen] = useState(false)
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false)
  
  // Стан для поточного лічильника
  const [currentCounter, setCurrentCounter] = useState<Counter | null>(null)
  const [newCounterData, setNewCounterData] = useState({
    name: "",
    currentValue: 0,
    targetValue: "",
    step: 1,
    stage: "Рукава",
    showReminders: false,
    reminderInterval: ""
  })
  
  // Стан для поточної нотатки до ряду
  const [currentRowNote, setCurrentRowNote] = useState<RowNote | null>(null)
  const [newRowNoteData, setNewRowNoteData] = useState({
    rowNumber: "",
    text: "",
    showReminder: true
  })
  
  // Стан для поточного нагадування
  const [currentReminder, setCurrentReminder] = useState<RowNote | null>(null)

  // Стан для діалогу створення/редагування нотатки
  const [noteDialogOpen, setNoteDialogOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [noteTitle, setNoteTitle] = useState("")
  const [noteContent, setNoteContent] = useState("")

  // Стан для діалогу перегляду нотатки
  const [viewNoteDialogOpen, setViewNoteDialogOpen] = useState(false)
  const [viewingNote, setViewingNote] = useState<Note | null>(null)

  const [galleryOpen, setGalleryOpen] = useState(false)
  const [selectedCalculation, setSelectedCalculation] = useState<string | null>(null)

  const projectName = 'Светр "Осінь"'
  const progress = 70
  const currentStage = "Рукава (1/2)"

  // Функції для роботи з лічильниками
  const openCounterDialog = () => {
    setNewCounterData({
      name: "",
      currentValue: 0,
      targetValue: "",
      step: 1,
      stage: "Рукава",
      showReminders: false,
      reminderInterval: ""
    })
    setCounterDialogOpen(true)
  }

  const saveCounter = () => {
    if (!newCounterData.name.trim()) return

    const newCounter: Counter = {
      id: `counter${Date.now()}`,
      name: newCounterData.name,
      currentValue: newCounterData.currentValue,
      targetValue: newCounterData.targetValue ? Number.parseInt(newCounterData.targetValue) : null,
      step: newCounterData.step,
      stage: newCounterData.stage,
      displayMode: "standard",
      showReminders: newCounterData.showReminders,
      reminderInterval: newCounterData.reminderInterval ? Number.parseInt(newCounterData.reminderInterval) : null,
      notes: [],
      history: [],
      saveHistory: true,
      vibration: true,
      sound: false,
      autoSave: false,
      autoSaveInterval: 5
    }

    setCounters([...counters, newCounter])
    setCounterDialogOpen(false)
  }

  const openCounterDetail = (counter: Counter) => {
    setCurrentCounter(counter)
    setCounterDetailDialogOpen(true)
  }

  const openCounterSettings = (counter: Counter) => {
    setCurrentCounter(counter)
    setCounterSettingsDialogOpen(true)
  }

  const saveCounterSettings = () => {
    if (!currentCounter) return

    setCounters(counters.map(c => c.id === currentCounter.id ? currentCounter : c))
    setCounterSettingsDialogOpen(false)
  }

  const deleteCounter = (id: string) => {
    setCounters(counters.filter(c => c.id !== id))
    setCounterSettingsDialogOpen(false)
  }

  const resetCounter = (id: string) => {
    setCounters(counters.map(c => {
      if (c.id === id) {
        return {
          ...c,
          currentValue: 0,
          history: c.saveHistory ? [
            ...c.history,
            {
              id: `hist${Date.now()}`,
              timestamp: new Date(),
              change: -c.currentValue,
              value: 0
            }
          ] : c.history
        }
      }
      return c
    }))
  }

  const incrementCounter = (id: string, amount = 1) => {
    setCounters(counters.map(c => {
      if (c.id === id) {
        const newValue = c.currentValue + amount
        
        // Перевірка на нагадування
        const reminders = c.notes.filter(note => 
          note.showReminder && 
          (c.currentValue < note.rowNumber && newValue >= note.rowNumber)
        )
        
        if (reminders.length > 0) {
          setCurrentReminder(reminders[0])
          setReminderDialogOpen(true)
        }
        
        return {
          ...c,
          currentValue: newValue,
          history: c.saveHistory ? [
            ...c.history,
            {
              id: `hist${Date.now()}`,
              timestamp: new Date(),
              change: amount,
              value: newValue
            }
          ] : c.history
        }
      }
      return c
    }))
  }

  const decrementCounter = (id: string, amount = 1) => {
    setCounters(counters.map(c => {
      if (c.id === id) {
        const newValue = Math.max(0, c.currentValue - amount)
        return {
          ...c,
          currentValue: newValue,
          history: c.saveHistory ? [
            ...c.history,
            {
              id: `hist${Date.now()}`,
              timestamp: new Date(),
              change: -amount,
              value: newValue
            }
          ] : c.history
        }
      }
      return c
    }))
  }

  // Функції для роботи з нотатками до рядів
  const openRowNoteDialog = () => {
    if (!currentCounter) return
    
    setNewRowNoteData({
      rowNumber: "",
      text: "",
      showReminder: true
    })
    setCurrentRowNote(null)
    setRowNoteDialogOpen(true)
  }

  const openEditRowNoteDialog = (note: RowNote) => {
    if (!currentCounter) return
    
    setNewRowNoteData({
      rowNumber: note.rowNumber.toString(),
      text: note.text,
      showReminder: note.showReminder
    })
    setCurrentRowNote(note)
    setRowNoteDialogOpen(true)
  }

  const saveRowNote = () => {
    if (!currentCounter || !newRowNoteData.rowNumber || !newRowNoteData.text.trim()) return

    const rowNumber = Number.parseInt(newRowNoteData.rowNumber)
    
    if (currentRowNote) {
      // Редагування існуючої нотатки
      const updatedNotes = currentCounter.notes.map(note => 
        note.id === currentRowNote.id 
          ? { 
              ...note, 
              rowNumber, 
              text: newRowNoteData.text, 
              showReminder: newRowNoteData.showReminder 
            } 
          : note
      )
      
      setCurrentCounter({
        ...currentCounter,
        notes: updatedNotes
      })
    } else {
      // Створення нової нотатки
      const newNote: RowNote = {
        id: `rownote${Date.now()}`,
        rowNumber,
        text: newRowNoteData.text,
        showReminder: newRowNoteData.showReminder
      }
      
      setCurrentCounter({
        ...currentCounter,
        notes: [...currentCounter.notes, newNote]
      })
    }
    
    setRowNoteDialogOpen(false)
  }

  const deleteRowNote = (id: string) => {
    if (!currentCounter) return
    
    setCurrentCounter({
      ...currentCounter,
      notes: currentCounter.notes.filter(note => note.id !== id)
    })
  }

  // Функції для роботи з нотатками проекту
  const toggleExpand = (id: string) => {
    setCalculations(calculations.map((calc) => (calc.id === id ? { ...calc, expanded: !calc.expanded } : calc)))
  }

  const handleEditCalculation = (id: string) => {
    router.push(`/projects/${params.id}/edit/${id}`)
  }

  const handleOpenCalculator = (calculatorPath: string) => {
    router.push(calculatorPath)
  }

  const handleAddPhotosToCalculation = (calculationId: string) => {
    setSelectedCalculation(calculationId)
    setGalleryOpen(true)
  }

  const handleSelectPhotos = (photos: { id: string; url: string; caption?: string }[]) => {
    if (selectedCalculation) {
      setCalculations(
        calculations.map((calc) => {
          if (calc.id === selectedCalculation) {
            const existingPhotos = calc.photos || []
            const newPhotos = photos.filter((photo) => !existingPhotos.some((existing) => existing.id === photo.id))
            return {
              ...calc,
              photos: [...existingPhotos, ...newPhotos],
            }
          }
          return calc
        }),
      )
    }
    setGalleryOpen(false)
    setSelectedCalculation(null)
  }

  const openCreateNoteDialog = () => {
    setCurrentNote(null)
    setNoteTitle("")
    setNoteContent("")
    setNoteDialogOpen(true)
  }

  const openEditNoteDialog = (note: Note) => {
    setCurrentNote(note)
    setNoteTitle(note.title)
    setNoteContent(note.content)
    setNoteDialogOpen(true)
  }

  const saveNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return

    const currentDate = new Date().toLocaleDateString("uk-UA")

    if (currentNote) {
      // Редагування існуючої нотатки
      setNotes(
        notes.map((note) =>
          note.id === currentNote.id ? { ...note, title: noteTitle, content: noteContent, date: currentDate } : note,
        ),
      )
    } else {
      // Створення нової нотатки
      const newNote: Note = {
        id: `note${Date.now()}`,
        title: noteTitle,
        content: noteContent,
        date: currentDate,
      }
      setNotes([...notes, newNote])
    }

    setNoteDialogOpen(false)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const viewNote = (note: Note) => {
    setViewingNote(note)
    setViewNoteDialogOpen(true)
  }

  // Функція для групування розрахунків за типами
  const groupCalculationsByType = () => {
    const groups: Record<string, Calculation[]> = {}

    calculations.forEach((calc) => {
      let category = "Інші розрахунки"

      if (calc.type.includes("горловин")) {
        category = "Горловина"
      } else if (calc.type.includes("пряж")) {
        category = "Пряжа"
      } else if (calc.type.includes("рукав")) {
        category = "Рукав"
      } else if (calc.type.includes("щільн")) {
        category = "Щільність"
      }

      if (!groups[category]) {
        groups[category] = []
      }

      groups[category].push(calc)
    })

    return groups
  }

  const calculationGroups = groupCalculationsByType()

  // Форматування дати для історії лічильника
  const formatHistoryDate = (date: Date) => {
    const now = new Date()
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (date.toDateString() === now.toDateString()) {
      return `Сьогодні, ${date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}`
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Вчора, ${date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}`
    } else {
      return date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit' }) + 
             `, ${date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}`
    }
  }

  // Ефект для оновлення лічильників при зміні currentCounter
  useEffect(() => {
    if (currentCounter) {
      setCounters(counters.map(c => c.id === currentCounter.id ? currentCounter : c))
    }
  }, [currentCounter])

  return (
    <main className="min-h-screen flex flex-col bg-sage-50">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/projects")} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
            <Home className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-sage-800">{projectName}</h1>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="mr-2 text-sage-700">🧶 В процесі</span>
            <Progress value={progress} className="flex-1" />
            <span className="ml-2 text-sage-700">{progress}%</span>
          </div>
        </div>

        {/* Замінюємо вкладку "Етапи" на "Лічильник" */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="notes">Нотатки</TabsTrigger>
            <TabsTrigger value="counter">Лічильник</TabsTrigger>
            <TabsTrigger value="calculations">Розрахунки</TabsTrigger>
          </TabsList>

          <TabsContent value="notes">
            <div className="space-y-4">
              {/* Список нотаток */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-sage-800">Мої нотатки</h3>
                <Button variant="outline" size="sm" onClick={openCreateNoteDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Нова нотатка
                </Button>
              </div>

              {notes.length > 0 ? (
                <div className="space-y-3">
                  {notes.map((note) => (
                    <Card key={note.id} className="bg-white">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <h4
                            className="font-medium text-sage-800 cursor-pointer hover:text-sage-600"
                            onClick={() => viewNote(note)}
                          >
                            {note.title}
                          </h4>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => openEditNoteDialog(note)}>
                            <PenSquare className="h-4 w-4 text-sage-600" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteNote(note.id)}>
                            <Trash2 className="h-4 w-4 text-sage-600" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-sage-600 line-clamp-2">{note.content}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="ghost" size="sm" className="ml-auto text-xs" onClick={() => viewNote(note)}>
                          Читати повністю
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white rounded-md">
                  <p className="text-muted-foreground mb-4">У цьому проєкті ще немає нотаток</p>
                  <Button variant="outline" onClick={openCreateNoteDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Створити першу нотатку
                  </Button>
                </div>
              )}

              {/* Список розрахунків залишаємо для сумісності */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-sage-800 mb-4">Розрахунки проєкту</h3>
                {calculations.map((calc) => (
                  <Card key={calc.id} className="bg-white mb-4">
                    <CardHeader className="p-4 cursor-pointer" onClick={() => toggleExpand(calc.id)}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-sage-800">{calc.type}</h3>
                          <p className="text-sm text-muted-foreground">Дата: {calc.date}</p>
                        </div>
                        {calc.expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </CardHeader>

                    {calc.expanded && (
                      <CardContent className="pt-0 px-4 pb-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2 text-sage-700">Вхідні дані:</h4>
                            <div className="space-y-1">
                              {Object.entries(calc.inputs).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-sage-600">{key}:</span>
                                  <span className="text-sage-800">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2 text-sage-700">Результат:</h4>
                            <div className="space-y-1">
                              {Object.entries(calc.results).map(([key, value]) => {
                                if (typeof value === "object") {
                                  return (
                                    <div key={key} className="space-y-1">
                                      <div className="font-medium text-sage-700">{key}:</div>
                                      {Object.entries(value).map(([subKey, subValue]) => (
                                        <div key={subKey} className="flex justify-between pl-4">
                                          <span className="text-sage-600">{subKey}:</span>
                                          <span className="text-sage-800">{subValue}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )
                                }
                                return (
                                  <div key={key} className="flex justify-between">
                                    <span className="text-sage-600">{key}:</span>
                                    <span className="text-sage-800">{value}</span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>

                          {calc.photos && calc.photos.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2 text-sage-700">Фотографії:</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {calc.photos.map((photo) => (
                                  <div key={photo.id} className="relative aspect-square rounded-md overflow-hidden">
                                    <img
                                      src={photo.url || "/placeholder.svg"}
                                      alt={photo.caption || "Фото проєкту"}
                                      className="w-full h-full object-cover"
                                    />
                                    {photo.caption && (
                                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1 text-xs">
                                        {photo.caption}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {calc.notes && (
                            <div>
                              <h4 className="font-medium mb-2 text-sage-700">Нотатки:</h4>
                              <p className="text-sm text-sage-600">{calc.notes}</p>
                            </div>
                          )}

                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleOpenCalculator(calc.calculatorPath)}>
                              Відкрити калькулятор
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditCalculation(calc.id)}>
                              Редагувати
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleAddPhotosToCalculation(calc.id)}>
                              Додати фото
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="counter">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-sage-800">Етап: {currentStage}</h3>
              </div>
              
              {counters.length > 0 ? (
                <div className="space-y-4">
                  {counters.map((counter) => (
                    <Card key={counter.id} className="bg-white">
                      <CardHeader className="p-4 pb-2">
                        <h4 className="font-medium text-sage-800">{counter.name}</h4>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex justify-center items-center space-x-2 mb-3">
                          <Button 
                            variant="outline" 
                            className="h-12 w-12 text-lg font-bold"
                            onClick={() => decrementCounter(counter.id, counter.step)}
                          >
                            -
                          </Button>
                          <div className="h-12 w-20 flex items-center justify-center border rounded-md text-xl font-bold">
                            {counter.currentValue}
                          </div>
                          <Button 
                            variant="outline" 
                            className="h-12 w-12 text-lg font-bold"
                            onClick={() => incrementCounter(counter.id, counter.step)}
                          >
                            +
                          </Button>
                        </div>
                        
                        <div className="text-center text-sm text-sage-700 mb-2">
                          {counter.targetValue ? (
                            <>
                              {counter.currentValue} з {counter.targetValue} рядів 
                              ({Math.round((counter.currentValue / counter.targetValue) * 100)}%)
                            </>
                          ) : (
                            <>рядів</>
                          )}
                        </div>
                        
                        {counter.notes.length > 0 && (
                          <div className="mt-3 text-xs text-sage-600">
                            <p className="font-medium">Наступні нотатки:</p>
                            {counter.notes
                              .filter(note => note.rowNumber > counter.currentValue)
                              .sort((a, b) => a.rowNumber - b.rowNumber)
                              .slice(0, 2)
                              .map(note => (
                                <p key={note.id}>Ряд {note.rowNumber}: {note.text}</p>
                              ))
                            }
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-2 flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => openCounterDetail(counter)}
                        >
                          Деталі
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={openCounterDialog}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Додати лічильник
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 bg-white rounded-md">
                  <p className="text-muted-foreground mb-4">У цьому проєкті ще немає лічильників</p>
                  <Button variant="outline" onClick={openCounterDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Створити перший лічильник
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="calculations">
            <Card>
              <CardHeader className="pb-3 flex justify-between items-center">
                <h3 className="text-lg font-medium text-sage-800">Всі розрахунки проєкту</h3>
                <Button variant="outline" size="sm" onClick={() => router.push("/calculators")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Новий розрахунок
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {calculations.length > 0 ? (
                    Object.entries(calculationGroups).map(([category, calcs]) => (
                      <div key={category} className="space-y-2">
                        <h4 className="font-medium text-sage-700 border-b border-sage-200 pb-1">{category}</h4>
                        <div className="divide-y divide-sage-100">
                          {calcs.map((calc) => (
                            <div
                              key={calc.id}
                              className="py-3 px-2 hover:bg-sage-50 rounded-md cursor-pointer transition-colors"
                              onClick={() => handleOpenCalculator(calc.calculatorPath)}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h5 className="font-medium text-sage-800">{calc.type}</h5>
                                <p className="text-xs text-muted-foreground">Дата: {calc.date}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEditCalculation(calc.id)
                                }}
                              >
                                <PenSquare className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-2 text-sm text-sage-600 bg-sage-50/50 p-2 rounded-md">
                              {Object.entries(calc.results)
                                .slice(0, 2)
                                .map(([key, value]) => (
                                  <div key={key} className="flex justify-between">
                                    <span>{key}:</span>
                                    <span className="font-medium">{typeof value === "object" ? "..." : value}</span>
                                  </div>
                                ))}
                              {Object.keys(calc.results).length > 2 && (
                                <div className="text-right text-sage-500 italic text-xs mt-1">
                                  + ще {Object.keys(calc.results).length - 2} результатів
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">У цьому проєкті ще немає розрахунків</p>
                    <Button variant="outline" onClick={() => router.push("/calculators")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Додати перший розрахунок
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>

      {/* Діалог для створення нового лічильника */}
      <Dialog open={counterDialogOpen} onOpenChange={setCounterDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Додати лічильник</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="counter-name">Назва лічильника:</Label>
              <Input
                id="counter-name"
                value={newCounterData.name}
                onChange={(e) => setNewCounterData({...newCounterData, name: e.target.value})}
                placeholder="Введіть назву лічильника"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="counter-value">Значення:</Label>
              <Input
                id="counter-value"
                type="number"
                min="0"
                value={newCounterData.currentValue}
                onChange={(e) => setNewCounterData({...newCounterData, currentValue: Number.parseInt(e.target.value) || 0})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="counter-target">Цільове значення (необов'язково):</Label>
              <Input
                id="counter-target"
                type="number"
                min="1"
                value={newCounterData.targetValue}
                onChange={(e) => setNewCounterData({...newCounterData, targetValue: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Крок збільшення/зменшення:</Label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 4, 8].map((step) => (
                  <Button
                    key={step}
                    type="button"
                    variant={newCounterData.step === step ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewCounterData({...newCounterData, step: step})}
                  >
                    {step}
                  </Button>
                ))}
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Інше:</span>
                  <Input
                    className="w-16 h-8"
                    type="number"
                    min="1"
                    value={newCounterData.step !== 1 && newCounterData.step !== 2 && newCounterData.step !== 4 && newCounterData.step !== 8 ? newCounterData.step : ""}
                    onChange={(e) => setNewCounterData({...newCounterData, step: Number.parseInt(e.target.value) || 1})}
                  />
                </div>
              </div>
            
            <div className="space-y-2">
              <Label htmlFor="counter-stage">Прив'язати до етапу:</Label>
              <Input
                id="counter-stage"
                value={newCounterData.stage}
                onChange={(e) => setNewCounterData({...newCounterData, stage: e.target.value})}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="counter-reminders"
                checked={newCounterData.showReminders}
                onCheckedChange={(checked) => 
                  setNewCounterData({...newCounterData, showReminders: !!checked})
                }
              />
              <Label htmlFor="counter-reminders" className="text-sm">
                Показувати нагадування кожен
                <Input
                  className="w-12 h-6 mx-1 inline-block"
                  type="number"
                  min="1"
                  disabled={!newCounterData.showReminders}
                  value={newCounterData.reminderInterval}
                  onChange={(e) => setNewCounterData({...newCounterData, reminderInterval: e.target.value})}
                />
                ряд
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCounterDialogOpen(false)}>
              Скасувати
            </Button>
            <Button onClick={saveCounter}>Зберегти</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Діалог для детального перегляду лічильника */}
      {currentCounter && (
        <Dialog open={counterDetailDialogOpen} onOpenChange={setCounterDetailDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{currentCounter.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-center items-center space-x-2">
                <Button 
                  variant="outline" 
                  className="h-12 w-16 text-lg font-bold"
                  onClick={() => decrementCounter(currentCounter.id, 10)}
                >
                  -10
                </Button>
                <div className="h-12 w-24 flex items-center justify-center border rounded-md text-xl font-bold">
                  {currentCounter.currentValue}
                </div>
                <Button 
                  variant="outline" 
                  className="h-12 w-16 text-lg font-bold"
                  onClick={() => incrementCounter(currentCounter.id, 10)}
                >
                  +10
                </Button>
              </div>
              
              <div className="flex justify-center items-center space-x-2">
                <Button 
                  variant="outline" 
                  className="h-10 w-12 text-sm"
                  onClick={() => decrementCounter(currentCounter.id, 1)}
                >
                  -1
                </Button>
                <div className="h-10 flex-1 flex items-center justify-center text-sm">
                  {currentCounter.targetValue ? `з ${currentCounter.targetValue} рядів` : "рядів"}
                </div>
                <Button 
                  variant="outline" 
                  className="h-10 w-12 text-sm"
                  onClick={() => incrementCounter(currentCounter.id, 1)}
                >
                  +1
                </Button>
              </div>
              
              {currentCounter.notes.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Нотатки до рядів:</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {currentCounter.notes
                      .sort((a, b) => a.rowNumber - b.rowNumber)
                      .map(note => (
                        <div key={note.id} className="text-sm p-2 bg-sage-50 rounded-md">
                          <div className="flex justify-between">
                            <span className="font-medium">Ряд {note.rowNumber}:</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-5 w-5 p-0"
                              onClick={() => deleteRowNote(note.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <p>{note.text}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={openRowNoteDialog}
              >
                <Plus className="h-4 w-4 mr-2" />
                Додати нотатку
              </Button>
              
              {currentCounter.history.length > 0 && currentCounter.saveHistory && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Історія змін:</h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto text-sm">
                    {currentCounter.history
                      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                      .slice(0, 5)
                      .map(entry => (
                        <div key={entry.id} className="flex justify-between">
                          <span>{formatHistoryDate(entry.timestamp)}:</span>
                          <span>{entry.change > 0 ? '+' : ''}{entry.change} {entry.change === 1 ? 'ряд' : 'рядів'}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <div className="flex w-full justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => openCounterSettings(currentCounter)}
                >
                  Налаштування
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => resetCounter(currentCounter.id)}
                >
                  Скинути
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Діалог для налаштування лічильника */}
      {currentCounter && (
        <Dialog open={counterSettingsDialogOpen} onOpenChange={setCounterSettingsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Налаштування лічильника</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="settings-name">Назва:</Label>
                <Input
                  id="settings-name"
                  value={currentCounter.name}
                  onChange={(e) => setCurrentCounter({...currentCounter, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="settings-value">Поточне значення:</Label>
                <Input
                  id="settings-value"
                  type="number"
                  min="0"
                  value={currentCounter.currentValue}
                  onChange={(e) => setCurrentCounter({...currentCounter, currentValue: Number.parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="settings-target">Цільове значення:</Label>
                <Input
                  id="settings-target"
                  type="number"
                  min="1"
                  value={currentCounter.targetValue || ""}
                  onChange={(e) => setCurrentCounter({
                    ...currentCounter, 
                    targetValue: e.target.value ? Number.parseInt(e.target.value) : null
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Крок за замовчуванням:</Label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 4, 8].map((step) => (
                    <Button
                      key={step}
                      type="button"
                      variant={currentCounter.step === step ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentCounter({...currentCounter, step: step})}
                    >
                      {step}
                    </Button>
                  ))}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Інше:</span>
                    <Input
                      className="w-16 h-8"
                      type="number"
                      min="1"
                      value={
                        currentCounter.step !== 1 && 
                        currentCounter.step !== 2 && 
                        currentCounter.step !== 4 && 
                        currentCounter.step !== 8 ? currentCounter.step : ""
                      }
                      onChange={(e) => setCurrentCounter({
                        ...currentCounter, 
                        step: Number.parseInt(e.target.value) || 1
                      })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Відображення:</Label>
                <RadioGroup 
                  value={currentCounter.displayMode} 
                  onValueChange={(value) => setCurrentCounter({
                    ...currentCounter, 
                    displayMode: value as "standard" | "compact" | "extended"
                  })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="display-standard" />
                    <Label htmlFor="display-standard">Стандартне</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="display-compact" />
                    <Label htmlFor="display-compact">Компактне</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="extended" id="display-extended" />
                    <Label htmlFor="display-extended">Розширене з історією</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Опції:</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="save-history"
                      checked={currentCounter.saveHistory}
                      onCheckedChange={(checked) => setCurrentCounter({
                        ...currentCounter, 
                        saveHistory: !!checked
                      })}
                    />
                    <Label htmlFor="save-history">Зберігати історію змін</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vibration"
                      checked={currentCounter.vibration}
                      onCheckedChange={(checked) => setCurrentCounter({
                        ...currentCounter, 
                        vibration: !!checked
                      })}
                    />
                    <Label htmlFor="vibration">Вібрація при натисканні</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sound"
                      checked={currentCounter.sound}
                      onCheckedChange={(checked) => setCurrentCounter({
                        ...currentCounter, 
                        sound: !!checked
                      })}
                    />
                    <Label htmlFor="sound">Звук при натисканні</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="auto-save"
                      checked={currentCounter.autoSave}
                      onCheckedChange={(checked) => setCurrentCounter({
                        ...currentCounter, 
                        autoSave: !!checked
                      })}
                    />
                    <Label htmlFor="auto-save" className="flex items-center">
                      Автозбереження кожні
                      <Input
                        className="w-12 h-6 mx-1"
                        type="number"
                        min="1"
                        disabled={!currentCounter.autoSave}
                        value={currentCounter.autoSaveInterval}
                        onChange={(e) => setCurrentCounter({
                          ...currentCounter, 
                          autoSaveInterval: Number.parseInt(e.target.value) || 5
                        })}
                      />
                      хвилин
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button 
                variant="destructive" 
                onClick={() => deleteCounter(currentCounter.id)}
              >
                Видалити лічильник
              </Button>
              <Button onClick={saveCounterSettings}>Зберегти</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Діалог для додавання нотатки до ряду */}
      {currentCounter && (
        <Dialog open={rowNoteDialogOpen} onOpenChange={setRowNoteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {currentRowNote ? "Редагувати нотатку" : "Додати нотатку"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="row-number">Номер ряду:</Label>
                <Input
                  id="row-number"
                  type="number"
                  min="1"
                  value={newRowNoteData.rowNumber}
                  onChange={(e) => setNewRowNoteData({
                    ...newRowNoteData, 
                    rowNumber: e.target.value
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="note-text">Текст нотатки:</Label>
                <Textarea
                  id="note-text"
                  value={newRowNoteData.text}
                  onChange={(e) => setNewRowNoteData({
                    ...newRowNoteData, 
                    text: e.target.value
                  })}
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-reminder"
                  checked={newRowNoteData.showReminder}
                  onCheckedChange={(checked) => setNewRowNoteData({
                    ...newRowNoteData, 
                    showReminder: !!checked
                  })}
                />
                <Label htmlFor="show-reminder">
                  Показувати нагадування при досягненні цього ряду
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRowNoteDialogOpen(false)}>
                Скасувати
              </Button>
              <Button onClick={saveRowNote}>Зберегти</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Діалог для нагадування про досягнутий ряд */}
      {currentReminder && (
        <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <span className="text-xl mr-2">⚠️</span> Нагадування
              </DialogTitle>
            </DialogHeader>
            <div className="py-4 text-center">
              <p className="font-bold mb-4">Ви досягли ряду {currentReminder.rowNumber}!</p>
              <div className="p-4 bg-sage-50 rounded-md">
                <p>{currentReminder.text}</p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                className="w-full" 
                onClick={() => setReminderDialogOpen(false)}
              >
                Зрозуміло
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </main>
  )
}
