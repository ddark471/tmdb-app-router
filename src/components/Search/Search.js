import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Search.module.css";

const Search = ({ inputValue, setInputValue }) => {
  const { t } = useTranslation();
  const [setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleChange = (event) => setInputValue(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ query: inputValue ? inputValue : "/" });
    navigate(`/search?query=${inputValue}`, { replace: true });
  };

  return (
    <form className={styles.navbar__searchBar} onSubmit={handleSubmit}>
      <label className={styles.searchBar} htmlFor="focusing" id="focus">
        <input
          id="focusing"
          className={styles.searchBarInput}
          placeholder={t("searchBarPlaceholder")}
          name="searchInput"
          value={inputValue}
          onChange={handleChange}
          autoComplete={"off"}
        />
        <input type="submit" className={styles.searchBarButton} value={`${t("searchBarButton")}`} id="searchButton" />
      </label>
    </form>
  );
};
export default Search;
