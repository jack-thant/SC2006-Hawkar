"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Search, ChevronDown, ChevronUp, Eye, Trash2, CheckCircle, Star } from "lucide-react"

interface ReportedReview {
  id: string
  reviewId: string
  stallName: string
  stallId: string
  reviewerName: string
  reviewContent: string
  rating: number
  reportReason: string
  reportedBy: string
  reportDate: string
  status: "pending" | "ignored" | "deleted" | string
}

export default function ReportedReviewsPage() {
  const router = useRouter()
  const [reportedReviews, setReportedReviews] = useState<ReportedReview[]>([])
  const [filteredReviews, setFilteredReviews] = useState<ReportedReview[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ReportedReview
    direction: "ascending" | "descending"
  } | null>(null)
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "ignored" | "deleted">("all")
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<ReportedReview | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<"ignore" | "delete" | null>(null)
  const [actionReason, setActionReason] = useState("")

  // Mock data for reported reviews
  useEffect(() => {
    // Simulate API call
    const mockReviews: ReportedReview[] = [
      {
        id: "1",
        reviewId: "rev123",
        stallName: "Delicious Chicken Rice",
        stallId: "stall1",
        reviewerName: "John Doe",
        reviewContent: "The food was terrible and the service was even worse. Would not recommend to anyone!",
        rating: 1,
        reportReason: "inappropriate",
        reportedBy: "Stall Owner",
        reportDate: "2023-10-15",
        status: "pending",
      },
      {
        id: "2",
        reviewId: "rev456",
        stallName: "Tasty Noodles",
        stallId: "stall2",
        reviewerName: "Jane Smith",
        reviewContent: "This place is a scam! They charged me extra and the food was cold. Avoid at all costs!",
        rating: 1,
        reportReason: "fake",
        reportedBy: "Stall Owner",
        reportDate: "2023-10-14",
        status: "pending",
      },
      {
        id: "3",
        reviewId: "rev789",
        stallName: "Delicious Chicken Rice",
        stallId: "stall1",
        reviewerName: "Mike Johnson",
        reviewContent: "Check out my website for better food options! www.spamsite.com",
        rating: 2,
        reportReason: "spam",
        reportedBy: "Stall Owner",
        reportDate: "2023-10-13",
        status: "deleted",
      },
      {
        id: "4",
        reviewId: "rev101",
        stallName: "Sarah's Vegetarian",
        stallId: "stall4",
        reviewerName: "Tom Wilson",
        reviewContent: "The food here made me sick. I had to go to the hospital after eating here!",
        rating: 1,
        reportReason: "misleading",
        reportedBy: "Stall Owner",
        reportDate: "2023-10-12",
        status: "ignored",
      },
      {
        id: "5",
        reviewId: "rev202",
        stallName: "Raj's Indian Cuisine",
        stallId: "stall5",
        reviewerName: "Lisa Chen",
        reviewContent: "This is not authentic Indian food. The owner is not even Indian!",
        rating: 2,
        reportReason: "inappropriate",
        reportedBy: "Stall Owner",
        reportDate: "2023-10-11",
        status: "pending",
      },
    ]

    setReportedReviews(mockReviews)
    setFilteredReviews(mockReviews)
  }, [])

  // Filter and sort reviews
  useEffect(() => {
    let filtered = [...reportedReviews]

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((review) => review.status === statusFilter)
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (review) =>
          review.stallName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.reviewContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.reportReason.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    setFilteredReviews(filtered)
  }, [reportedReviews, searchQuery, sortConfig, statusFilter])

  const handleSort = (key: keyof ReportedReview) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: keyof ReportedReview) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    )
  }

  const viewReviewDetails = (review: ReportedReview) => {
    setSelectedReview(review)
    setIsDetailsDialogOpen(true)
  }

  const openConfirmDialog = (review: ReportedReview, action: "ignore" | "delete") => {
    setSelectedReview(review)
    setActionType(action)
    setActionReason("")
    setIsConfirmDialogOpen(true)
  }

  const handleAction = () => {
    if (!selectedReview || !actionType) return

    // In a real app, you would send this to your API
    console.log(`${actionType === "ignore" ? "Ignoring" : "Deleting"} review:`, {
      reviewId: selectedReview.reviewId,
      reason: actionReason,
    })

    // Update the review in the local state
    const updatedReviews = reportedReviews.map((review) =>
      review.id === selectedReview.id ? { ...review, status: actionType === "ignore" ? "ignored" : "deleted" } : review,
    )

    setReportedReviews(updatedReviews)
    setSelectedReview(null)
    setActionType(null)
    setActionReason("")
    setIsConfirmDialogOpen(false)

    toast.success(`Review report ${actionType === "ignore" ? "ignored" : "deleted"} successfully.`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        )
      case "ignored":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Ignored
          </Badge>
        )
      case "deleted":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Deleted
          </Badge>
        )
      default:
        return null
    }
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
    <main className="min-h-screen flex flex-col">
      <Navbar username="Admin" />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Reported Reviews</h1>
            <p className="text-muted-foreground">Manage reviews that have been reported by hawkers</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin">Back to Dashboard</Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by stall, reviewer, or content..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
              className="whitespace-nowrap"
            >
              All
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              onClick={() => setStatusFilter("pending")}
              className="whitespace-nowrap"
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "ignored" ? "default" : "outline"}
              onClick={() => setStatusFilter("ignored")}
              className="whitespace-nowrap"
            >
              Ignored
            </Button>
            <Button
              variant={statusFilter === "deleted" ? "default" : "outline"}
              onClick={() => setStatusFilter("deleted")}
              className="whitespace-nowrap"
            >
              Deleted
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] cursor-pointer" onClick={() => handleSort("stallName")}>
                  <div className="flex items-center">
                    Stall Name
                    {getSortIcon("stallName")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("reviewerName")}>
                  <div className="flex items-center">
                    Reviewer
                    {getSortIcon("reviewerName")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("rating")}>
                  <div className="flex items-center">
                    Rating
                    {getSortIcon("rating")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("reportReason")}>
                  <div className="flex items-center">
                    Report Reason
                    {getSortIcon("reportReason")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("reportDate")}>
                  <div className="flex items-center">
                    Report Date
                    {getSortIcon("reportDate")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                  <div className="flex items-center">
                    Status
                    {getSortIcon("status")}
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No reported reviews found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.stallName}</TableCell>
                    <TableCell>{review.reviewerName}</TableCell>
                    <TableCell>{renderStars(review.rating)}</TableCell>
                    <TableCell className="capitalize">{review.reportReason}</TableCell>
                    <TableCell>{new Date(review.reportDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(review.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => viewReviewDetails(review)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {review.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openConfirmDialog(review, "ignore")}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              title="Ignore Report"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openConfirmDialog(review, "delete")}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Delete Review"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Review Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Reported Review Details</DialogTitle>
            </DialogHeader>
            {selectedReview && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Stall Name:</div>
                  <div className="col-span-2">{selectedReview.stallName}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Reviewer:</div>
                  <div className="col-span-2">{selectedReview.reviewerName}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Rating:</div>
                  <div className="col-span-2">{renderStars(selectedReview.rating)}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Review Content:</div>
                  <div className="col-span-2 p-3 bg-muted rounded-md">{selectedReview.reviewContent}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Report Reason:</div>
                  <div className="col-span-2 capitalize">{selectedReview.reportReason}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Reported By:</div>
                  <div className="col-span-2">{selectedReview.reportedBy}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Report Date:</div>
                  <div className="col-span-2">{new Date(selectedReview.reportDate).toLocaleDateString()}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Status:</div>
                  <div className="col-span-2">{getStatusBadge(selectedReview.status)}</div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
              {selectedReview && selectedReview.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDetailsDialogOpen(false)
                      openConfirmDialog(selectedReview, "ignore")
                    }}
                    className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                  >
                    Ignore Report
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDetailsDialogOpen(false)
                      openConfirmDialog(selectedReview, "delete")
                    }}
                    className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                  >
                    Delete Review
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirm Action Dialog */}
        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{actionType === "ignore" ? "Ignore Report" : "Delete Review"}</DialogTitle>
              <DialogDescription>
                {actionType === "ignore"
                  ? "This will mark the report as ignored and keep the review visible."
                  : "This will permanently delete the review from the platform."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {selectedReview && (
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Stall:</span> {selectedReview.stallName}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Reviewer:</span> {selectedReview.reviewerName}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Review:</span> "{selectedReview.reviewContent.substring(0, 100)}
                    {selectedReview.reviewContent.length > 100 ? "..." : ""}"
                  </p>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="reason">
                  {actionType === "ignore" ? "Reason for Ignoring (Optional)" : "Reason for Deletion"}
                </Label>
                <Input
                  id="reason"
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder={
                    actionType === "ignore"
                      ? "Add any notes about why this report is being ignored"
                      : "Provide a reason for deleting this review"
                  }
                  required={actionType === "delete"}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAction}
                disabled={actionType === "delete" && !actionReason.trim()}
                className={
                  actionType === "ignore"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }
              >
                {actionType === "ignore" ? "Ignore Report" : "Delete Review"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
