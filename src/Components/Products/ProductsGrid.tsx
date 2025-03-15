import React, { useCallback, useEffect, useState } from "react";
import { ProductServices } from "../../Services/ProductsServices";
import { IFilters, IProducts, IProductsRes, PRICING_OPTION } from "../../types";
import { pricingMapper, tokenize } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { filterProducts, initialSetup, reset } from "../../Store/productsSlice";
import { useSearchParams } from "react-router-dom";

const productServices = new ProductServices();

type Props = {};

function ProductsGrid({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const products = useSelector<RootState>(
    (state: RootState) => state.products.visibleProducts
  );

  const applyFilters = useCallback(() => {
    if (searchParams.size === 0) {
      dispatch(reset());
      return;
    }
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
    console.log("filters", filters);
    dispatch(filterProducts({ filters: filters }));
  }, [searchParams]);

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      let products = await productServices.fetchAllProducts();
      products = products.map((item: IProductsRes) => ({
        ...item,
        pricingOption: pricingMapper(item.pricingOption),
        keyboard: tokenize(item.creator).concat(tokenize(item.title)),
      }));
      dispatch(
        initialSetup({
          allProducts: products,
          visibleProducts: products,
        })
      );
      applyFilters();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchParams]);

  return (
    <div
      style={{
        border: "1px solid red",
        display: "flex",
        flexFlow: "row wrap",
        margin: "10px",
      }}
    >
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          {(products as IProducts[]).map((item: IProducts) => (
            <div
              key={item.id}
              style={{
                border: "1px solid green",
                width: "100px",
              }}
            >
              {item.title}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ProductsGrid;
