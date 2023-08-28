import React from "react";
import styles from "./Rating.module.css";

const Rating = ({ rating, type }) => {
  return type === "moviePosters" ? (
    <div
      className={`${styles.rating} ${
        rating >= 7 ? styles.ratingPositive : styles.ratingNegative
      }`}
    >
      <span className={styles.ratingText}>{rating.toFixed(1)}</span>
    </div>
  ) : (
    <div
      className={`${styles.ratingMovieDetails} ${
        rating >= 7 ? styles.ratingPositive : styles.ratingNegative
      }`}
    >
      <span className={styles.ratingMovieDetailsText}>{rating}</span>
    </div>
  );
};
export default Rating;
