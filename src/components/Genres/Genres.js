import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { service } from "../../api/service";
import { useTranslation } from "react-i18next";
import styles from "./Genres.module.css";

const Genres = ({ genre_ids }) => {
  const { t, i18n } = useTranslation();
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["Genres", genre_ids, i18n.language],
    queryFn: async () => {
      const { data } = await service(
        `/genre/movie/list?api_key=ad2c8cdf383ced3998f35ea391725c12&language=${i18n.language}`,
        "GET"
      );
      return data.genres;
    },
  });

  if (isError)
    return (
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
        <h1>Something is wrong, please try again!!</h1>
      </div>
    );

  const getGenreNames = (ids) => {
    if (isSuccess) {
      const genreNames = ids.map((genre_id) => {
        const genreName = data.find((genre) => genre.id === genre_id);
        return genreName ? genreName.name : null;
      });
      return genreNames.join(", ");
    }
  };

  return (
    <>
      {isSuccess && (
        <div className={styles.genres}>
          <span className={styles.genres__text}>
            {getGenreNames(genre_ids)}
          </span>
        </div>
      )}
    </>
  );
};
export default Genres;
