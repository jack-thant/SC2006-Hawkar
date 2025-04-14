import HomePageSection from "@/components/home-page-section";
import { getSession, getUserData } from "./lib/actions/auth-actions";
import { redirect } from "next/navigation";
import { UserType } from "./types/auth";
import { fetchHawkerCenters, fetchStalls } from "./lib/actions/stall-actions";

export default async function Home() {

  const [session, userData, stalls, hawkerCenters] = await Promise.all([
    getSession(), getUserData(), fetchStalls(), fetchHawkerCenters()
  ])

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
    <HomePageSection stalls={stalls} userData={userData} hawkerCenters={hawkerCenters}/>
  )
}