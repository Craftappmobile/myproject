import type { Category, Project, Yarn, YarnInProject } from "./types"

export const categories: Category[] = [
  {
    id: "adaptation",
    name: "Адаптація МК",
    subcategories: [
      {
        id: "adaptation-mk",
        name: "Адаптація МК",
        path: "/calculators/adaptation-mk",
      },
    ],
  },
  {
    id: "yarn-calculator",
    name: "Калькулятор пряжі",
    subcategories: [
      {
        id: "yarn-consumption",
        name: "Витрата пряжі",
        path: "/calculators/yarn-consumption",
      },
      {
        id: "folding-calculation",
        name: "Розрахунок складань",
        path: "/calculators/folding-calculation",
      },
      {
        id: "additional-thread",
        name: "Розрахунок додаткової нитки",
        path: "/calculators/additional-thread",
      },
      {
        id: "density-calculation",
        name: "Розрахунок щільності на основі зразка",
        path: "/calculators/density-calculation",
      },
    ],
  },
  {
    id: "raglan-classic",
    name: "Калькулятор моделі реглан - класичний",
    subcategories: [
      {
        id: "neckline-calculation",
        name: "Розрахунок горловини",
        path: "/calculators/neckline-calculation",
      },
      {
        id: "raglan-stitch-distribution",
        name: "Розподіл петель на реглан",
        path: "/calculators/raglan-stitch-distribution",
      },
      {
        id: "raglan-line-length",
        name: "Довжина регланної лінії",
        path: "/calculators/raglan-line-length",
      },
      {
        id: "raglan-increases",
        name: "Прибавки реглану",
        path: "/calculators/raglan-increases",
      },
      {
        id: "growth",
        name: "Росток",
        path: "/calculators/growth",
      },
      {
        id: "stitch-distribution-adjustment",
        name: "Коригування розподілу петель відповідно ростка",
        path: "/calculators/stitch-distribution-adjustment",
      },
      {
        id: "turning-points",
        name: "Точки розвороту при в'язанні ростка",
        path: "/calculators/turning-points",
      },
      {
        id: "bottom-up-raglan-decreases",
        name: "Убавки для формування реглану при в'язанні знизу",
        path: "/calculators/bottom-up-raglan-decreases",
      },
    ],
  },
  {
    id: "undercut-stitches",
    name: "Калькулятор петель підрізів",
    subcategories: [
      {
        id: "undercut-stitches-calculator",
        name: "Калькулятор петель підрізів",
        path: "/calculators/undercut-stitches",
      },
    ],
  },
  {
    id: "round-yoke",
    name: "Калькулятор моделі кругла кокетка",
    subcategories: [
      {
        id: "round-yoke-height",
        name: "Висота круглої кокетки",
        path: "/calculators/round-yoke-height",
      },
      {
        id: "increase-calculation",
        name: "Розрахунок прибавок",
        path: "/calculators/increase-calculation",
      },
    ],
  },
  {
    id: "sleeve-decreases-increases",
    name: "Калькулятор убавок і прибавок рукава",
    subcategories: [
      {
        id: "sleeve-decreases-increases-calculator",
        name: "Калькулятор убавок і прибавок рукава",
        path: "/calculators/sleeve-decreases-increases",
      },
    ],
  },
  {
    id: "raglan-epaulette",
    name: "Калькулятор моделі реглан-погон",
    subcategories: [
      {
        id: "raglan-epaulette-calculator",
        name: "Реглан-погон",
        path: "/calculators/raglan-epaulette",
      },
    ],
  },
  {
    id: "drop-shoulder",
    name: "Калькулятор моделі спущене плече",
    subcategories: [
      {
        id: "cast-on-stitches",
        name: "Скільки набрати петель",
        path: "/calculators/cast-on-stitches",
      },
      {
        id: "neckline-width",
        name: "Ширина горловини",
        path: "/calculators/neckline-width",
      },
      {
        id: "shoulder-width-slopes",
        name: "Ширина плеча та скоси",
        path: "/calculators/shoulder-width-slopes",
      },
      {
        id: "neckline-deepening",
        name: "Поглиблення горловини",
        path: "/calculators/neckline-deepening",
      },
    ],
  },
  {
    id: "v-neckline",
    name: "Калькулятор V-горловина",
    subcategories: [
      {
        id: "v-neckline-decreases",
        name: "Убавки V-горловини",
        path: "/calculators/v-neckline-decreases",
      },
      {
        id: "v-neckline-increases",
        name: "Прибавки V-горловини",
        path: "/calculators/v-neckline-increases",
      },
    ],
  },
  {
    id: "accessories",
    name: "Калькулятор петель для аксесуарів",
    subcategories: [
      {
        id: "hat",
        name: "Шапка",
        path: "/calculators/hat",
      },
      {
        id: "scarf",
        name: "Шарф",
        path: "/calculators/scarf",
      },
      {
        id: "socks",
        name: "Шкарпетки",
        path: "/calculators/socks",
      },
      {
        id: "gloves",
        name: "Рукавички",
        path: "/calculators/gloves",
      },
      {
        id: "blanket",
        name: "Плед",
        path: "/calculators/blanket",
      },
    ],
  },
]

export const projects: Project[] = [
  {
    id: "1",
    name: "Светр 'Осінній'",
    calculations: [
      {
        id: "calc1",
        type: "round-yoke-height",
        data: {
          stitchCount: 240,
          rowGauge: 8,
          yokeDepth: 22,
        },
        notes: "Основний розрахунок для светра",
        createdAt: new Date("2023-09-15"),
      },
      {
        id: "calc2",
        type: "yarn-consumption",
        data: {
          width: 50,
          height: 70,
          gauge: 22,
          result: 350,
        },
        notes: "Витрата пряжі для светра",
        createdAt: new Date("2023-09-16"),
      },
    ],
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2023-09-16"),
  },
  {
    id: "2",
    name: "Шапка з помпоном",
    calculations: [
      {
        id: "calc3",
        type: "hat",
        data: {
          headCircumference: 56,
          gauge: 20,
          result: 112,
        },
        notes: "Розрахунок петель для шапки",
        createdAt: new Date("2023-10-01"),
      },
    ],
    createdAt: new Date("2023-10-01"),
    updatedAt: new Date("2023-10-01"),
  },
  {
    id: "3",
    name: "Шкарпетки в подарунок",
    calculations: [],
    createdAt: new Date("2023-10-10"),
    updatedAt: new Date("2023-10-10"),
  },
]

export const yarns: Yarn[] = [
  {
    id: "1",
    brand: "Rowan",
    name: "Felted Tweed",
    color: "Seafarer",
    colorCode: "158",
    weight: 50,
    length: 175,
    perWeight: 50,
    quantity: 25,
    fibers: [
      { type: "Вовна", percentage: 50 },
      { type: "Альпака", percentage: 25 },
      { type: "Віскоза", percentage: 25 },
    ],
    batchNumber: "H2056",
    storage: "Верхня шухляда",
    notes: "Куплено в Центральному магазині. Підходить для светрів та шапок.",
    labelImage: "/yarn-labels/rowan-felted-tweed.jpg",
    yarnImage: "/yarn-images/rowan-felted-tweed.jpg",
    createdAt: new Date("2023-08-10"),
    updatedAt: new Date("2023-08-10"),
  },
  {
    id: "2",
    brand: "Drops",
    name: "Baby Merino",
    color: "Світло-сірий",
    colorCode: "22",
    weight: 50,
    length: 175,
    perWeight: 50,
    quantity: 8,
    fibers: [{ type: "Мериносова вовна", percentage: 100 }],
    storage: "Середня полиця",
    createdAt: new Date("2023-09-05"),
    updatedAt: new Date("2023-09-05"),
  },
  {
    id: "3",
    brand: "Schachenmayr",
    name: "Catania",
    color: "Джинс",
    colorCode: "164",
    weight: 50,
    length: 125,
    perWeight: 50,
    quantity: 10,
    fibers: [{ type: "Бавовна", percentage: 100 }],
    storage: "Нижня шухляда",
    createdAt: new Date("2023-07-20"),
    updatedAt: new Date("2023-07-20"),
  },
]

export const yarnInProjects: YarnInProject[] = [
  {
    yarnId: "1",
    projectId: "1",
    plannedQuantity: 7,
    plannedWeight: 350,
    usedQuantity: 0,
    usedWeight: 0,
    notes: "Основна пряжа для светра",
  },
  {
    yarnId: "1",
    projectId: "2",
    plannedQuantity: 2,
    plannedWeight: 100,
    usedQuantity: 1,
    usedWeight: 50,
    notes: "На шапку потрібно 2 мотки, помпон буде з залишків",
  },
]
