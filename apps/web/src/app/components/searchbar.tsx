import { useState } from "react"
import { generateRoadmap } from "../services/data.service";

function Searchbar() {
  const [goal, setGoal] = useState('');
  const [currentSkill, setCurrentSkill] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(0);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(!goal || !currentSkill || !hoursPerWeek) {
        throw new Error('All fields are required');
      }
      const response = await generateRoadmap({ goal, currentSkill, hoursPerWeek });
      console.log('Roadmap generation response:', response);
    } catch (error) {
      console.error('Error generating roadmap:', error);
    }
  };

  return (
    <form className="flex flex-col gap-3 w-[500px] border-2 border-gray-300 rounded-2xl justify-between p-6" onSubmit={handleSubmit}>
      
      <h3 className="text-2xl font-bold">Create your roadmap</h3>

      <label htmlFor="prompt">Learning Goal *</label>
      <input type="text" name="prompt" placeholder="e.g Learn Go for backend development" className="w-full border-2 rounded-2xl h-14 p-2 border-gray-300 focus:ring-0 focus:outline-none" value={goal} onChange={(e) => setGoal(e.target.value)} />
      
      <label htmlFor="currentSkill">Current Skill Level *</label>
      <span className="text-gray-500 text-sm">Describe your current knowledge and experience in this field</span>
      <input type="text" name="currentSkill" placeholder="e.g Basic understanding of programming concepts" className="w-full border-2 rounded-2xl h-14 p-2 border-gray-300 focus:ring-0 focus:outline-none" value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} />
      
      <label htmlFor="hoursPerWeek">Hours per Week *</label>
      <span className="text-gray-500 text-sm">How many hours can you dedicate to learning per week?</span>
      <input type="number" name="hoursPerWeek" placeholder="e.g 10 hours per week" className="w-full border-2 rounded-2xl h-14 p-2 border-gray-300 focus:ring-0 focus:outline-none" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} />
      
      <div className="flex justify-between items-center border-t-2 border-gray-100 py-2">
        <button type="submit" className="bg-black text-white rounded-full p-4 hover:bg-gray-700 transition-colors">
          Generate roadmap
        </button>
      </div>
    </form>
  )
}

export default Searchbar