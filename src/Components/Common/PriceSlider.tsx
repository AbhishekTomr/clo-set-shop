import { useEffect, useState } from "react";
import { Box, Slider } from "@mui/material";
import "./PriceSlider.scss";
import { useSearchParams } from "react-router-dom";

type Props = {
  initialVal: number[];
  reset: boolean;
};

const PriceSlider = ({ initialVal, reset }: Props) => {
  const [priceRange, setPriceRange] = useState<number[]>([
    initialVal[0],
    initialVal[1],
  ]);

  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeHandler = (event: Event, newVal: number | number[]) => {
    setPriceRange(newVal as number[]);
  };

  useEffect(() => {
    if (reset) setPriceRange(initialVal);
  }, [reset]);

  useEffect(() => {
    const [min, max] = priceRange;
    if (min) {
      searchParams.set("minPrice", `${min}`);
    } else {
      searchParams.delete("minPrice");
    }
    if (max) {
      searchParams.set("maxPrice", `${max}`);
    } else {
      searchParams.delete("maxPrice");
    }
    setSearchParams(searchParams);
  }, [priceRange]);

  return (
    <Box className={"price-slider-wrap"}>
      <span className="price price-start">{priceRange[0]}</span>
      <Slider
        value={priceRange}
        onChange={onChangeHandler}
        className="slider"
        min={0}
        max={999}
      />
      <span className="price price-end">{`$ ${priceRange[1]}`}</span>
    </Box>
  );
};

export default PriceSlider;
