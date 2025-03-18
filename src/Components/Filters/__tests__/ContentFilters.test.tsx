import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ContentFilters from "../ContentFilters";
import { IFilters, PRICING_OPTION } from "../../../types";

const mockSetSearchParams = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: () => [new URLSearchParams(), mockSetSearchParams],
}));

const defaultFilters: IFilters = {
  priceType: [],
  price: {
    min: 100,
    max: 500,
  },
  searchTerm: "",
};

const renderComponent = (filters = defaultFilters, reset = false) => {
  return render(
    <BrowserRouter>
      <ContentFilters initialVal={filters} reset={reset} />
    </BrowserRouter>
  );
};

describe("ContentFilters Component", () => {
  it("renders all pricing option checkboxes", () => {
    renderComponent();
    expect(screen.getByLabelText("Paid")).toBeInTheDocument();
    expect(screen.getByLabelText("Free")).toBeInTheDocument();
    expect(screen.getByLabelText("View Only")).toBeInTheDocument();
  });

  it("checks and unchecks pricing option checkboxes", () => {
    renderComponent();

    const paidCheckbox = screen.getByLabelText("Paid");
    const freeCheckbox = screen.getByLabelText("Free");

    fireEvent.click(paidCheckbox);
    expect(paidCheckbox).toBeChecked();

    fireEvent.click(freeCheckbox);
    expect(freeCheckbox).toBeChecked();

    fireEvent.click(paidCheckbox);
    expect(paidCheckbox).not.toBeChecked();
  });

  it("clears selected filters when reset is true", () => {
    const { rerender } = renderComponent(
      {
        priceType: [PRICING_OPTION.PAID],
        price: { min: 100, max: 500 },
        searchTerm: "",
      },
      false
    );

    const paidCheckbox = screen.getByLabelText("Paid");
    expect(paidCheckbox).toBeChecked();

    rerender(
      <BrowserRouter>
        <ContentFilters initialVal={defaultFilters} reset={true} />
      </BrowserRouter>
    );

    expect(paidCheckbox).not.toBeChecked();
  });

  it("updates searchParams when filters change", () => {
    renderComponent();

    const paidCheckbox = screen.getByLabelText("Paid");
    fireEvent.click(paidCheckbox);

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it("renders PriceSlider with correct initial values", () => {
    renderComponent({
      priceType: [],
      price: { min: 200, max: 800 },
      searchTerm: "",
    });

    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("$ 800")).toBeInTheDocument();
  });
});
