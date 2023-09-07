import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import { service } from "api/service";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Rating from "components/Rating/Rating";
import Image from "components/Image/Image";
import Genres from "components/Genres/Genres";
import PostersTemplate from "components/PostersTemplate/PostersTemplate";
import Pagination from "components/Pagination/Pagination";
import styles from "./Movies.module.css";

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setSearchParams({
      page: searchParams.get("page") ? searchParams.get("page") : 1,
    });
  }, [i18n.language, searchParams]);

  const { data, isError, isSuccess, isFetched } = useQuery({
    queryKey: ["Movies", i18n.language, searchParams.get("page")],
    queryFn: async () => {
      const { data } = await service(
        `/movie/popular?language=${t("api-code")}&page=${
          searchParams.get("page") ? searchParams.get("page") : 1
        }`,
        "GET"
      );
      return data;
    },
  });

  const handleBackPage = () =>
    setSearchParams({ page: parseInt(searchParams.get("page", 10)) - 1 });

  const handleNextPage = () =>
    setSearchParams({ page: parseInt(searchParams.get("page", 10)) + 1 });

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
        <h1>Something is wrong, please try again!!</h1>
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
      {isSuccess && (
        <>
          <div className={styles.moviesContainer}>
            {data.results.map((movies) => (
              <div className={styles.movies} key={movies.id}>
                <PostersTemplate postersData={movies} type={"moviePosters"} />
              </div>
            ))}
          </div>
          {data.total_results > data.results.length ? (
            <Pagination
              handleBackPage={handleBackPage}
              handleNextPage={handleNextPage}
            />
          ) : null}
        </>
      )}
    </>
  );
};
export default Movies;
