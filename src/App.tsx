import logo from "./logo.svg";
import "./App.scss";
import ProductsGrid from "./Components/Products/ProductsGrid";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import ContentFilters from "./Components/Filters/ContentFilters";
import SearchBar from "./Components/Filters/SearchBar";
import { createTheme, ThemeProvider } from "@mui/material";

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
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="app">
          {/* <SearchBar />
        <ContentFilters /> */}
          <ProductsGrid />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
