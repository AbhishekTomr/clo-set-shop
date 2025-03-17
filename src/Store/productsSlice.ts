import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilters, IProducts, PRICING_OPTION, SORT_BY } from "../types";
import { stat } from "fs";
import { tokenize } from "../helpers";
import SortBy from "../Components/Filters/SortBy";

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
    filterProducts: (
      state,
      { payload: { filters } }: PayloadAction<{ filters: IFilters }>
    ) => {
      const {
        priceType,
        searchTerm,
        price: { min, max },
      } = filters;
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
      results = results.filter(({ price }) => {
        return price >= min && price <= max;
      });
      state.visibleProducts = results;
    },
    sortProducts: (
      state,
      { payload: { sortBy } }: PayloadAction<{ sortBy: SORT_BY }>
    ) => {
      switch (sortBy) {
        case SORT_BY.PRICE_MAX: {
          state.visibleProducts = state.visibleProducts.sort(
            (a, b) => b.price - a.price
          );
          break;
        }
        case SORT_BY.PRICE_MIN: {
          state.visibleProducts = state.visibleProducts.sort(
            (a, b) => a.price - b.price
          );
          break;
        }
        default: {
          state.visibleProducts = state.visibleProducts.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
        }
      }
    },
    reset(state) {
      state.visibleProducts = state.allProducts;
    },
  },
});

export const { initialSetup, filterProducts, reset, sortProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
