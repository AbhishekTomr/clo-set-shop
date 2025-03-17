import { PRICING_OPTION } from "./types";

export const pricingMapper = (pricingType: number) => {
  switch (pricingType) {
    case 0:
      return PRICING_OPTION.PAID;
    case 1:
      return PRICING_OPTION.FREE;
    default:
      return PRICING_OPTION.VIEW_ONLY;
  }
};

export const setPrice = (pricingType: number, price: number) => {
  switch (pricingType) {
    case 0:
      return price;
    case 1:
      return 1;
    default:
      return 2;
  }
};

export const tokenize = (mainString: string, tokens: string[] = []) => {
  const newTokens = mainString.toLocaleLowerCase().split(" ");
  tokens = tokens.concat(newTokens);
  return tokens;
};

export const extractFiltersAndSort = () => {};
