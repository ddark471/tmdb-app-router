import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { service } from "../../api/service";
import { useTranslation } from "react-i18next";
import styles from "./MovieActors.module.css";

const MovieActors = (props) => {
  const [allActors, setAllActors] = useState([]);
  const showLess = allActors.slice(0, 6);
  const [showAll, setShowAll] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    service(
      `https://api.themoviedb.org/3/movie/${props.movie_id}/credits?api_key=ad2c8cdf383ced3998f35ea391725c12`,
      "GET"
    ).then((res) => {
      res ? setAllActors(res.data.cast) : setAllActors(null);
    });
  }, [props.movie_id, i18n.language]);

  const handleShowAll = () => setShowAll(!showAll);

  return (
    <div className={styles.showActors}>
      <button
        className={`${styles.moreButton} ${
          showAll ? styles.buttonClicked : null
        }`}
        onClick={handleShowAll}
      >
        {t("showAll")}
      </button>
      <div className={styles.actorsInline}>
        {showAll
          ? allActors.map((credit) => (
              <div className={styles.credit} key={credit.id}>
                <Link to={`/actor/${credit.id}`}>
                  <div className={styles.creditImage}>
                    <img
                      src={`https://image.tmdb.org/t/p/w185${credit.profile_path}`}
                      className={styles.imageLoaded}
                    />
                  </div>
                </Link>
                <div className={styles.creditText}>
                  <a className={styles.textName}>{credit.name}</a>
                  <a className={styles.textCharacter}>{credit.character}</a>
                </div>
              </div>
            ))
          : showLess.map((credit) => (
              <div className={styles.credit} key={credit.id}>
                <Link to={`/actor/${credit.id}`}>
                  <div className={styles.creditImage}>
                    <img
                      src={`https://image.tmdb.org/t/p/w185${credit.profile_path}`}
                      className={styles.imageLoaded}
                    />
                  </div>
                </Link>
                <div className={styles.creditText}>
                  <a className={styles.textName}>{credit.name}</a>
                  <a className={styles.textCharacter}>{credit.character}</a>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
export default MovieActors;
