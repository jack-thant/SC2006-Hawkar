"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { TimePicker } from "@/components/ui/time-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FilterState } from "./search-bar"

interface FilterModalProps {
    isOpen: boolean
    onClose: () => void
    onApply: (filters: FilterState) => void
    initialFilters: FilterState | null
}

const singaporeLocations = [
    "Ang Mo Kio",
    "Bedok",
    "Bishan",
    "Bukit Batok",
    "Bukit Merah",
    "Bukit Panjang",
    "Bukit Timah",
    "Changi",
    "Choa Chu Kang",
    "Clementi",
    "Downtown Core",
    "Geylang",
    "Hougang",
    "Jurong East",
    "Jurong West",
    "Kallang",
    "Marine Parade",
    "Novena",
    "Orchard",
    "Pasir Ris",
    "Punggol",
    "Queenstown",
    "Sembawang",
    "Sengkang",
    "Serangoon",
    "Tampines",
    "Toa Payoh",
    "Woodlands",
    "Yishun",
]

const defaultFilters: FilterState = {
    startTime: "",
    endTime: "",
    amenities: [],
    accessibility: [],
    foodPreferences: [],
    priceRange: 10,
    location: "",
    hygieneRating: "",
}

export default function FilterModal({ isOpen, onClose, onApply, initialFilters }: FilterModalProps) {
    const [filters, setFilters] = useState<FilterState>(initialFilters || defaultFilters)

    useEffect(() => {
        if (initialFilters) {
            setFilters(initialFilters)
        } else {
            setFilters(defaultFilters)
        }
    }, [initialFilters, isOpen])

    if (!isOpen) return null

    const toggleSelection = (
        item: string,
        currentSelections: string[],
        field: keyof Pick<FilterState, "amenities" | "accessibility" | "foodPreferences">,
    ) => {
        if (currentSelections.includes(item)) {
            setFilters({
                ...filters,
                [field]: currentSelections.filter((i) => i !== item),
            })
        } else {
            setFilters({
                ...filters,
                [field]: [...currentSelections, item],
            })
        }
    }

    const handleApplyFilters = () => {
        onApply(filters)
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-4 flex items-center justify-between border-b">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="p-4 space-y-6">
                    {/* Operating Hours */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label htmlFor="start-time" className="text-sm">
                                Starting Hours
                            </label>
                            <TimePicker
                                value={filters.startTime}
                                onChange={(value) => setFilters({ ...filters, startTime: value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="end-time" className="text-sm">
                                Closing Hours
                            </label>
                            <TimePicker value={filters.endTime} onChange={(value) => setFilters({ ...filters, endTime: value })} />
                        </div>
                    </div>

                    {/* Amenities */}
                    <div>
                        <h3 className="font-medium mb-2">Amenities</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="outline"
                                className={`bg-gray-200 hover:bg-gray-300 border-0 py-6 ${filters.amenities.includes("Washroom")
                                        ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                                        : ""
                                    }`}
                                onClick={() => toggleSelection("Washroom", filters.amenities, "amenities")}
                            >
                                Washroom
                            </Button>
                            <Button
                                variant="outline"
                                className={`bg-gray-200 hover:bg-gray-300 border-0 py-6 ${filters.amenities.includes("Parking Space")
                                        ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                                        : ""
                                    }`}
                                onClick={() => toggleSelection("Parking Space", filters.amenities, "amenities")}
                            >
                                Parking Space
                            </Button>
                        </div>
                    </div>

                    {/* Accessibility */}
                    <div>
                        <h3 className="font-medium mb-2">Accessibility</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="outline"
                                className={`bg-gray-200 hover:bg-gray-300 border-0 py-6 ${filters.accessibility.includes("Wheelchair Access")
                                        ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                                        : ""
                                    }`}
                                onClick={() => toggleSelection("Wheelchair Access", filters.accessibility, "accessibility")}
                            >
                                Wheelchair Access
                            </Button>
                            <Button
                                variant="outline"
                                className={`bg-gray-200 hover:bg-gray-300 border-0 py-6 ${filters.accessibility.includes("Railing Support")
                                        ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                                        : ""
                                    }`}
                                onClick={() => toggleSelection("Railing Support", filters.accessibility, "accessibility")}
                            >
                                Railing Support
                            </Button>
                            <Button
                                variant="outline"
                                className={`bg-gray-200 hover:bg-gray-300 border-0 py-6 ${filters.accessibility.includes("Tactile Paving")
                                        ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                                        : ""
                                    }`}
                                onClick={() => toggleSelection("Tactile Paving", filters.accessibility, "accessibility")}
                            >
                                Tactile Paving
                            </Button>
                        </div>
                    </div>

                    {/* Food Preferences */}
                    <div>
                        <h3 className="font-medium mb-2">Food Preferences</h3>
                        <div className="flex flex-wrap gap-3">
                            {["Chinese", "Indian", "Malay", "Indonesian", "Japanese", "Korean", "Thai"].map((food) => (
                                <Button
                                    key={food}
                                    variant="outline"
                                    className={`bg-gray-200 hover:bg-gray-300 border-0 py-6 ${filters.foodPreferences.includes(food)
                                            ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                                            : ""
                                        }`}
                                    onClick={() => toggleSelection(food, filters.foodPreferences, "foodPreferences")}
                                >
                                    {food}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className="font-medium mb-2">Price Range</h3>
                        <div className="pt-2 pb-2">
                            <Slider
                                value={[filters.priceRange]}
                                onValueChange={(value) => setFilters({ ...filters, priceRange: value[0] })}
                                max={20}
                                step={1}
                                className="my-4"
                            />
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <div className="text-sm">Low</div>
                                <div className="bg-gray-200 px-2 py-1 rounded text-sm mt-1">$0</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-medium">Selected: ${filters.priceRange}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm">High</div>
                                <div className="bg-gray-200 px-2 py-1 rounded text-sm mt-1">$20</div>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <h3 className="font-medium mb-2">Location</h3>
                        <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
                            <SelectTrigger className="bg-gray-200 border-0 w-full py-6">
                                <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                                {singaporeLocations.map((location) => (
                                    <SelectItem key={location} value={location}>
                                        {location}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Hygiene Ratings */}
                    <div>
                        <h3 className="font-medium mb-2">Hygiene Ratings</h3>
                        <Select
                            value={filters.hygieneRating}
                            onValueChange={(value) => setFilters({ ...filters, hygieneRating: value })}
                        >
                            <SelectTrigger className="bg-gray-200 border-0 w-full py-6">
                                <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="A">A</SelectItem>
                                <SelectItem value="B">B</SelectItem>
                                <SelectItem value="C">C</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Apply Button */}
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 mt-2" onClick={handleApplyFilters}>
                        Apply Filters
                    </Button>
                </div>
            </div>
        </div>
    )
}