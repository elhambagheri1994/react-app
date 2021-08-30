import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./emptyPage.module.scss";

const EmptyPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.emptyContainer}>
      <span className="icon-sad" />
      <div>{t("noItemToShow")}</div>
    </div>
  );
};

export default EmptyPage;
