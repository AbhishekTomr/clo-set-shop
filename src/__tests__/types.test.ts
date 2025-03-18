import {
  PRICING_OPTION,
  SORT_BY,
  Product,
  IProductsRes,
  IProducts,
  IFilters,
} from "../types";

describe("Types and Enums", () => {
  it("PRICING_OPTION should have correct values", () => {
    expect(PRICING_OPTION.FREE).toBe("free");
    expect(PRICING_OPTION.VIEW_ONLY).toBe("view_only");
    expect(PRICING_OPTION.PAID).toBe("paid");
  });

  it("SORT_BY should have correct values", () => {
    expect(SORT_BY.ITEM_NAME).toBe("name");
    expect(SORT_BY.PRICE_MAX).toBe("price_max");
    expect(SORT_BY.PRICE_MIN).toBe("price_min");
  });

  it("Product interface should have correct properties", () => {
    const product: Product = {
      id: "1",
      creator: "John Doe",
      title: "Sample Product",
      imagePath: "path/to/image.jpg",
      price: 100,
    };
    expect(product).toHaveProperty("id", "1");
    expect(product).toHaveProperty("creator", "John Doe");
    expect(product).toHaveProperty("title", "Sample Product");
    expect(product).toHaveProperty("imagePath", "path/to/image.jpg");
    expect(product).toHaveProperty("price", 100);
  });

  it("IProductsRes should extend Product and have pricingOption as a number", () => {
    const productRes: IProductsRes = {
      id: "1",
      creator: "John Doe",
      title: "Sample Product",
      imagePath: "path/to/image.jpg",
      price: 100,
      pricingOption: 1,
    };
    expect(productRes).toHaveProperty("pricingOption", 1);
  });

  it("IProducts should extend Product and have pricingOption as PRICING_OPTION", () => {
    const product: IProducts = {
      id: "1",
      creator: "John Doe",
      title: "Sample Product",
      imagePath: "path/to/image.jpg",
      price: 100,
      pricingOption: PRICING_OPTION.FREE,
      keywords: [],
    };
    expect(product).toHaveProperty("pricingOption", PRICING_OPTION.FREE);
    expect(product.keywords).toBeInstanceOf(Array);
  });

  it("IFilters should have correct properties", () => {
    const filters: IFilters = {
      priceType: [PRICING_OPTION.FREE, PRICING_OPTION.PAID],
      searchTerm: "it Product",
      price: { min: 50, max: 500 },
    };
    expect(filters.priceType).toContain(PRICING_OPTION.FREE);
    expect(filters.priceType).toContain(PRICING_OPTION.PAID);
    expect(filters.searchTerm).toBe("it Product");
    expect(filters.price.min).toBe(50);
    expect(filters.price.max).toBe(500);
  });
});
