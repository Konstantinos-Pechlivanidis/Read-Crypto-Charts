import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { changeCrypto } from "../../redux/crypto";
import { useSelector } from "react-redux";

const fetchSearch = (query) => {
  return axios.get(
    `https://api.coingecko.com/api/v3/search?query=${query}`,
    {}
  );
};

function Search() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { value: crypto } = useSelector((state) => state.crypto.coin);

  let useTimeout;
  const handleSearch = (e) => {
    clearTimeout(useTimeout);
    if (e.target.value != "") {
      useTimeout = setTimeout(() => {
        setQuery(e.target.value);
      }, 2000);
    } else {
      setQuery("");
    }
  };

  const handleChange = (event) => {
    setIsLoading(true);
    dispatch(changeCrypto(event.target.value));
    setIsLoading(false);
  };

  const {
    isLoading: searchIsLoading,
    isFetching: searchIsFetching,
    isError: searchIsError,
    error: searchError,
    data: searchData,
  } = useQuery(["crypto-search", query], () => fetchSearch(query), {
    refetchOnWindowFocus: false,
    enabled: Boolean(query),
  });

  if (searchIsFetching) {
    return (
      <p className="loading" style={{ color: "white" }}>
        Loading ...
      </p>
    );
  }

  if (searchIsError) {
    return (
      <p className="loading" style={{ color: "white" }}>
        Something went wrong: <br /> {searchError.message}
      </p>
    );
  }

  return (
    <div className="divSelect">
      <label htmlFor="search">Search Coin</label>
      <input
        id="search"
        type="text"
        disabled={searchIsFetching}
        placeholder="Bitcoin.."
        defaultValue={
          //   searchData?.data.coins ? searchData?.data.coins[0].id : query
          query
        }
        onChange={(e) => handleSearch(e)}
      />
      <div className="divSelect">
        <label
          style={{ display: searchIsLoading && "none" }}
          htmlFor="searchSelect"
        >
          Sellect Coin
        </label>
        <select
          disabled={searchData?.data.coins.length == 0}
          hidden={searchIsLoading}
          value={crypto}
          id="searchSelect"
          className="select"
          onChange={handleChange}
        >
          <option id="firstOption"> Select.. </option>
          {searchData?.data.coins.map((option) => (
            <option key={option.id} value={option.id}>
              {option.id}
            </option>
          ))}
        </select>
      </div>
      {isLoading && <p className="loading">Loading...</p>}
    </div>
  );
}

export default Search;
