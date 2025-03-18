import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ProductsGrid from "../ProductsGrid";
import { RootState } from "../../../Store/Store";
import { IProducts, PRICING_OPTION } from "../../../types";
import { render, screen } from "@testing-library/react";

const middlewares: any = [];
const mockStore = configureMockStore<RootState>(middlewares);

const mockProducts: IProducts[] = [
  {
    id: "1",
    title: "Product 1",
    creator: "Creator 1",
    price: 10,
    pricingOption: PRICING_OPTION.PAID,
    imagePath: "image1.jpg",
    keywords: [],
  },
  {
    id: "2",
    title: "Product 2",
    creator: "Creator 2",
    price: 20,
    pricingOption: PRICING_OPTION.FREE,
    imagePath: "image2.jpg",
    keywords: [],
  },
];

describe("ProductsGrid Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      products: {
        allProducts: mockProducts,
        visibleProducts: mockProducts,
        isLoading: false,
      },
    });
  });

  it("renders the component properly", () => {
    render(
      <Provider store={store}>
        <ProductsGrid />
      </Provider>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("shows loading spinner when isLoading is true", () => {
    store = mockStore({
      products: {
        allProducts: mockProducts,
        visibleProducts: [],
        isLoading: true,
      },
    });

    render(
      <Provider store={store}>
        <ProductsGrid />
      </Provider>
    );

    expect(screen.getByTestId("progress")).toBeInTheDocument();
  });

  it("shows 'No Products Found' message when there are no products", () => {
    store = mockStore({
      products: {
        allProducts: mockProducts,
        visibleProducts: [],
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <ProductsGrid />
      </Provider>
    );

    expect(screen.getByText("No Products Found !!")).toBeInTheDocument();
  });

  it("renders products correctly", () => {
    render(
      <Provider store={store}>
        <ProductsGrid />
      </Provider>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});
