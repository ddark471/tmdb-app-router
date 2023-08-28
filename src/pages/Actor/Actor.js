import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { service } from "../../api/service";
import { useTranslation } from "react-i18next";
import Image from "../../components/Image/Image";
import ActorImages from "../../components/ActorImages";
import ActorCredits from "../../components/ActorCredits";
import styles from "./Actor.module.css";

const Actor = () => {
  const [actorDetails, setActorDetails] = useState([]);
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    service(
      `https://api.themoviedb.org/3/person/${id}?language=${t("api-code")}`,
      "GET"
    ).then((item) => setActorDetails(item.data));
  }, [id, i18n.language]);

  return (
    <>
      <div className={styles.profilePage}>
        <div className={styles.profilePicture}>
          <Image image={actorDetails.profile_path} />
        </div>
        <div className={styles.profileDetails}>
          <span className={styles.detailsName}>{actorDetails.name}</span>
          <div className={styles.detailsItem}>
            <span className={styles.itemPrefix}>{t("birthday")}: </span>
            <span className={styles.itemValue}>{actorDetails.birthday}</span>
          </div>
          <div className={styles.detailsItem}>
            <span className={styles.itemPrefix}>{t("placeOfBirth")}: </span>
            <span className={styles.itemValue}>
              {actorDetails.place_of_birth}
            </span>
          </div>
          {actorDetails.biography && (
            <div className={styles.detiailsBiography}>
              <span className={styles.itemPrefix}>{t("biography")}: </span>
              <span className={styles.biographyValue}>
                {actorDetails.biography}
              </span>
            </div>
          )}
          <ActorImages person_id={id} />
        </div>
      </div>
      <ActorCredits person_id={id} />
    </>
  );
};

export default Actor;
