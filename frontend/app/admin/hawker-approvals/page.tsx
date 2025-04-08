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
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Search, ChevronDown, ChevronUp, Eye, Check, X } from "lucide-react"

interface HawkerApproval {
  id: string
  name: string
  ownerName: string
  email: string
  contactNumber: string
  sfaLicenseNumber: string
  address: string
  registrationDate: string
  status: "pending" | "approved" | "rejected" | string
}

export default function HawkerApprovalsPage() {
  const router = useRouter()
  const [pendingHawkers, setPendingHawkers] = useState<HawkerApproval[]>([])
  const [filteredHawkers, setFilteredHawkers] = useState<HawkerApproval[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof HawkerApproval
    direction: "ascending" | "descending"
  } | null>(null)
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [selectedHawker, setSelectedHawker] = useState<HawkerApproval | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)
  const [actionReason, setActionReason] = useState("")

  // Mock data for pending hawker approvals
  useEffect(() => {
    // Simulate API call
    const mockHawkers: HawkerApproval[] = [
      {
        id: "1",
        name: "John's Chicken Rice",
        ownerName: "John Tan",
        email: "john@example.com",
        contactNumber: "+65 9123 4567",
        sfaLicenseNumber: "SFA12345",
        address: "123 Maxwell Road, Singapore",
        registrationDate: "2023-10-15",
        status: "pending",
      },
      {
        id: "2",
        name: "Mary's Nasi Lemak",
        ownerName: "Mary Lim",
        email: "mary@example.com",
        contactNumber: "+65 8765 4321",
        sfaLicenseNumber: "SFA67890",
        address: "456 Geylang Road, Singapore",
        registrationDate: "2023-10-16",
        status: "pending",
      },
      {
        id: "3",
        name: "David's Wonton Noodles",
        ownerName: "David Wong",
        email: "david@example.com",
        contactNumber: "+65 9876 5432",
        sfaLicenseNumber: "SFA24680",
        address: "789 Chinatown, Singapore",
        registrationDate: "2023-10-14",
        status: "approved",
      },
      {
        id: "4",
        name: "Sarah's Vegetarian",
        ownerName: "Sarah Chen",
        email: "sarah@example.com",
        contactNumber: "+65 8123 4567",
        sfaLicenseNumber: "SFA13579",
        address: "101 Bukit Timah Road, Singapore",
        registrationDate: "2023-10-13",
        status: "rejected",
      },
      {
        id: "5",
        name: "Raj's Indian Cuisine",
        ownerName: "Raj Patel",
        email: "raj@example.com",
        contactNumber: "+65 9234 5678",
        sfaLicenseNumber: "SFA97531",
        address: "202 Little India, Singapore",
        registrationDate: "2023-10-12",
        status: "pending",
      },
    ]

    setPendingHawkers(mockHawkers)
    setFilteredHawkers(mockHawkers)
  }, [])

  // Filter and sort hawkers
  useEffect(() => {
    let filtered = [...pendingHawkers]

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((hawker) => hawker.status === statusFilter)
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (hawker) =>
          hawker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hawker.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hawker.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hawker.sfaLicenseNumber.toLowerCase().includes(searchQuery.toLowerCase()),
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

    setFilteredHawkers(filtered)
  }, [pendingHawkers, searchQuery, sortConfig, statusFilter])

  const handleSort = (key: keyof HawkerApproval) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: keyof HawkerApproval) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    )
  }

  const viewHawkerDetails = (hawker: HawkerApproval) => {
    setSelectedHawker(hawker)
    setIsDetailsDialogOpen(true)
  }

  const openConfirmDialog = (hawker: HawkerApproval, action: "approve" | "reject") => {
    setSelectedHawker(hawker)
    setActionType(action)
    setActionReason("")
    setIsConfirmDialogOpen(true)
  }

  const handleAction = () => {
    if (!selectedHawker || !actionType) return

    // In a real app, you would send this to your API
    console.log(`${actionType === "approve" ? "Approving" : "Rejecting"} hawker:`, {
      hawkerId: selectedHawker.id,
      reason: actionReason,
    })

    // Update the hawker in the local state
    const updatedHawkers = pendingHawkers.map((hawker) =>
      hawker.id === selectedHawker.id
        ? { ...hawker, status: actionType === "approve" ? "approved" : "rejected" }
        : hawker,
    )

    setPendingHawkers(updatedHawkers)
    setSelectedHawker(null)
    setActionType(null)
    setActionReason("")
    setIsConfirmDialogOpen(false)

    toast.success(
      `Hawker ${actionType === "approve" ? "approved" : "rejected"} successfully. ${
        actionType === "approve" ? "They can now access the platform." : "They have been notified."
      }`,
    )
  }

  const toggleStatus = (hawker: HawkerApproval, newStatus: boolean) => {
    const action = newStatus ? "approve" : "reject"
    openConfirmDialog(hawker, action)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar username="Admin" />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Hawker Approval Requests</h1>
            <p className="text-muted-foreground">Review and manage hawker registration requests</p>
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
              placeholder="Search by name, email, or license..."
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
              variant={statusFilter === "approved" ? "default" : "outline"}
              onClick={() => setStatusFilter("approved")}
              className="whitespace-nowrap"
            >
              Approved
            </Button>
            <Button
              variant={statusFilter === "rejected" ? "default" : "outline"}
              onClick={() => setStatusFilter("rejected")}
              className="whitespace-nowrap"
            >
              Rejected
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort("name")}>
                  <div className="flex items-center">
                    Stall Name
                    {getSortIcon("name")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("ownerName")}>
                  <div className="flex items-center">
                    Owner
                    {getSortIcon("ownerName")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("sfaLicenseNumber")}>
                  <div className="flex items-center">
                    SFA License
                    {getSortIcon("sfaLicenseNumber")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("registrationDate")}>
                  <div className="flex items-center">
                    Registration Date
                    {getSortIcon("registrationDate")}
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
              {filteredHawkers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No hawker approval requests found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredHawkers.map((hawker) => (
                  <TableRow key={hawker.id}>
                    <TableCell className="font-medium">{hawker.name}</TableCell>
                    <TableCell>{hawker.ownerName}</TableCell>
                    <TableCell>{hawker.sfaLicenseNumber}</TableCell>
                    <TableCell>{new Date(hawker.registrationDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(hawker.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => viewHawkerDetails(hawker)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {hawker.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openConfirmDialog(hawker, "approve")}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              title="Approve"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openConfirmDialog(hawker, "reject")}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {hawker.status !== "pending" && (
                          <Switch
                            checked={hawker.status === "approved"}
                            onCheckedChange={(checked) => toggleStatus(hawker, checked)}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Hawker Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Hawker Details</DialogTitle>
            </DialogHeader>
            {selectedHawker && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Stall Name:</div>
                  <div className="col-span-2">{selectedHawker.name}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Owner Name:</div>
                  <div className="col-span-2">{selectedHawker.ownerName}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Email:</div>
                  <div className="col-span-2">{selectedHawker.email}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Contact Number:</div>
                  <div className="col-span-2">{selectedHawker.contactNumber}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">SFA License:</div>
                  <div className="col-span-2">{selectedHawker.sfaLicenseNumber}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Address:</div>
                  <div className="col-span-2">{selectedHawker.address}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Registration Date:</div>
                  <div className="col-span-2">{new Date(selectedHawker.registrationDate).toLocaleDateString()}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Status:</div>
                  <div className="col-span-2">{getStatusBadge(selectedHawker.status)}</div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
              {selectedHawker && selectedHawker.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDetailsDialogOpen(false)
                      openConfirmDialog(selectedHawker, "approve")
                    }}
                    className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDetailsDialogOpen(false)
                      openConfirmDialog(selectedHawker, "reject")
                    }}
                    className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                  >
                    Reject
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
              <DialogTitle>{actionType === "approve" ? "Approve Hawker" : "Reject Hawker"}</DialogTitle>
              <DialogDescription>
                {actionType === "approve"
                  ? "This will approve the hawker and allow them to access the platform."
                  : "This will reject the hawker's application."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {selectedHawker && (
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Stall Name:</span> {selectedHawker.name}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Owner:</span> {selectedHawker.ownerName}
                  </p>
                  <p>
                    <span className="font-medium">SFA License:</span> {selectedHawker.sfaLicenseNumber}
                  </p>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="reason">
                  {actionType === "approve" ? "Approval Notes (Optional)" : "Rejection Reason"}
                </Label>
                <Input
                  id="reason"
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder={
                    actionType === "approve" ? "Add any notes about this approval" : "Provide a reason for rejection"
                  }
                  required={actionType === "reject"}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAction}
                disabled={actionType === "reject" && !actionReason.trim()}
                className={
                  actionType === "approve"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }
              >
                {actionType === "approve" ? "Approve Hawker" : "Reject Hawker"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
