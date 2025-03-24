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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleRoleChange = (value: string) => {
        setFormData({ ...formData, role: value })
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
        <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Complete Your Profile to Get Started!</h1>
                <p className="text-gray-600">
                    Just a few more details, and you&apos;ll be all set. Once completed, we&apos;ll take you to your home page!
                </p>
            </div>

            <div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {profileImage ? (
                                    <Image
                                        src={profileImage || "/placeholder.svg"}
                                        alt="Profile"
                                        width={96}
                                        height={96}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 text-gray-400"
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
                                className="absolute -right-4 top-0 cursor-pointer text-xs text-gray-600 w-32 text-center"
                            >
                                Click on the profile picture to upload your photo
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={formData.role} onValueChange={handleRoleChange}>
                            <SelectTrigger className="bg-gray-200 border-0">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Consumer">Consumer</SelectItem>
                                <SelectItem value="Hawker">Hawker</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {formData.role === "Hawker" ? (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="sfaLicenseNumber">SFA licence num</Label>
                                <Input
                                    id="sfaLicenseNumber"
                                    name="sfaLicenseNumber"
                                    value={formData.sfaLicenseNumber || ""}
                                    onChange={handleInputChange}
                                    className="bg-gray-200 border-0"
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
                                    className="bg-gray-200 border-0"
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
                                    className="bg-gray-200 border-0"
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formData.address || ""}
                                    onChange={handleInputChange}
                                    className="bg-gray-200 border-0"
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
                                    className="bg-gray-200 border-0"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dietaryPreference">Dietary preference</Label>
                                <Input
                                    id="dietaryPreference"
                                    name="dietaryPreference"
                                    value={formData.dietaryPreference || ""}
                                    onChange={handleInputChange}
                                    className="bg-gray-200 border-0"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="preferredCuisines">Preferred cuisines</Label>
                                <Input
                                    id="preferredCuisines"
                                    name="preferredCuisines"
                                    value={formData.preferredCuisines || ""}
                                    onChange={handleInputChange}
                                    className="bg-gray-200 border-0"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ambulatoryStatus">Ambulatory status</Label>
                                <Input
                                    id="ambulatoryStatus"
                                    name="ambulatoryStatus"
                                    value={formData.ambulatoryStatus || ""}
                                    onChange={handleInputChange}
                                    className="bg-gray-200 border-0"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <Button type="submit" className="w-full bg-[#1F1B2D] hover:bg-[#2d2842] text-white">
                        Get Started
                    </Button>
                </form>
            </div>
        </div>
    )
}