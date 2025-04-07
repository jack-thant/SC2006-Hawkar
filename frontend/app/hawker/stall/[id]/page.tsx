import { getSession, getUserData } from "@/app/lib/actions/auth-actions"
import { redirect } from "next/navigation"
import Navbar from "@/components/navbar"
import StallManagementContent from "@/components/hawker/stall-management-context"

export default async function StallManagementPage({ params }: { params: { id: string } }) {
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

  // Check verification status
  if (userData?.verifyStatus === false) {
    redirect("/pending-approval")
  }

  // In a real app, you would fetch the stall data and verify ownership

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar username={userData?.name || "Hawker"} />
      <StallManagementContent stallId={params.id} userData={userData} />
    </main>
  )
}