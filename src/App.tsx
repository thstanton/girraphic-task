import { results } from "../data/resultsData";
import AthletesTable from "./components/AthletesTable";
import AthletesTableMobile from "./components/AthletesTableMobile";
import RaceInfo from "./components/RaceInfo";
import ResultsHeader from "./components/ResultsHeader";

export default function App() {
  return (
    <div className="p-4">
      <RaceInfo results={results} />
      <ResultsHeader
        athletes={results.athletes}
        updated={results.lastupdated}
      />
      <AthletesTableMobile athletes={results.athletes} />
      <AthletesTable athletes={results.athletes} />
    </div>
  );
}
