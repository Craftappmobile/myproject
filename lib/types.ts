export interface Subcategory {
  id: string
  name: string
  path: string
}

export interface Category {
  id: string
  name: string
  subcategories: Subcategory[]
}

export interface Project {
  id: string
  name: string
  calculations: Record<string, any>[]
  createdAt: Date
  updatedAt: Date
}

export interface YarnFiber {
  type: string
  percentage: number
}

export interface Yarn {
  id: string
  brand: string
  name: string
  color: string
  colorCode?: string
  weight: number // in grams
  length: number // in meters
  perWeight: number // weight for which length is specified
  quantity: number // number of skeins
  fibers: YarnFiber[]
  batchNumber?: string
  storage?: string
  notes?: string
  labelImage?: string
  yarnImage?: string
  createdAt: Date
  updatedAt: Date
}

export interface YarnInProject {
  yarnId: string
  projectId: string
  plannedQuantity: number
  plannedWeight: number
  usedQuantity: number
  usedWeight: number
  notes?: string
}
