import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SortBy from "../SortBy";
import { SORT_BY } from "../../../types";

const mockSetSearchParams = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: () => [new URLSearchParams(), mockSetSearchParams],
}));

const renderComponent = (initialVal = SORT_BY.ITEM_NAME, reset = false) => {
  return render(
    <BrowserRouter>
      <SortBy initialVal={initialVal} reset={reset} />
    </BrowserRouter>
  );
};

describe("SortBy Component", () => {
  test("renders the Sort By dropdown", () => {
    renderComponent();
    expect(screen.getByLabelText("Sort By")).toBeInTheDocument();
  });

  test("selects a sorting option and updates state", () => {
    renderComponent();

    const selectElement = screen.getByTestId("sort-by");
    fireEvent.click(selectElement);
    waitFor(() => {
      const highToLowOption = screen.getByText("Price (high to low)");
      fireEvent.click(highToLowOption);

      expect(mockSetSearchParams).toHaveBeenCalled();
    });
  });

  test("resets to initial value when reset is true", () => {
    const { rerender } = renderComponent(SORT_BY.PRICE_MAX, false);

    const selectElement = screen.getByTestId("sort-by");
    expect(selectElement).toHaveTextContent("Price (high to low)");

    rerender(
      <BrowserRouter>
        <SortBy initialVal={SORT_BY.ITEM_NAME} reset={true} />
      </BrowserRouter>
    );

    expect(selectElement).toHaveTextContent("Relevance");
  });

  test("updates searchParams when sorting changes", () => {
    renderComponent();

    const selectElement = screen.getByTestId("sort-by");
    fireEvent.mouseDown(selectElement);
    waitFor(() => {
      const lowToHighOption = screen.getByText("Price (low to high)");
      fireEvent.click(lowToHighOption);

      expect(mockSetSearchParams).toHaveBeenCalled();
    });
  });
});
