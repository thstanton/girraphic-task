import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AthleteFlag from "../src/components/AthleteFlag";

describe("Flag", () => {
  it("should render a flag, where the country code is included in the isoMapping index", () => {
    render(<AthleteFlag flag="USA" countryname="United States" />);
    const flag = screen.getByAltText("United States flag");
    expect(flag).toBeInTheDocument();
  });

  it("should render the country code, where the country code is not included in the isoMapping index", () => {
    render(<AthleteFlag flag="AAA" countryname="United Kingdom" />);
    const flag = screen.getByText("AAA");
    expect(flag).toBeInTheDocument();
  });
});
