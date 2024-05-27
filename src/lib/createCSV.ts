import { Athlete } from "../../@types/results";

export function createCSV(data: Athlete[]) {
  const csvData = [["Rank", "Full Name", "Finish Time", "Country Code"]];
  data.forEach((athlete) => {
    csvData.push([
      athlete.rank.toString(),
      `${athlete.firstname} ${athlete.surname}`,
      athlete.finishtime,
      athlete.flag,
    ]);
  });

  let csv = "";
  csvData.forEach((row) => {
    csv += row.join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8," });
  const objUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", objUrl);
  link.setAttribute("download", "race_results.csv");
  link.click();
}
