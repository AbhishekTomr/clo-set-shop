import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts, PRICING_OPTION } from "../types";
import { stat } from "fs";

interface productsSlice {
  allProducts: IProducts[];
  visibleProducts: IProducts[];
}

const initialState: productsSlice = {
  allProducts: [],
  visibleProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    initialSetup: (state, { payload }: PayloadAction<productsSlice>) => {
      state.allProducts = payload.allProducts;
      state.visibleProducts = payload.allProducts;
    },
    filterByPriceType: (
      state,
      {
        payload: { priceByFilters },
      }: PayloadAction<{
        priceByFilters: PRICING_OPTION[];
      }>
    ) => {
      if (!priceByFilters.length) {
        state.visibleProducts = state.allProducts;
        return;
      }
      state.visibleProducts = state.allProducts.filter((item) =>
        priceByFilters.includes(item.pricingOption)
      );
    },
    filterByKeyword: (
      state,
      {
        payload: { keywords },
      }: PayloadAction<{
        keywords: string[];
      }>
    ) => {
      if (!keywords.length) {
        state.visibleProducts = state.allProducts;
        return;
      }
      state.visibleProducts = state.allProducts.filter((item) => {
        const { title, creator } = item;
        return keywords.some((keyword) => {
          const regex = new RegExp(`\\b${keyword}\\b`, "i");
          if (regex.test(title) || regex.test(creator)) {
            return true;
          }
          return false;
        });
      });
    },
  },
});

export const { initialSetup, filterByPriceType, filterByKeyword } =
  productsSlice.actions;
export default productsSlice.reducer;
