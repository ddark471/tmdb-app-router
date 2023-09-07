import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { service } from "api/service";
import ModalImage from "react-modal-image";
import styles from "./ActorImages.module.css";

const ActorImages = ({ person_id }) => {
  const { data, isError, isSuccess, error } = useQuery({
    queryKey: ["ActorImages", person_id],
    queryFn: async () => {
      const { data } = await service(`/person/${person_id}/images`, "GET");
      return data.profiles;
    },
  });

  return (
    <>
      {isSuccess && (
        <div className={styles.actorImages} key={person_id}>
          {data.map((images) => (
            <div key={images.file_path}>
              <ModalImage
                small={`https://image.tmdb.org/t/p/w185${images.file_path}`}
                medium={`https://image.tmdb.org/t/p/w500${images.file_path}`}
                large={`https://image.tmdb.org/t/p/original${images.file_path}`}
                className="smallImages"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default ActorImages;
