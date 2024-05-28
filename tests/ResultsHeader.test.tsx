import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ResultsHeader from "../src/components/ResultsHeader";
import { act } from "react";

describe("ResultsHeader", () => {
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

  //   Create mocked URL.createObjectURL method to be called when testing download button
  const originalCreateObjectURL = window.URL.createObjectURL;
  const mockedCreateObjectURL = vi.fn((blob) => blob);
  window.URL.createObjectURL = mockedCreateObjectURL;

  //   Create mocked Blob constructor to be called when testing download button
  const originalBlob = Blob;
  const mockedBlob = vi.fn(
    (content, options) => new originalBlob(content, options),
  );
  window.Blob = mockedBlob;

  it("should render", () => {
    render(
      <ResultsHeader athletes={athletes} updated={new Date().toDateString()} />,
    );

    expect(
      screen.getByRole("heading", { name: /Updated/ }),
    ).toBeInTheDocument();
  });

  it("should download a CSV file of the athletes when button is clicked", () => {
    render(
      <ResultsHeader athletes={athletes} updated={new Date().toDateString()} />,
    );

    // Check button exists
    const downloadButton = screen.getByRole("button", {
      name: /Download Results/,
    });
    expect(downloadButton).toBeInTheDocument();

    // Mock link creation, navigation and download
    const createElementMock = vi.spyOn(document, "createElement");
    const linkClickMock = vi.fn();
    createElementMock.mockImplementation((tagName: string) => {
      if (tagName === "a") {
        return {
          setAttribute: vi.fn(),
          click: linkClickMock,
        } as unknown as HTMLAnchorElement;
      }
      return document.createElement(tagName);
    });

    // Click button
    act(() => {
      fireEvent.click(downloadButton);
    });

    // Check that Blob constructor was called
    expect(mockedBlob).toHaveBeenCalled();
    expect(mockedBlob).toHaveBeenCalledWith([expect.any(String)], {
      type: "text/csv;charset=utf-8,",
    });

    // Check Blob content is correctly formatted as CSV and content is correct
    const csvContent = mockedBlob.mock.calls[0][0][0];
    const expectedCsvContent =
      "Rank,Full Name,Finish Time,Country Code\n3,John Doe,2:23:45,USA\n2,Jane Doe,1:23:45,GBR\n1,Mary Shelley,1:19:58,DEU\n";
    expect(csvContent).toEqual(expectedCsvContent);

    // Check that URL.createObjectURL was called
    expect(mockedCreateObjectURL).toHaveBeenCalled();

    // Check that link was created and clicked
    expect(createElementMock).toHaveBeenCalledWith("a");
    expect(linkClickMock).toHaveBeenCalled();

    // Cleanup
    window.URL.createObjectURL = originalCreateObjectURL;
    window.Blob = originalBlob;
    createElementMock.mockRestore();
    linkClickMock.mockRestore();
  });
});
