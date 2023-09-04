import React, { useState, useEffect, useContext } from "react";
import { PulseLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { isError, useQuery } from "@tanstack/react-query";
import { service } from "../../api/service";
import { sliceDescription } from "../../utils/sliceDescription";
import { convertToDollars } from "../../utils/converToDollars";
import { convertToHours } from "../../utils/convertToHours";
import NavBar from "../NavBar/NavBar";
import Image from "../Image";
import Rating from "../Rating";
import MovieImages from "../MovieImages";
import MovieActors from "../MovieActors";
import Recommendations from "../Recommendations";
import { useTranslation } from "react-i18next";
import styles from "./Movie.module.css";

const Movie = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { data, isSuccess, error, isFetched } = useQuery({
    queryKey: ["MovieDetails", id, i18n.language],
    queryFn: async () => {
      const { data } = await service(
        `https://api.themoviedb.org/3/movie/${id}?language=${t("api-code")}`,
        "GET"
      );
      return data;
    },
  });

  const totalHours = isSuccess && convertToHours(data.runtime);

  return (
    <>
      {!isFetched && (
        <div
          style={{
            maxWidth: "100%",
            width: "100%",
            maxHeight: "500px",
            height: "100%",
            marginTop: "150px",
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
          <div className={styles.movieSingle}>
            <div className={styles.singlePoster}>
              <Rating rating={data.vote_average} />
              <div className={styles.posterImage}>
                <Image image={data.poster_path} />
              </div>
            </div>
            <div className={styles.singleDetails}>
              <div className={styles.details}>
                <div className={styles.movieTitle}>
                  <span className={styles.titleContent}>{t("title")}:</span>
                  <span className={styles.titleText}>{data.title}</span>
                </div>
                <div className={styles.movieOverview}>
                  <span className={styles.itemContent}>
                    {t("description")}{" "}
                  </span>
                  <span className={styles.itemText}>
                    {sliceDescription(data.overview)}
                  </span>
                </div>
                <div className={styles.movieItem}>
                  <span className={styles.itemContent}>
                    {t("release_date")}:{" "}
                  </span>
                  <span className={styles.itemText}>{data.release_date}</span>
                </div>
                <div className={styles.movieItem}>
                  <span className={styles.itemContent}>{t("budget")}: </span>
                  <span className={styles.itemText}>
                    $ {convertToDollars(data.budget)}
                  </span>
                </div>
                <div className={styles.movieItem}>
                  <span className={styles.itemContent}>{t("revenue")}: </span>
                  <span className={styles.itemText}>
                    $ {convertToDollars(data.revenue)}
                  </span>
                </div>
                <div className={styles.movieItem}>
                  <span className={styles.itemContent}>{t("duration")}: </span>
                  <span className={styles.itemText}>{`${totalHours.hours}${t(
                    "hours"
                  )} ${totalHours.minutes}${t("minutes")}`}</span>
                </div>
                <div className={styles.movieGenres}>
                  {data.genres.map(({ name }) => (
                    <div className={styles.Genres}>
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
                <MovieActors movie_id={id} />
                <MovieImages movie_id={id} />
              </div>
            </div>
          </div>
          <div className={styles.recommendations}>
            <Recommendations movie_id={id} />
          </div>
        </>
      )}
      {isError && (
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
          <h1>{error ? error.toString() : ""}</h1>
        </div>
      )}
    </>
  );
};

export default Movie;
