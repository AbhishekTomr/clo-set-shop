import "./App.scss";
import ProductsGrid from "./Components/Products/ProductsGrid";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import { AppBar } from "@mui/material";
import Filters from "./Components/Filters/Filters";

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
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: 768,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Box sx={{ flexGrow: 1 }} className="header-bar">
          <AppBar position="static">
            <Typography>ClO-SET</Typography>
          </AppBar>
        </Box>
        <div className="app">
          <Filters />
          <ProductsGrid />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
