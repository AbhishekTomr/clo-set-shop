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

export const tokenize = (mainString: string, tokens: string[] = []) => {
  const newTokens = mainString.toLocaleLowerCase().split(" ");
  tokens = tokens.concat(newTokens);
  return tokens;
};
