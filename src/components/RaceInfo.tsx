import { Results } from "../../@types/results";

interface RaceInfoProps {
  results: Results;
}

export default function RaceInfo({ results }: RaceInfoProps) {
  const dateTime = new Date(results.tod).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="font-lato mb-8 flex text-slate-100">
      <div className="pr-2 md:w-1/2">
        <h2 className="font-montserrat text-3xl font-light uppercase">
          {results.racename}
        </h2>
        <h3 className="mb-3 text-xl font-light text-slate-400">{dateTime}</h3>
        <div className="my-4 text-slate-100">
          <span
            className={
              "rounded-full px-2 py-1 text-sm capitalize" +
              ` ${
                results.raceStatus === "completed"
                  ? "bg-green-500"
                  : results.raceStatus === "running"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`
            }
          >
            {results.raceStatus}
          </span>
        </div>
      </div>
      <div className="border-l-[0.5px] border-solid border-yellow-500 pl-8">
        <h3 className="text-lg font-light capitalize">
          Gender: {results.gender}
        </h3>
        <h3 className="text-lg font-light">
          Length: {results.racelength} miles
        </h3>
      </div>
    </div>
  );
}
