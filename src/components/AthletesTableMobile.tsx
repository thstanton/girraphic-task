import { useState } from "react";
import { Athlete } from "../../@types/results";
import AthleteBib from "./AthleteBib";
import AthleteFlag from "./AthleteFlag";
import AthleteRaceProgress from "./AthleteRaceProgress";
import AthleteRank from "./AthleteRank";

interface AthletesTableMobileProps {
  athletes: Athlete[];
}

interface AthleteCardProps {
  athlete: Athlete;
}

export default function AthletesTableMobile({
  athletes,
}: AthletesTableMobileProps) {
  const [sortBy, setSortBy] = useState<"rank" | "bib">("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const sortedAthletes =
    sortBy === "rank" ? sortByRank(athletes) : sortByBib(athletes);

  function sortByRank(athletes: Athlete[]): Athlete[] {
    if (sortOrder === "asc") {
      return athletes.sort((a, b) => a.rank - b.rank);
    } else {
      return athletes.sort((a, b) => b.rank - a.rank);
    }
  }

  function sortByBib(athletes: Athlete[]): Athlete[] {
    if (sortOrder === "asc") {
      return athletes.sort((a, b) => a.bibnumber.localeCompare(b.bibnumber));
    } else {
      return athletes.sort((a, b) => b.bibnumber.localeCompare(a.bibnumber));
    }
  }

  return (
    <div className="md:hidden">
      <div className="mb-3 text-center">
        <p className="font-lato text-slate-50">
          Sort by:{" "}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "rank" | "bib")}
            className="rounded-full border-0 bg-slate-800 p-1 px-2 text-slate-50"
          >
            <option value="rank">Rank</option>
            <option value="bib">Bib</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="rounded-full border-0 bg-slate-800 p-1 px-2 text-slate-50"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </p>
      </div>
      <div className="flex flex-col">
        {sortedAthletes.map((athlete) => (
          <AthleteCard key={athlete.athleteid} athlete={athlete} />
        ))}
      </div>
    </div>
  );
}

export function AthleteCard({ athlete }: AthleteCardProps) {
  let cardClasses =
    "font-lato mb-3 mx-auto flex w-full max-w-md justify-between gap-2 rounded-lg 0 p-4 text-slate-50 border-[0.5px] border-solid";
  if (athlete.rank < 4) {
    cardClasses += " bg-slate-800 border-amber-400 font-bold";
  } else {
    cardClasses += " border-slate-600";
  }
  return (
    <div className={cardClasses}>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <AthleteFlag flag={athlete.flag} countryname={athlete.countryname} />
          <h1>
            {athlete.firstname} {athlete.surname}
          </h1>
          <AthleteBib bibnumber={athlete.bibnumber} />
        </div>
        <div className="font-light text-slate-300">
          <h2 className="">{athlete.teamname}</h2>
          <h2 className="">{athlete.countryname}</h2>
          <h2 className="mb-3">{athlete.athleteid}</h2>
          <AthleteRaceProgress raceprogress={athlete.raceprogress} />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <AthleteRank rank={athlete.rank} />
        <h1>{athlete.finishtime}</h1>
      </div>
    </div>
  );
}
