import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base_url } from "../../api/url";
import { service } from "../../api/service";
import PostersTemplate from "../PostersTemplate/PostersTemplate";
import { useTranslation } from "react-i18next";
import styles from "./ActorCredits.module.css";

const ActorCredits = ({ person_id }) => {
  const { t, i18n } = useTranslation();

  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ["ActorCredits", person_id, i18n.language],
    queryFn: async () => {
      const { data } = await service(
        `${base_url}/person/${person_id}/movie_credits?language=${t(
          "api-code"
        )}`,
        "GET"
      );
      return data.cast;
    },
  });

  return (
    <div className={styles.ActorCredits}>
      {isSuccess ? (
        data.map((movie) => (
          <div key={movie.id}>
            <PostersTemplate postersData={movie} />
          </div>
        ))
      ) : (
        <span>{error}</span>
      )}
    </div>
  );
};

export default ActorCredits;
