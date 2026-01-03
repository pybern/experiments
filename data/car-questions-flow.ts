export type StepId = "location" | "vehicle" | "auction" | "dimensions" | "contact"

export interface StepConfig {
  id: StepId
  route: string
  title: string
  description: string
  progress: number
  requiredParams: string[]
  nextRoute: string | null
}

export const carSteps: StepConfig[] = [
  {
    id: "location",
    route: "/car/questions/location",
    title: "Where are we moving your car?",
    description: "Let us know where you need your vehicle picked up and delivered to get started with your quote.",
    progress: 12.5,
    requiredParams: [],
    nextRoute: "/car/questions/vehicle",
  },
  {
    id: "vehicle",
    route: "/car/questions/vehicle",
    title: "About Your Vehicle",
    description: "We need some information about your vehicle to make sure we tailor a quote specifically to your needs.",
    progress: 25,
    requiredParams: ["pick", "drop"],
    nextRoute: "/car/questions/auction",
  },
  {
    id: "auction",
    route: "/car/questions/auction",
    title: "Is collection from an auction house?",
    description: "We can collect from a business address, residential address or an auction house. If an auction house, it's super important we know which one.",
    progress: 50,
    requiredParams: ["pick", "drop", "make", "model", "age", "drive"],
    nextRoute: "/car/questions/dimensions",
  },
  {
    id: "dimensions",
    route: "/car/questions/dimensions",
    title: "Your Vehicle Specifications",
    description: "If your car is lowered or modified, then please measure carefully. Every cm under 15cm will cost more.",
    progress: 75,
    requiredParams: ["pick", "drop", "make", "model", "age", "drive", "auction"],
    nextRoute: "/car/questions/contact",
  },
  {
    id: "contact",
    route: "/car/questions/contact",
    title: "Get your tailored quote",
    description: "We have calculated the best suitable pricing options for you based on the information you provided.",
    progress: 100,
    requiredParams: ["pick", "drop", "make", "model", "age", "drive", "auction"],
    nextRoute: null,
  },
]

export const totalSteps = carSteps.length

export function getStepByRoute(pathname: string): StepConfig | undefined {
  return carSteps.find((step) => step.route === pathname)
}

export function getStepNumber(stepId: StepId): number {
  return carSteps.findIndex((step) => step.id === stepId) + 1
}

export function getStepById(stepId: StepId): StepConfig | undefined {
  return carSteps.find((step) => step.id === stepId)
}

export function getPreviousStep(stepId: StepId): StepConfig | undefined {
  const currentIndex = carSteps.findIndex((step) => step.id === stepId)
  if (currentIndex <= 0) return undefined
  return carSteps[currentIndex - 1]
}

export function getNextStep(stepId: StepId): StepConfig | undefined {
  const currentIndex = carSteps.findIndex((step) => step.id === stepId)
  if (currentIndex === -1 || currentIndex >= carSteps.length - 1) return undefined
  return carSteps[currentIndex + 1]
}

// Exit condition reasons
export const exitReasons = {
  vehicle_age: "Vehicle manufactured before 1985",
  drive_issues: "Vehicle has mechanical/roadworthiness issues",
  salvage_vehicle: "Vehicle from salvage auction",
  custom_dimensions: "Vehicle has non-standard dimensions",
} as const

export type ExitReason = keyof typeof exitReasons

// Check if a value triggers an exit condition
export function checkExitCondition(
  param: string,
  value: string
): ExitReason | null {
  if (param === "age" && value === "over30") return "vehicle_age"
  if (param === "drive" && value === "issues") return "drive_issues"
  if (param === "salvage" && value === "salvage") return "salvage_vehicle"
  return null
}

// Mock data for vehicle makes and models
export const vehicleMakes = [
  { value: "toyota", label: "Toyota" },
  { value: "ford", label: "Ford" },
  { value: "holden", label: "Holden" },
  { value: "mazda", label: "Mazda" },
  { value: "hyundai", label: "Hyundai" },
  { value: "kia", label: "Kia" },
  { value: "nissan", label: "Nissan" },
  { value: "honda", label: "Honda" },
  { value: "mitsubishi", label: "Mitsubishi" },
  { value: "subaru", label: "Subaru" },
  { value: "volkswagen", label: "Volkswagen" },
  { value: "bmw", label: "BMW" },
  { value: "mercedes", label: "Mercedes-Benz" },
  { value: "audi", label: "Audi" },
] as const

export const vehicleModels: Record<string, { value: string; label: string }[]> = {
  toyota: [
    { value: "camry", label: "Camry" },
    { value: "corolla", label: "Corolla" },
    { value: "hilux", label: "HiLux" },
    { value: "rav4", label: "RAV4" },
    { value: "landcruiser", label: "LandCruiser" },
  ],
  ford: [
    { value: "ranger", label: "Ranger" },
    { value: "focus", label: "Focus" },
    { value: "mustang", label: "Mustang" },
    { value: "everest", label: "Everest" },
  ],
  holden: [
    { value: "commodore", label: "Commodore" },
    { value: "colorado", label: "Colorado" },
    { value: "cruze", label: "Cruze" },
  ],
  mazda: [
    { value: "cx5", label: "CX-5" },
    { value: "mazda3", label: "Mazda3" },
    { value: "bt50", label: "BT-50" },
    { value: "cx9", label: "CX-9" },
  ],
  hyundai: [
    { value: "i30", label: "i30" },
    { value: "tucson", label: "Tucson" },
    { value: "santafe", label: "Santa Fe" },
  ],
  kia: [
    { value: "cerato", label: "Cerato" },
    { value: "sportage", label: "Sportage" },
    { value: "sorento", label: "Sorento" },
  ],
  nissan: [
    { value: "navara", label: "Navara" },
    { value: "xtrail", label: "X-Trail" },
    { value: "patrol", label: "Patrol" },
  ],
  honda: [
    { value: "civic", label: "Civic" },
    { value: "crv", label: "CR-V" },
    { value: "accord", label: "Accord" },
  ],
  mitsubishi: [
    { value: "triton", label: "Triton" },
    { value: "outlander", label: "Outlander" },
    { value: "pajero", label: "Pajero" },
  ],
  subaru: [
    { value: "forester", label: "Forester" },
    { value: "outback", label: "Outback" },
    { value: "wrx", label: "WRX" },
  ],
  volkswagen: [
    { value: "golf", label: "Golf" },
    { value: "tiguan", label: "Tiguan" },
    { value: "amarok", label: "Amarok" },
  ],
  bmw: [
    { value: "3series", label: "3 Series" },
    { value: "x3", label: "X3" },
    { value: "x5", label: "X5" },
  ],
  mercedes: [
    { value: "cclass", label: "C-Class" },
    { value: "glc", label: "GLC" },
    { value: "gle", label: "GLE" },
  ],
  audi: [
    { value: "a4", label: "A4" },
    { value: "q5", label: "Q5" },
    { value: "q7", label: "Q7" },
  ],
}

// Mock Australian locations for location step
export const mockLocations = [
  { value: "sydney", label: "Sydney, NSW", ref: "sydney-nsw" },
  { value: "melbourne", label: "Melbourne, VIC", ref: "melbourne-vic" },
  { value: "brisbane", label: "Brisbane, QLD", ref: "brisbane-qld" },
  { value: "perth", label: "Perth, WA", ref: "perth-wa" },
  { value: "adelaide", label: "Adelaide, SA", ref: "adelaide-sa" },
  { value: "hobart", label: "Hobart, TAS", ref: "hobart-tas" },
  { value: "darwin", label: "Darwin, NT", ref: "darwin-nt" },
  { value: "canberra", label: "Canberra, ACT", ref: "canberra-act" },
  { value: "goldcoast", label: "Gold Coast, QLD", ref: "goldcoast-qld" },
  { value: "newcastle", label: "Newcastle, NSW", ref: "newcastle-nsw" },
  { value: "cairns", label: "Cairns, QLD", ref: "cairns-qld" },
  { value: "townsville", label: "Townsville, QLD", ref: "townsville-qld" },
]

