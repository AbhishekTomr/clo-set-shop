import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Filters from "./Filters";
import { Provider } from "react-redux";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import configureStore from "redux-mock-store";
import { ProductServices } from "../../Services/ProductsServices";
import {
  filterProducts,
  initialSetup,
  setLoading,
  sortProducts,
} from "../../Store/productsSlice";

jest.mock("../../Services/ProductsServices");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(() => [new URLSearchParams(), jest.fn()]),
}));

const mockStore = configureStore([]);

describe("Filters Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: { items: [], loading: false },
    });
    store.dispatch = jest.fn();
  });

  test("renders filters component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Filters />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Pricing Options")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  test("fetches and sets up products on mount", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Product A",
        creator: "John Doe",
        pricingOption: "Free",
        price: 0,
      },
    ];
    ProductServices.prototype.fetchAllProducts.mockResolvedValue(mockProducts);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Filters />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(setLoading(true));
      expect(store.dispatch).toHaveBeenCalledWith(
        initialSetup({ products: expect.any(Array) })
      );
      expect(store.dispatch).toHaveBeenCalledWith(setLoading(false));
    });
  });

  test("applies filters when changed", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Filters />
        </MemoryRouter>
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      filterProducts({ filters: expect.any(Object) })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      sortProducts({ sortBy: expect.any(String) })
    );
  });

  test("resets filters when reset button is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Filters />
        </MemoryRouter>
      </Provider>
    );

    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);

    expect(store.dispatch).toHaveBeenCalledTimes(0); // No dispatch, as it clears search params
  });
});
