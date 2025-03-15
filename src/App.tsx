import logo from "./logo.svg";
import "./App.css";
import ProductsGrid from "./Components/Products/ProductsGrid";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import ContentFilters from "./Components/Filters/ContentFilters";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ContentFilters />
        <ProductsGrid />
      </div>
    </Provider>
  );
}

export default App;
