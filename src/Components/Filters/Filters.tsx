import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IFilters, IProductsRes, PRICING_OPTION, SORT_BY } from "../../types";
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from "../../constants";
import SearchBar from "./SearchBar";
import ContentFilters from "./ContentFilters";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  filterProducts,
  initialSetup,
  sortProducts,
} from "../../Store/productsSlice";
import { ProductServices } from "../../Services/ProductsServices";
import { pricingMapper, setPrice, tokenize } from "../../helpers";
import { Box, Typography, Button } from "@mui/material";
import SortBy from "./SortBy";

type Props = {};

const productServices = new ProductServices();

const Filters = (props: Props) => {
  const [reset, setReset] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const filters = useMemo(() => {
    const filters: IFilters = {
      priceType: [],
      searchTerm: "",
      price: {
        min: DEFAULT_MIN_PRICE,
        max: DEFAULT_MAX_PRICE,
      },
    };
    const priceTypeFilters = searchParams.get("priceType");
    const searchTerm = searchParams.get("searchTerm") || "";
    const min = searchParams.get("minPrice") || DEFAULT_MIN_PRICE;
    const max = searchParams.get("maxPrice") || DEFAULT_MAX_PRICE;

    filters.price.min = +min;
    filters.price.max = +max;

    if (priceTypeFilters) {
      filters.priceType = priceTypeFilters.split("+") as PRICING_OPTION[];
    }
    filters.searchTerm = searchTerm;
    return filters;
  }, [searchParams]);

  const sortBy = useMemo(() => {
    return searchParams.get("sortBy") || SORT_BY.ITEM_NAME;
  }, [searchParams]);

  const applyFilters = useCallback(() => {
    dispatch(filterProducts({ filters: filters }));
    dispatch(sortProducts({ sortBy: sortBy as SORT_BY }));
  }, [filters, sortBy]);

  const getAllProducts = async () => {
    try {
      let products = await productServices.fetchAllProducts();
      products = products.map((item: IProductsRes) => ({
        ...item,
        pricingOption: pricingMapper(item.pricingOption),
        keyboard: tokenize(item.creator).concat(tokenize(item.title)),
        price: setPrice(item.pricingOption, item.price),
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
      setTimeout(() => {}, 1000);
    }
  };

  useEffect(() => {
    if (reset) {
      setTimeout(() => {
        setReset(false);
      }, 100);
    }
  }, [reset]);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const onReset = () => {
    setSearchParams(new URLSearchParams());
    setReset(true);
  };

  return (
    <>
      <SearchBar initialVal={filters.searchTerm as string} reset={reset} />
      <Box className="pricing-opt-wrapper">
        <Box className="filters">
          <Typography className="pricing-label">Pricing Options</Typography>
          <ContentFilters initialVal={filters} reset={reset} />
          <Button className="reset-btn" onClick={onReset}>
            Reset
          </Button>
        </Box>
      </Box>
      <SortBy initialVal={sortBy as SORT_BY} reset={reset} />
    </>
  );
};

export default Filters;
