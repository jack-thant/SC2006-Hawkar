import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
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
          </form>
        </div>
      </div>
    </main>
  )
}