"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Plus, Store, Edit, Trash2, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import AddStallDialog from "./add-stall-dialog"
import type { UserData } from "@/app/types/auth"
import { toast } from "sonner"

interface HawkerStall {
  id: string
  name: string
  hawkerCenter: string
  startTime: string
  endTime: string
  cuisineTypes: string[]
  priceRange: string
  photos: string[]
  dishCount: number
}

interface HawkerDashboardContentProps {
  userData: UserData | null
}

export default function HawkerDashboardContent({ userData }: HawkerDashboardContentProps) {
  const router = useRouter()
  const [stalls, setStalls] = useState<HawkerStall[]>([])
  const [isAddStallOpen, setIsAddStallOpen] = useState(false)
  const [editingStall, setEditingStall] = useState<HawkerStall | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [stallToDelete, setStallToDelete] = useState<string | null>(null)

  // Mock data for stalls - in a real app, you would fetch this from your API
  useEffect(() => {
    // Simulate API call
    const mockStalls: HawkerStall[] = [
      {
        id: "1",
        name: "Delicious Chicken Rice",
        hawkerCenter: "Maxwell Food Centre",
        startTime: "10:00",
        endTime: "20:00",
        cuisineTypes: ["Chinese", "Local"],
        priceRange: "$4 - $6",
        photos: ["/images/hs6.jpg", "/images/chicken_rice_1.jpg"],
        dishCount: 5,
      },
      {
        id: "2",
        name: "Tasty Noodles",
        hawkerCenter: "Chinatown Complex",
        startTime: "11:00",
        endTime: "21:00",
        cuisineTypes: ["Chinese", "Noodles"],
        priceRange: "$5 - $8",
        photos: ["/images/hs2.jpg"],
        dishCount: 8,
      },
    ]

    setStalls(mockStalls)
  }, [])

  const handleAddStall = (newStall: Omit<HawkerStall, "id" | "dishCount">) => {
    // In a real app, you would send this to your API
    const stallWithId: HawkerStall = {
      ...newStall,
      id: Date.now().toString(),
      dishCount: 0,
    }

    setStalls([...stalls, stallWithId])
    setIsAddStallOpen(false)
    toast.success("Stall added successfully!")
  }

  const handleEditStall = (updatedStall: HawkerStall) => {
    // In a real app, you would send this to your API
    const updatedStalls = stalls.map((stall) => (stall.id === updatedStall.id ? updatedStall : stall))

    setStalls(updatedStalls)
    setEditingStall(null)
    toast.success("Stall updated successfully!")
  }

  const handleDeleteStall = (id: string) => {
    // In a real app, you would send this to your API
    setStalls(stalls.filter((stall) => stall.id !== id))
    setStallToDelete(null)
    setIsDeleteDialogOpen(false)
    toast.success("Stall deleted successfully!")
  }

  const openEditDialog = (stall: HawkerStall) => {
    setEditingStall(stall)
    setIsAddStallOpen(true)
  }

  const openDeleteDialog = (id: string) => {
    setStallToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Hawker Stalls</h1>
          <p className="text-muted-foreground">Manage your stalls and dishes</p>
        </div>
        <Button onClick={() => setIsAddStallOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Stall
        </Button>
      </div>

      {stalls.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <Store className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">No Stalls Yet</h2>
          <p className="mt-2 text-muted-foreground">Add your first stall to start managing your hawker business</p>
          <Button onClick={() => setIsAddStallOpen(true)} className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add New Stall
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stalls.map((stall) => (
            <Card key={stall.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={stall.photos[0] || "/placeholder.svg"} alt={stall.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg truncate">{stall.name}</h3>
                  <p className="text-white/80 text-sm">{stall.hawkerCenter}</p>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Operating Hours</p>
                    <p>
                      {stall.startTime} - {stall.endTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Price Range</p>
                    <p>{stall.priceRange}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-muted-foreground text-sm">Cuisine Types</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {stall.cuisineTypes.map((cuisine) => (
                      <span key={cuisine} className="px-2 py-1 bg-muted text-xs rounded-md">
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-muted-foreground text-sm">Dishes</p>
                  <p className="font-medium">{stall.dishCount} dishes</p>
                </div>
              </CardContent>

              <CardFooter className="border-t p-4 flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => openEditDialog(stall)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openDeleteDialog(stall.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="default"
                  onClick={() => router.push(`/hawker/stall/${stall.id}`)}
                  className="flex items-center"
                >
                  Manage Dishes
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AddStallDialog
        isOpen={isAddStallOpen}
        onClose={() => {
          setIsAddStallOpen(false)
          setEditingStall(null)
        }}
        onSubmit={editingStall ? handleEditStall : handleAddStall}
        editingStall={editingStall}
      />

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && stallToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Delete Stall</h2>
            <p>Are you sure you want to delete this stall? This action cannot be undone.</p>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteDialogOpen(false)
                  setStallToDelete(null)
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteStall(stallToDelete)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}