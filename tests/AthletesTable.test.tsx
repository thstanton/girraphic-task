import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AthletesTable from "../src/components/AthletesTable";
import { act } from "react";

const athletes = [
  {
    rank: 3,
    firstname: "John",
    surname: "Doe",
    athleteid: "987abx",
    finishtime: "2:23:45",
    raceprogress: "complete",
    teamname: "Team A",
    bibnumber: "123",
    flag: "USA",
    countryname: "United States",
  },
  {
    rank: 2,
    firstname: "Jane",
    surname: "Doe",
    athleteid: "12345",
    finishtime: "1:23:45",
    raceprogress: "complete",
    teamname: "Team GB",
    bibnumber: "321",
    flag: "GBR",
    countryname: "Great Britain",
  },
  {
    rank: 1,
    firstname: "Mary",
    surname: "Shelley",
    athleteid: "ab1234",
    finishtime: "1:19:58",
    raceprogress: "complete",
    teamname: "Team Deutschland",
    bibnumber: "12",
    flag: "DEU",
    countryname: "Germany",
  },
];

describe("AthletesTable", () => {
  it("should render a list of athletes", () => {
    render(<AthletesTable athletes={athletes} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(4);
    const row = screen.getByRole("row", {
      name: /3 John Doe/i,
    });
    expect(row).toBeInTheDocument();
    expect(row).toHaveTextContent("3");
    expect(row).toHaveTextContent("John");
    expect(row).toHaveTextContent("Doe");
    expect(row).toHaveTextContent("987abx");
    expect(row).toHaveTextContent("2:23:45");
    expect(row).toHaveTextContent("Team A");
    expect(row).toHaveTextContent("123");
    expect(row).toHaveTextContent("United States");
  });

  it("should sort the athletes by rank, ascending order, on first render", () => {
    render(<AthletesTable athletes={athletes} />);
    const table = screen.getByRole("table");
    const firstRow = table.querySelector("tbody > tr:first-child");
    expect(firstRow).toHaveTextContent("1");
  });

  it("should reverse the order of athletes when the rank header is clicked", () => {
    render(<AthletesTable athletes={athletes} />);
    const rankHeader = screen
      .getByRole("columnheader", {
        name: /rank/i,
      })
      .querySelector("span") as HTMLSpanElement;
    act(() => fireEvent.click(rankHeader));
    const table = screen.getByRole("table");
    const firstRow = table.querySelector("tbody > tr:first-child");
    expect(firstRow).toHaveTextContent("3");
  });

  it("should sort the athletes by bib, if bib header is clicked", () => {
    render(<AthletesTable athletes={athletes} />);
    const bibHeader = screen
      .getByRole("columnheader", {
        name: /bib/i,
      })
      .querySelector("span") as HTMLSpanElement;
    act(() => fireEvent.click(bibHeader));
    const table = screen.getByRole("table");
    const firstRow = table.querySelector(
      "tbody > tr:first-child > td:nth-child(8)",
    );
    expect(firstRow).toHaveTextContent(/^321$/);
  });

  it("should reverse the order of athletes when the bib header is clicked a second time", () => {
    render(<AthletesTable athletes={athletes} />);
    const bibHeader = screen
      .getByRole("columnheader", {
        name: /bib/i,
      })
      .querySelector("span") as HTMLSpanElement;
    act(() => fireEvent.click(bibHeader));
    act(() => fireEvent.click(bibHeader));
    const table = screen.getByRole("table");
    const firstRow = table.querySelector(
      "tbody > tr:first-child > td:nth-child(8)",
    );
    expect(firstRow).toHaveTextContent(/^12$/);
  });
});
