import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { service } from "../../api/service";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Rating from "../../components/Rating/Rating";
import Image from "../../components/Image/Image";
import Genres from "../../components/Genres/Genres";
import PostersTemplate from "../../components/PostersTemplate/PostersTemplate";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Movies.module.css";

const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    service(
      `https://api.themoviedb.org/3/movie/popular?language=${t(
        "api-code"
      )}&page=${searchParams.get("page") ? searchParams.get("page") : 1}`,
      "GET"
    ).then(({ data }) => {
      setMoviesData(data.results); //data.results equal to 20, then content per page will be 20;
      setTotalResults(data.total_results);
    });
    setSearchParams({
      page: searchParams.get("page") ? searchParams.get("page") : 1,
    });
  }, [i18n.language, searchParams]);

  const handleBackPage = () =>
    setSearchParams({ page: parseInt(searchParams.get("page", 10)) - 1 });

  const handleNextPage = () =>
    setSearchParams({ page: parseInt(searchParams.get("page", 10)) + 1 });

  return (
    <>
      <div className={styles.moviesContainer}>
        {moviesData.map((movies) => (
          <div className={styles.movies} key={movies.id}>
            <PostersTemplate postersData={movies} type={"moviePosters"} />
          </div>
        ))}
      </div>
      {totalResults > moviesData.length ? (
        <Pagination
          handleBackPage={handleBackPage}
          handleNextPage={handleNextPage}
        />
      ) : null}
    </>
  );
};
export default Movies;
