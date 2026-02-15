import { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid"

interface RatingFilterProps {
  maxRating?: number
}

const Rating = ({ maxRating = 5 }: RatingFilterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])

  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    )
  }

  return (
    <div className="relative w-60 ml-4 -mb-1 mt-4">
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="ml-2 text-black">Ratings</span>
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
            {Array.from({ length: maxRating }, (_, i) => {
              const rating = maxRating - i
              const checked = selectedRatings.includes(rating)

              return (
                <label
                  key={rating}
                  className="flex items-center mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleRating(rating)}
                    className="w-4 h-4"
                  />

                  {/* Stars */}
                  <div className="flex ml-2">
                    {Array.from({ length: maxRating }).map((_, idx) => (
                      <SolidStarIcon
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < rating ? "text-yellow-400" : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </label>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Rating
