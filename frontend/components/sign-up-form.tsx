"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import ProfileForm from "@/components/profile-form"

type FormData = {
    name: string
    email: string
    password: string
    role: "Consumer" | "Hawker"
    profilePicture?: string
    address?: string
    contactNumber?: string
    sfaLicenseNumber?: string
    dietaryPreference?: string
    preferredCuisines?: string
    ambulatoryStatus?: string
}

export default function SignUpForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        role: "Consumer",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault()
        setCurrentStep(2)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the data to your backend
        console.log("Form submitted:", formData)
        // Redirect to home page or show success message
        alert("Account created successfully!")
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm">
            <div className="p-6">
                <div className="flex items-center">
                    <div className="text-xl font-bold">Logo</div>
                </div>

                {currentStep === 1 ? (
                    <div className="max-w-md mx-auto mt-10">
                        <h1 className="text-3xl font-bold text-center mb-2">Create an account</h1>
                        <p className="text-center mb-6">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary font-medium">
                                Login
                            </Link>
                        </p>

                        <form onSubmit={handleNextStep} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-gray-200 border-0"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-gray-200 border-0"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-gray-200 border-0 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-500" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-[#1F1B2D] hover:bg-[#2d2842] text-white">
                                Next
                            </Button>

                            <div className="flex items-center gap-4 my-6">
                                <Separator className="flex-1" />
                                <span className="text-sm text-gray-500">Or register with</span>
                                <Separator className="flex-1" />
                            </div>

                            <Button type="button" variant="outline" className="w-full" onClick={() => console.log("Google sign up")}>
                                Sign up with Google
                            </Button>
                        </form>
                    </div>
                ) : (
                    <ProfileForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
                )}
            </div>
        </div>
    )
}