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
  },
});

export const { initialSetup, filterByPriceType } = productsSlice.actions;
export default productsSlice.reducer;
