import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import { service } from "api/service";
import { useTranslation } from "react-i18next";
import Image from "components/Image/Image";
import ActorImages from "components/ActorImages";
import ActorCredits from "components/ActorCredits";
import styles from "./Actor.module.css";

const Actor = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { data, isSuccess, isError, isFetched } = useQuery({
    queryKey: ["ActorDetails", id, i18n.language],
    queryFn: async () => {
      const { data } = await service(
        `/person/${id}?language=${t("api-code")}`,
        "GET"
      );
      return data;
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
          minHeight: "500px",
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
      {!isFetched && (
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
          <PulseLoader color="#36d7b7" size={50} />
        </div>
      )}
      {isSuccess && (
        <>
          <div className={styles.profilePage}>
            <div className={styles.profilePicture}>
              <Image image={data.profile_path} />
            </div>
            <div className={styles.profileDetails}>
              <span className={styles.detailsName}>{data.name}</span>
              <div className={styles.detailsItem}>
                <span className={styles.itemPrefix}>{t("birthday")}: </span>
                <span className={styles.itemValue}>{data.birthday}</span>
              </div>
              <div className={styles.detailsItem}>
                <span className={styles.itemPrefix}>{t("placeOfBirth")}: </span>
                <span className={styles.itemValue}>{data.place_of_birth}</span>
              </div>
              {data.biography && (
                <div className={styles.detiailsBiography}>
                  <span className={styles.itemPrefix}>{t("biography")}: </span>
                  <span className={styles.biographyValue}>
                    {data.biography}
                  </span>
                </div>
              )}
              <ActorImages person_id={id} />
            </div>
          </div>
          <ActorCredits person_id={id} />
        </>
      )}
    </>
  );
};

export default Actor;
