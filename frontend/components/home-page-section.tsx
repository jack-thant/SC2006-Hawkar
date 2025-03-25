"use client";

import HawkerStallList from "@/components/hawker-stall-list"
import Navbar from "@/components/navbar"
import SearchBar from "@/components/search-bar"
import ViewToggle from "@/components/view-toggle"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic";

// Import MapView dynamically with no SSR to avoid hydration issues
const MapView = dynamic(() => import("@/components/map-view"), {
    ssr: false,
    loading: () => (
        <div className="h-[calc(100vh-200px)] w-full rounded-lg bg-gray-100 flex items-center justify-center">
            <p>Loading map...</p>
        </div>
    ),
})

const mapLocations = [
    { id: "1", name: "Tian Tian Chicken Rice", lat: 1.2805, lng: 103.8451, price: "$4 - $6" },
    { id: "2", name: "Hill Street Tai Hwa Pork Noodle", lat: 1.3041, lng: 103.8626, price: "$6 - $10" },
    { id: "3", name: "Liao Fan Hawker Chan", lat: 1.2815, lng: 103.844, price: "$3 - $5" },
    { id: "4", name: "Nasi Lemak Kukus", lat: 1.3171, lng: 103.8946, price: "$4 - $7" },
    { id: "5", name: "Tekka Seafood Delights", lat: 1.3065, lng: 103.8518, price: "$8 - $15" },
    { id: "6", name: "Ah Hock Fried Hokkien Noodles", lat: 1.3651, lng: 103.8696, price: "$4 - $6" },
]

export default function HomePageSection() {
    const [currentView, setCurrentView] = useState<"list" | "map" | "both">("both")

    const handleViewToggle = (view: "list" | "map" | "both") => {
        setCurrentView(view)
    }

    const [mounted, setMounted] = useState(false)

    // Set mounted state to true after component mounts
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar username="John Doe" />
            <div className="flex flex-col items-center justify-center text-center p-8">
                <h1 className="text-3xl font-bold">Your Guide to the Best Hawker Eats!</h1>
                <p className="mt-4 text-muted-foreground max-w-2xl">
                    From legendary chicken rice to the crispiest prata, uncover Singapore’s best hawker stalls. Browse reviews, discover top-rated dishes, and share your foodie finds!
                </p>
            </div>
            <div className="mb-8 px-6">
                <SearchBar />
            </div>
            <div className="flex justify-center mb-6">
                <ViewToggle onToggle={handleViewToggle} currentView={currentView} />
            </div>

            {mounted && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative px-8">
                    {/* List View */}
                    {(currentView === "list" || currentView === "both") && (
                        <div className={`${currentView === "both" ? "lg:col-span-2" : "lg:col-span-3"}`}>
                            <HawkerStallList />
                        </div>
                    )}

                    {/* Map View */}
                    {(currentView === "map" || currentView === "both") && (
                        <div
                            className={`
                      ${currentView === "map" ? "lg:col-span-3" : "lg:col-span-1"} 
                      h-[calc(100vh-200px)]
                    `}
                        >
                            <MapView locations={mapLocations} />
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}