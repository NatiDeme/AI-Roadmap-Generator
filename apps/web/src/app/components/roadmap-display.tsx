import { useIsMutating, useQueryClient } from "@tanstack/react-query";
import { GENERATE_ROADMAP_MUTATION_KEY, LATEST_ROADMAP_QUERY_KEY } from "../services/query.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import { getRoadmapFromLocalStorage } from "../utils/persistence.utils";

function RoadMapDisplay() {
  const queryClient = useQueryClient();
  const isGeneratingCount = useIsMutating({ mutationKey: GENERATE_ROADMAP_MUTATION_KEY });
  const isGenerating = isGeneratingCount > 0;
  const savedRoadmap = getRoadmapFromLocalStorage();
  const latest = queryClient.getQueryData(LATEST_ROADMAP_QUERY_KEY) as any || savedRoadmap;

  const loadingMessages = useMemo(
    () => [
      "Analyzing your skill level...",
      "Mapping out your timeline...",
      "Breaking the goal into steps...",
      "Picking the best resources...",
      "Estimating weekly progress...",
      "Finalizing your roadmap...",
    ],
    []
  );

  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    if (!isGenerating) {
      setLoadingIndex(0);
      return;
    }

    setLoadingIndex(0);
    const id = window.setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => window.clearInterval(id);
  }, [isGenerating, loadingMessages.length]);

  return (
    <div className="md:w-[500px] w-96 border-2 border-gray-300 rounded-2xl justify-between">
      <div className="p-6">
       <h3 className="text-2xl font-bold w-full border-b-2 border-gray-300 pb-4">Generated Roadmap</h3>
      </div>
      <div className="max-h-[400px] overflow-y-scroll p-6">
        {isGenerating ? (
          <div className="text-gray-500 flex gap-2 items-center">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            <span className="animate-pulse">{loadingMessages[loadingIndex]}</span>
          </div>
        ) : !latest ? (
            <div className="text-gray-500 flex items-center justify-center w-full h-full">
              <span>Submit the form to generate your roadmap.</span>
            </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-sm text-gray-500">Goal</div>
              <div className="font-semibold">{latest.roadmap?.goal ?? latest.goal}</div>
            </div>

            <div className="flex flex-col gap-3">
              {(latest.roadmap?.steps ?? latest.steps ?? []).map((step: any, idx: number) => (
                <div key={step.id ?? idx} className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2">
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  <div>
                    <h4>Resources:</h4>
                    <ul className="list-disc list-inside">
                      {step.resources.map((resource: any, idx: number) => (
                        <li className="text-blue-400" key={idx}><a target="_blank" href={resource.url} rel="noreferrer">{resource.label}</a></li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span>Estimated time: {step.estimatedHours} hours</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoadMapDisplay