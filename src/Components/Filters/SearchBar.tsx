import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {};

const SearchBar = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchText, setSearchText] = useState<string>(
    searchParams.get("searchTerm") || ""
  );

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

  useEffect(() => {}, [searchParams]);

  return (
    <div>
      <input value={searchText} onChange={onChangeHandler} />
      <button onClick={onSubmitHandler}>Search</button>
    </div>
  );
};

export default SearchBar;
