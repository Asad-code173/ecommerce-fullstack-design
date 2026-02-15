import { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

const MIN = 0
const MAX = 99999

const PriceRange = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [min, setMin] = useState<string>("")
  const [max, setMax] = useState<string>("")

  const handleApply = () => {
    const minValue = min === "" ? MIN : Number(min)
    const maxValue = max === "" ? MAX : Number(max)

    console.log("Applied price range:", minValue, maxValue)
  }

  return (
    <div className="relative w-60 ml-4 -mb-1 mt-4">
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="ml-2 text-black">Price range</span>
        <ChevronDownIcon
          className={`w-6 h-6 text-gray-700 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Content */}
      {isOpen && (
        <div className="border-b border-gray-300">
          <div className="flex flex-col py-2 px-3">
            {/* Slider */}
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={max === "" ? MAX : Number(max)}
              onChange={(e) => setMax(e.target.value)}
              className="w-full mb-3 accent-blue-600"
            />

            {/* Min / Max */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Min</span>
                <input
                  type="number"
                  placeholder="0"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="border rounded px-2 py-1 w-24 text-sm"
                />
              </div>

              <span className="mt-4 text-gray-400">—</span>

              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Max</span>
                <input
                  type="number"
                  placeholder="999999"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="border rounded px-2 py-1 w-24 text-sm"
                />
              </div>
            </div>

            {/* Apply */}
            <button
              onClick={handleApply}
              className="w-full border rounded py-1 text-sm text-blue-500 hover:bg-gray-100"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PriceRange
