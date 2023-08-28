import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../Search";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { replace: true });
    setInputValue("");
  };

  return (
    <nav className={styles.NavBar}>
      <div className={styles.logo} onClick={handleClick}>
        <span className={styles.logoText} onClick={handleClick}>
          {t("logoName")}
        </span>
      </div>
      <Search inputValue={inputValue} setInputValue={setInputValue} />
      <LanguageSwitcher />
    </nav>
  );
};
export default NavBar;
