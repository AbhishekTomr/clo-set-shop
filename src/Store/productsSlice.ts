import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilters, IProducts, PRICING_OPTION } from "../types";
import { stat } from "fs";
import { tokenize } from "../helpers";

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
    // filterByPriceType: (
    //   state,
    //   {
    //     payload: { priceByFilters },
    //   }: PayloadAction<{
    //     priceByFilters: PRICING_OPTION[];
    //   }>
    // ) => {
    //   if (!priceByFilters.length) {
    //     // state.visibleProducts = state.allProducts;
    //     return;
    //   }
    // },
    // filterBySearch: (
    //   state,
    //   {
    //     payload: { searchTerm },
    //   }: PayloadAction<{
    //     searchTerm: string;
    //   }>
    // ) => {
    //   if (!searchTerm.length) {
    //     // state.visibleProducts = state.allProducts;
    //     return;
    //   }
    // },

    filterProducts: (
      state,
      { payload: { filters } }: PayloadAction<{ filters: IFilters }>
    ) => {
      const { priceType, searchTerm } = filters;
      let results = state.allProducts;
      if (priceType.length) {
        results = results.filter((item) =>
          priceType.includes(item.pricingOption)
        );
      }
      if (searchTerm.length) {
        const keywords = tokenize(searchTerm);
        results = results.filter((item) => {
          const { title, creator } = item;
          return keywords.some((keyword) => {
            const regex = new RegExp(`\\b${keyword}\\b`, "i");
            if (regex.test(title) || regex.test(creator)) {
              return true;
            }
            return false;
          });
        });
      }
      state.visibleProducts = results;
    },
    reset(state) {
      state.visibleProducts = state.allProducts;
    },
  },
});

export const { initialSetup, filterProducts, reset } = productsSlice.actions;
export default productsSlice.reducer;
