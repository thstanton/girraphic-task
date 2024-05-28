import { useState } from "react";
import { Athlete } from "../../@types/results";
import AthleteFlag from "./AthleteFlag";
import AthleteBib from "./AthleteBib";
import AthleteRank from "./AthleteRank";
import AthleteRaceProgress from "./AthleteRaceProgress";

interface AthletesTableProps {
  athletes: Athlete[];
}

interface AthletesRowProps {
  athlete: Athlete;
}

export default function AthletesTable({ athletes }: AthletesTableProps) {
  const [sortBy, setSortBy] = useState<"rank" | "bib">("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const sortedAthletes =
    sortBy === "rank" ? sortByRank(athletes) : sortByBib(athletes);
  const orderIcon = sortOrder === "asc" ? "▲" : "▼";

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

  function toggleSortByRank() {
    setSortBy("rank");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }

  function toggleSortByBib() {
    setSortBy("bib");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }

  return (
    <table className="font-lato hidden w-full table-auto text-slate-300 md:table">
      <thead className="text-left">
        <tr className="h-10">
          <th className="pl-2 font-light">
            <span
              onClick={toggleSortByRank}
              className={
                "cursor-pointer hover:font-black" +
                ` ${sortBy === "rank" ? "font-bold" : ""}`
              }
            >
              Rank <span>{sortBy === "rank" ? orderIcon : ""}</span>
            </span>
          </th>
          <th className="w-24 font-light">First Name</th>
          <th className="w-24 font-light">Surname</th>
          <th className="font-light">Athlete ID</th>
          <th className="font-light">Finish Time</th>
          <th className="font-light">Race Progress</th>
          <th className="w-36 font-light">Team Name</th>
          <th className="text-center font-light">
            <span
              onClick={toggleSortByBib}
              className={
                "cursor-pointer hover:font-black" +
                ` ${sortBy === "bib" ? "font-bold" : ""}`
              }
            >
              Bib Number <span>{sortBy === "bib" ? orderIcon : ""}</span>
            </span>
          </th>
          <th className="w-12"></th>
          <th className="font-light">Country</th>
        </tr>
      </thead>
      <tbody>
        {sortedAthletes.map((athlete) => (
          <AthletesRow key={athlete.athleteid} athlete={athlete} />
        ))}
      </tbody>
    </table>
  );
}

export function AthletesRow({ athlete }: AthletesRowProps) {
  return (
    <tr
      className={
        athlete.rank < 4
          ? "h-12 border-b bg-slate-800 font-semibold"
          : "h-12 border-b border-slate-700"
      }
    >
      <td className="pl-2">
        <AthleteRank rank={athlete.rank} />
      </td>
      <td>{athlete.firstname}</td>
      <td>{athlete.surname}</td>
      <td>{athlete.athleteid}</td>
      <td>{athlete.raceprogress === "completed" && athlete.finishtime}</td>
      <td>
        <AthleteRaceProgress raceprogress={athlete.raceprogress} />
      </td>
      <td>{athlete.teamname}</td>
      <td>
        <AthleteBib bibnumber={athlete.bibnumber} />
      </td>
      <td>
        <AthleteFlag flag={athlete.flag} countryname={athlete.countryname} />
      </td>
      <td>{athlete.countryname}</td>
    </tr>
  );
}
