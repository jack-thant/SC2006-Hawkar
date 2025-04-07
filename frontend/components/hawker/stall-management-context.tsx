"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, ArrowLeft, Edit, Trash2, Tag } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { UserData } from "@/app/types/auth"
import AddDishDialog from "./add-dish-dialog"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StallReviewsSection from "./stall-reviews-section"

interface Dish {
  id: string
  name: string
  price: number
  photo: string
  onPromotion: boolean
  startDate?: string
  endDate?: string
  discountedPrice?: number
}

interface Stall {
  id: string
  name: string
  hawkerCenter: string
  cuisineTypes: string[]
}

interface StallManagementContentProps {
  stallId: string
  userData: UserData | null
}

export default function StallManagementContent({ stallId, userData }: StallManagementContentProps) {
  const router = useRouter()
  const [stall, setStall] = useState<Stall | null>(null)
  const [dishes, setDishes] = useState<Dish[]>([])
  const [isAddDishOpen, setIsAddDishOpen] = useState(false)
  const [editingDish, setEditingDish] = useState<Dish | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [dishToDelete, setDishToDelete] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("dishes")

  // Mock data for stall and dishes - in a real app, you would fetch this from your API
  useEffect(() => {
    // Simulate API call to get stall details
    const mockStall: Stall = {
      id: stallId,
      name: "Delicious Chicken Rice",
      hawkerCenter: "Maxwell Food Centre",
      cuisineTypes: ["Chinese", "Local"],
    }

    // Simulate API call to get dishes
    const mockDishes: Dish[] = [
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
        endDate: "2023-12-31",
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
      {
        id: "5",
        name: "Chicken Soup",
        price: 3,
        photo: "/images/chicken_rice_1.jpg",
        onPromotion: true,
        startDate: "2023-11-01",
        endDate: "2023-12-15",
        discountedPrice: 2.5,
      },
    ]

    setStall(mockStall)
    setDishes(mockDishes)
  }, [stallId])

  const handleAddDish = (newDish: Omit<Dish, "id">) => {
    // In a real app, you would send this to your API
    const dishWithId: Dish = {
      ...newDish,
      id: Date.now().toString(),
    }

    setDishes([...dishes, dishWithId])
    setIsAddDishOpen(false)
    toast.success("Dish added successfully!")
  }

  const handleEditDish = (updatedDish: Dish) => {
    // In a real app, you would send this to your API
    const updatedDishes = dishes.map((dish) => (dish.id === updatedDish.id ? updatedDish : dish))

    setDishes(updatedDishes)
    setEditingDish(null)
    setIsAddDishOpen(false)
    toast.success("Dish updated successfully!")
  }

  const handleDeleteDish = (id: string) => {
    // In a real app, you would send this to your API
    setDishes(dishes.filter((dish) => dish.id !== id))
    setDishToDelete(null)
    setIsDeleteDialogOpen(false)
    toast.success("Dish deleted successfully!")
  }

  const openEditDialog = (dish: Dish) => {
    setEditingDish(dish)
    setIsAddDishOpen(true)
  }

  const openDeleteDialog = (id: string) => {
    setDishToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  if (!stall) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>Loading stall details...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.push("/hawker")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{stall.name}</h1>
          <p className="text-muted-foreground">{stall.hawkerCenter}</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="dishes">Menu Items</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="dishes">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Menu Items</h2>
              <p className="text-muted-foreground">Manage your dishes and promotions</p>
            </div>
            <Button onClick={() => setIsAddDishOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Dish
            </Button>
          </div>

          {dishes.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <Tag className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold">No Dishes Yet</h2>
              <p className="mt-2 text-muted-foreground">Add your first dish to start building your menu</p>
              <Button onClick={() => setIsAddDishOpen(true)} className="mt-4">
                <Plus className="mr-2 h-4 w-4" /> Add New Dish
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dishes.map((dish) => (
                <Card key={dish.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={dish.photo || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
                    {dish.onPromotion && <Badge className="absolute top-2 right-2 bg-red-500">Promotion</Badge>}
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{dish.name}</CardTitle>
                  </CardHeader>

                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center">
                      {dish.onPromotion ? (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground line-through">${dish.price.toFixed(2)}</span>
                          <span className="font-bold text-red-500">${dish.discountedPrice?.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="font-bold">${dish.price.toFixed(2)}</span>
                      )}
                    </div>

                    {dish.onPromotion && dish.startDate && dish.endDate && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        Promotion valid: {new Date(dish.startDate).toLocaleDateString()} -{" "}
                        {new Date(dish.endDate).toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="border-t p-4 flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEditDialog(dish)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openDeleteDialog(dish.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Badge variant={dish.onPromotion ? "default" : "outline"}>
                      {dish.onPromotion ? "On Promotion" : "Regular Price"}
                    </Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviews">
          <StallReviewsSection stallId={stallId} stallName={stall.name} />
        </TabsContent>
      </Tabs>

      <AddDishDialog
        isOpen={isAddDishOpen}
        onClose={() => {
          setIsAddDishOpen(false)
          setEditingDish(null)
        }}
        onSubmit={editingDish ? handleEditDish : handleAddDish}
        editingDish={editingDish}
      />

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && dishToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Delete Dish</h2>
            <p>Are you sure you want to delete this dish? This action cannot be undone.</p>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteDialogOpen(false)
                  setDishToDelete(null)
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteDish(dishToDelete)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}