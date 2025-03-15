export enum PRICING_OPTION {
  FREE = "free",
  VIEW_ONLY = "view_only",
  PAID = "paid",
}

export interface Product {
  id: string;
  creator: string;
  title: string;
  imagePath: string;
  price: number;
}

export interface IProductsRes extends Product {
  pricingOption: number;
}

export interface IProducts extends Product {
  pricingOption: PRICING_OPTION;
  keywords: [];
}
