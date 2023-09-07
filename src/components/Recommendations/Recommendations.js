import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { service } from "../../api/service";
import { useTranslation } from "react-i18next";
import PostersTemplate from "../PostersTemplate/PostersTemplate";
import styles from "./Recommendations.module.css";

const Recommendations = ({ movie_id }) => {
  const { t, i18n } = useTranslation();

  const { data, isSuccess, isFetched, isError } = useQuery({
    queryKey: ["Recommendations", movie_id, i18n.language],
    queryFn: async () => {
      const { data } = await service(
        `/movie/${movie_id}/recommendations?language=${t("api-code")}`,
        "GET"
      );
      return data.results;
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
        <div className={styles.recommendationsContainer}>
          {data.map((elem) => (
            <div key={elem.id}>
              <PostersTemplate postersData={elem} type={"moviePosters"} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Recommendations;
