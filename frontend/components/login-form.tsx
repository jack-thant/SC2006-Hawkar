"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function LoginForm() {
    return (
        <div className="w-full max-w-md bg-white p-6">
            <div className="space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl font-bold">Welcome Back!</h1>
                    <p className="text-gray-600 pt-3">
                        Don&apos;t have an account?{" "}
                        <Link href="/" className="text-primary font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Email Address" className="bg-gray-200 py-6" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="bg-gray-200 border-0 py-6"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full bg-primary text-white mt-6 py-6">
                        Login
                    </Button>

                    <div className="flex items-center gap-4 my-6">
                        <Separator className="flex-1" />
                        <span className="text-sm text-gray-500">Or login with</span>
                        <Separator className="flex-1" />
                    </div>

                    <Button type="button" variant="outline" className="w-full py-6" onClick={() => console.log("Google sign up")}>
                        <Image
                            src='/google-icon.svg'
                            width={20}
                            height={20}
                            alt="Google icon"
                        />
                        <span>Sign in with Google</span>
                    </Button>
                </form>
            </div>
        </div>
    )
}