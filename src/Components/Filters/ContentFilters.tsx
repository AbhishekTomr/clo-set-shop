import React, { useEffect, useState } from "react";
import { PRICING_OPTION } from "../../types";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
type Props = {};

function ContentFilters({}: Props) {
  const [priceFilter, setPriceFilter] = useState<PRICING_OPTION[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const togglePrice = (pricingOpt: PRICING_OPTION) => {
    setPriceFilter((prices: PRICING_OPTION[]) => {
      if (prices.includes(pricingOpt)) {
        let newPrices = prices.filter((item) => item !== pricingOpt);
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
    <div>
      <span>Pricing Options</span>
      <label>
        <input
          type="checkbox"
          name="pricing-opt"
          value={PRICING_OPTION.PAID}
          checked={priceFilter.includes(PRICING_OPTION.PAID)}
          onChange={togglePrice.bind(null, PRICING_OPTION.PAID)}
        />
        Paid
      </label>
      <label>
        <input
          type="checkbox"
          name="pricing-opt"
          value={PRICING_OPTION.FREE}
          checked={priceFilter.includes(PRICING_OPTION.FREE)}
          onChange={togglePrice.bind(null, PRICING_OPTION.FREE)}
        />
        Free
      </label>
      <label>
        <input
          type="checkbox"
          name="pricing-opt"
          value={PRICING_OPTION.VIEW_ONLY}
          checked={priceFilter.includes(PRICING_OPTION.VIEW_ONLY)}
          onChange={togglePrice.bind(null, PRICING_OPTION.VIEW_ONLY)}
        />
        View Only
      </label>
    </div>
  );
}

export default ContentFilters;
