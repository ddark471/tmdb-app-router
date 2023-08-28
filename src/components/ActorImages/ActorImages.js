import React, { useState, useEffect } from "react";
import { service } from "../../api/service";
import ModalImage from "react-modal-image";
import styles from "./ActorImages.module.css";

const ActorImages = ({ person_id }) => {
  const [actorImages, setActorImages] = useState([]);
  useEffect(() => {
    service(
      `https://api.themoviedb.org/3/person/${person_id}/images`,
      "GET"
    ).then((item) => setActorImages(item.data.profiles));
  }, [person_id]);

  return (
    <div className={styles.actorImages} key={person_id}>
      {actorImages.map((images) => (
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
  );
};
export default ActorImages;
