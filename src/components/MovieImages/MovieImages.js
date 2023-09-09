import React from "react";
import { useQuery } from "@tanstack/react-query";
import { service } from "api/service";
import ModalImage from "react-modal-image";
import styles from "./MovieImages.module.css";

const MovieImages = ({ movie_id }) => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["MovieImages", movie_id],
    queryFn: async () => {
      const { data } = await service(`/movie/${movie_id}/images`, "GET");
      return data.backdrops;
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

  return (
    <>
      {isSuccess && (
        <div className={styles.movieImages}>
          {data.map((item) => {
            if (item.iso_639_1 === null) {
              {
                /*will take only movie images, excludes posters*/
                /*iso_639_1 is a language name */
              }
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
      )}
    </>
  );
};
export default MovieImages;
