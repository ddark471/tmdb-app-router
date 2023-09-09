import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { service } from "api/service";
import { useTranslation } from "react-i18next";
import styles from "./MovieActors.module.css";

const MovieActors = ({ movie_id }) => {
  const { t, i18n } = useTranslation();
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["Actors", movie_id, i18n.language],
    queryFn: async () => {
      const { data } = await service(`/movie/${movie_id}/credits?api_key=ad2c8cdf383ced3998f35ea391725c12`, "GET");
      return data.cast;
    },
  });

  const showLess = isSuccess ? data.slice(0, 6) : "";
  const [showAll, setShowAll] = useState(false);

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

  const handleShowAll = isSuccess ? () => setShowAll(!showAll) : "";

  return (
    <>
      {isSuccess && (
        <div className={styles.showActors}>
          <button className={`${styles.moreButton} ${showAll ? styles.buttonClicked : null}`} onClick={handleShowAll}>
            {t("showAll")}
          </button>
          <div className={styles.actorsInline}>
            {showAll
              ? data.map((credit) => (
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
      )}
    </>
  );
};
export default MovieActors;
