"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, Globe, User, ArrowLeft, Heart, Share } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  username?: string
  stallName?: string
  onSaveToggle?: () => void
  isSaved?: boolean
}

export default function Navbar({ username = "User", stallName, onSaveToggle, isSaved = false }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isStallDetailPage = pathname.startsWith("/stall/")

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          {isStallDetailPage ? (
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="hidden md:block font-medium truncate max-w-[200px]">{stallName}</div>
            </div>
          ) : (
            <Link href="/" className="font-bold text-xl">
              Hawkar
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {isStallDetailPage && (
            <>
              {onSaveToggle && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
                  onClick={onSaveToggle}
                  className="hidden md:flex"
                >
                  <Heart className={`h-5 w-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              )}
            </>
          )}

          <Button variant="ghost" size="icon" aria-label="Change language">
            <Globe className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <User className="h-5 w-5" />
                <span className="hidden sm:inline-block">Hi, {username}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm font-medium">Hi, {username}</div>
              <DropdownMenuSeparator />
              {isStallDetailPage && (
                <>
                  {onSaveToggle && (
                    <DropdownMenuItem onClick={onSaveToggle} className="md:hidden">
                      <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                      {isSaved ? "Remove from favorites" : "Add to favorites"}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="md:hidden">
                    <Share className="h-4 w-4 mr-2" />
                    Share stall
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="md:hidden" />
                </>
              )}
              <DropdownMenuItem asChild>
                <Link href="/profile">Edit Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}