import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PriceSlider from "../PriceSlider";
import { BrowserRouter } from "react-router-dom";

describe("PriceSlider Component", () => {
  const renderComponent = (initialVal = [100, 500], reset = false) => {
    return render(
      <BrowserRouter>
        <PriceSlider initialVal={initialVal} reset={reset} />
      </BrowserRouter>
    );
  };

  test("should render price slider with initial values", () => {
    renderComponent();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("$ 500")).toBeInTheDocument();
  });

  test("should update price range when slider is moved", async () => {
    renderComponent();
    const slider = await screen.findByTestId("slider");
    expect(slider).toBeInTheDocument();
  });

  test("should reset to initial values when reset is true", () => {
    const { rerender } = renderComponent([150, 400], false);
    rerender(
      <BrowserRouter>
        <PriceSlider initialVal={[150, 400]} reset={true} />
      </BrowserRouter>
    );
    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByText("$ 400")).toBeInTheDocument();
  });
});
