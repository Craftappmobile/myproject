"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Plus, Folder, Calculator } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState([
    { id: "1", name: "Светр з круглою кокеткою", createdAt: new Date(), calculations: 3 },
    { id: "2", name: "Шкарпетки для тата", createdAt: new Date(), calculations: 2 },
    { id: "3", name: "Шапка з помпоном", createdAt: new Date(), calculations: 1 },
  ])

  const [newProjectName, setNewProjectName] = useState("")

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return

    const newProject = {
      id: Date.now().toString(),
      name: newProjectName,
      createdAt: new Date(),
      calculations: 0,
    }

    setProjects([...projects, newProject])
    setNewProjectName("")
  }

  const handleOpenProject = (id: string) => {
    router.push(`/projects/${id}`)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Мої проєкти</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Новий проєкт
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Створити новий проєкт</DialogTitle>
                <DialogDescription>Введіть назву для вашого нового проєкту.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Назва проєкту</Label>
                  <Input
                    id="name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Введіть назву проєкту"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateProject}>Створити</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Folder className="mr-2 h-5 w-5" />
                  {project.name}
                </CardTitle>
                <CardDescription>Створено: {project.createdAt.toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calculator className="mr-2 h-4 w-4" />
                  {project.calculations} розрахунків
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleOpenProject(project.id)}>
                  Відкрити проєкт
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
