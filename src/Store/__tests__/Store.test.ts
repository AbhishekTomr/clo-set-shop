import { store } from "../Store";
import productReducer, { initialSetup, setLoading } from "../productsSlice";
import { IProducts, PRICING_OPTION } from "../../types";

describe("Redux Store", () => {
  it("should initialize with the correct reducer", () => {
    const state = store.getState();
    expect(state).toHaveProperty("products");
  });

  it("should initialize with the correct default state", () => {
    const initialState = productReducer(undefined, { type: "@@INIT" });

    expect(initialState).toEqual({
      allProducts: [],
      visibleProducts: [],
      isLoading: false,
    });
  });

  it("should update loading state when setLoading is dispatched", () => {
    let state = productReducer(undefined, { type: "@@INIT" });
    expect(state.isLoading).toBe(false);

    state = productReducer(state, setLoading(true));
    expect(state.isLoading).toBe(true);

    state = productReducer(state, setLoading(false));
    expect(state.isLoading).toBe(false);
  });

  it("should update products when setProducts is dispatched", () => {
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

    let state = productReducer(undefined, { type: "@@INIT" });
    expect(state.visibleProducts).toEqual([]);

    state = productReducer(state, initialSetup({ products: mockProducts }));
    expect(state.visibleProducts).toEqual(mockProducts);
  });
});
