import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";

jest.mock("./Components/Products/ProductsGrid", () => () => (
  <div data-testid="products-grid">ProductsGrid Component</div>
));
jest.mock("./Components/Filters/Filters", () => () => (
  <div data-testid="filters">Filters Component</div>
));

describe("App Component", () => {
  const theme = createTheme({
    palette: {
      primary: { main: "#000000" },
      secondary: { main: "#1b1a21" },
      background: { default: "#00000", paper: "#00000" },
      text: { primary: "#ffffff", secondary: "#d0d3d4" },
    },
  });

  const renderApp = () =>
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    );

  it("renders the AppBar with title", () => {
    renderApp();
    expect(screen.getByText("ClO-SET")).toBeInTheDocument();
  });

  it("renders Filters component", () => {
    renderApp();
    expect(screen.getByTestId("filters")).toBeInTheDocument();
  });

  it("renders ProductsGrid component", () => {
    renderApp();
    expect(screen.getByTestId("products-grid")).toBeInTheDocument();
  });
});
