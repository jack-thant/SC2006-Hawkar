"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

interface HawkerStall {
    id: string
    name: string
    image: string
    rating: number
    reviewCount: number
    priceRange: string
    hawkerCenter: string
    cuisine: string
    isFavorite: boolean
    location: {
        lat: number
        lng: number
    }
}

const mockHawkerStalls: HawkerStall[] = [
    {
        id: "1",
        name: "Tian Tian Chicken Rice",
        image: "/images/hs6.jpg",
        rating: 4.7,
        reviewCount: 328,
        priceRange: "$4 - $6",
        hawkerCenter: "Maxwell Food Centre",
        cuisine: "Chinese",
        isFavorite: true,
        location: {
            lat: 1.2805,
            lng: 103.8451,
        },
    },
    {
        id: "2",
        name: "Hill Street Tai Hwa Pork Noodle",
        image: "/images/hs1.jpg",
        rating: 4.8,
        reviewCount: 412,
        priceRange: "$6 - $10",
        hawkerCenter: "Crawford Lane",
        cuisine: "Chinese",
        isFavorite: false,
        location: {
            lat: 1.3041,
            lng: 103.8626,
        },
    },
    {
        id: "3",
        name: "Liao Fan Hawker Chan",
        image: "/images/hs2.jpg",
        rating: 4.5,
        reviewCount: 287,
        priceRange: "$3 - $5",
        hawkerCenter: "Chinatown Complex",
        cuisine: "Chinese",
        isFavorite: true,
        location: {
            lat: 1.2815,
            lng: 103.844,
        },
    },
    {
        id: "4",
        name: "Nasi Lemak Kukus",
        image: "/images/hs3.jpg",
        rating: 4.6,
        reviewCount: 198,
        priceRange: "$4 - $7",
        hawkerCenter: "Geylang Serai Market",
        cuisine: "Malay",
        isFavorite: false,
        location: {
            lat: 1.3171,
            lng: 103.8946,
        },
    },
    {
        id: "5",
        name: "Tekka Seafood Delights",
        image: "/images/hs4.jpg",
        rating: 4.4,
        reviewCount: 156,
        priceRange: "$8 - $15",
        hawkerCenter: "Tekka Centre",
        cuisine: "Indian",
        isFavorite: false,
        location: {
            lat: 1.3065,
            lng: 103.8518,
        },
    },
    {
        id: "6",
        name: "Ah Hock Fried Hokkien Noodles",
        image: "/images/hs5.jpg",
        rating: 4.7,
        reviewCount: 245,
        priceRange: "$4 - $6",
        hawkerCenter: "Chomp Chomp Food Centre",
        cuisine: "Chinese",
        isFavorite: true,
        location: {
            lat: 1.3651,
            lng: 103.8696,
        },
    },
]

export default function HawkerStallList() {
    const [stalls, setStalls] = useState<HawkerStall[]>(mockHawkerStalls)
    const router = useRouter()

    const toggleFavorite = (id: string) => {
        setStalls(stalls.map((stall) => (stall.id === id ? { ...stall, isFavorite: !stall.isFavorite } : stall)))
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {stalls.map((stall) => (
                <div key={stall.id} className="rounded-xl border overflow-hidden cursor-pointer group" onClick={() => router.push(`/stall/${stall.id}`) }>
                    <div className="relative">
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <Image
                                src={stall.image || "/placeholder.svg"}
                                alt={stall.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <div className={`absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium ${!stall.isFavorite ? 'hidden' : ''}`}>
                            Popular Choice
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white"
                            onClick={() => toggleFavorite(stall.id)}
                        >
                            <Heart className={`h-5 w-5 ${stall.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                            <span className="sr-only">Toggle favorite</span>
                        </Button>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start">
                            <h3 className="font-medium text-lg">{stall.name}</h3>
                            <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span className="text-sm font-medium">{stall.rating}</span>
                                <span className="text-sm text-gray-500 ml-1">({stall.reviewCount})</span>
                            </div>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">{stall.hawkerCenter}</div>
                        <div className="mt-1 text-sm text-gray-500">{stall.cuisine}</div>
                        <div className="mt-2 font-medium">{stall.priceRange}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}