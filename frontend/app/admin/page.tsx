import { getSession, getUserData } from "../lib/actions/auth-actions"
import { redirect } from "next/navigation"
import Navbar from "@/components/navbar"

export default async function AdminDashboard() {
  const session = await getSession()
  const userData = await getUserData()

  if (!session) {
    redirect("/login")
  }

  if (userData?.role !== "Admin") {
    // If not an admin, redirect to appropriate page
    if (userData?.role === "Consumer") {
      redirect("/")
    } else if (userData?.role === "Hawker") {
      redirect("/hawker")
    } else {
      redirect("/login")
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar username={userData?.name || "Admin"} />
      <div className="flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Welcome to the admin dashboard. Manage users, review reports, and oversee the platform.
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground">
            We're currently building the admin management features. Check back soon for updates!
          </p>
        </div>
      </div>
    </main>
  )
}