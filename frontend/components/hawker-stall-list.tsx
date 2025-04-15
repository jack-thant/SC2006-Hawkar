"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Loader2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Stall } from "@/app/types/stall"
import { likeStall, unlikeStall } from "@/app/lib/actions/like-actions"

interface HawkerStallListProps {
    stalls: Array<Stall>
    userID: string
    likedStallDetails: Array<Stall>
}

export default function HawkerStallList({ stalls, userID, likedStallDetails }: HawkerStallListProps) {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [likedStalls, setLikedStalls] = useState<Stall[]>([]);

    // Add a state to track loading states for individual stalls
    const [loadingStalls, setLoadingStalls] = useState<Set<number>>(new Set());

    // Update the toggleLike function to handle individual loading states
    const toggleLike = async (stallID: number, event: React.MouseEvent) => {
        // Prevent the click from propagating to parent elements
        event.stopPropagation();

        // Set loading state for this specific stall
        setLoadingStalls(prev => new Set(prev).add(stallID));

        try {
            const isCurrentlyLiked = likedStallDetails.some(stall => stall.stallID === stallID);

            if (isCurrentlyLiked) {
                // If currently liked, unlike it
                await unlikeStall(userID, stallID);

                // Remove from likedStallDetails
                setLikedStalls(prev =>
                    prev.filter(stall => stall.stallID !== stallID)
                );
            } else {
                // If not liked, like it
                await likeStall(userID, stallID);

                // Find the stall details from the stalls array
                const stallDetail = stalls.find(s => s.stallID === stallID);
                if (stallDetail) {
                    setLikedStalls(prev => [...prev, stallDetail]);
                }
            }
            router.refresh()
        } catch (error) {
            console.error("Error toggling like state for stall", stallID, error);
        } finally {
            // Remove loading state for this specific stall
            setLoadingStalls(prev => {
                const newSet = new Set(prev);
                newSet.delete(stallID);
                return newSet;
            });
        }
    };
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
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white"
                            onClick={(e) => toggleLike(stall.stallID, e)}
                            disabled={loadingStalls.has(stall.stallID)}
                        >
                            {loadingStalls.has(stall.stallID) ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Heart className={`h-5 w-5 ${likedStallDetails.some(likedStall => likedStall.stallID === stall.stallID)
                                        ? "fill-red-500 text-red-500"
                                        : "text-gray-600"
                                    }`} />
                            )}
                            <span className="sr-only">Toggle favorite</span>
                        </Button>
                    </div>
                    <div className="p-4 cursor-pointer" onClick={() => router.push(`/stall/${stall.stallID}`)}>
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