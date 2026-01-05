
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import RoadMapDisplay from "../components/roadmap-display";

function Homepage() {
  return (
    <div className="h-full flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="p-4 flex flex-col items-center gap-6 h-full">
        <h1 className="text-2xl font-bold">What are you trying to learn?</h1>
        <div className="flex gap-10">
        <Searchbar />
        <RoadMapDisplay />
        </div>
      </main>
    </div>
  )
}

export default Homepage