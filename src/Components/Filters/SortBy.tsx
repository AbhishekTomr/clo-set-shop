import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "./Filters.scss";
import { useEffect, useState } from "react";
import { SORT_BY } from "../../types";
import { useSearchParams } from "react-router-dom";

type Props = {
  initialVal: SORT_BY;
  reset: boolean;
};

const SortBy = ({ initialVal, reset }: Props) => {
  const [sortBy, setSortBy] = useState(initialVal);
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeHandler = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SORT_BY);
  };

  useEffect(() => {
    if (reset) setSortBy(initialVal);
  }, [reset]);

  useEffect(() => {
    if (sortBy === SORT_BY.ITEM_NAME) {
      searchParams.delete("sortBy");
    } else {
      searchParams.set("sortBy", sortBy);
    }
    setSearchParams(searchParams);
  }, [sortBy]);

  return (
    <Box className="sort-by-wrapper">
      <InputLabel className="sort-by-lable" id={"sort-by"}>
        Sort By
      </InputLabel>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="sort-by"
          className="sort-by-selector"
          value={sortBy}
          onChange={onChangeHandler}
          label="Age"
          color={"primary"}
        >
          <MenuItem
            value={SORT_BY.ITEM_NAME}
            color={"primary"}
            className="list-item"
          >
            Relevance
          </MenuItem>
          <MenuItem
            value={SORT_BY.PRICE_MAX}
            color={"primary"}
            className="list-item"
          >
            Price (high to low)
          </MenuItem>
          <MenuItem
            value={SORT_BY.PRICE_MIN}
            color={"primary"}
            className="list-item"
          >
            Price (low to high)
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortBy;
