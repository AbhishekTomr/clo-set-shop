import { DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE } from "../constants";

describe("Constants", () => {
  test("DEFAULT_MIN_PRICE should be 0", () => {
    expect(DEFAULT_MIN_PRICE).toBe(0);
  });

  test("DEFAULT_MAX_PRICE should be 999", () => {
    expect(DEFAULT_MAX_PRICE).toBe(999);
  });
});
