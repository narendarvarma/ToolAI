"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { useToolRatings } from "@/hooks/use-tool-ratings"

interface ToolRatingProps {
  toolPath: string
  toolName: string
}

export default function ToolRating({ toolPath, toolName }: ToolRatingProps) {
  const { rating, averageRating, rateTool } = useToolRatings(toolPath)
  const [hoveredRating, setHoveredRating] = useState(0)

  return (
    <div className="mt-8 p-6 bg-[#111827] rounded-2xl border border-white/8">
      <h3 className="text-lg font-semibold text-white mb-4">Was this tool helpful? Rate it:</h3>
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => rateTool(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-6 w-6 ${
                star <= (hoveredRating || rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-600"
              }`}
            />
          </button>
        ))}
      </div>
      {rating > 0 && (
        <p className="text-sm text-gray-400">
          You rated this tool {rating} star{rating !== 1 ? "s" : ""}
        </p>
      )}
      {averageRating > 0 && (
        <p className="text-sm text-gray-400 mt-2">
          Average rating: {averageRating.toFixed(1)} / 5.0
        </p>
      )}
    </div>
  )
}
