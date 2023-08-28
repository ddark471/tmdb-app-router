import React, { useState, useEffect } from "react";
import { service } from "../../api/service";
import { useTranslation } from "react-i18next";
import PostersTemplate from "../PostersTemplate/PostersTemplate";
import styles from "./Recommendations.module.css";

const Recommendations = (props) => {
  const [suggestedData, setSuggestedData] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    service(
      `https://api.themoviedb.org/3/movie/${
        props.movie_id
      }/recommendations?language=${t("api-code")}`,
      "GET"
    ).then((item) => setSuggestedData(item.data.results));
  }, [props.movie_id, i18n.language]);

  return (
    <div className={styles.recommendationsContainer}>
      {suggestedData.map((elem) => (
        <div key={elem.id}>
          <PostersTemplate postersData={elem} type={"moviePosters"} />
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
