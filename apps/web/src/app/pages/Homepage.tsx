
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
        <h1 className="text-2xl font-bold">AI Learning Path Generator</h1>
        <p className="text-gray-600 text-sm max-w-[800px] text-center">Transform your learning goals into a clear roadmap. We will identify your current skill level, set achievable milestones, and create a customized learning path and timelines to reach your objectives.</p>
        <div className="flex flex-col gap-10 lg:flex-row">
        <Searchbar />
        <RoadMapDisplay />
        </div>
      </main>
    </div>
  )
}

export default Homepage