"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import FilterModal from "./filter-modal"

export interface FilterState {
  startTime: string
  endTime: string
  amenities: string[]
  accessibility: string[]
  foodPreferences: string[]
  priceRange: number
  location: string
  hygieneRating: string
}

export default function SearchBar() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [appliedFilters, setAppliedFilters] = useState<FilterState | null>(null)

  const handleApplyFilters = (filters: FilterState) => {
    setAppliedFilters(filters)
    setIsFilterOpen(false)
  }

  const removeFilter = (filterType: keyof FilterState) => {
    if (!appliedFilters) return

    const newFilters = { ...appliedFilters }

    if (filterType === "amenities" || filterType === "accessibility" || filterType === "foodPreferences") {
      newFilters[filterType] = []
    } else if (filterType === "startTime" || filterType === "endTime") {
      newFilters[filterType] = ""
    } else if (filterType === "priceRange") {
      newFilters[filterType] = 3
    } else {
      newFilters[filterType] = ""
    }

    setAppliedFilters(newFilters)
  }

  const clearAllFilters = () => {
    setAppliedFilters(null)
  }

  return (
    <div className="w-full">
      <div className="flex w-full max-w-3xl mx-auto gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 py-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 py-6">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>

      {/* Applied Filters */}
      {appliedFilters && (
        <div className="mt-3 flex flex-wrap gap-2 max-w-3xl mx-auto">
          {appliedFilters.startTime && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Opens: {appliedFilters.startTime}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter("startTime")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {appliedFilters.endTime && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Closes: {appliedFilters.endTime}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter("endTime")}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {appliedFilters.amenities.map((amenity) => (
            <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
              {amenity}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  const newAmenities = appliedFilters.amenities.filter((a) => a !== amenity)
                  setAppliedFilters({ ...appliedFilters, amenities: newAmenities })
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {appliedFilters.accessibility.map((item) => (
            <Badge key={item} variant="secondary" className="flex items-center gap-1">
              {item}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  const newItems = appliedFilters.accessibility.filter((a) => a !== item)
                  setAppliedFilters({ ...appliedFilters, accessibility: newItems })
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {appliedFilters.foodPreferences.map((food) => (
            <Badge key={food} variant="secondary" className="flex items-center gap-1">
              {food}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  const newFoods = appliedFilters.foodPreferences.filter((f) => f !== food)
                  setAppliedFilters({ ...appliedFilters, foodPreferences: newFoods })
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {appliedFilters.priceRange > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Max Price: ${appliedFilters.priceRange}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter("priceRange")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {appliedFilters.location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Location: {appliedFilters.location}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter("location")}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {appliedFilters.hygieneRating && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Hygiene: {appliedFilters.hygieneRating}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter("hygieneRating")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {(appliedFilters.startTime ||
            appliedFilters.endTime ||
            appliedFilters.amenities.length > 0 ||
            appliedFilters.accessibility.length > 0 ||
            appliedFilters.foodPreferences.length > 0 ||
            appliedFilters.priceRange > 0 ||
            appliedFilters.location ||
            appliedFilters.hygieneRating) && (
            <Button variant="ghost" size="sm" className="text-xs" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={appliedFilters}
      />
    </div>
  )
}

