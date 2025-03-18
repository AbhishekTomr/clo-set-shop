import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SearchBar from "../SearchBar";
import { Provider } from "react-redux";
import { store } from "../../../Store/Store";

const renderComponent = (initialVal = "", reset = false) => {
  return render(
    <BrowserRouter>
      <SearchBar initialVal={initialVal} reset={reset} />
    </BrowserRouter>
  );
};

describe("SearchBar Component", () => {
  it("renders the search input", () => {
    renderComponent();
    const inputElement = screen.getByPlaceholderText(
      "Find the items you're looking for"
    );
    expect(inputElement).toBeInTheDocument();
  });

  it("updates the input value when typing", () => {
    renderComponent();
    const inputElement = screen.getByPlaceholderText(
      "Find the items you're looking for"
    );

    fireEvent.change(inputElement, { target: { value: "Shoes" } });
    expect(inputElement).toHaveValue("Shoes");
  });

  it("clears input value when reset is true", () => {
    const { rerender } = renderComponent("Shoes", false);
    const inputElement = screen.getByPlaceholderText(
      "Find the items you're looking for"
    );

    expect(inputElement).toHaveValue("Shoes");

    rerender(
      <BrowserRouter>
        <SearchBar initialVal="Shoes" reset={true} />
      </BrowserRouter>
    );

    expect(inputElement).toHaveValue("");
  });
  //     const setSearchParams = jest.fn();
  //     jest.mock("react-router-dom", () => ({
  //       useSearchParams: () => [new URLSearchParams(), setSearchParams],
  //     }));

  //     renderComponent();
  //     const inputElement = screen.getByPlaceholderText(
  //       "Find the items you're looking for"
  //     );
  //     const searchButton = screen.getByRole("button");

  //     fireEvent.change(inputElement, { target: { value: "Laptop" } });
  //     fireEvent.click(searchButton);

  //     expect(setSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
  //   });

  //   xit("removes searchTerm from params when input is empty", () => {
  //     const setSearchParams = jest.fn();
  //     jest.mock("react-router-dom", () => ({
  //       useSearchParams: () => [new URLSearchParams(), setSearchParams],
  //     }));

  //     renderComponent("Laptop");
  //     const inputElement = screen.getByPlaceholderText(
  //       "Find the items you're looking for"
  //     );
  //     const searchButton = screen.getByRole("button");

  //     fireEvent.change(inputElement, { target: { value: "" } });
  //     fireEvent.click(searchButton);

  //     expect(setSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
  //   });
});
