import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import Image from "../Image/Image";
import Genres from "../Genres/Genres";
import styles from "./PostersTemplate.module.css";

const PostersTemplate = ({ postersData, type }) => (
  <div className={styles.posterContainer} key={postersData.id}>
    <Rating rating={postersData.vote_average} type={type} />
    <Link to={`/movies/${postersData.id}`} style={{ textDecoration: "none" }}>
      <div className={styles.imageContainer}>
        <Image image={postersData.poster_path} />
      </div>
      <span className={styles.title}>{postersData.title}</span>
    </Link>
    <Genres genre_ids={postersData.genre_ids} />
  </div>
);

export default PostersTemplate;
