import "./App.scss";
import ProductsGrid from "./Components/Products/ProductsGrid";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import ContentFilters from "./Components/Filters/ContentFilters";
import SearchBar from "./Components/Filters/SearchBar";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IFilters, PRICING_OPTION } from "./types";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
        light: "#FFFFFF",
        dark: "#00000",
      },
      secondary: {
        main: "#1b1a21",
      },
      background: {
        default: "#00000", // Background color
        paper: "#00000", // Card background
      },
      text: {
        primary: "#ffffff",
        secondary: "#d0d3d4",
      },
    },
    typography: {},
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const filters: IFilters = {
      priceType: [],
      searchTerm: "",
    };
    const priceTypeFilters = searchParams.get("priceType");
    const searchTerm = searchParams.get("searchTerm") || "";

    if (priceTypeFilters) {
      filters.priceType = priceTypeFilters.split("+") as PRICING_OPTION[];
    }
    filters.searchTerm = searchTerm;
    return filters;
  }, [searchParams]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="app">
          <SearchBar initialVal={filters.searchTerm as string} />
          <ContentFilters initialVal={filters.priceType as PRICING_OPTION[]} />
          <ProductsGrid filters={filters} />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
