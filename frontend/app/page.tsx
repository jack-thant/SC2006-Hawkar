import HomePageSection from "@/components/home-page-section";
import { getSession, getUserData } from "./lib/actions/auth-actions";
import { redirect } from "next/navigation";
import { UserType } from "./types/auth";

export default async function Home() {
  const session = await getSession()
  const userData = await getUserData()
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
    <HomePageSection userData={userData}/>
  )
}