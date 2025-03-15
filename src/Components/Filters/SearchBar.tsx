import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { tokenize } from "../../helpers";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {};

const SearchBar = (props: Props) => {
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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
    <div>
      <input value={searchText} onChange={onChangeHandler} />
      <button onClick={onSubmitHandler}>Search</button>
    </div>
  );
};

export default SearchBar;
