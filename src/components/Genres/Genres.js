import React, { useEffect, useState, useContext } from "react";
import { service } from "../../api/service";
import { useTranslation } from "react-i18next";
import styles from "./Genres.module.css";

const Genres = ({ genre_ids }) => {
  const [genresList, setGenresList] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    service(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=ad2c8cdf383ced3998f35ea391725c12&language=${i18n.language}`,
      "GET"
    ).then((genresData) => setGenresList(genresData.data.genres));
  }, [i18n.language]);

  const getGenreNames = (ids) => {
    const genreNames = ids.map((genre_id) => {
      const genreName = genresList.find((genre) => genre.id === genre_id);
      return genreName ? genreName.name : null;
    });
    return genreNames.join(", ");
  };

  return (
    <div className={styles.genres}>
      <span className={styles.genres__text}>{getGenreNames(genre_ids)}</span>
    </div>
  );
};
export default Genres;
