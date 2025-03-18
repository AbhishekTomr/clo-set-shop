import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Filters from "../Filters";
import { Provider } from "react-redux";
import { store } from "../../../Store/Store";
import { BrowserRouter } from "react-router-dom";
import { ProductServices } from "../../../Services/ProductsServices";
import { tokenize } from "../../../helpers";

jest.mock("../../../Services/ProductsServices"); // Mock the entire class
jest.mock("../../../helpers");

jest.mock("../SortBy", () => () => {
  return <div data-testid="mock-sortby">Mock SortBy</div>;
});

jest.mock("../SearchBar", () => () => {
  return <div data-testid="mock-sortby">Mock SearchBar</div>;
});

describe("Filters Component", () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Filters />
        </BrowserRouter>
      </Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
    const mockFetchAllProducts = ProductServices.prototype
      .fetchAllProducts as jest.Mock;

    // Provide mock data
    mockFetchAllProducts.mockResolvedValue([
      {
        id: "content-001",
        creator: "Adam",
        ttestle: "Yellow green coat",
        pricingOption: 0,
        imagePath:
          "https://closetfrontrecrutesting.blob.core.windows.net/images/thumbnail_1.jpeg",
        price: 50,
      },
      {
        id: "content-002",
        creator: "Benny",
        ttestle: "Brown Anorak",
        pricingOption: 1,
        imagePath:
          "https://closetfrontrecrutesting.blob.core.windows.net/images/thumbnail_2.png",
        price: 30,
      },
      {
        id: "content-003",
        creator: "Catlin",
        ttestle: "Block shape mini bag",
        pricingOption: 2,
        imagePath:
          "https://closetfrontrecrutesting.blob.core.windows.net/images/thumbnail_3.jpeg",
        price: 15,
      },
    ]);

    (tokenize as jest.Mock).mockReturnValue([]);
  });

  test("renders Filters component correctly", () => {
    renderComponent();
    expect(screen.getByText("Pricing Options")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });
});
