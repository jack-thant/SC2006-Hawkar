"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProfileFormProps {
    formData: any
    setFormData: (data: any) => void
    onSubmit: (e: React.FormEvent) => void
}

export default function ProfileForm({ formData, setFormData, onSubmit }: ProfileFormProps) {
    const [profileImage, setProfileImage] = useState<string | null>(null)

    const cuisines = ["Chinese", "Indian", "Malay", "Indonesian", "Japanese", "Korean", "Thai"]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSelectFieldChange = (fieldName: string) => {
        return (value: string) => {
            setFormData({ ...formData, [fieldName]: value });
        };
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                if (event.target?.result) {
                    setProfileImage(event.target.result as string)
                    setFormData({ ...formData, profilePicture: event.target.result })
                }
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <div className="grid md:grid-cols-2 gap-10">
            <div className="flex flex-col justify-center space-y-4 md:p-4">
                <h1 className="text-3xl font-bold">Complete Your Profile to Get Started!</h1>
                <p className="text-gray-600">
                    Just a few more details, and you&apos;ll be all set. Once completed, we&apos;ll take you to your home page!
                </p>
            </div>

            <div>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="flex flex-row items-center gap-4 mb-4">
                        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                            {profileImage ? (
                                <Image
                                    src={profileImage || "/placeholder.svg"}
                                    alt="Profile"
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            id="profile-picture"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <label
                            htmlFor="profile-picture"
                            className="cursor-pointer text-xs text-gray-600 w-40 text-center"
                        >
                            Click on the profile picture to upload your photo
                        </label>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={formData.role} onValueChange={handleSelectFieldChange('role')}>
                            <SelectTrigger className="bg-gray-200 border-0 w-full py-6">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Consumer">Consumer</SelectItem>
                                <SelectItem value="Hawker">Hawker</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {formData.role === "Hawker" && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="sfaLicenseNumber">SFA licence num</Label>
                                <Input
                                    id="sfaLicenseNumber"
                                    name="sfaLicenseNumber"
                                    value={formData.sfaLicenseNumber || ""}
                                    placeholder="SFA123456"
                                    onChange={handleInputChange}
                                    className="bg-gray-200 py-6"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formData.address || ""}
                                    onChange={handleInputChange}
                                    className="bg-gray-200 py-6"
                                    placeholder="123, ABC Street, Singapore, Singapore, 123456"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contactNumber">Contact Number</Label>
                                <Input
                                    id="contactNumber"
                                    name="contactNumber"
                                    value={formData.contactNumber || ""}
                                    placeholder="+65 1234 5678"
                                    onChange={handleInputChange}
                                    className="bg-gray-200 py-6"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {
                        formData.role === "Consumer" && (
                            (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            value={formData.address || ""}
                                            onChange={handleInputChange}
                                            placeholder="123, ABC Street, Singapore, Singapore, 123456"
                                            className="bg-gray-200 py-6"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contactNumber">Contact Number</Label>
                                        <Input
                                            id="contactNumber"
                                            name="contactNumber"
                                            value={formData.contactNumber || ""}
                                            onChange={handleInputChange}
                                            placeholder="+65 1234 5678"
                                            className="bg-gray-200 py-6"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dietaryPreference">Dietary preference</Label>
                                        <Select value={formData.dietaryPreference} onValueChange={handleSelectFieldChange('dietaryPreference')}>
                                            <SelectTrigger className="bg-gray-200 border-0 w-full py-6">
                                                <SelectValue placeholder="Select a dietary preference" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                                <SelectItem value="halal">Halal</SelectItem>
                                                <SelectItem value="glutenFree">Gluten Free</SelectItem>
                                                <SelectItem value="no-restriction">No Restrictions</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="preferredCuisines">Preferred cuisines</Label>
                                        <Select value={formData.preferredCuisines} onValueChange={handleSelectFieldChange('preferredCuisines')}>
                                            <SelectTrigger className="bg-gray-200 border-0 w-full py-6">
                                                <SelectValue placeholder="Select preferred cuisines" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cuisines.map((cuisine) => (
                                                    <SelectItem key={cuisine} value={cuisine}>
                                                        {cuisine}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ambulatoryStatus">Ambulatory status</Label>
                                        <Select value={formData.ambulatoryStatus} onValueChange={handleSelectFieldChange('ambulatoryStatus')}>
                                            <SelectTrigger className="bg-gray-200 border-0 w-full py-6">
                                                <SelectValue placeholder="Select ambulatory status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ambulatory">Fully Ambulatory</SelectItem>
                                                <SelectItem value="wheelchair">Wheelchair User</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )
                        )
                    }
                    {
                        formData.role === "Admin" && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="adminUID">Admin Unique ID</Label>
                                    <Input
                                        id="adminUID"
                                        name="adminUID"
                                        value={formData.adminUID || ""}
                                        onChange={handleInputChange}
                                        placeholder="Admin123"
                                        className="bg-gray-200 py-6"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contactNumber">Contact Number</Label>
                                    <Input
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={formData.contactNumber || ""}
                                        onChange={handleInputChange}
                                        placeholder="+65 1234 5678"
                                        className="bg-gray-200 py-6"
                                        required
                                    />
                                </div>
                            </>
                        )
                    }

                    <Button type="submit" className="w-full bg-primary hover:bg-black text-white py-6">
                        Get Started
                    </Button>
                </form>
            </div>
        </div>
    )
}