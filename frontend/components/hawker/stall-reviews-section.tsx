"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Flag, Star, Search, ChevronDown } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface Review {
  id: string
  userName: string
  userPhoto: string
  rating: number
  date: string
  content: string
  reported: boolean
}

interface StallReviewsSectionProps {
  stallId: string
  stallName: string
}

export default function StallReviewsSection({ stallId, stallName }: StallReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [reviewToReport, setReviewToReport] = useState<Review | null>(null)
  const [reportReason, setReportReason] = useState("inappropriate")
  const [reportComment, setReportComment] = useState("")
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingCounts: [0, 0, 0, 0, 0], // 1-5 stars
  })

  // Mock data for reviews - in a real app, you would fetch this from your API
  useEffect(() => {
    // Simulate API call to get reviews
    const mockReviews: Review[] = [
      {
        id: "1",
        userName: "Sarah Tan",
        userPhoto: "/images/p1.jpg",
        rating: 5,
        date: "2023-10-15",
        content:
          "The chicken is tender and juicy, with just the right amount of gelatinous skin to give it that silky texture. The rice is fragrant and not too oily. Definitely worth the wait!",
        reported: false,
      },
      {
        id: "2",
        userName: "Michael Wong",
        userPhoto: "/images/p2.jpg",
        rating: 4,
        date: "2023-10-10",
        content:
          "One of the best chicken rice in Singapore. The chili sauce is amazing! Only giving 4 stars because the queue can be very long during peak hours.",
        reported: false,
      },
      {
        id: "3",
        userName: "Priya Sharma",
        userPhoto: "/images/p3.jpg",
        rating: 5,
        date: "2023-09-28",
        content:
          "Absolutely delicious! The chicken is so tender and the rice is perfectly cooked. The soup that comes with it is also very flavorful. Highly recommended!",
        reported: false,
      },
      {
        id: "4",
        userName: "David Lim",
        userPhoto: "/placeholder.svg?height=200&width=200",
        rating: 3,
        date: "2023-09-20",
        content:
          "The food is decent but a bit overpriced for what you get. The portion size could be bigger. Service was quick though.",
        reported: true,
      },
      {
        id: "5",
        userName: "Lisa Chen",
        userPhoto: "/placeholder.svg?height=200&width=200",
        rating: 4,
        date: "2023-09-15",
        content:
          "Great flavor and the chicken was very tender. The rice could have been a bit more flavorful, but overall a solid meal.",
        reported: false,
      },
      {
        id: "6",
        userName: "Raj Patel",
        userPhoto: "/placeholder.svg?height=200&width=200",
        rating: 2,
        date: "2023-09-05",
        content: "Disappointing experience. The chicken was dry and the rice was too oily. Not worth the price.",
        reported: false,
      },
      {
        id: "7",
        userName: "Emma Wilson",
        userPhoto: "/placeholder.svg?height=200&width=200",
        rating: 5,
        date: "2023-08-28",
        content:
          "One of the best meals I've had in Singapore! The chicken was perfectly cooked and the rice was fragrant. Will definitely come back!",
        reported: false,
      },
    ]

    setReviews(mockReviews)
    setFilteredReviews(mockReviews)

    // Calculate stats
    const totalReviews = mockReviews.length
    const totalRating = mockReviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / totalReviews

    // Count ratings
    const ratingCounts = [0, 0, 0, 0, 0]
    mockReviews.forEach((review) => {
      ratingCounts[review.rating - 1]++
    })

    setStats({
      averageRating,
      totalReviews,
      ratingCounts,
    })
  }, [stallId])

  // Filter and sort reviews
  useEffect(() => {
    let filtered = [...reviews]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (review) =>
          review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.userName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply rating filter
    if (ratingFilter !== "all") {
      const ratingValue = Number.parseInt(ratingFilter)
      filtered = filtered.filter((review) => review.rating === ratingValue)
    }

    // Apply sorting
    if (sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sortBy === "highest") {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "lowest") {
      filtered.sort((a, b) => a.rating - b.rating)
    }

    setFilteredReviews(filtered)
  }, [reviews, searchQuery, sortBy, ratingFilter])

  const handleReportReview = (review: Review) => {
    setReviewToReport(review)
    setIsReportDialogOpen(true)
  }

  const submitReport = () => {
    if (!reviewToReport) return

    // In a real app, you would send this to your API
    console.log("Reporting review:", {
      reviewId: reviewToReport.id,
      reason: reportReason,
      comment: reportComment,
    })

    // Update the review in the local state
    const updatedReviews = reviews.map((review) =>
      review.id === reviewToReport.id ? { ...review, reported: true } : review,
    )

    setReviews(updatedReviews)
    setReviewToReport(null)
    setReportReason("inappropriate")
    setReportComment("")
    setIsReportDialogOpen(false)

    toast.success("Review reported successfully. Our team will review it shortly.")
  }

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Render stars for ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={16} className={star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          <p className="text-muted-foreground">Manage and respond to customer feedback</p>
        </div>
      </div>

      {/* Stats Section - Airbnb Style */}
      <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{stats.averageRating.toFixed(1)}</span>
              <div className="flex mt-1">{renderStars(Math.round(stats.averageRating))}</div>
            </div>
            <p className="text-muted-foreground mt-1">{stats.totalReviews} reviews</p>

            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <button
                    className={`text-sm ${ratingFilter === rating.toString() ? "font-semibold" : ""}`}
                    onClick={() => setRatingFilter(ratingFilter === rating.toString() ? "all" : rating.toString())}
                  >
                    {rating} stars
                  </button>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{
                        width: `${stats.totalReviews > 0 ? (stats.ratingCounts[rating - 1] / stats.totalReviews) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-8 text-right">{stats.ratingCounts[rating - 1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-medium mb-4">Review Highlights</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={ratingFilter === "all" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setRatingFilter("all")}
              >
                All Reviews
              </Button>
              <Button
                variant={ratingFilter === "5" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setRatingFilter(ratingFilter === "5" ? "all" : "5")}
              >
                5 Stars
              </Button>
              <Button
                variant={ratingFilter === "4" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setRatingFilter(ratingFilter === "4" ? "all" : "4")}
              >
                4 Stars
              </Button>
              <Button
                variant={ratingFilter === "3" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setRatingFilter(ratingFilter === "3" ? "all" : "3")}
              >
                3 Stars
              </Button>
              <Button
                variant={ratingFilter === "2" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setRatingFilter(ratingFilter === "2" ? "all" : "2")}
              >
                2 Stars
              </Button>
              <Button
                variant={ratingFilter === "1" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setRatingFilter(ratingFilter === "1" ? "all" : "1")}
              >
                1 Star
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search reviews..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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

      {/* Reviews List - Airbnb Style */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-xl">
          <p className="text-muted-foreground">No reviews found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={review.userPhoto || "/placeholder.svg"}
                      alt={review.userName}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{review.userName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground">{formatDate(review.date)}</span>
                      </div>
                    </div>

                    {!review.reported ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReportReview(review)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Flag className="h-4 w-4 mr-1" />
                        Report
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">Reported</span>
                    )}
                  </div>

                  <p className="mt-3 text-gray-700">{review.content}</p>
                </div>
              </div>
            </Card>
          ))}

          {filteredReviews.length < reviews.length && (
            <div className="text-center mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setRatingFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {filteredReviews.length >= 5 && (
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8">
                <span>Show more reviews</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Report Review Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Report Review</DialogTitle>
            <DialogDescription>
              Please let us know why you're reporting this review. Our team will review it and take appropriate action.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <RadioGroup value={reportReason} onValueChange={setReportReason} className="space-y-3">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="inappropriate" id="inappropriate" className="mt-1" />
                <div>
                  <Label htmlFor="inappropriate" className="font-medium">
                    Inappropriate content
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    This review contains offensive, harmful, or inappropriate content
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="fake" id="fake" className="mt-1" />
                <div>
                  <Label htmlFor="fake" className="font-medium">
                    Fake or misleading
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    This review contains false information or is misleading
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="spam" id="spam" className="mt-1" />
                <div>
                  <Label htmlFor="spam" className="font-medium">
                    Spam or advertising
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    This review is spam, advertising, or unrelated to your stall
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="other" id="other" className="mt-1" />
                <div>
                  <Label htmlFor="other" className="font-medium">
                    Other reason
                  </Label>
                  <p className="text-sm text-muted-foreground">Another reason not listed above</p>
                </div>
              </div>
            </RadioGroup>

            <div className="mt-4">
              <Label htmlFor="comment">Additional comments</Label>
              <Textarea
                id="comment"
                placeholder="Please provide any additional details about why you're reporting this review"
                value={reportComment}
                onChange={(e) => setReportComment(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitReport}>Submit Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}