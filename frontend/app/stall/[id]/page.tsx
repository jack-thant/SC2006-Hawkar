"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, MapPin, Share, Star, Heart, Grid2X2, Tag, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import StallDishes from "@/components/stall-dishes"
import StallReviews from "@/components/stall-reviews"
import PhotoGrid from "@/components/photo-grid"
import Navbar from "@/components/navbar"

// Sample data for the stall
const stallData = {
    id: "1",
    name: "Tian Tian Chicken Rice",
    hawkerCentre: "Maxwell Food Centre",
    unitNumber: "#01-10/11",
    startTime: "10:00",
    endTime: "20:00",
    hygieneRating: "A",
    cuisines: ["Chinese", "Local", "Poultry"],
    estimatedWaitTime: 15,
    priceRange: "$4 - $6",
    rating: 4.8,
    reviewCount: 482,
    photos: [
        "/images/hs6.jpg",
        "/images/chicken_rice_1.jpg",
        "/images/chicken_rice_2.jpg",
        "/images/chicken_rice_3.jpg",
        "/images/chicken_rice_4.webp",
    ],
    dishes: [
        {
            id: "1",
            name: "Chicken Rice (Regular)",
            price: 4.5,
            photo: "/images/chicken_rice_1.jpg",
            onPromotion: false,
        },
        {
            id: "2",
            name: "Chicken Rice (Large)",
            price: 5.5,
            photo: "/images/chicken_rice_2.jpg",
            onPromotion: true,
            startDate: "2023-10-01",
            endDate: "2023-10-31",
            discountedPrice: 4.8,
        },
        {
            id: "3",
            name: "Steamed Chicken (Half)",
            price: 12,
            photo: "/images/chicken_rice_3.jpg",
            onPromotion: false,
        },
        {
            id: "4",
            name: "Roasted Chicken (Half)",
            price: 13,
            photo: "/images/chicken_rice_4.webp",
            onPromotion: false,
        },
    ],
    reviews: [
        {
            id: "1",
            userName: "Sarah Tan",
            userPicture: "/images/p1.jpg",
            rating: 5,
            content:
                "The chicken is tender and juicy, with just the right amount of gelatinous skin to give it that silky texture. The rice is fragrant and not too oily. Definitely worth the wait!",
        },
        {
            id: "2",
            userName: "Michael Wong",
            userPicture: "/images/p2.jpg",
            rating: 4,
            content:
                "One of the best chicken rice in Singapore. The chili sauce is amazing! Only giving 4 stars because the queue can be very long during peak hours.",
        },
        {
            id: "3",
            userName: "Priya Sharma",
            userPicture: "/images/p3.jpg",
            rating: 5,
            content:
                "Absolutely delicious! The chicken is so tender and the rice is perfectly cooked. The soup that comes with it is also very flavorful. Highly recommended!",
        },
    ],
}

export default function StallDetails({ params }: { params: { id: string } }) {
    const [saved, setSaved] = useState(false)
    const currentUserId = "1" // In a real app, this would come from your auth system

    // In a real app, you would fetch the stall data based on the ID
    // const { id } = params;
    // const stallData = await fetchStallData(id);

    const handleSaveToggle = () => {
        setSaved(!saved)
    }

    return (
        <main className="min-h-screen pb-16">
            <Navbar username="John Doe" stallName={stallData.name} onSaveToggle={handleSaveToggle} isSaved={saved} />

            {/* Stall details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Photo grid */}
                <PhotoGrid photos={stallData.photos} stallName={stallData.name} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                    <div className="lg:col-span-2">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h1 className="text-2xl font-bold">{stallData.name}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center">
                                        <Star size={16} className="fill-amber-400 text-amber-400" />
                                        <span className="ml-1 font-medium">{stallData.rating}</span>
                                        <span className="mx-1">·</span>
                                        <span className="text-muted-foreground">{stallData.reviewCount} reviews</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2 text-sm">
                                    <MapPin size={16} className="text-muted-foreground" />
                                    <span>{stallData.hawkerCentre}</span>
                                    <span className="text-muted-foreground">|</span>
                                    <span>{stallData.unitNumber}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <Clock size={20} className="text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Operating Hours</p>
                                        <p className="text-sm text-muted-foreground">
                                            {stallData.startTime} - {stallData.endTime}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Award size={20} className="text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Hygiene Rating</p>
                                        <p className="text-sm text-muted-foreground">{stallData.hygieneRating}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Tag size={20} className="text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Price Range</p>
                                        <p className="text-sm text-muted-foreground">{stallData.priceRange}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock size={20} className="text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Estimated Wait Time</p>
                                        <p className="text-sm text-muted-foreground">{stallData.estimatedWaitTime} minutes</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium mb-2">Cuisines</p>
                                <div className="flex flex-wrap gap-2">
                                    {stallData.cuisines.map((cuisine, index) => (
                                        <Badge key={index} variant="outline" className='p-3 rounded-md bg-slate-100'>
                                            {cuisine}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <Separator />
                            {/* Dishes section */}
                            <div>
                                <StallDishes dishes={stallData.dishes} stallName={stallData.name} />
                            </div>

                            <Separator className="my-4" />

                            {/* Reviews section */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold">Ratings & Reviews</h2>
                                </div>
                                <StallReviews
                                    reviews={stallData.reviews}
                                    rating={stallData.rating}
                                    reviewCount={stallData.reviewCount}
                                    currentUserId={currentUserId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}