"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react"
import {
  CarIcon,
  TruckIcon,
  CaravanIcon,
  BusIcon,
  ContainerIcon,
  BikeIcon,
  HardHatIcon,
  ShipIcon,
  ForkliftIcon,
  CarFrontIcon,
  PackageIcon,
  CircleEllipsisIcon,
} from "lucide-react"

const dockItems = [
  {
    icon: CarIcon,
    category: "Cars, SUV's & 4WD's",
    emoji: "🚗",
    image: "/wmx/CARS SUV 4WD.png",
    description: "We offer reliable transport for standard passenger vehicles, ensuring safe and efficient delivery for everyday cars and smaller SUVs.",
    details: ["Sedans", "Hatches", "SUVs", "4Wd's", "Station Wagon", "Utes"],
    features: "(up to 5.2m long and 1.9m high)"
  },
  {
    icon: TruckIcon,
    category: "Oversized Vans, Utes and 4WD's",
    emoji: "🚙",
    image: "/wmx/VANS 4WD.png",
    description: "Specialised transport for vans, oversized passenger vehicles, utility vehicles and mine spec vehicles.",
    details: ["Large SUV's & 4Wds", "Vans", "Cab Chassis", "Mini Bus", "Camper Vans", "Motorhomes", "Utes", "Golf Carts", "ATV's"],
    features: "(over 5.2m long and 1.9m high)"
  },
  {
    icon: CaravanIcon,
    category: "Caravan & Campers",
    emoji: "🏕️",
    image: "/wmx/CARAVANS CAMPERVANS.png",
    description: "All towable items including camper trailers, caravans and 5th wheelers.",
    details: ["Caravans", "Camper Trailers", "5th Wheelers", "Motorhomes", "Pop up Campers", "Toy Hauler"],
  },
  {
    icon: BusIcon,
    category: "Trucks & Buses",
    emoji: "🚛",
    image: "/wmx/BUSES TRUCKS.png",
    description: "Heavy-duty transport solutions for commercial trucks and passenger buses. We also cater for tankers and tipper trucks.",
    details: ["Trucks", "Buses", "Tautliners", "Semi Trailers", "Rigids", "Pantechs", "Utes and Trays", "Limousines", "Motorhomes"],
  },
  {
    icon: ContainerIcon,
    category: "Trailers & Towable items",
    emoji: "🚚",
    image: "/wmx/TRAILERS.png",
    description: "Secure transport for various trailers and towable equipment, ideal for construction and recreational use.",
    details: ["Trailers", "Camper Trailers", "Semi Trailer", "Curtain Siders", "Tankers"],
  },
  {
    icon: BikeIcon,
    category: "Motorbikes & Quads",
    emoji: "🏍️",
    image: "/wmx/MOTORBIKES.png",
    description: "Dedicated personalised service for two-wheeled bikes, quads and trikes. Fully enclosed transport for your dream machine.",
    details: ["Motorcycles", "Quads", "Trikes", "eBikes", "Bicycles"],
  },
  {
    icon: HardHatIcon,
    category: "Mining Equipment & Heavy Machinery",
    emoji: "🏗️",
    image: "/wmx/MINING HEAVY MACHINERY.png",
    description: "Robust transport for mining and heavy industrial machinery, handling extreme weights and sizes. Nothing is too big.",
    details: ["Excavators", "Cranes", "Tractors", "Bulldozers", "Bobcats", "Tracked Vehicles", "All Rubber Tyre Vehicles"],
  },
  {
    icon: ShipIcon,
    category: "Boats & Jet Skis on Trailers",
    emoji: "🛥️",
    image: "/wmx/JETSKIS BOATS.png",
    description: "Fully enclosed specialised transport for trailered boats and jet skis.",
    details: ["Boat on trailer", "Jet Ski on trailer"],
  },
  {
    icon: ForkliftIcon,
    category: "Forklift, Mobile Cranes & Stackers",
    emoji: "🏭",
    image: "/wmx/FORKLIFTS.png",
    description: "Any industrial lifting equipment for warehouses and construction sites. If it has wheels or tracks, we move it.",
    details: ["Up to 6 tonne", "Over 6 tonne", "Stackers", "Telehandlers", "Cherry Pickers"],
  },
  {
    icon: CarFrontIcon,
    category: "Salvage & Non-Running Vehicles",
    emoji: "🛠️",
    image: "/wmx/SALAVAGE.png",
    description: "Transport for damaged or non-operational vehicles, including salvage operations. Specialising in movements from Pickles, Manheim and salvage yards.",
    details: ["Cars", "SUV's", "Trucks", "Motorbikes", "Vans"],
  },
  {
    icon: PackageIcon,
    category: "General Freight & Containers",
    emoji: "📦",
    image: "/wmx/GENERAL FRIEGHT CONTAINERS.png",
    description: "Versatile freight services for containers and general palletised cargo. Nothing is too big or too small, from an envelope to a 40-foot container we move it all.",
    details: ["Envelopes", "Boxes and cartons", "Skids", "Pallets", "Full loads (22 pallets)", "20Ft Containers", "40FT Containers", "DG's", "Local Couriers", "International Air Freight"],
  },
  {
    icon: CircleEllipsisIcon,
    category: "Other",
    emoji: "🚜",
    image: "/wmx/OTHER.png",
    description: "For all the items that we can't list! If it's moveable, we have a solution. We have successfully moved a helicopter and a train carriage.",
    details: ["All Rubber Tyre Vehicles", "All tracked vehicles"],
  },
]

// Stylized card for selected option
function SelectionCard({ 
  selectedItem 
}: { 
  selectedItem: typeof dockItems[0] | null 
}) {
  return (
    <div className="relative flex h-[420px] flex-col items-center px-4">
      <AnimatePresence mode="wait" initial={false}>
        {selectedItem && (
          <motion.div
            key={selectedItem.category}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.15, ease: "easeOut" }
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0 }
            }}
            className="h-full w-full max-w-2xl"
          >
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl shadow-neutral-200/50">
              {/* Image Section */}
              <div className="relative flex h-44 shrink-0 items-center justify-center bg-white p-4">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.category}
                  className="h-full w-auto object-contain"
                />
                {/* Pinkish gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-100/50 via-transparent to-rose-100/50" />
              </div>
              
              {/* Content Section */}
              <div className="flex flex-1 flex-col overflow-hidden p-6">
                {/* Title */}
                <h3 className="text-xl font-semibold text-neutral-900">
                  {selectedItem.category}
                </h3>
                
                {/* Features badge */}
                {selectedItem.features && (
                  <span className="mt-2 inline-block self-start rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-700">
                    {selectedItem.features}
                  </span>
                )}
                
                {/* Description */}
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                  {selectedItem.description}
                </p>
                
                {/* Details */}
                <div className="mt-auto pt-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.details.map((detail) => (
                      <span 
                        key={detail}
                        className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-600"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DockItem({
  icon: Icon,
  category,
  mouseX,
  isSelected,
  onClick,
}: {
  icon: React.ElementType
  category: string
  mouseX: ReturnType<typeof useMotionValue<number>>
  isSelected: boolean
  onClick: () => void
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = React.useState(false)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const sizeSync = useTransform(distance, [-100, 0, 100], [44, 56, 44])
  const size = useSpring(sizeSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const ySync = useTransform(distance, [-100, 0, 100], [0, -6, 0])
  const y = useSpring(ySync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size, y }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && !isSelected && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-800 px-2.5 py-1 text-xs font-medium text-white shadow-lg"
          >
            {category}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon Button */}
      <motion.button
        onClick={onClick}
        className={`flex h-full w-full cursor-pointer items-center justify-center rounded-full border transition-colors ${
          isSelected
            ? "border-neutral-800 bg-neutral-800 text-white"
            : "border-neutral-300 bg-neutral-200 text-neutral-600 hover:bg-neutral-300 hover:text-neutral-900"
        }`}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Icon
          className="h-[40%] w-[40%]"
          strokeWidth={1.5}
        />
      </motion.button>

    </motion.div>
  )
}

export function FloatingDock() {
  const mouseX = useMotionValue(Infinity)
  const [selectedItem, setSelectedItem] = React.useState<typeof dockItems[0] | null>(dockItems[0])

  const handleItemClick = (item: typeof dockItems[0]) => {
    setSelectedItem(selectedItem?.category === item.category ? null : item)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Primary Header */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.1,
        }}
        className="text-center text-5xl font-semibold tracking-tight text-neutral-800"
      >
        What will we move today?
      </motion.h1>

      {/* Instruction */}
      <p className="text-sm text-neutral-500">Select your vehicle</p>

      {/* Dock */}
      <div className="-mt-2 flex h-24 items-start justify-center">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2,
          }}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex items-end gap-3 rounded-3xl border border-neutral-200/80 bg-white/80 px-5 py-4 shadow-lg shadow-neutral-200/50 backdrop-blur-sm"
        >
          {dockItems.map((item) => (
            <DockItem
              key={item.category}
              icon={item.icon}
              category={item.category}
              mouseX={mouseX}
              isSelected={selectedItem?.category === item.category}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </motion.div>
      </div>

      {/* Selection Card */}
      <SelectionCard selectedItem={selectedItem} />
    </div>
  )
}
