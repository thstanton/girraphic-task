import { FiDownload } from "react-icons/fi";
import { createCSV } from "../lib/createCSV";
import { Athlete } from "../../@types/results";

interface ResultsHeaderProps {
  athletes: Athlete[];
  updated: string;
}

export default function ResultsHeader({
  athletes,
  updated,
}: ResultsHeaderProps) {
  const updatedDateTime = new Date(updated).toLocaleString("en-GB");

  function handleDownload() {
    createCSV(athletes);
  }
  return (
    <div className="mb-5 flex flex-col justify-between sm:flex-row">
      <div>
        <h2 className="font-montserrat text-3xl font-light uppercase text-slate-100">
          Results:
        </h2>
        <h4 className="font-lato font-light italic text-slate-400">
          Updated {updatedDateTime}
        </h4>
      </div>
      <button
        className="font-lato flex items-center gap-2 rounded-sm border-[0.5px] border-solid border-amber-400 px-2 py-1 font-light text-amber-400 drop-shadow-sm hover:bg-amber-800 active:bg-slate-200 active:text-slate-900"
        onClick={handleDownload}
      >
        <FiDownload />
        Download Results
      </button>
    </div>
  );
}
