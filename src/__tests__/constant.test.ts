import { DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE } from "../constants";

describe("Constants", () => {
  it("DEFAULT_MIN_PRICE should be 0", () => {
    expect(DEFAULT_MIN_PRICE).toBe(0);
  });

  it("DEFAULT_MAX_PRICE should be 999", () => {
    expect(DEFAULT_MAX_PRICE).toBe(999);
  });
});
