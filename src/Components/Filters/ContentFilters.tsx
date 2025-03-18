import React, { useEffect, useState } from "react";
import { IFilters, PRICING_OPTION } from "../../types";
import { useSearchParams } from "react-router-dom";
import "./Filters.scss";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import PriceSlider from "../Common/PriceSlider";

type Props = {
  initialVal: IFilters;
  reset: boolean;
};

function ContentFilters({ initialVal: { priceType, price }, reset }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [priceFilter, setPriceFilter] = useState<PRICING_OPTION[]>(priceType);

  useEffect(() => {
    if (reset) {
      setPriceFilter([]);
    }
  }, [priceType]);

  const togglePrice = (pricingOpt: PRICING_OPTION) => {
    setPriceFilter((prices: PRICING_OPTION[]) => {
      if (prices.includes(pricingOpt)) {
        let newPrices = prices.filter((testem) => testem !== pricingOpt);
        return newPrices;
      }
      return [...prices, pricingOpt];
    });
  };

  useEffect(() => {
    if (priceFilter.length === 0) {
      searchParams.delete("priceType");
    } else {
      searchParams.set("priceType", priceFilter.join("+"));
    }
    setSearchParams(searchParams);
  }, [priceFilter]);

  return (
    <FormControl className="checkbox-wrapper">
      <FormControlLabel
        key={PRICING_OPTION.PAID}
        className="price-check-control"
        control={
          <Checkbox
            checked={priceFilter.includes(PRICING_OPTION.PAID)}
            onChange={togglePrice.bind(null, PRICING_OPTION.PAID)}
            name={"pricing-options"}
            size="small"
            className="checkbox"
          />
        }
        label={"Paid"}
      />
      <FormControlLabel
        key={PRICING_OPTION.FREE}
        className="price-check-control"
        control={
          <Checkbox
            checked={priceFilter.includes(PRICING_OPTION.FREE)}
            onChange={togglePrice.bind(null, PRICING_OPTION.FREE)}
            name={"pricing-options"}
            size="small"
            className="checkbox"
          />
        }
        label={"Free"}
      />
      <FormControlLabel
        key={PRICING_OPTION.VIEW_ONLY}
        className="price-check-control"
        control={
          <Checkbox
            checked={priceFilter.includes(PRICING_OPTION.VIEW_ONLY)}
            onChange={togglePrice.bind(null, PRICING_OPTION.VIEW_ONLY)}
            name={"pricing-options"}
            size="small"
            className="checkbox"
          />
        }
        label={"View Only"}
      />

      <PriceSlider initialVal={[price.min, price.max]} reset={reset} />
    </FormControl>
  );
}

export default ContentFilters;
