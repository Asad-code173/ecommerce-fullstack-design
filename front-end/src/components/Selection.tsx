import { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

interface SelectionProps {
  label: string
  options: string[]
  variant?: "checkbox" | "radio" | "list" 
}

const Selection = ({ label, options, variant = "checkbox" }: SelectionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null)
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([])

  const visibleOptions = showAll ? options : options.slice(0, 4)

  const toggleCheckbox = (option: string) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    )
  }

  return (
    <div className="relative w-60 ml-4 -mb-1 mt-4 bg-gray-50">
    
      <div
        className="flex items-center justify-between px-3 py-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="ml-2 text-black">{label}</span>
        <ChevronDownIcon
          className={`w-6 h-6 text-gray-700 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

    
      {isOpen && (
        <div className="border-b border-gray-300">
          <div className="flex flex-col py-2 px-3">
            {visibleOptions?.map((option) => (
              <div
                key={option}
                className={`mb-2 flex items-center cursor-pointer text-gray-700`}
                onClick={() => {
                  if (variant === "checkbox") toggleCheckbox(option)
                  if (variant === "radio") setSelectedRadio(option)
                }}
              >
                {variant === "checkbox" && (
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedCheckboxes.includes(option)}
                    onChange={() => toggleCheckbox(option)}
                  />
                )}

                {variant === "radio" && (
                  <input
                    type="radio"
                    className="w-4 h-4"
                    name={label}
                    checked={selectedRadio === option}
                    onChange={() => setSelectedRadio(option)}
                  />
                )}

                <span className="ml-2">{option}</span>
              </div>
            ))}

          
            {options.length > 4 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowAll(!showAll)
                }}
                className="text-sm text-blue-500 mt-1 self-start ml-2"
              >
                {showAll ? "Show less" : "See all"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Selection
