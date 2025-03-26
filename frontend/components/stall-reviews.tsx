"use client"

import { useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Review {
  id: string
  userName: string
  userPicture: string
  rating: number
  content: string
}

interface StallReviewsProps {
  reviews: Review[]
  rating: number
  reviewCount: number
}

export default function StallReviews({ reviews, rating, reviewCount }: StallReviewsProps) {
  const [sortBy, setSortBy] = useState("recent")

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++
    }
  })

  const maxCount = Math.max(...ratingCounts)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-muted/30 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold">{rating.toFixed(1)}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={`${
                    star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{reviewCount} ratings</p>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm w-3">{star}</span>
                <div className="h-2 bg-muted flex-1 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{
                      width: `${maxCount > 0 ? (ratingCounts[star - 1] / maxCount) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground w-8">{ratingCounts[star - 1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-4 p-6">
          <p className="text-center">Share your experience at this stall</p>
          <Button size="lg" className="w-full sm:w-auto">
            Add Review
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Reviews</h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="highest">Highest Rating</SelectItem>
            <SelectItem value="lowest">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className='p-2'>
            <CardContent className="p-3">
              <div className="flex items-start gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={review.userPicture || "/placeholder.svg"}
                    alt={review.userName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{review.userName}</p>
                  <div className="flex items-center gap-1 my-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={`${
                          star <= review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm mt-4 overflow-hidden text-ellipsis">{review.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="mt-6 text-center">
          <Button variant="outline">Show more reviews</Button>
        </div>
      )}
    </div>
  )
}

