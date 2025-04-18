"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface CommunityFiltersProps {
  onClose: () => void
}

export function CommunityFilters({ onClose }: CommunityFiltersProps) {
  const [showType, setShowType] = useState("all")
  const [projectTypes, setProjectTypes] = useState<string[]>(["светр"])
  const [yarnTypes, setYarnTypes] = useState<string[]>([])
  const [onlyWithQuestions, setOnlyWithQuestions] = useState(false)
  const [sortBy, setSortBy] = useState("date")
  const [tagSearch, setTagSearch] = useState("")

  const popularTags = ["зима", "подарунок", "новачки", "бавовна", "діти"]

  const handleProjectTypeChange = (type: string) => {
    if (projectTypes.includes(type)) {
      setProjectTypes(projectTypes.filter((t) => t !== type))
    } else {
      setProjectTypes([...projectTypes, type])
    }
  }

  const handleYarnTypeChange = (type: string) => {
    if (yarnTypes.includes(type)) {
      setYarnTypes(yarnTypes.filter((t) => t !== type))
    } else {
      setYarnTypes([...yarnTypes, type])
    }
  }

  const handleReset = () => {
    setShowType("all")
    setProjectTypes([])
    setYarnTypes([])
    setOnlyWithQuestions(false)
    setSortBy("date")
    setTagSearch("")
  }

  const handleApply = () => {
    // In a real app, this would apply the filters
    onClose()
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-3">
        <h3 className="font-medium">Показувати:</h3>
        <RadioGroup value={showType} onValueChange={setShowType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="show-all" />
            <Label htmlFor="show-all">Всі публікації</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="popular" id="show-popular" />
            <Label htmlFor="show-popular">Популярні</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="subscriptions" id="show-subscriptions" />
            <Label htmlFor="show-subscriptions">Від підписок</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Тип виробу:</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="type-sweater"
              checked={projectTypes.includes("светр")}
              onCheckedChange={() => handleProjectTypeChange("светр")}
            />
            <Label htmlFor="type-sweater">Светр</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="type-scarf"
              checked={projectTypes.includes("шарф")}
              onCheckedChange={() => handleProjectTypeChange("шарф")}
            />
            <Label htmlFor="type-scarf">Шарф</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="type-hat"
              checked={projectTypes.includes("шапка")}
              onCheckedChange={() => handleProjectTypeChange("шапка")}
            />
            <Label htmlFor="type-hat">Шапка</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="type-blanket"
              checked={projectTypes.includes("плед")}
              onCheckedChange={() => handleProjectTypeChange("плед")}
            />
            <Label htmlFor="type-blanket">Плед</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="type-socks"
              checked={projectTypes.includes("шкарпетки")}
              onCheckedChange={() => handleProjectTypeChange("шкарпетки")}
            />
            <Label htmlFor="type-socks">Шкарпетки</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="type-other"
              checked={projectTypes.includes("інше")}
              onCheckedChange={() => handleProjectTypeChange("інше")}
            />
            <Label htmlFor="type-other">Інше</Label>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Теги:</h3>
        <Input
          placeholder="Пошук тегів..."
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}
          className="mb-2"
        />
        <div>
          <p className="text-sm mb-1">Популярні:</p>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge key={tag} variant="outline" className="cursor-pointer">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Пряжа:</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="yarn-wool"
              checked={yarnTypes.includes("вовна")}
              onCheckedChange={() => handleYarnTypeChange("вовна")}
            />
            <Label htmlFor="yarn-wool">Вовна</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="yarn-cotton"
              checked={yarnTypes.includes("бавовна")}
              onCheckedChange={() => handleYarnTypeChange("бавовна")}
            />
            <Label htmlFor="yarn-cotton">Бавовна</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="yarn-acrylic"
              checked={yarnTypes.includes("акрил")}
              onCheckedChange={() => handleYarnTypeChange("акрил")}
            />
            <Label htmlFor="yarn-acrylic">Акрил</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="yarn-linen"
              checked={yarnTypes.includes("льон")}
              onCheckedChange={() => handleYarnTypeChange("льон")}
            />
            <Label htmlFor="yarn-linen">Льон</Label>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="has-questions"
          checked={onlyWithQuestions}
          onCheckedChange={(checked) => setOnlyWithQuestions(checked === true)}
        />
        <Label htmlFor="has-questions">Тільки публікації з питаннями</Label>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Сортування:</h3>
        <RadioGroup value={sortBy} onValueChange={setSortBy}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="date" id="sort-date" />
            <Label htmlFor="sort-date">За датою (нові спочатку)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="popularity" id="sort-popularity" />
            <Label htmlFor="sort-popularity">За популярністю</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comments" id="sort-comments" />
            <Label htmlFor="sort-comments">За кількістю коментарів</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleReset}>
          Скинути фільтри
        </Button>
        <Button onClick={handleApply}>Застосувати</Button>
      </div>
    </div>
  )
}
