"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Stall } from "@/app/types/stall"

interface HawkerStallListProps {
    stalls: Array<Stall>
}

export default function HawkerStallList({ stalls }: HawkerStallListProps) {
    const router = useRouter()

    // const toggleFavorite = (id: string) => {
    //     setStalls(stalls.map((stall) => (stall.id === id ? { ...stall, isFavorite: !stall.isFavorite } : stall)))
    // }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {stalls.map((stall) => (
                <div key={stall.stallID} className="rounded-xl border overflow-hidden group">
                    <div className="relative">
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <Image
                                src={stall.images[0] || "/placeholder.svg"}
                                alt={stall.stallName}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        {/* <div className={`absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium ${!stall.isFavorite ? 'hidden' : ''}`}>
                            Popular Choice
                        </div> */}
                        {/* <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white"
                            onClick={() => toggleFavorite(stall.id)}
                        >
                            <Heart className={`h-5 w-5 ${stall.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                            <span className="sr-only">Toggle favorite</span>
                        </Button> */}
                    </div>
                    <div className="p-4 cursor-pointer" onClick={() => router.push(`/stall/${stall.stallID}`) }>
                        <div className="flex justify-between items-start">
                            <h3 className="font-medium text-lg">{stall.stallName}</h3>
                            {/* <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span className="text-sm font-medium">{stall.rating}</span>
                                <span className="text-sm text-gray-500 ml-1">({stall.reviewCount})</span>
                            </div> */}
                        </div>
                        <div className="mt-1 text-sm text-gray-500 truncate">{stall.hawkerCenter.name}</div>
                        {
                            stall.cuisineType.map((cuisine, id) => (
                                <span key={id} className="mt-1 text-sm text-gray-500 mr-1">{cuisine}</span>
                            ))
                        }
                        <div className="mt-2 font-medium">{stall.priceRange}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}