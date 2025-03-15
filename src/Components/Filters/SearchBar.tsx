import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { tokenize } from "../../helpers";
import { useDispatch } from "react-redux";
import { filterByKeyword } from "../../Store/productsSlice";

type Props = {};

const SearchBar = (props: Props) => {
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useDispatch();

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;
      setSearchText(search);
    },
    [setSearchText]
  );

  const onSubmitHandler = useCallback(() => {
    let tokens = tokenize(searchText);
    dispatch(
      filterByKeyword({
        keywords: tokens,
      })
    );
  }, [searchText]);

  return (
    <div>
      <input value={searchText} onChange={onChangeHandler} />
      <button onClick={onSubmitHandler}>Search</button>
    </div>
  );
};

export default SearchBar;
