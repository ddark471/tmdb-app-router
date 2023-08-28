import React from "react";
import styles from "./Image.module.css";

const Image = ({ image }) => {
  return (
    <img
      src={`https://image.tmdb.org/t/p/w500/${image}`}
      className={styles.image}
    />
  );
};
export default Image;
