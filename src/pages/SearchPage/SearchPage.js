import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { PulseLoader } from "react-spinners";
import { service } from "api/service";
import PostersTemplate from "components/PostersTemplate/PostersTemplate";
import Pagination from "components/Pagination/Pagination";
import NavBar from "components/NavBar/NavBar";
import styles from "pages/Movies/Movies.module.css";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalResults, setTotalResults] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const query = searchParams.get("query");

  useEffect(() => {
    setSearchParams({
      query: query,
      page: searchParams.get("page") ? searchParams.get("page") : 1,
    });
  }, [searchParams]);

  const { data, isError, isSuccess, isFetched, error } = useQuery({
    queryKey: ["SearchPage", searchParams.get("page"), query],
    queryFn: async () => {
      const { data } = await service(
        `/search/movie?query=${query}&language=${t("api-code")}&page=${
          searchParams.get("page") ? searchParams.get("page") : 1
        }`,
        "GET"
      );
      return data.results;
    },
  });

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

  if (isError)
    return (
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
        <h1>Something is wrong, please try again</h1>
      </div>
    );

  return (
    <>
      {!isFetched && (
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

      {isSuccess &&
        (data.length !== 0 ? (
          <>
            <div className={styles.moviesContainer}>
              {data.map((movies) => (
                <PostersTemplate
                  postersData={movies}
                  type={"moviePosters"}
                  key={movies.id}
                />
              ))}
            </div>
            <Pagination
              handleBackPage={handleBackPage}
              handleNextPage={handleNextPage}
              searchResults={data}
            />
          </>
        ) : (
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
            <h1 style={{ fontSize: "50px", fontStyle: "bold" }}>
              404 not found
            </h1>
          </div>
        ))}
    </>
  );
};
export default SearchPage;
