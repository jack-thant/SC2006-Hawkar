import HomePageSection from "@/components/home-page-section";
import { getSession, getUserData } from "./lib/actions/auth-actions";
import { redirect } from "next/navigation";
import { UserType } from "./types/auth";
import { fetchStalls } from "./lib/actions/stall-actions";

export default async function Home() {
  const session = await getSession()
  const userData = await getUserData()
  const stalls = await fetchStalls()

  if (!session) {
    redirect('/login') 
  }
  // Redirect based on user role
  if (userData?.role === UserType.Hawker) {
    redirect("/hawker")
  } else if (userData?.role === UserType.Admin) {
    redirect("/admin")
  }
  return (
    <HomePageSection stalls={stalls} userData={userData}/>
  )
}