import React, { useState, useEffect } from "react";
import { service } from "../../api/service";
import ModalImage from "react-modal-image";
import styles from "./MovieImages.module.css";

const MovieImages = ({ movie_id }) => {
  const [movieImages, setMovieImages] = useState([]);
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/images`;

  useEffect(() => {
    service(url, "GET").then((elem) => setMovieImages(elem.data.backdrops));
  }, [movie_id]);

  return (
    <div className={styles.movieImages}>
      {movieImages.map((item) => {
        if (item.iso_639_1 === null) {
          return (
            <div key={item.file_path}>
              <ModalImage
                small={`https://image.tmdb.org/t/p/w185/${item.file_path}`}
                medium={`https://image.tmdb.org/t/p/w500/${item.file_path}`}
                large={`https://image.tmdb.org/t/p/w1280/${item.file_path}`}
              />
            </div>
          );
        } else return null;
      })}
    </div>
  );
};
export default MovieImages;
