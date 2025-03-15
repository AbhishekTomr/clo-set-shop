import logo from "./logo.svg";
import "./App.css";
import ProductsGrid from "./Components/Products/ProductsGrid";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import ContentFilters from "./Components/Filters/ContentFilters";
import SearchBar from "./Components/Filters/SearchBar";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SearchBar />
        <ContentFilters />
        <ProductsGrid />
      </div>
    </Provider>
  );
}

export default App;
