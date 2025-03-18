import { render, screen } from "@testing-library/react";
import Product from "../Product";
import { IProducts, PRICING_OPTION } from "../../../types";

const sampleProduct: IProducts = {
  id: "1",
  title: "Sample Product",
  creator: "John Doe",
  price: 100,
  pricingOption: PRICING_OPTION.PAID,
  imagePath: "sample-image.jpg",
  keywords: [],
};

describe("Product Component", () => {
  test("renders product title and creator", () => {
    render(<Product product={sampleProduct} />);

    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("renders correct price for paid products", () => {
    render(<Product product={sampleProduct} />);

    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  test('renders "FREE" for free products', () => {
    render(
      <Product
        product={{ ...sampleProduct, pricingOption: PRICING_OPTION.FREE }}
      />
    );

    expect(screen.getByText("FREE")).toBeInTheDocument();
  });

  test('renders "View Only" for view-only products', () => {
    render(
      <Product
        product={{ ...sampleProduct, pricingOption: PRICING_OPTION.VIEW_ONLY }}
      />
    );

    expect(screen.getByText("View Only")).toBeInTheDocument();
  });

  test("renders product image correctly", () => {
    render(<Product product={sampleProduct} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "sample-image.jpg");
    expect(image).toHaveAttribute("alt", "Sample Product");
  });
});
