export enum PRICING_OPTION {
  FREE = "free",
  VIEW_ONLY = "view_only",
  PAID = "paid",
}

export enum SORT_BY {
  ITEM_NAME = "name",
  PRICE_MAX = "price_max",
  PRICE_MIN = "price_min",
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

export interface IFilters {
  priceType: PRICING_OPTION[];
  searchTerm: string;
  price: {
    min: number;
    max: number;
  };
}
