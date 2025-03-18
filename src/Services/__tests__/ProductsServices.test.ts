import { ProductServices } from "../ProductsServices";

describe("ProductServices", () => {
  let service: ProductServices;

  beforeEach(() => {
    service = new ProductServices();
    jest.clearAllMocks(); // Reset mock calls between tests
  });

  it("should fetch all products successfully", async () => {
    // Mock fetch response
    const mockProducts = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" },
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      } as Response)
    );

    const products = await service.fetchAllProducts();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://closet-recruiting-api.azurewebsites.net/api/data"
    );
    expect(products).toEqual(mockProducts);
  });

  it("should handle fetch failure", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));

    await expect(service.fetchAllProducts()).rejects.toThrow("Network Error");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
