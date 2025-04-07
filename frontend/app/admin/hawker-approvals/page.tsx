import { getSession, getUserData } from "../../lib/actions/auth-actions"
import { redirect } from "next/navigation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for pending hawker approvals
const pendingHawkers = [
  {
    id: "1",
    name: "John's Chicken Rice",
    ownerName: "John Tan",
    email: "john@example.com",
    contactNumber: "+65 9123 4567",
    sfaLicenseNumber: "SFA12345",
    address: "123 Maxwell Road, Singapore",
    registrationDate: "2023-10-15",
  },
  {
    id: "2",
    name: "Mary's Nasi Lemak",
    ownerName: "Mary Lim",
    email: "mary@example.com",
    contactNumber: "+65 8765 4321",
    sfaLicenseNumber: "SFA67890",
    address: "456 Geylang Road, Singapore",
    registrationDate: "2023-10-16",
  },
]

export default async function HawkerApprovalsPage() {
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

  // In a real app, you would fetch pending hawker approvals from your API

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar username={userData?.name || "Admin"} />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Hawker Approval Requests</h1>
            <p className="text-muted-foreground">Review and approve hawker registration requests</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin">Back to Dashboard</Link>
          </Button>
        </div>

        {pendingHawkers.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {pendingHawkers.map((hawker) => (
              <Card key={hawker.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{hawker.name}</CardTitle>
                      <CardDescription>Owner: {hawker.ownerName}</CardDescription>
                    </div>
                    <Badge>Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">SFA License:</div>
                      <div>{hawker.sfaLicenseNumber}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">Email:</div>
                      <div>{hawker.email}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">Contact:</div>
                      <div>{hawker.contactNumber}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">Address:</div>
                      <div>{hawker.address}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">Registration Date:</div>
                      <div>{hawker.registrationDate}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="w-[48%]">
                    Reject
                  </Button>
                  <Button className="w-[48%]">Approve</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No pending hawker approval requests</p>
          </div>
        )}
      </div>
    </main>
  )
}