"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TimePicker } from "@/components/ui/time-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, ImageIcon } from "lucide-react"
import Image from "next/image"

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

interface AddStallDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (stall: any) => void
  editingStall: HawkerStall | null
}

// Mock data for hawker centers in Singapore
const hawkerCenters = [
  "Maxwell Food Centre",
  "Chinatown Complex",
  "Tekka Centre",
  "Old Airport Road Food Centre",
  "Tiong Bahru Market",
  "Chomp Chomp Food Centre",
  "Newton Food Centre",
  "Adam Road Food Centre",
  "Geylang Serai Market",
  "Lau Pa Sat",
  "Amoy Street Food Centre",
  "Hong Lim Food Centre",
  "Bedok Interchange Hawker Centre",
  "Whampoa Food Centre",
  "ABC Brickworks Food Centre",
  "Berseh Food Centre",
  "Bukit Timah Market",
  "Changi Village Hawker Centre",
  "Commonwealth Crescent Market",
  "Golden Mile Food Centre",
]

// Cuisine types
const cuisineTypes = [
  "Chinese",
  "Malay",
  "Indian",
  "Western",
  "Japanese",
  "Korean",
  "Thai",
  "Vietnamese",
  "Indonesian",
  "Local",
  "Seafood",
  "Vegetarian",
  "Halal",
  "Dessert",
  "Drinks",
  "Noodles",
  "Rice",
  "BBQ",
  "Soup",
  "Fast Food",
]

// Price ranges
const priceRanges = ["$3 - $5", "$4 - $6", "$5 - $8", "$6 - $10", "$8 - $12", "$10 - $15", "$15 - $20", "$20+"]

export default function AddStallDialog({ isOpen, onClose, onSubmit, editingStall }: AddStallDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    hawkerCenter: "",
    startTime: "10:00",
    endTime: "20:00",
    cuisineTypes: [] as string[],
    priceRange: "$4 - $6",
    photos: [] as string[],
  })

  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([])

  // Initialize form with editing data if available
  useEffect(() => {
    if (editingStall) {
      setFormData({
        name: editingStall.name,
        hawkerCenter: editingStall.hawkerCenter,
        startTime: editingStall.startTime,
        endTime: editingStall.endTime,
        cuisineTypes: editingStall.cuisineTypes,
        priceRange: editingStall.priceRange,
        photos: editingStall.photos,
      })
      setSelectedCuisines(editingStall.cuisineTypes)
      setPhotoPreviewUrls(editingStall.photos)
    } else {
      resetForm()
    }
  }, [editingStall, isOpen])

  const resetForm = () => {
    setFormData({
      name: "",
      hawkerCenter: "",
      startTime: "10:00",
      endTime: "20:00",
      cuisineTypes: [],
      priceRange: "$4 - $6",
      photos: [],
    })
    setSelectedCuisines([])
    setPhotoFiles([])
    setPhotoPreviewUrls([])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleTimeChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const toggleCuisineSelection = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) {
      const newSelection = selectedCuisines.filter((c) => c !== cuisine)
      setSelectedCuisines(newSelection)
      setFormData({ ...formData, cuisineTypes: newSelection })
    } else {
      const newSelection = [...selectedCuisines, cuisine]
      setSelectedCuisines(newSelection)
      setFormData({ ...formData, cuisineTypes: newSelection })
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setPhotoFiles([...photoFiles, ...newFiles])

      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
      setPhotoPreviewUrls([...photoPreviewUrls, ...newPreviewUrls])

      // In a real app, you would upload these files to your server
      // and get back URLs to use in the form submission

      // For now, we'll just use the preview URLs
      setFormData({
        ...formData,
        photos: [...photoPreviewUrls, ...newPreviewUrls],
      })
    }
  }

  const removePhoto = (index: number) => {
    const newPhotoFiles = [...photoFiles]
    newPhotoFiles.splice(index, 1)
    setPhotoFiles(newPhotoFiles)

    const newPreviewUrls = [...photoPreviewUrls]

    // Revoke the object URL to avoid memory leaks
    if (newPreviewUrls[index] && !newPreviewUrls[index].startsWith("/")) {
      URL.revokeObjectURL(newPreviewUrls[index])
    }

    newPreviewUrls.splice(index, 1)
    setPhotoPreviewUrls(newPreviewUrls)

    setFormData({
      ...formData,
      photos: newPreviewUrls,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.hawkerCenter || formData.cuisineTypes.length === 0) {
      alert("Please fill in all required fields")
      return
    }

    // Submit form
    if (editingStall) {
      onSubmit({
        ...formData,
        id: editingStall.id,
        dishCount: editingStall.dishCount,
      })
    } else {
      onSubmit(formData)
    }

    // Reset form
    resetForm()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background z-10 flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">{editingStall ? "Edit Stall" : "Add New Stall"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Stall Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter stall name"
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="hawkerCenter">Hawker Center *</Label>
              <Select
                value={formData.hawkerCenter}
                onValueChange={(value) => handleSelectChange("hawkerCenter", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select hawker center" />
                </SelectTrigger>
                <SelectContent>
                  {hawkerCenters.map((center) => (
                    <SelectItem key={center} value={center}>
                      {center}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="startTime">Opening Time *</Label>
                <TimePicker value={formData.startTime} onChange={(value) => handleTimeChange("startTime", value)} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="endTime">Closing Time *</Label>
                <TimePicker value={formData.endTime} onChange={(value) => handleTimeChange("endTime", value)} />
              </div>
            </div>

            <div className="grid gap-3">
              <Label>Cuisine Types *</Label>
              <div className="flex flex-wrap gap-2">
                {cuisineTypes.map((cuisine) => (
                  <Button
                    key={cuisine}
                    type="button"
                    variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => toggleCuisineSelection(cuisine)}
                  >
                    {cuisine}
                  </Button>
                ))}
              </div>
              {selectedCuisines.length === 0 && (
                <p className="text-sm text-muted-foreground">Please select at least one cuisine type</p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="priceRange">Price Range *</Label>
              <Select value={formData.priceRange} onValueChange={(value) => handleSelectChange("priceRange", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label>Stall Photos</Label>
              <div className="grid grid-cols-3 gap-4">
                {photoPreviewUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                    <Image
                      src={url || "/placeholder.svg"}
                      alt={`Stall photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <label className="border border-dashed rounded-md flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-muted/50 aspect-square">
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
                  <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground text-center">Upload Photos</span>
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                Upload photos of your stall and dishes. You can upload multiple photos.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{editingStall ? "Save Changes" : "Add Stall"}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}