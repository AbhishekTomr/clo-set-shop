import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ProductServices } from "../../Services/ProductsServices";
import { IFilters, IProducts, IProductsRes, PRICING_OPTION } from "../../types";
import { pricingMapper, tokenize } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { filterProducts, initialSetup, reset } from "../../Store/productsSlice";
import { useSearchParams } from "react-router-dom";
import { Grid } from "@mui/material";
import "./Products.scss";
import Product from "./Product";
import LoadingSpinner from "../Common/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";

const productServices = new ProductServices();

type Props = {};

function ProductsGrid({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(16);

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

  const visibleItems = useMemo(
    () => (products as IProducts[]).slice(0, index),
    [products, index]
  );

  return (
    <div className="product-grid">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <InfiniteScroll
          dataLength={visibleItems.length}
          next={() =>
            setTimeout(() => {
              setIndex((index) => index + 8);
            }, 1000)
          }
          hasMore={index < (products as IProducts[]).length}
          loader={<LoadingSpinner />}
          endMessage={
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              {" "}
              No more products!
            </div>
          }
          scrollableTarget="product-grid"
          className="infinite-wrapper"
        >
          <Grid container spacing={2} className="grid" id={"grid"}>
            {visibleItems.map((item: IProducts) => (
              <Grid item key={item.id} xs={3} height={410}>
                <Product product={item} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default ProductsGrid;
