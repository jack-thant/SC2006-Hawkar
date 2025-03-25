import Navbar from "@/components/navbar"
import SearchBar from "@/components/search-bar"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar username="John Doe"/>
      <div className="flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-3xl font-bold">Your Guide to the Best Hawker Eats!</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          From legendary chicken rice to the crispiest prata, uncover Singapore’s best hawker stalls. Browse reviews, discover top-rated dishes, and share your foodie finds!
        </p>
      </div>
      <div className="mb-8">
        <SearchBar/>
      </div>
    </main>
  )
}