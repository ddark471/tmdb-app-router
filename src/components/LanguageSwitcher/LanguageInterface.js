import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";

const LanguageInterface = ({
  handleOnMouseEnter,
  handleOnMouseLeave,
  handleClick,
  isActive,
}) => {
  const { i18n } = useTranslation();

  return (
    <div className={styles.languageContainer}>
      <div
        className={`${styles.languageSwitcher} ${
          isActive ? styles.switchModifier : ""
        }`}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <span className={styles.currentLang}>
          {i18n.language.toUpperCase()}
        </span>
        {isActive && (
          <div className={styles.langDropdown}>
            <div
              className={styles.language}
              onClick={() => handleClick(i18n.language == "en" ? "ru" : "en")}
            >
              <span
                className={styles.languageText}
                onClick={() => handleClick(i18n.language == "en" ? "ru" : "en")}
              >
                {i18n.language == "en" ? "RU" : "EN"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default LanguageInterface;
