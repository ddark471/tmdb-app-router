import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { PulseLoader } from "react-spinners";
import { service } from "../../api/service";
import PostersTemplate from "../../components/PostersTemplate/PostersTemplate";
import Pagination from "../../components/Pagination/Pagination";
import NavBar from "../../components/NavBar/NavBar";
import styles from "../Movies/Movies.module.css";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalResults, setTotalResults] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const query = searchParams.get("query");

  // useEffect(() => {
  //   service(
  //     `https://api.themoviedb.org/3/search/movie?query=${query}&language=${t(
  //       "api-code"
  //     )}&page=${searchParams.get("page") ? searchParams.get("page") : 1}`,
  //     "GET"
  //   ).then(({ data }) => {
  //     setSearchResults(data.results);
  //     setTotalResults(data.total_results);
  //   });
  //   setSearchParams({
  //     query: query,
  //     page: searchParams.get("page") ? searchParams.get("page") : 1,
  //   });
  // }, [searchParams]);

  console.log(query);
  useEffect(() => {
    setSearchParams({
      query: query,
      page: searchParams.get("page") ? searchParams.get("page") : 1,
    });
  }, [searchParams]);

  const { data, isError, isSuccess, isFetching, error } = useQuery({
    queryKey: ["SearchPage", searchParams, query],
    queryFn: async () => {
      const { data } = await service(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=${t(
          "api-code"
        )}&page=${searchParams.get("page") ? searchParams.get("page") : 1}`,
        "GET"
      );
      return data.results;
    },
  });

  console.log(data);

  const handleBackPage = () =>
    setSearchParams({
      query: searchParams.get("query"),
      page: searchParams.get("page") - 1,
    });

  const handleNextPage = () =>
    setSearchParams({
      query: searchParams.get("query"),
      page: parseInt(searchParams.get("page", 10)) + 1,
    });

  useEffect(() => {
    setSearchParams({
      query: searchParams.get("query"),
      page: navigate(-1) || 1,
    });
  }, [query]);

  return (
    <>
      {isFetching && (
        <div
          style={{
            maxWidth: "100%",
            width: "100%",
            maxHeight: "500px",
            height: "100%",
            minHeight: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PulseLoader color="#36d7b7" size={50} />
        </div>
      )}
      {isSuccess && (
        <div className={styles.moviesContainer}>
          {" "}
          {data.map((movies) => (
            <PostersTemplate
              postersData={movies}
              type={"moviePosters"}
              key={movies.id}
            />
          ))}
        </div>
      )}
      {isSuccess && (
        <Pagination
          handleBackPage={handleBackPage}
          handleNextPage={handleNextPage}
          searchResults={data}
        />
      )}
    </>
  );
};
export default SearchPage;
