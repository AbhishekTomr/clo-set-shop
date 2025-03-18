import { pricingMapper, setPrice, tokenize } from "../helpers";
import { PRICING_OPTION } from "../types";

describe("Helpers", () => {
  it("pricingMapper should return correct PRICING_OPTION", () => {
    expect(pricingMapper(0)).toBe(PRICING_OPTION.PAID);
    expect(pricingMapper(1)).toBe(PRICING_OPTION.FREE);
    expect(pricingMapper(999)).toBe(PRICING_OPTION.VIEW_ONLY);
  });

  it("setPrice should return correct price based on pricingType", () => {
    expect(setPrice(0, 100)).toBe(100);
    expect(setPrice(1, 200)).toBe(1);
    expect(setPrice(999, 300)).toBe(2);
  });

  it("tokenize should split a string into lowercase words", () => {
    expect(tokenize("Hello World")).toEqual(["hello", "world"]);
    expect(tokenize("it String", ["existing"])).toEqual([
      "existing",
      "it",
      "string",
    ]);
  });
});
