import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.css";

const Pagination = ({ handleNextPage, handleBackPage, searchResults }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page", 10));

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagesButton}
        onClick={handleBackPage}
        disabled={page === 1}
      >
        <div className={styles.buttonImage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </div>
      </button>
      <div className={styles.pages}>
        {page !== 1 && page !== 0 ? (
          <div className={styles.pagesInactive} onClick={handleBackPage}>
            <span className={styles.inactiveText} onClick={handleBackPage}>
              {page - 1}
            </span>
          </div>
        ) : null}
        <div className={styles.pagesActive}>
          <span className={styles.activeText}>{page}</span>
        </div>
        {page <= 500 && (searchResults ? searchResults.length : "") >= 20 ? (
          <div className={styles.pagesInactive} onClick={handleNextPage}>
            <span className={styles.inactiveText} onClick={handleNextPage}>
              {page + 1}
            </span>
          </div>
        ) : null}
      </div>
      <button
        className={styles.pagesButton}
        onClick={handleNextPage}
        disabled={
          page >= 500 || searchResults ? searchResults.length < 20 : null
        }
      >
        <div className={styles.buttonImage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default Pagination;
