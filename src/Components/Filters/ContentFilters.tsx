import React, { useEffect, useState } from "react";
import { PRICING_OPTION } from "../../types";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Filters.scss";
import { Checkbox, FormControl, FormControlLabel, Button } from "@mui/material";

type Props = {
  initialVal: PRICING_OPTION[];
};

function ContentFilters({ initialVal }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [priceFilter, setPriceFilter] = useState<PRICING_OPTION[]>(initialVal);

  useEffect(() => {
    if (initialVal.length === priceFilter.length) return;
    setPriceFilter(initialVal);
  }, [initialVal]);

  const togglePrice = (pricingOpt: PRICING_OPTION) => {
    setPriceFilter((prices: PRICING_OPTION[]) => {
      if (prices.includes(pricingOpt)) {
        let newPrices = prices.filter((item) => item !== pricingOpt);
        return newPrices;
      }
      return [...prices, pricingOpt];
    });
  };

  const reset = () => {
    setSearchParams(new URLSearchParams());
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
    <div className="pricing-opt-wrapper">
      <div className="filters">
        <span className="pricing-label">Pricing Options</span>
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
        </FormControl>
        <Button className="reset-btn" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default ContentFilters;
