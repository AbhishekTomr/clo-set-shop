import logo from "./logo.svg";
import "./App.css";
import ProductsGrid from "./Components/Products/ProductsGrid";
import { Provider } from "react-redux";
import { store } from "./Store/Store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductsGrid />
      </div>
    </Provider>
  );
}

export default App;
