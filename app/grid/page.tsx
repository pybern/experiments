"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { PlusIcon, CheckIcon } from "lucide-react"
import { vehicleTypes, type VehicleType } from "@/data/vehicle-types"

function GridCard({
  item,
  index,
  isSelected,
  onToggle,
}: {
  item: VehicleType
  index: number
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
      onClick={onToggle}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border bg-white transition-all duration-200 ${
        isSelected 
          ? "border-neutral-400 shadow-lg ring-2 ring-neutral-800 ring-offset-2" 
          : "border-neutral-200 hover:border-neutral-300 hover:shadow-md"
      }`}
    >
      {/* Hero Image Section */}
      <div className="relative flex h-36 items-center justify-center bg-white p-4">
        <motion.img 
          src={item.image} 
          alt={item.title}
          className="h-full w-auto max-w-full object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        {/* Subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-100/30 via-transparent to-rose-100/30" />
        
        {/* Add/Check button - positioned in corner */}
        <motion.div
          initial={false}
          animate={{ 
            scale: isSelected ? 1 : 0.9,
            opacity: isSelected ? 1 : 0.8
          }}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-sm transition-colors ${
            isSelected
              ? "border-neutral-800 bg-neutral-800 text-white"
              : "border-neutral-300 bg-white text-neutral-400 group-hover:border-neutral-400 group-hover:text-neutral-600"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isSelected ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <CheckIcon className="h-4 w-4" strokeWidth={3} />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <PlusIcon className="h-4 w-4" strokeWidth={2} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="text-sm font-semibold text-neutral-900">
          {item.title}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
          {item.description}
        </p>
      </div>

      {/* Selection indicator bar */}
      <motion.div
        initial={false}
        animate={{ 
          scaleX: isSelected ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-neutral-800"
      />
    </motion.div>
  )
}

export default function GridPage() {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null)

  const selectItem = (title: string) => {
    setSelectedItem(selectedItem === title ? null : title)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <p className="text-sm font-medium text-neutral-400">Step 1 of 2</p>
          <h1 className="mt-2 font-serif text-3xl text-neutral-900 md:text-4xl">
            What would you like to transport?
          </h1>
          <p className="mt-2 text-neutral-500">
            Select a vehicle type that matches your needs.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {vehicleTypes.map((item, index) => (
            <GridCard
              key={item.title}
              item={item}
              index={index}
              isSelected={selectedItem === item.title}
              onToggle={() => selectItem(item.title)}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-6"
        >
          <p className="text-sm text-neutral-500">
            {selectedItem ? (
              <>
                Selected: <span className="font-semibold text-neutral-800">{selectedItem}</span>
              </>
            ) : (
              "No item selected"
            )}
          </p>
          
          <button
            disabled={!selectedItem}
            className={`rounded-sm px-6 py-2.5 text-sm font-medium transition-all ${
              selectedItem
                ? "bg-neutral-900 text-white hover:bg-neutral-800"
                : "cursor-not-allowed bg-neutral-200 text-neutral-400"
            }`}
          >
            Continue
          </button>
        </motion.div>
      </div>
    </div>
  )
}

