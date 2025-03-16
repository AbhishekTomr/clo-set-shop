import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Filters.scss";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

type Props = {
  initialVal: string;
};

const SearchBar = ({ initialVal }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setSearchText(initialVal);
  }, [initialVal]);

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;
      setSearchText(search);
    },
    [setSearchText]
  );

  const onSubmitHandler = useCallback(() => {
    if (searchText.length) {
      searchParams.set("searchTerm", searchText);
    } else {
      searchParams.delete("searchTerm");
    }
    setSearchParams(searchParams);
  }, [searchText]);

  return (
    <div className="search-bar">
      <Input
        value={searchText}
        onChange={onChangeHandler}
        className="search"
        placeholder="Find the items you're looking for"
        endAdornment={
          <InputAdornment position={"end"}>
            <IconButton onClick={onSubmitHandler}>
              <Search
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </InputAdornment>
        }
      />
      {/* <button onClick={onSubmitHandler}>Search</button> */}
    </div>
  );
};

export default SearchBar;
