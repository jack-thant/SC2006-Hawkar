import { getSession, getUserData } from "../lib/actions/auth-actions"
import { redirect } from "next/navigation"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UserCheck, Store, Users, Settings } from "lucide-react"

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
      if (userData?.verifyStatus === false) {
        redirect("/pending-approval")
      }
      redirect("/hawker")
    } else {
      redirect("/login")
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar username={userData?.name || "Admin"} />
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Welcome to the admin dashboard. Manage users, review reports, and oversee the platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hawker Approvals</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Pending approval requests</p>
              <Button asChild className="w-full mt-4">
                <Link href="/admin/hawker-approvals">Manage Approvals</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hawker Stalls</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Active stalls on platform</p>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link href="#">Manage Stalls</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">Total registered users</p>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link href="#">Manage Users</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Settings</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">System</div>
              <p className="text-xs text-muted-foreground">Configure platform settings</p>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link href="#">Platform Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}