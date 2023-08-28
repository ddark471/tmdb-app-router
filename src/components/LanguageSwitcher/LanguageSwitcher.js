import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageInterface from "./LanguageInterface";

const LanguageSwitcher = () => {
  const [isActive, setIsActive] = useState(false);
  const { i18n } = useTranslation();

  const handleOnMouseEnter = () => setIsActive(true);
  const handleOnMouseLeave = () => setIsActive(false);

  const handleClick = (language) => {
    if (language === "en") i18n.changeLanguage("en");
    else if (language === "ru") i18n.changeLanguage("ru");
  };

  return (
    <LanguageInterface
      handleOnMouseEnter={handleOnMouseEnter}
      handleOnMouseLeave={handleOnMouseLeave}
      handleClick={handleClick}
      isActive={isActive}
    />
  );
};
export default LanguageSwitcher;
