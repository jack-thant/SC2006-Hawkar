import { getSession, getUserData } from "../lib/actions/auth-actions"
import { redirect } from "next/navigation"
import Navbar from "@/components/navbar"

export default async function HawkerDashboard() {
  const session = await getSession()
  const userData = await getUserData()

  if (!session) {
    redirect("/login")
  }

  if (userData?.role !== "Hawker") {
    // If not a hawker, redirect to appropriate page
    if (userData?.role === "Consumer") {
      redirect("/")
    } else if (userData?.role === "Admin") {
      redirect("/admin")
    } else {
      redirect("/login")
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar username={userData?.name || "Hawker"} />
      <div className="flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-3xl font-bold">Hawker Dashboard</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Welcome to your hawker dashboard. Manage your stall, update menu items, and track your performance.
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground">
            We're currently building the hawker management features. Check back soon for updates!
          </p>
        </div>
      </div>
    </main>
  )
}