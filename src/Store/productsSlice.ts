import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts } from "../types";
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
  },
});

export const { initialSetup } = productsSlice.actions;
export default productsSlice.reducer;
