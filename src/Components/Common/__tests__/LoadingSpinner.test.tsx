import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner Component", () => {
  it("should render the loading spinner", () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should render CircularProgress component", () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole("progressbar")).toHaveClass(
      "MuiCircularProgress-root"
    );
  });
});
